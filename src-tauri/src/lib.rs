use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use std::sync::OnceLock;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::Emitter;
use rayon::prelude::*;

#[derive(Serialize, Deserialize, Debug)]
pub struct FileItem {
    name: String,
    path: String,
    is_dir: bool,
    size: u64,
    extension: String,
    last_accessed: Option<u64>,
    last_modified: Option<u64>,
    risk_score: u8,
    risk_reason: String,
}

#[derive(Deserialize)]
struct BoosterFile {
    learner: Learner,
}

#[derive(Deserialize)]
struct Learner {
    gradient_booster: GradientBooster,
}

#[derive(Deserialize)]
struct GradientBooster {
    model: BoosterModel,
}

#[derive(Deserialize)]
struct BoosterModel {
    trees: Vec<Tree>,
}

#[derive(Deserialize)]
struct Tree {
    left_children: Vec<i32>,
    right_children: Vec<i32>,
    split_conditions: Vec<f32>,
    split_indices: Vec<usize>,
    base_weights: Vec<f32>,
}

struct MlArtifacts {
    trees: Vec<Tree>,
    ext_encoder: std::collections::HashMap<String, i32>,
    rare_exts: std::collections::HashSet<String>,
}

static ML_ARTIFACTS: OnceLock<Option<MlArtifacts>> = OnceLock::new();

fn get_dir_size(path: &str) -> u64 {
    let mut total = 0u64;
    if let Ok(entries) = fs::read_dir(path) {
        for entry in entries.flatten() {
            if let Ok(metadata) = entry.metadata() {
                if metadata.is_dir() {
                    total += get_dir_size(&entry.path().to_string_lossy());
                } else {
                    total += metadata.len();
                }
            }
        }
    }
    total
}

fn get_dir_risk_from_children(path: &str, lang: &str) -> (u8, String) {
    fn walk(path: &str, lang: &str, max_score: &mut u8, max_reason: &mut String, max_file: &mut String) {
        let entries = match fs::read_dir(path) {
            Ok(entries) => entries,
            Err(_) => return,
        };

        for entry in entries.flatten() {
            let metadata = match entry.metadata() {
                Ok(metadata) => metadata,
                Err(_) => continue,
            };
            let full_path = entry.path().to_string_lossy().to_string();

            if metadata.is_dir() {
                walk(&full_path, lang, max_score, max_reason, max_file);
                continue;
            }

            let name = entry.file_name().to_string_lossy().to_string();
            let extension = Path::new(&name)
                .extension()
                .unwrap_or_default()
                .to_string_lossy()
                .to_lowercase()
                .to_string();

            let (score, reason) = calculate_risk_ml(&name, &extension, &full_path, &metadata, lang);
            if score > *max_score {
                *max_score = score;
                *max_reason = reason;
                *max_file = name;
            }
        }
    }

    let mut max_score = 0u8;
    let mut max_reason = String::new();
    let mut max_file = String::new();
    walk(path, lang, &mut max_score, &mut max_reason, &mut max_file);

    if max_file.is_empty() {
        if lang == "en" {
            (0, "Folder: no files found to evaluate".to_string())
        } else {
            (0, "Klasör: değerlendirilecek dosya bulunamadı".to_string())
        }
    } else {
        if lang == "en" {
            (max_score, format!("Folder reference: {} -> {}", max_file, max_reason))
        } else {
            (max_score, format!("Klasör referansı: {} -> {}", max_file, max_reason))
        }
    }
}

fn resolve_file_path(file_name: &str) -> Option<std::path::PathBuf> {
    let manifest_dir = std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let mut candidates = Vec::new();
    candidates.push(manifest_dir.join("ml_assets").join(file_name));
    candidates.push(manifest_dir.join(file_name));
    if let Ok(cwd) = std::env::current_dir() {
        candidates.push(cwd.join(file_name));
        candidates.push(cwd.join("..").join(file_name));
        candidates.push(cwd.join("..").join("..").join(file_name));
    }
    if let Ok(exe) = std::env::current_exe() {
        if let Some(dir) = exe.parent() {
            candidates.push(dir.join(file_name));
            candidates.push(dir.join("..").join("..").join("..").join(file_name));
        }
    }
    candidates.into_iter().find(|p| p.exists())
}

fn load_ml_artifacts() -> Option<MlArtifacts> {
    let model_path = resolve_file_path("dosya_risk_modeli.json")?;
    let encoder_path = resolve_file_path("ext_encoder.json")?;
    let rare_path = resolve_file_path("rare_exts.json")?;

    let model_raw = fs::read_to_string(model_path).ok()?;
    let encoder_raw = fs::read_to_string(encoder_path).ok()?;
    let rare_raw = fs::read_to_string(rare_path).ok()?;

    let booster: BoosterFile = serde_json::from_str(&model_raw).ok()?;
    let ext_encoder: std::collections::HashMap<String, i32> = serde_json::from_str(&encoder_raw).ok()?;
    let rare_vec: Vec<String> = serde_json::from_str(&rare_raw).ok()?;
    let rare_exts = rare_vec.into_iter().collect();

    Some(MlArtifacts {
        trees: booster.learner.gradient_booster.model.trees,
        ext_encoder,
        rare_exts,
    })
}

fn get_ml_artifacts() -> Option<&'static MlArtifacts> {
    ML_ARTIFACTS.get_or_init(load_ml_artifacts).as_ref()
}

#[tauri::command]
fn get_risk_engine_status() -> String {
    if get_ml_artifacts().is_some() {
        "ml".to_string()
    } else {
        "legacy".to_string()
    }
}

fn sigmoid(x: f32) -> f32 {
    1.0 / (1.0 + (-x).exp())
}

fn predict_xgb_probability(trees: &[Tree], features: &[f32]) -> f32 {
    let mut score = 0.0f32;
    for tree in trees {
        let mut node = 0usize;
        loop {
            let left = tree.left_children[node];
            let right = tree.right_children[node];
            if left < 0 || right < 0 {
                score += tree.base_weights[node];
                break;
            }
            let split_idx = tree.split_indices[node];
            let split_val = tree.split_conditions[node];
            let feat = features.get(split_idx).copied().unwrap_or(0.0);
            node = if feat < split_val { left as usize } else { right as usize };
        }
    }
    sigmoid(score)
}

fn extract_features(path: &str, name: &str, extension: &str, metadata: &fs::Metadata) -> [f32; 14] {
    let ext_with_dot = if extension.is_empty() {
        ".none".to_string()
    } else {
        format!(".{}", extension.to_lowercase())
    };

    let ext_clean = if let Some(artifacts) = get_ml_artifacts() {
        if artifacts.rare_exts.contains(&ext_with_dot) {
            "__rare__".to_string()
        } else {
            ext_with_dot.clone()
        }
    } else {
        ext_with_dot.clone()
    };

    let ext_encoded = get_ml_artifacts()
        .and_then(|a| a.ext_encoder.get(&ext_clean).copied())
        .or_else(|| get_ml_artifacts().and_then(|a| a.ext_encoder.get("__rare__").copied()))
        .unwrap_or(0) as f32;

    let now = SystemTime::now().duration_since(UNIX_EPOCH).unwrap_or_default().as_secs_f64();
    let modified = metadata.modified().ok()
        .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_secs_f64())
        .unwrap_or(now);
    let accessed = metadata.accessed().ok()
        .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_secs_f64())
        .unwrap_or(now);

    let days_since_modified = ((now - modified) / 86400.0).max(0.0) as f32;
    let days_since_accessed = ((now - accessed) / 86400.0).max(0.0) as f32;
    let file_size_bytes = metadata.len() as f32;

    #[cfg(target_os = "windows")]
    let attrs = std::os::windows::fs::MetadataExt::file_attributes(metadata);
    #[cfg(not(target_os = "windows"))]
    let attrs = 0u32;
    let is_hidden = if attrs & 0x2 != 0 { 1.0 } else { 0.0 };
    let is_system = if attrs & 0x4 != 0 { 1.0 } else { 0.0 };

    let lower_path = path.to_lowercase();
    let lower_name = name.to_lowercase();

    let has_version_info = if lower_name.ends_with(".exe") || lower_name.ends_with(".dll") { 1.0 } else { 0.0 };
    let name_length = name.len() as f32;
    let is_personal_space = if ["userdata", "documents", "desktop", "appdata"].iter().any(|p| lower_path.contains(p)) { 1.0 } else { 0.0 };
    let is_app_dependency = if ["program files", "riot games", "steamapps", "epic games", "xboxgames"].iter().any(|p| lower_path.contains(p))
        && [".dll", ".pak", ".wad", ".vpk", ".assets", ".bin", ".dat"].contains(&ext_with_dot.as_str()) { 1.0 } else { 0.0 };
    let is_in_system32 = if lower_path.contains("system32") { 1.0 } else { 0.0 };
    let is_temp_folder = if lower_path.contains("temp") || lower_path.contains("tmp") { 1.0 } else { 0.0 };
    let is_downloads = if lower_path.contains("downloads") || lower_path.contains("indirilenler") { 1.0 } else { 0.0 };
    let folder_depth = path.matches(std::path::MAIN_SEPARATOR).count() as f32;

    [
        ext_encoded,
        days_since_modified,
        days_since_accessed,
        file_size_bytes,
        is_hidden,
        is_system,
        has_version_info,
        name_length,
        is_personal_space,
        is_app_dependency,
        is_in_system32,
        is_temp_folder,
        is_downloads,
        folder_depth,
    ]
}

fn calculate_risk_ml(name: &str, extension: &str, path: &str, metadata: &fs::Metadata, lang: &str) -> (u8, String) {
    let Some(artifacts) = get_ml_artifacts() else {
        let (legacy_score, legacy_reason) = calculate_risk(name, extension, path, metadata.len(), None);
        return (legacy_score, format!("Legacy fallback: {}", legacy_reason));
    };

    let features = extract_features(path, name, extension, metadata);
    let probability = predict_xgb_probability(&artifacts.trees, &features);
    let score = (probability.clamp(0.0, 1.0) * 100.0).round() as u8;
    let lower_path = path.to_lowercase();
    let lower_ext = extension.to_lowercase();

    let mut reasons: Vec<&str> = Vec::new();
    if lower_path.contains("\\windows\\system32\\") || lower_path.contains("\\windows\\syswow64\\") {
        reasons.push(if lang == "en" { "located in System32/SysWOW64" } else { "System32/SysWOW64 konumunda" });
    } else if lower_path.contains("\\windows\\") {
        reasons.push(if lang == "en" { "inside Windows directory" } else { "Windows klasöründe" });
    } else if lower_path.contains("\\program files\\") || lower_path.contains("\\program files (x86)\\") {
        reasons.push(if lang == "en" { "under Program Files" } else { "Program Files altında" });
    }

    if ["exe", "dll", "sys", "bat", "cmd", "ps1", "reg", "msi"].contains(&lower_ext.as_str()) {
        reasons.push(if lang == "en" { "critical/executable extension" } else { "kritik/çalıştırılabilir uzantı" });
    } else if ["tmp", "log", "cache", "old", "bak"].contains(&lower_ext.as_str()) {
        reasons.push(if lang == "en" { "temporary/log-type extension" } else { "geçici/log türü uzantı" });
    }

    let now = SystemTime::now().duration_since(UNIX_EPOCH).unwrap_or_default().as_secs();
    if let Some(last_accessed) = metadata
        .accessed()
        .ok()
        .and_then(|t| t.duration_since(UNIX_EPOCH).ok())
        .map(|d| d.as_secs())
    {
        let days = now.saturating_sub(last_accessed) / 86400;
        if days <= 7 {
            reasons.push(if lang == "en" { "accessed in last 7 days" } else { "son 7 günde erişilmiş" });
        } else if days >= 365 {
            reasons.push(if lang == "en" { "not accessed for a long time" } else { "uzun süredir erişilmemiş" });
        }
    }

    if metadata.len() == 0 {
        reasons.push(if lang == "en" { "file size is 0" } else { "dosya boyutu 0" });
    } else if metadata.len() < 1024 {
        reasons.push(if lang == "en" { "very small file" } else { "çok küçük dosya" });
    }

    if lower_path.contains("\\temp\\") || lower_path.contains("\\tmp\\") {
        reasons.push(if lang == "en" { "in temporary folder" } else { "geçici klasörde" });
    }
    if lower_path.contains("\\downloads\\") || lower_path.contains("\\indirilenler\\") {
        reasons.push(if lang == "en" { "in Downloads folder" } else { "indirilenler klasöründe" });
    }

    let bucket = if score >= 70 {
        if lang == "en" { "high risk" } else { "yüksek risk" }
    } else if score >= 40 {
        if lang == "en" { "medium risk" } else { "orta risk" }
    } else {
        if lang == "en" { "low risk" } else { "düşük risk" }
    };

    let detail = if reasons.is_empty() {
        if lang == "en" { "no strong signal" } else { "belirgin sinyal yok" }.to_string()
    } else {
        reasons.into_iter().take(3).collect::<Vec<_>>().join(", ")
    };

    (score, format!("ML {}: {}", bucket, detail))
}

#[tauri::command]
fn list_directory(path: String, lang: Option<String>) -> Result<Vec<FileItem>, String> {
    let lang = lang.unwrap_or_else(|| "tr".to_string());
    let entries = fs::read_dir(&path).map_err(|e| e.to_string())?;
    let mut items: Vec<FileItem> = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let metadata = entry.metadata().map_err(|e| e.to_string())?;
        let name = entry.file_name().to_string_lossy().to_string();
        let full_path = entry.path().to_string_lossy().to_string();
        let is_dir = metadata.is_dir();
        let size = if is_dir {
            get_dir_size(&full_path)
        } else {
            metadata.len()
        };
        let extension = Path::new(&name)
            .extension()
            .unwrap_or_default()
            .to_string_lossy()
            .to_lowercase()
            .to_string();

        let last_accessed = metadata
            .accessed()
            .ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_secs());

        let last_modified = metadata
            .modified()
            .ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_secs());

        let (risk_score, risk_reason) = if is_dir {
            get_dir_risk_from_children(&full_path, &lang)
        } else {
            calculate_risk_ml(&name, &extension, &full_path, &metadata, &lang)
        };

        items.push(FileItem {
            name,
            path: full_path,
            is_dir,
            size,
            extension,
            last_accessed,
            last_modified,
            risk_score,
            risk_reason,
        });
    }

    items.sort_by(|a, b| {
        b.is_dir
            .cmp(&a.is_dir)
            .then(a.name.to_lowercase().cmp(&b.name.to_lowercase()))
    });

    Ok(items)
}

#[tauri::command]
fn delete_file(path: String) -> Result<(), String> {
    trash::delete(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_home_dir() -> String {
    dirs::home_dir()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string()
}
#[tauri::command]
async fn pick_folder(app: tauri::AppHandle) -> Option<String> {
    use tauri_plugin_dialog::DialogExt;
    let (tx, rx) = std::sync::mpsc::channel();
    app.dialog().file().pick_folder(move |f| {
        let _ = tx.send(f);
    });
    rx.recv().ok().flatten().map(|p| p.to_string())
}
#[tauri::command]
async fn open_in_explorer(path: String, app: tauri::AppHandle) -> Result<(), String> {
    use tauri_plugin_opener::OpenerExt;
    let parent = std::path::Path::new(&path)
        .parent()
        .unwrap_or(std::path::Path::new(&path))
        .to_string_lossy()
        .to_string();
    app.opener().open_path(parent, None::<&str>).map_err(|e| e.to_string())
}

#[tauri::command]
async fn open_file(path: String, app: tauri::AppHandle) -> Result<(), String> {
    use tauri_plugin_opener::OpenerExt;
    app.opener().open_path(&path, None::<&str>).map_err(|e| e.to_string())
}

#[tauri::command]
fn read_text_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_image_thumbnail(path: String) -> Result<String, String> {
    let data = fs::read(&path).map_err(|e| e.to_string())?;
    Ok(base64_encode(&data))
}

#[tauri::command(async)]
fn find_duplicates(path: String, app: tauri::AppHandle, excluded_paths: Vec<String>, lang: Option<String>) -> Result<Vec<Vec<FileItem>>, String> {
    use std::collections::HashMap;
    let lang = lang.unwrap_or_else(|| "tr".to_string());
    
    let _ = app.emit("dup-progress", serde_json::json!({ "stage": "collect", "current": 0, "total": 0 }));
    
    let mut all_files: Vec<FileItem> = Vec::new();
    collect_files(&path, &mut all_files, &excluded_paths, &lang);
    
    let total = all_files.len();
    let _ = app.emit("dup-progress", serde_json::json!({ "stage": "hash", "current": 0, "total": total }));

    let mut size_map: HashMap<u64, Vec<FileItem>> = HashMap::new();
    for file in all_files {
        size_map.entry(file.size).or_default().push(file);
    }
    
    use std::sync::{Arc, Mutex};
    use std::sync::atomic::{AtomicUsize, Ordering};

    let hash_map: Arc<Mutex<HashMap<String, Vec<FileItem>>>> = Arc::new(Mutex::new(HashMap::new()));
    let processed = Arc::new(AtomicUsize::new(0));

    let candidate_files: Vec<FileItem> = size_map
        .into_values()
        .filter(|v| v.len() >= 2)
        .flatten()
        .collect();

    candidate_files.into_par_iter().for_each(|file| {
        let data = match fs::read(&file.path) {
            Ok(d) => d,
            Err(_) => {
                processed.fetch_add(1, Ordering::Relaxed);
                return;
            }
        };
        let hash = format!("{:x}", md5::compute(&data));
        let mut map = hash_map.lock().unwrap();
        map.entry(hash).or_default().push(file);
        let current = processed.fetch_add(1, Ordering::Relaxed) + 1;
        if current % 50 == 0 {
            let _ = app.emit("dup-progress", serde_json::json!({ "stage": "hash", "current": current, "total": total }));
        }
    });

    let hash_map = Arc::try_unwrap(hash_map).unwrap().into_inner().unwrap();
    
    let _ = app.emit("dup-progress", serde_json::json!({ "stage": "done", "current": total, "total": total }));

    let duplicates: Vec<Vec<FileItem>> = hash_map
        .into_values()
        .filter(|v| v.len() > 1)
        .collect();
    
    Ok(duplicates)
}

fn is_system_path(path: &str) -> bool {
    let lower = path.to_lowercase();
    let system_paths = [
        "\\windows\\",
        "\\program files\\",
        "\\program files (x86)\\",
        "\\appdata\\local\\microsoft\\",
        "\\appdata\\roaming\\microsoft\\",
        "\\appdata\\local\\temp\\",
        "\\appdata\\local\\packages\\",
        "\\appdata\\local\\temp\\",
        "\\appdata\\locallow\\",
        "\\programdata\\microsoft\\",
        "\\programdata\\package cache\\",
        "\\system32\\",
        "\\syswow64\\",
        "\\winsxs\\",
        "\\servicing\\",
        "\\node_modules\\",
        "\\.git\\",
        "\\__pycache__\\",
        "\\steam\\steamapps\\common\\",
        "\\epic games\\",
        "\\riot games\\",
        "\\appdata\\local\\discord\\",
        "\\appdata\\local\\google\\chrome\\",
        "\\appdata\\local\\microsoft\\edge\\",
        "\\appdata\\roaming\\spotify\\",
        "\\appdata\\local\\slack\\",
    ];
    system_paths.iter().any(|p| lower.contains(p))
}

fn calculate_risk(name: &str, extension: &str, path: &str, size: u64, last_accessed: Option<u64>) -> (u8, String) {
    let name_lower = name.to_lowercase();
    let path_lower = path.to_lowercase();
    let mut score: i32 = 0;
    let mut reasons: Vec<String> = Vec::new();

    // --- KRİTİK İSİMLER (dokunulmaması gerekenler) ---
    let critical_names = [
        "ntoskrnl", "hal", "bootmgr", "winload", "winresume",
        "ntldr", "boot.ini", "bootsect", "mbr",
    ];
    if critical_names.iter().any(|n| name_lower.contains(n)) {
        return (100, "Kritik Windows sistem dosyası, kesinlikle silmeyin".to_string());
    }

    // --- ÇOK RİSKLİ İSİMLER ---
    let very_risky_names = [
        "explorer", "taskmgr", "svchost", "lsass", "csrss",
        "winlogon", "services", "smss", "wininit", "dwm",
        "rundll32", "regsvr32", "msiexec", "dllhost", "conhost",
        "spoolsv", "audiodg", "fontdrvhost", "sihost", "ctfmon",
    ];
    if very_risky_names.iter().any(|n| name_lower == format!("{}.exe", n) || name_lower == *n) {
        score += 90;
        reasons.push("Kritik Windows işlem dosyası".to_string());
    }

    // --- UZANTI BAZLI RİSK ---
    let ext_score: i32 = match extension {
        "sys" | "drv"                           => { reasons.push("Sistem sürücüsü".to_string()); 90 },
        "dll"                                   => { reasons.push("Sistem kütüphanesi".to_string()); 80 },
        "ocx" | "cpl" | "scr"                  => { reasons.push("Windows bileşeni".to_string()); 85 },
        "reg"                                   => { reasons.push("Registry dosyası".to_string()); 85 },
        "bat" | "cmd" | "ps1" | "vbs" | "wsf" | "hta" => { reasons.push("Sistem scripti".to_string()); 75 },
        "exe"                                   => { reasons.push("Çalıştırılabilir dosya".to_string()); 65 },
        "msi" | "msix" | "appx"                => { reasons.push("Kurulum dosyası".to_string()); 60 },
        "pyd" | "pyc"                           => { reasons.push("Python modülü".to_string()); 70 },
        "jar"                                   => { reasons.push("Java bileşeni".to_string()); 55 },
        "so" | "dylib"                          => { reasons.push("Paylaşımlı kütüphane".to_string()); 75 },
        "dat" | "db" | "sqlite" | "sqlite3"    => { reasons.push("Uygulama veritabanı".to_string()); 60 },
        "cfg" | "conf" | "config"               => { reasons.push("Konfigürasyon dosyası".to_string()); 55 },
        "ini"                                   => { reasons.push("Ayar dosyası".to_string()); 50 },
        "lnk"                                   => { reasons.push("Kısayol dosyası".to_string()); 35 },
        "tmp" | "temp"                          => { reasons.push("Geçici dosya".to_string()); 5 },
        "log"                                   => { reasons.push("Log dosyası".to_string()); 10 },
        "bak" | "old"                           => { reasons.push("Yedek dosya".to_string()); 15 },
        "zip" | "rar" | "7z" | "tar" | "gz"    => { 15 },
        "jpg" | "jpeg" | "png" | "gif" | "webp" | "bmp" => { 5 },
        "mp4" | "mov" | "avi" | "mkv" | "webm" => { 5 },
        "mp3" | "wav" | "flac" | "aac" | "ogg" => { 5 },
        "pdf" | "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" => { 8 },
        "txt" | "md" | "rtf"                    => { 5 },
        "iso" | "img" | "vhd" | "vmdk"         => { reasons.push("Disk imajı".to_string()); 40 },
        "pfx" | "cer" | "key" | "pem"          => { reasons.push("Sertifika/anahtar dosyası".to_string()); 80 },
        _                                       => { 20 },
    };
    score += ext_score;

    // --- KONUM BAZLI RİSK ---
    let location_modifier: i32 = if path_lower.contains("\\windows\\system32\\") || path_lower.contains("\\windows\\syswow64\\") {
        reasons.push("System32 klasöründe".to_string()); 40
    } else if path_lower.contains("\\windows\\") {
        reasons.push("Windows klasöründe".to_string()); 30
    } else if path_lower.contains("\\program files\\") || path_lower.contains("\\program files (x86)\\") {
        reasons.push("Program klasöründe".to_string()); 20
    } else if path_lower.contains("\\appdata\\roaming\\") {
        reasons.push("Uygulama verisi klasöründe".to_string()); 15
    } else if path_lower.contains("\\appdata\\local\\temp\\") || path_lower.contains("\\temp\\") {
        reasons.push("Geçici klasörde".to_string()); -30
    } else if path_lower.contains("\\indirilenler\\") || path_lower.contains("\\downloads\\") {
        reasons.push("İndirilenler klasöründe".to_string()); -20
    } else if path_lower.contains("\\desktop\\") || path_lower.contains("\\masaüstü\\") {
        -10
    } else if path_lower.contains("\\belgeler\\") || path_lower.contains("\\documents\\") ||
              path_lower.contains("\\resimler\\") || path_lower.contains("\\pictures\\") ||
              path_lower.contains("\\müzik\\") || path_lower.contains("\\music\\") ||
              path_lower.contains("\\videolar\\") || path_lower.contains("\\videos\\") {
        -15
    } else {
        0
    };
    score += location_modifier;

    // --- İSİM İÇERİĞİ BAZLI RİSK ---
    if name_lower.contains("setup") || name_lower.contains("install") {
        score += 15;
        reasons.push("Kurulum dosyası olabilir".to_string());
    }
    if name_lower.contains("uninstall") {
        score += 10;
    }
    if name_lower.contains("update") || name_lower.contains("patch") {
        score += 10;
        reasons.push("Güncelleme dosyası".to_string());
    }
    if name_lower.contains("backup") || name_lower.contains("yedek") {
        score -= 10;
        reasons.push("Yedek dosya".to_string());
    }
    if name_lower.contains("temp") || name_lower.contains("tmp") || name_lower.contains("cache") {
        score -= 20;
        reasons.push("Geçici/önbellek dosyası".to_string());
    }
    if name_lower.contains("log") || name_lower.ends_with(".log") {
        score -= 15;
    }
    if name_lower == "desktop.ini" || name_lower == "thumbs.db" {
        score -= 10;
        reasons.push("Windows meta dosyası".to_string());
    }

    // --- SON ERİŞİM TARİHİ ---
    if let Some(accessed) = last_accessed {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs();
        let days = (now.saturating_sub(accessed)) / 86400;
        if days < 7 {
            score += 20;
            reasons.push("Son 1 haftada kullanıldı".to_string());
        } else if days < 30 {
            score += 10;
            reasons.push("Son 1 ayda kullanıldı".to_string());
        } else if days > 730 {
            score -= 20;
            reasons.push("2 yıldan fazladır kullanılmadı".to_string());
        } else if days > 365 {
            score -= 10;
            reasons.push("1 yıldan fazladır kullanılmadı".to_string());
        }
    }

    // --- BOYUT BAZLI RİSK ---
    if size < 1024 && (extension == "dll" || extension == "sys" || extension == "exe") {
        score += 15;
        reasons.push("Çok küçük sistem dosyası".to_string());
    }

    // Skoru 0-100 arasında tut
    let final_score = score.clamp(0, 100) as u8;
    
    let reason = if reasons.is_empty() {
        "Standart dosya".to_string()
    } else {
        reasons.join(", ")
    };

    (final_score, reason)
}

fn collect_files(path: &str, files: &mut Vec<FileItem>, excluded_paths: &[String], lang: &str) {
    if is_system_path(path) { return; }
    
    let lower = path.to_lowercase();
    if excluded_paths.iter().any(|p| lower.contains(&p.to_lowercase())) { return; }

    let entries = match fs::read_dir(path) {
        Ok(e) => e,
        Err(_) => return,
    };
    
    for entry in entries.flatten() {
        let metadata = match entry.metadata() {
            Ok(m) => m,
            Err(_) => continue,
        };
        
        let full_path = entry.path().to_string_lossy().to_string();

        if metadata.is_dir() {
            if !is_system_path(&full_path) {
                collect_files(&full_path, files, excluded_paths, lang);
            }
            continue;
        }
        
        let size = metadata.len();
        if size == 0 || size > 500 * 1024 * 1024 { continue; }
        
        let name = entry.file_name().to_string_lossy().to_string();
        let extension = Path::new(&name)
            .extension()
            .unwrap_or_default()
            .to_string_lossy()
            .to_lowercase()
            .to_string();

        let last_accessed = metadata.accessed().ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_secs());

        let last_modified = metadata.modified().ok()
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_secs());


        let (risk_score, risk_reason) = calculate_risk_ml(&name, &extension, &full_path, &metadata, lang);

        files.push(FileItem {
            name,
            path: full_path,
            is_dir: false,
            size,
            extension,
            last_accessed,
            last_modified,
            risk_score,
            risk_reason,
        });
    }
}

fn base64_encode(data: &[u8]) -> String {
    use std::fmt::Write;
    const CHARS: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut out = String::new();
    let mut i = 0;
    while i < data.len() {
        let b0 = data[i] as u32;
        let b1 = if i+1 < data.len() { data[i+1] as u32 } else { 0 };
        let b2 = if i+2 < data.len() { data[i+2] as u32 } else { 0 };
        let _ = write!(out, "{}{}{}{}", 
            CHARS[((b0 >> 2) & 0x3F) as usize] as char,
            CHARS[(((b0 & 0x3) << 4) | (b1 >> 4)) as usize] as char,
            if i+1 < data.len() { CHARS[(((b1 & 0xF) << 2) | (b2 >> 6)) as usize] as char } else { '=' },
            if i+2 < data.len() { CHARS[(b2 & 0x3F) as usize] as char } else { '=' }
        );
        i += 3;
    }
    out
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![list_directory, delete_file, get_home_dir, get_risk_engine_status, pick_folder, open_in_explorer, get_image_thumbnail, open_file, read_text_file, find_duplicates])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
