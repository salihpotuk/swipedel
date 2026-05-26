let currentLang = localStorage.getItem('lang') || 'tr';

const STRINGS = {
  tr: {
    appName: 'SwipeDel',
    appSub: 'Temizlemek istediğin klasörü seç',
    selectFolder: '📁 Klasör Seç',
    startHome: '🏠 Ana Klasörden Başla',
    loadingHome: 'Ana klasör yükleniyor...',
    loadingFolder: 'Klasör yükleniyor...',
    settings: '⚙️ Ayarlar',
    themeLabel: 'TEMA',
    keep: '✅ Tut',
    delete: '🗑 Sil',
    enter: '📂 Gir',
    back: '⬅ Geri',
    kept: 'tutuldu',
    deleted: 'silindi',
    remaining: 'kaldı',
    searchPlaceholder: 'Dosya ara...',
    filterAll: '🗂 Hepsi',
    filterFolder: '📁 Klasör',
    filterImage: '🖼 Görsel',
    filterVideo: '🎬 Video',
    filterAudio: '🎵 Ses',
    filterDoc: '📄 Belge',
    filterCode: '💻 Kod',
    filterArchive: '🗜 Arşiv',
    sortName: 'İsim',
    sortSize: 'Boyut',
    sortAccessed: 'Son Erişim',
    sortModified: 'Son Değişiklik',
    lastAccessedLabel: 'Son erişim',
    lastModifiedLabel: 'Son değişiklik',
    hintKeep: 'Tut',
    hintEnter: 'Klasöre Gir',
    hintDelete: 'Sil',
    hintBack: 'Geri Dön',
    queueCount: (n) => `🗑️ ${n} dosya silinecek`,
    queueView: 'Listeyi Gör',
    queueDeleteAll: 'Hepsini Sil',
    panelTitle: 'Silinecekler',
    panelEmpty: 'Liste boş',
    rescue: 'Kurtar',
    confirmMsg: 'Dosyalar geri dönüşüm kutusuna taşınacak. Devam etmek istiyor musun?',
    confirmYes: 'Evet, Taşı',
    confirmNo: 'İptal',
    emptyState: 'Bu klasör işlendi!',
    riskSafe: 'Güvenli',
    riskWarning: 'Dikkatli',
    riskDanger: 'Riskli',
    toastKept: (name) => `✅ ${name} tutuldu`,
    toastQueued: (name) => `🗑️ ${name} kuyruğa eklendi`,
    toastRescued: (name) => `♻️ ${name} kurtarıldı`,
    toastUndo: (name) => `↩️ Geri alındı: ${name}`,
    toastBack: '⬅️ Önceki klasöre dönüldü',
    toastNoUndo: 'Geri alınacak işlem yok',
    settingsTitle: '⚙️ Ayarlar',
    settingsSoundTitle: '🔊 Ses Ayarları',
    settingsMusic: '🎮 Arkaplan Müziği',
    settingsMusicVol: 'Müzik Ses Seviyesi',
    settingsSfx: '🔔 Ses Efektleri',
    settingsSfxVol: 'Efekt Ses Seviyesi',
    settingsExcluded: 'Hariç Tutulan Sistem Klasörleri',
    settingsExcludedDesc: 'Bu klasörler yinelenen dosya taramasında atlanır.',
    settingsCustom: 'Özel Hariç Tutulan Klasörler',
    settingsCustomDesc: 'Kendi klasörlerini ekle.',
    settingsCustomPlaceholder: 'Örn: \\backup\\',
    settingsAdd: 'Ekle',
    settingsLang: 'Dil / Language',
    settingsMenuSound: 'Ses Ayarları',
    settingsMenuDup: 'Kopya Dosya Kontrolü',
    settingsMenuShortcuts: 'Kısayollar',
    settingsShortcutsTitle: 'Klavye Kısayolları',
    shortcutKeep: 'Dosyayı tut',
    shortcutQueueDelete: 'Dosyayı silme kuyruğuna ekle',
    shortcutEnterFolder: 'Klasöre gir',
    shortcutGoBack: 'Önceki klasöre dön',
    shortcutPreviewOpen: 'Önizleme aç',
    shortcutPreviewClose: 'Önizleme kapat',
    shortcutUndo: 'Son işlemi geri al',
    shortcutConfirmDelete: 'Silmeyi onayla',
    shortcutCloseDialogs: 'Pencereleri kapat',
    settingsMenuAppearance: 'Görünüm ve Dil',
    settingsMenuGuide: 'Kullanım Rehberi',
    settingsMenuBackup: 'Yedek Rapor',
    settingsMenuAccessibility: 'Erişilebilirlik',
    settingsMode: 'Görünüm Modu',
    modeDark: 'Koyu',
    modeLight: 'Açık',
    settingsTheme: 'Tema',
    settingsLanguage: 'Dil',
    settingsGuideTitle: 'Kullanım Rehberi',
    settingsGuideDontShow: 'Açılışta tekrar gösterme',
    settingsGuideOpen: 'Rehberi tekrar aç',
    onboardingTitle: 'Hızlı Kullanım Rehberi',
    onboardingStep1: '← Tut, → Sil kuyruğuna ekle',
    onboardingStep2: '↑ Klasöre gir, ↓ geri dön',
    onboardingStep3: 'Z ile geri al, Ctrl+↑ ile önizle',
    onboardingStep4: 'Filtreler: Dosya tipine göre daralt',
    onboardingStep5: 'Sıralama: İsim, boyut, erişim, değişiklik',
    onboardingStep6: 'Ara: Üstteki arama kutusundan hızlı bul',
    onboardingStep7: 'Risk rozeti: Tıklayıp nedenini gör',
    onboardingStep8: 'Ayarlar: Tema/dil/ses/erişilebilirlik/kısayollar',
    onboardingStep9: 'Kopya kontrolü: Yinelenenleri toplu temizle',
    onboardingStep10: 'Silme listesi: Listeyi gör, tek tek kurtar, toplu taşı',
    onboardingClose: 'Tamam',
    queueMoveTitle: (n) => `${n} dosya geri dönüşüm kutusuna taşınacak`,
    a11yLargeText: 'Büyük yazı modu',
    a11yHighContrast: 'Yüksek kontrast',
    a11yReducedMotion: 'Animasyonları azalt',
    a11yColorAssist: 'Renk körlüğü desteği',
    dupEta: (s) => `Tahmini kalan: ${s} sn`,
    backupTitle: 'Silme Raporu',
    backupEmpty: 'Henüz silme kaydı yok',
    backupExport: 'Raporu Dışa Aktar',
    backupClear: 'Kayıtları Temizle',
    backupExported: 'Rapor dışa aktarıldı',
    quitTitle: 'Çıkmak istediğine emin misin?',
    quitYes: 'Evet, Çık',
    quitNo: 'İptal',
    dupTitle: '🔍 Yinelenen Dosyalar',
    dupScanning: '⏳ Dosyalar taranıyor...',
    dupPreparing: 'Hazırlanıyor...',
    dupListing: 'Dosyalar listeleniyor...',
    dupDone: 'Tamamlandı!',
    dupEmpty: '✅ Yinelenen dosya bulunamadı!',
    dupWaste: (size) => `Bu gruptan ${size} boşaltılabilir`,
    dupOriginal: 'Orijinal',
    dupDeleteGroup: 'Bu Gruptaki Kopyaları Sil (Orijinal Hariç)',
    dupAllCleaned: '✅ Tüm kopyalar temizlendi!',
    progressItems: (n) => `${n} öğe`,
    swipeKeep: '✅ Tut',
    swipeDelete: '🗑️ Kuyruğa Ekle',
    swipeEnter: '📂 Gir',
    musicOn: '🎮 Müzik: Açık',
    musicOff: '🎮 Müzik: Kapalı',
    errReadFolder: 'Klasör okunamadı',
    errOpenLocation: 'Konum açılamadı',
    errOpenFile: 'Dosya açılamadı',
    errReadFile: 'Dosya okunamadı',
    errLoadImage: 'Görüntü yüklenemedi',
    errGeneric: 'Hata',
    toastDeleted: '🗑️ Silindi',
    toastCopiesDeleted: '✅ Kopyalar silindi',
    ctxPreview: '👁 Önizle',
    ctxOpenFile: '🚀 Dosyayı Aç',
    ctxOpenLocation: '📂 Konumu Aç',
    ctxClose: '✕ Kapat',
    badgeFolder: 'Klasör',
    badgeImage: 'Görsel',
    badgeVideo: 'Video',
    badgeAudio: 'Ses',
    badgeDoc: 'Belge',
    badgeCode: 'Kod',
    badgeArchive: 'Arşiv',
    badgeFile: 'Dosya',
    dupGroupSuffix: 'grup',
    dupRisky: '⚠️ Riskli',
    dupCaution: '⚠️ Dikkatli',
    unknownDate: 'Bilinmiyor',
    timeJustNow: 'Az önce',
    timeMinuteAgo: (n) => `${n} dakika önce`,
    timeHourAgo: (n) => `${n} saat önce`,
    timeDayAgo: (n) => `${n} gün önce`,
    timeWeekAgo: (n) => `${n} hafta önce`,
    timeMonthAgo: (n) => `${n} ay önce`,
    timeYearAgo: (n) => `${n} yıl önce`,
    queueWillFree: (size) => `${size} boşalacak`,
    themePink: 'Pembe',
    themeDark: 'Karanlık',
    themeLight: 'Beyaz',
    themeTeal: 'Turkuaz',
    themeOcean: 'Okyanus',
    themeSunset: 'Güneş Batımı',
    themeForest: 'Orman',
    langTr: '🇹🇷 Türkçe',
    langEn: '🇬🇧 English',
  },
  en: {
    appName: 'SwipeDel',
    appSub: 'Select the folder you want to clean',
    selectFolder: '📁 Select Folder',
    startHome: '🏠 Start from Home',
    loadingHome: 'Loading home folder...',
    loadingFolder: 'Loading folder...',
    settings: '⚙️ Settings',
    themeLabel: 'THEME',
    keep: '✅ Keep',
    delete: '🗑 Delete',
    enter: '📂 Enter',
    back: '⬅ Back',
    kept: 'kept',
    deleted: 'deleted',
    remaining: 'remaining',
    searchPlaceholder: 'Search files...',
    filterAll: '🗂 All',
    filterFolder: '📁 Folder',
    filterImage: '🖼 Image',
    filterVideo: '🎬 Video',
    filterAudio: '🎵 Audio',
    filterDoc: '📄 Document',
    filterCode: '💻 Code',
    filterArchive: '🗜 Archive',
    sortName: 'Name',
    sortSize: 'Size',
    sortAccessed: 'Last Access',
    sortModified: 'Last Modified',
    lastAccessedLabel: 'Last accessed',
    lastModifiedLabel: 'Last modified',
    hintKeep: 'Keep',
    hintEnter: 'Enter Folder',
    hintDelete: 'Delete',
    hintBack: 'Go Back',
    queueCount: (n) => `🗑️ ${n} files to delete`,
    queueView: 'View List',
    queueDeleteAll: 'Delete All',
    panelTitle: 'To Delete',
    panelEmpty: 'List is empty',
    rescue: 'Rescue',
    confirmMsg: 'Files will be moved to Recycle Bin. Do you want to continue?',
    confirmYes: 'Yes, Move',
    confirmNo: 'Cancel',
    emptyState: 'This folder is done!',
    riskSafe: 'Safe',
    riskWarning: 'Caution',
    riskDanger: 'Risky',
    toastKept: (name) => `✅ ${name} kept`,
    toastQueued: (name) => `🗑️ ${name} added to queue`,
    toastRescued: (name) => `♻️ ${name} rescued`,
    toastUndo: (name) => `↩️ Undone: ${name}`,
    toastBack: '⬅️ Returned to previous folder',
    toastNoUndo: 'Nothing to undo',
    settingsTitle: '⚙️ Settings',
    settingsSoundTitle: '🔊 Sound Settings',
    settingsMusic: '🎮 Background Music',
    settingsMusicVol: 'Music Volume',
    settingsSfx: '🔔 Sound Effects',
    settingsSfxVol: 'Effects Volume',
    settingsExcluded: 'Excluded System Folders',
    settingsExcludedDesc: 'These folders are skipped during duplicate scan.',
    settingsCustom: 'Custom Excluded Folders',
    settingsCustomDesc: 'Add your own folders.',
    settingsCustomPlaceholder: 'e.g. \\backup\\',
    settingsAdd: 'Add',
    settingsLang: 'Dil / Language',
    settingsMenuSound: 'Sound Settings',
    settingsMenuDup: 'Duplicate File Control',
    settingsMenuShortcuts: 'Shortcuts',
    settingsShortcutsTitle: 'Keyboard Shortcuts',
    shortcutKeep: 'Keep file',
    shortcutQueueDelete: 'Queue file for deletion',
    shortcutEnterFolder: 'Enter folder',
    shortcutGoBack: 'Go back to previous folder',
    shortcutPreviewOpen: 'Open preview',
    shortcutPreviewClose: 'Close preview',
    shortcutUndo: 'Undo last action',
    shortcutConfirmDelete: 'Confirm delete',
    shortcutCloseDialogs: 'Close dialogs',
    settingsMenuAppearance: 'Appearance & Language',
    settingsMenuGuide: 'Usage Guide',
    settingsMenuBackup: 'Backup Report',
    settingsMenuAccessibility: 'Accessibility',
    settingsMode: 'Display Mode',
    modeDark: 'Dark',
    modeLight: 'Light',
    settingsTheme: 'Theme',
    settingsLanguage: 'Language',
    settingsGuideTitle: 'Usage Guide',
    settingsGuideDontShow: 'Do not show on startup',
    settingsGuideOpen: 'Open guide again',
    onboardingTitle: 'Quick Start Guide',
    onboardingStep1: '← Keep, → Add to delete queue',
    onboardingStep2: '↑ Enter folder, ↓ Go back',
    onboardingStep3: 'Z to undo, Ctrl+↑ to preview',
    onboardingStep4: 'Filters: Narrow down by file type',
    onboardingStep5: 'Sort: Name, size, access, modified',
    onboardingStep6: 'Search: Find files quickly from top bar',
    onboardingStep7: 'Risk badge: Click to see reason',
    onboardingStep8: 'Settings: Theme/language/sound/accessibility/shortcuts',
    onboardingStep9: 'Duplicate scan: Clean repeated files in bulk',
    onboardingStep10: 'Delete queue: Review, rescue items, then move all',
    onboardingClose: 'Done',
    queueMoveTitle: (n) => `${n} files will be moved to Recycle Bin`,
    a11yLargeText: 'Large text mode',
    a11yHighContrast: 'High contrast',
    a11yReducedMotion: 'Reduce motion',
    a11yColorAssist: 'Color-blind support',
    dupEta: (s) => `Estimated remaining: ${s}s`,
    backupTitle: 'Deletion Report',
    backupEmpty: 'No deletion record yet',
    backupExport: 'Export Report',
    backupClear: 'Clear Records',
    backupExported: 'Report exported',
    quitTitle: 'Are you sure you want to quit?',
    quitYes: 'Yes, Quit',
    quitNo: 'Cancel',
    dupTitle: '🔍 Duplicate Files',
    dupScanning: '⏳ Scanning files...',
    dupPreparing: 'Preparing...',
    dupListing: 'Listing files...',
    dupDone: 'Done!',
    dupEmpty: '✅ No duplicates found!',
    dupWaste: (size) => `${size} can be freed from this group`,
    dupOriginal: 'Original',
    dupDeleteGroup: 'Delete Copies in This Group (Keep Original)',
    dupAllCleaned: '✅ All copies cleaned!',
    progressItems: (n) => `${n} items`,
    swipeKeep: '✅ Keep',
    swipeDelete: '🗑️ Add to Queue',
    swipeEnter: '📂 Enter',
    musicOn: '🎮 Music: On',
    musicOff: '🎮 Music: Off',
    errReadFolder: 'Failed to read folder',
    errOpenLocation: 'Failed to open location',
    errOpenFile: 'Failed to open file',
    errReadFile: 'Failed to read file',
    errLoadImage: 'Failed to load image',
    errGeneric: 'Error',
    toastDeleted: '🗑️ Deleted',
    toastCopiesDeleted: '✅ Copies deleted',
    ctxPreview: '👁 Preview',
    ctxOpenFile: '🚀 Open File',
    ctxOpenLocation: '📂 Open Location',
    ctxClose: '✕ Close',
    badgeFolder: 'Folder',
    badgeImage: 'Image',
    badgeVideo: 'Video',
    badgeAudio: 'Audio',
    badgeDoc: 'Document',
    badgeCode: 'Code',
    badgeArchive: 'Archive',
    badgeFile: 'File',
    dupGroupSuffix: 'group',
    dupRisky: '⚠️ Risky',
    dupCaution: '⚠️ Caution',
    unknownDate: 'Unknown',
    timeJustNow: 'Just now',
    timeMinuteAgo: (n) => `${n} minute${n === 1 ? '' : 's'} ago`,
    timeHourAgo: (n) => `${n} hour${n === 1 ? '' : 's'} ago`,
    timeDayAgo: (n) => `${n} day${n === 1 ? '' : 's'} ago`,
    timeWeekAgo: (n) => `${n} week${n === 1 ? '' : 's'} ago`,
    timeMonthAgo: (n) => `${n} month${n === 1 ? '' : 's'} ago`,
    timeYearAgo: (n) => `${n} year${n === 1 ? '' : 's'} ago`,
    queueWillFree: (size) => `${size} will be freed`,
    themePink: 'Pink',
    themeDark: 'Dark',
    themeLight: 'Light',
    themeTeal: 'Teal',
    themeOcean: 'Ocean',
    themeSunset: 'Sunset',
    themeForest: 'Forest',
    langTr: '🇹🇷 Turkish',
    langEn: '🇬🇧 English',
  }
};

function t(key, ...args) {
  const s = STRINGS[currentLang][key];
  return typeof s === 'function' ? s(...args) : s;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  showStartScreen();
}

let searchQuery = '';

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (localStorage.getItem('sfx') === 'off') return;
  const vol = sfxVolume;
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'delete') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.12 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.22);
  } else if (type === 'keep') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } else if (type === 'enter') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } else if (type === 'back') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.setValueAtTime(400, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } else if (type === 'undo') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } else if (type === 'confirm_delete') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.14 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } else if (type === 'rescue') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.setValueAtTime(500, ctx.currentTime + 0.08);
    osc.frequency.setValueAtTime(700, ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.2 * vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }
}


let musicPlaying = false;
let musicNodes = [];
let musicTimeout = null;

const MELODY = [
  392, 440, 494, 523, 587, 523, 494, 440,
  392, 392, 440, 494, 392, 330, 330, 0,
  587, 587, 659, 587, 523, 494, 440, 0,
  392, 440, 494, 523, 587, 523, 392, 0,
];

const BASS = [
  196, 0, 196, 0, 220, 0, 220, 0,
  196, 0, 196, 0, 165, 0, 165, 0,
  294, 0, 294, 0, 262, 0, 247, 0,
  196, 0, 196, 0, 220, 0, 196, 0,
];

const BPM = 112;
const BEAT = 60 / BPM;

function startMusic() {
  if (musicPlaying) return;
  musicPlaying = true;
  playMusicLoop(0);
}

function stopMusic() {
  musicPlaying = false;
  musicNodes.forEach(n => { try { n.stop(); } catch(e) {} });
  musicNodes = [];
  clearTimeout(musicTimeout);
}

function playMusicLoop(step) {
  if (!musicPlaying) return;

  const ctx = getAudioCtx();
  const now = ctx.currentTime;

  // Melodi
  const mFreq = MELODY[step % MELODY.length];
  if (mFreq > 0) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = mFreq;
    gain.gain.setValueAtTime(0.045 * musicVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + BEAT * 0.92);
    osc.start(now);
    osc.stop(now + BEAT * 0.8);
    musicNodes.push(osc);
  }

  // Bas
  const bFreq = BASS[step % BASS.length];
  if (bFreq > 0) {
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.value = bFreq;
    gain2.gain.setValueAtTime(0.035 * musicVolume, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + BEAT * 0.95);
    osc2.start(now);
    osc2.stop(now + BEAT * 0.9);
    musicNodes.push(osc2);
  }

  // Davul (her 4 adımda bir)
  if (step % 8 === 0) {
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.type = 'sine';
    noise.frequency.value = 65;
    noiseGain.gain.setValueAtTime(0.02 * musicVolume, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + BEAT * 0.45);
    noise.start(now);
    noise.stop(now + BEAT * 0.3);
    musicNodes.push(noise);
  }

  // Hi-hat (her 2 adımda bir)
  if (step % 4 === 0) {
    const hat = ctx.createOscillator();
    const hatGain = ctx.createGain();
    hat.connect(hatGain);
    hatGain.connect(ctx.destination);
    hat.type = 'triangle';
    hat.frequency.value = 420;
    hatGain.gain.setValueAtTime(0.008 * musicVolume, now);
    hatGain.gain.exponentialRampToValueAtTime(0.001, now + BEAT * 0.16);
    hat.start(now);
    hat.stop(now + BEAT * 0.1);
    musicNodes.push(hat);
  }

  musicTimeout = setTimeout(() => playMusicLoop(step + 1), BEAT * 1000);
}


const DEFAULT_EXCLUDED = [
  { key: 'windows', label: 'Windows Sistem', path: '\\windows\\', removable: false },
  { key: 'program_files', label: 'Program Files', path: '\\program files\\', removable: false },
  { key: 'program_files_x86', label: 'Program Files (x86)', path: '\\program files (x86)\\', removable: false },
  { key: 'appdata_ms', label: 'AppData Microsoft', path: '\\appdata\\local\\microsoft\\', removable: false },
  { key: 'appdata_temp', label: 'AppData Temp', path: '\\appdata\\local\\temp\\', removable: false },
  { key: 'appdata_packages', label: 'AppData Packages', path: '\\appdata\\local\\packages\\', removable: false },
  { key: 'programdata_ms', label: 'ProgramData Microsoft', path: '\\programdata\\microsoft\\', removable: false },
  { key: 'node_modules', label: 'node_modules', path: '\\node_modules\\', removable: true },
  { key: 'git', label: '.git', path: '\\.git\\', removable: true },
  { key: 'pycache', label: '__pycache__', path: '\\__pycache__\\', removable: true },
  { key: 'steam', label: 'Steam Oyunları', path: '\\steam\\steamapps\\', removable: true },
  { key: 'epic', label: 'Epic Games', path: '\\epic games\\', removable: true },
];

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem('settings') || '{}');
  } catch { return {}; }
}

function saveSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}

function getExcludedPaths() {
  const settings = getSettings();
  const disabledKeys = settings.disabledExclusions || [];
  const customPaths = settings.customExcluded || [];
  
  const defaultPaths = DEFAULT_EXCLUDED
    .filter(e => !disabledKeys.includes(e.key))
    .map(e => e.path);
  
  return [...defaultPaths, ...customPaths];
}

const { invoke } = window.__TAURI__.core;
const RISK_THRESHOLDS = { safeMax: 39, warningMax: 69 };

let currentPath = '';
let pathStack = [];
let items = [];
let deletedCount = 0;
let keptCount = 0;
let deleteQueue = [];
let history = [];
let panelOpen = false;
let activeFilters = new Set(['all']);
let currentTheme = localStorage.getItem('theme') || 'pink';
let currentMode = localStorage.getItem('themeMode') || 'dark';
let riskEngineMode = 'unknown';
let deletedHistory = JSON.parse(localStorage.getItem('deletedHistory') || '[]');

async function refreshRiskEngineStatus() {
  try {
    riskEngineMode = await invoke('get_risk_engine_status');
  } catch (_) {
    riskEngineMode = 'unknown';
  }
  const el = document.getElementById('ml-status');
  if (!el) return;
  if (riskEngineMode === 'ml') {
    el.textContent = 'ML';
    el.className = 'ml-status ml-on';
  } else if (riskEngineMode === 'legacy') {
    el.textContent = 'LEGACY';
    el.className = 'ml-status ml-off';
  } else {
    el.textContent = 'N/A';
    el.className = 'ml-status ml-off';
  }
}

async function init() {
  applyTheme(currentTheme);
  applyThemeMode(currentMode);
  applyAccessibilitySettings();
  await refreshRiskEngineStatus();
  showStartScreen();
  maybeShowOnboarding();
  if (localStorage.getItem('music') === 'on') {
    startMusic();
  }
}

function toggleMusic() {
  const btn = document.getElementById('music-btn');
  if (musicPlaying) {
    stopMusic();
    if (btn) btn.textContent = t('musicOff');
    localStorage.setItem('music', 'off');
  } else {
    startMusic();
    if (btn) btn.textContent = t('musicOn');
    localStorage.setItem('music', 'on');
  }
}

function toggleMusicSetting(enabled) {
  if (enabled) {
    startMusic();
    localStorage.setItem('music', 'on');
  } else {
    stopMusic();
    localStorage.setItem('music', 'off');
  }
}

function toggleSfxSetting(enabled) {
  localStorage.setItem('sfx', enabled ? 'on' : 'off');
}

let musicVolume = parseFloat(localStorage.getItem('musicVolume') || '0.5');
let sfxVolume = parseFloat(localStorage.getItem('sfxVolume') || '0.5');

function setMusicVolume(val) {
  musicVolume = val / 100;
  localStorage.setItem('musicVolume', musicVolume);
  const el = document.getElementById('music-vol-val');
  if (el) el.textContent = val + '%';
}

function setSfxVolume(val) {
  sfxVolume = val / 100;
  localStorage.setItem('sfxVolume', sfxVolume);
  const el = document.getElementById('sfx-vol-val');
  if (el) el.textContent = val + '%';
}

function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  if (theme === 'pink') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

function showStartScreen() {
  const stack = document.getElementById('card-stack');

  stack.innerHTML = `
    <div id="start-screen">
      <div class="start-logo">
        <img src="swipedel-logo.png" alt="SwipeDel" style="width:140px;height:140px;object-fit:contain;border-radius:50%;display:block;margin:0 auto" />
      </div>
      <div class="start-title">${t('appName')}</div>
      <div class="start-sub">${t('appSub')}</div>
      <div class="start-buttons">
        <button class="start-btn" onclick="pickFolder()">${t('selectFolder')}</button>
        <button class="start-btn start-btn-secondary" onclick="startWithHome()">${t('startHome')}</button>
        <button class="start-btn start-btn-secondary" onclick="openSettings()">${t('settings')}</button>
      </div>
    </div>
  `;
  document.getElementById('hint-bar').style.display = 'none';
  document.getElementById('action-bar').style.display = 'none';
  document.getElementById('stats').style.display = 'none';
  document.getElementById('queue-bar').style.display = 'none';
  document.getElementById('sort-bar').style.display = 'none';
  document.getElementById('filter-bar').style.display = 'none';
  document.getElementById('search-bar').style.display = 'none';
  document.getElementById('header').style.display = 'none';
}

function showLoadingStartScreen(message) {
  const stack = document.getElementById('card-stack');
  stack.innerHTML = `
    <div id="start-screen">
      <div class="start-logo">
        <img src="swipedel-logo.png" alt="SwipeDel" style="width:140px;height:140px;object-fit:contain;border-radius:50%;display:block;margin:0 auto;opacity:0.9" />
      </div>
      <div class="start-title">${t('appName')}</div>
      <div class="start-sub">${message}</div>
    </div>
  `;
  document.getElementById('hint-bar').style.display = 'none';
  document.getElementById('action-bar').style.display = 'none';
  document.getElementById('stats').style.display = 'none';
  document.getElementById('queue-bar').style.display = 'none';
  document.getElementById('sort-bar').style.display = 'none';
  document.getElementById('filter-bar').style.display = 'none';
  document.getElementById('search-bar').style.display = 'none';
  document.getElementById('header').style.display = 'none';
}

async function pickFolder() {
  showLoadingStartScreen(t('loadingFolder'));
  await new Promise(resolve => requestAnimationFrame(() => resolve()));
  document.getElementById('header').style.display = '';
  const selected = await invoke('pick_folder');
  if (selected) {
    document.getElementById('hint-bar').style.display = '';
    document.getElementById('action-bar').style.display = '';
    document.getElementById('stats').style.display = '';
    document.getElementById('sort-bar').style.display = '';
    document.getElementById('filter-bar').style.display = '';
    document.getElementById('search-bar').style.display = '';
    await loadDirectory(selected);
  }
}

async function startWithHome() {
  showLoadingStartScreen(t('loadingHome'));
  await new Promise(resolve => requestAnimationFrame(() => resolve()));
  document.getElementById('header').style.display = '';
  const home = await invoke('get_home_dir');
  document.getElementById('hint-bar').style.display = '';
  document.getElementById('action-bar').style.display = '';
  document.getElementById('stats').style.display = '';
  document.getElementById('sort-bar').style.display = '';
  document.getElementById('filter-bar').style.display = '';
  document.getElementById('search-bar').style.display = '';
  await loadDirectory(home);

}
let sortBy = 'name';
let sortDir = 'asc';

function sortItems() {
  items.sort((a, b) => {
    // Klasörler her zaman önce
    if (a.is_dir !== b.is_dir) return b.is_dir - a.is_dir;
    
    let cmp = 0;
    if (sortBy === 'name') {
      cmp = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    } else if (sortBy === 'size') {
      cmp = a.size - b.size;
    } else if (sortBy === 'accessed') {
      cmp = (a.last_accessed || 0) - (b.last_accessed || 0);
    } else if (sortBy === 'modified') {
      cmp = (a.last_modified || 0) - (b.last_modified || 0);
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });
}

function getFilteredItems() {
  return items.filter(f => {
    if (f._done) return false;
    if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeFilters.has('all')) return true;
    if (activeFilters.has('folder') && f.is_dir) return true;
    const ext = f.extension;
    if (activeFilters.has('image')   && ['jpg','jpeg','png','gif','webp','svg','bmp'].includes(ext)) return true;
    if (activeFilters.has('video')   && ['mp4','mov','avi','mkv','webm'].includes(ext)) return true;
    if (activeFilters.has('audio')   && ['mp3','wav','flac','aac','ogg'].includes(ext)) return true;
    if (activeFilters.has('doc')     && ['pdf','doc','docx','txt','md','odt','xls','xlsx','ppt','pptx'].includes(ext)) return true;
    if (activeFilters.has('code')    && ['js','ts','py','rs','go','java','c','cpp','html','css','json'].includes(ext)) return true;
    if (activeFilters.has('archive') && ['zip','rar','tar','gz','7z'].includes(ext)) return true;
    return false;
  });
}

const dirCache = new Map();

async function loadDirectory(path) {
  currentPath = path;

  if (dirCache.has(path)) {
    items = dirCache.get(path);
  } else {
    try {
      items = await invoke('list_directory', { path, lang: currentLang });
    } catch (e) {
      showToast(`${t('errReadFolder')}: ${e}`);
      items = [];
    }
    dirCache.set(path, items);
  }

  deletedCount = 0;
  keptCount = 0;
  history = [];
  sortItems();
  renderAll();
}

function formatSize(bytes) {
  if (bytes === 0) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

function formatDate(timestamp) {
  if (!timestamp) return { text: t('unknownDate'), color: 'var(--text-muted)' };
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  let text;
  if (diff < 60) text = t('timeJustNow');
  else if (diff < 3600) text = t('timeMinuteAgo', Math.floor(diff / 60));
  else if (diff < 86400) text = t('timeHourAgo', Math.floor(diff / 3600));
  else if (diff < 86400 * 7) text = t('timeDayAgo', Math.floor(diff / 86400));
  else if (diff < 86400 * 30) text = t('timeWeekAgo', Math.floor(diff / 86400 / 7));
  else if (diff < 86400 * 365) text = t('timeMonthAgo', Math.floor(diff / 86400 / 30));
  else text = t('timeYearAgo', Math.floor(diff / 86400 / 365));

  // 0 = yeşil, 1 = kırmızı, arada interpolasyon
  const ratio = Math.min(diff / (86400 * 365), 1);
  const r = Math.round(82 + (224 - 82) * ratio);
  const g = Math.round(201 + (82 - 201) * ratio);
  const b = Math.round(122 + (82 - 122) * ratio);
  const color = `rgb(${r},${g},${b})`;

  return { text, color };
}

function getIcon(item) {
  if (item.is_dir) return '📁';
  const ext = item.extension;
  if (['jpg','jpeg','png','gif','webp','svg','bmp','ico'].includes(ext)) return '🖼️';
  if (['mp4','mov','avi','mkv','webm'].includes(ext)) return '🎬';
  if (['mp3','wav','flac','aac','ogg'].includes(ext)) return '🎵';
  if (['pdf'].includes(ext)) return '📄';
  if (['doc','docx','odt'].includes(ext)) return '📝';
  if (['xls','xlsx','csv'].includes(ext)) return '📊';
  if (['ppt','pptx'].includes(ext)) return '📊';
  if (['zip','rar','tar','gz','7z'].includes(ext)) return '🗜️';
  if (['js','ts','py','rs','go','java','c','cpp','html','css','json'].includes(ext)) return '💻';
  if (['txt','md'].includes(ext)) return '📄';
  if (['exe','msi'].includes(ext)) return '⚙️';
  return '📄';
}

function getBadge(item) {
  if (item.is_dir) return [t('badgeFolder'), 'badge-folder'];
  const ext = item.extension;
  if (['jpg','jpeg','png','gif','webp','svg','bmp'].includes(ext)) return [t('badgeImage'), 'badge-image'];
  if (['mp4','mov','avi','mkv','webm'].includes(ext)) return [t('badgeVideo'), 'badge-video'];
  if (['mp3','wav','flac','aac','ogg'].includes(ext)) return [t('badgeAudio'), 'badge-audio'];
  if (['pdf','doc','docx','txt','md','odt'].includes(ext)) return [t('badgeDoc'), 'badge-doc'];
  if (['js','ts','py','rs','go','java','c','cpp','html','css','json'].includes(ext)) return [t('badgeCode'), 'badge-code'];
  if (['zip','rar','tar','gz','7z'].includes(ext)) return [t('badgeArchive'), 'badge-archive'];
  return [t('badgeFile'), 'badge-other'];
}

function getRiskClass(score) {
  if (score <= RISK_THRESHOLDS.safeMax) return 'safe';
  if (score <= RISK_THRESHOLDS.warningMax) return 'warning';
  return 'danger';
}

function getRiskIcon(score) {
  if (score <= RISK_THRESHOLDS.safeMax) return '🟢';
  if (score <= RISK_THRESHOLDS.warningMax) return '🟡';
  return '🔴';
}

function getRiskLabel(score) {
  if (score <= RISK_THRESHOLDS.safeMax) return t('riskSafe');
  if (score <= RISK_THRESHOLDS.warningMax) return t('riskWarning');
  return t('riskDanger');
}

function renderAll() {
  renderBreadcrumb();
  renderHintBar();
  renderSearchBar();
  renderFilterBar();
  renderSortBar();
  renderCards();
  updateStats();
  updateButtons();
  renderQueueBar();
  if (panelOpen) renderPanel();
}

function renderHintBar() {
  document.getElementById('hint-bar').innerHTML = `
    <span><kbd>←</kbd> ${t('hintKeep')}</span>
    <span><kbd>↑</kbd> ${t('hintEnter')}</span>
    <span><kbd>→</kbd> ${t('hintDelete')}</span>
    <span><kbd>↓</kbd> ${t('hintBack')}</span>
  `;
}

function renderBreadcrumb() {
  const el = document.getElementById('breadcrumb');
  const sep = currentPath.includes('/') ? '/' : '\\';
  const parts = currentPath.split(sep).filter(Boolean);
  let html = '';
  parts.forEach((part, i) => {
    const isLast = i === parts.length - 1;
    const builtPath = (currentPath.startsWith('/') ? '/' : '') + parts.slice(0, i + 1).join(sep);
    if (isLast) {
      html += `<span class="crumb-current">📁 ${part}</span>`;
    } else {
      html += `<span onclick="navToPath('${builtPath}')">${part}</span><span class="crumb-sep"> / </span>`;
    }
  });
  el.innerHTML = html;
  const remaining = items.filter(f => f._done !== true).length;
  document.getElementById('progress-text').textContent = t('progressItems', remaining);
}
function renderSearchBar() {
  const el = document.getElementById('search-bar');
  const existing = el.querySelector('.search-input');
  if (existing) {
    // Zaten var, sadece clear butonunu güncelle
    const clearBtn = el.querySelector('.search-clear');
    if (searchQuery && !clearBtn) {
      const btn = document.createElement('button');
      btn.className = 'search-clear';
      btn.textContent = '✕';
      btn.onclick = () => setSearch('');
      el.querySelector('.search-wrap').appendChild(btn);
    } else if (!searchQuery && clearBtn) {
      clearBtn.remove();
    }
    return;
  }
  el.innerHTML = `
    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input 
        type="text" 
        class="search-input" 
        placeholder="${t('searchPlaceholder')}"
        value="${searchQuery}"
        oninput="setSearch(this.value)"
      />
      ${searchQuery ? `<button class="search-clear" onclick="setSearch('')">✕</button>` : ''}
    </div>
  `;
}

function setSearch(val) {
  searchQuery = val;
  renderAll();
}

function renderFilterBar() {
  const el = document.getElementById('filter-bar');
  const filters = [
    { key: 'all',     label: t('filterAll') },
    { key: 'folder',  label: t('filterFolder') },
    { key: 'image',   label: t('filterImage') },
    { key: 'video',   label: t('filterVideo') },
    { key: 'audio',   label: t('filterAudio') },
    { key: 'doc',     label: t('filterDoc') },
    { key: 'code',    label: t('filterCode') },
    { key: 'archive', label: t('filterArchive') },
  ];
  el.innerHTML = filters.map(f => `
    <button class="filter-btn ${activeFilters.has(f.key) ? 'filter-active' : ''}" onclick="setFilter('${f.key}')">
      ${f.label}
    </button>
  `).join('');
}

function setFilter(key) {
  if (key === 'all') {
    activeFilters = new Set(['all']);
  } else {
    activeFilters.delete('all');
    if (activeFilters.has(key)) {
      activeFilters.delete(key);
      if (activeFilters.size === 0) activeFilters.add('all');
    } else {
      activeFilters.add(key);
    }
  }
  renderAll();
}

function renderSortBar() {
  const el = document.getElementById('sort-bar');
  const options = [
    { key: 'name',     label: t('sortName') },
    { key: 'size',     label: t('sortSize') },
    { key: 'accessed', label: t('sortAccessed') },
    { key: 'modified', label: t('sortModified') },
  ];
  el.innerHTML = options.map(o => `
    <button class="sort-btn ${sortBy === o.key ? 'sort-active' : ''}" onclick="setSort('${o.key}')">
      ${o.label}
      ${sortBy === o.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
    </button>
  `).join('');
}

function setSort(key) {
  if (sortBy === key) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy = key;
    sortDir = 'asc';
  }
  // _done durumlarını sıfırlamadan sadece sırala
  sortItems();
  renderAll();
}

function renderCards() {
  const stack = document.getElementById('card-stack');
  stack.innerHTML = '';
  const remaining = getFilteredItems();
  if (remaining.length === 0) {
    stack.innerHTML = `<div id="empty-state"><div class="empty-icon">✅</div><div>${t('emptyState')}</div></div>`;
    return;
  }
  const show = remaining.slice(0, 3);
  [...show].reverse().forEach((item, ri) => {
    const isTop = ri === show.length - 1;
    const card = document.createElement('div');
    const cls = isTop ? '' : ri === show.length - 2 ? ' behind1' : ' behind2';
    card.className = 'file-card' + cls;
    const [badgeLabel, badgeClass] = getBadge(item);
    const isImage = ['jpg','jpeg','png','gif','webp','bmp'].includes(item.extension);
    const isVideo = ['mp4','mov','avi','mkv','webm'].includes(item.extension);

    card.innerHTML = `
      <span class="swipe-label swipe-keep">${t('swipeKeep')}</span>
      <span class="swipe-label swipe-delete">${t('swipeDelete')}</span>
      ${item.is_dir ? `<span class="swipe-label swipe-enter">${t('swipeEnter')}</span>` : ''}
      <div class="card-icon" id="thumb-${item.path.replace(/[^a-z0-9]/gi, '_')}">
        ${isVideo ? '<div class="video-thumb"><span class="video-play">▶</span></div>' : getIcon(item)}
      </div>
      <div class="card-name">${item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</div>
      <div class="card-meta">${formatSize(item.size)}</div>
      <div class="card-accessed">
        <span class="meta-label">${t('lastAccessedLabel')}</span>
        <span class="meta-value" style="color:${formatDate(item.last_accessed).color}">${formatDate(item.last_accessed).text}</span>
      </div>
      <div class="card-accessed">
        <span class="meta-label">${t('lastModifiedLabel')}</span>
        <span class="meta-value" style="color:${formatDate(item.last_modified).color}">${formatDate(item.last_modified).text}</span>
      </div>
      <div class="card-risk risk-${getRiskClass(item.risk_score)}" onclick="toggleRiskReason('${item.path.replace(/\\/g, '\\\\')}')">
        ${getRiskIcon(item.risk_score)} ${getRiskLabel(item.risk_score)}
      </div>
      <div class="card-risk-reason" id="risk-reason-${item.path.replace(/[^a-z0-9]/gi, '_')}">${item.risk_reason || ''}</div>
      <span class="card-badge ${badgeClass}">${badgeLabel}</span>
    `;

    if (isTop) setupDrag(card, item);
    stack.appendChild(card);

    if (isTop && isImage) {
      loadThumbnail(item);
    }
  });
}

async function loadThumbnail(item) {
  const id = 'thumb-' + item.path.replace(/[^a-z0-9]/gi, '_');
  try {
    const base64 = await invoke('get_image_thumbnail', { path: item.path });
    const ext = item.extension === 'jpg' || item.extension === 'jpeg' ? 'jpeg' : item.extension;
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `<img src="data:image/${ext};base64,${base64}" class="thumb-img" />`;
    }
  } catch (e) {
    // thumbnail yüklenemezse ikon kalır
  }
}

function setupDrag(card, item) {
  let startX = 0, startY = 0, dx = 0, dy = 0, active = false;
  const lblKeep   = card.querySelector('.swipe-keep');
  const lblDelete = card.querySelector('.swipe-delete');
  const lblEnter  = card.querySelector('.swipe-enter');

  function onMove(x, y) {
    dx = x - startX; dy = y - startY;
    card.style.transform = `translate(${dx}px,${dy}px) rotate(${dx * 0.05}deg)`;
    const hp = Math.min(Math.abs(dx) / 80, 1);
    const vp = Math.min(Math.max(-dy, 0) / 60, 1);
    if (lblKeep)   lblKeep.style.opacity   = dx > 10  ? hp : 0;
    if (lblDelete) lblDelete.style.opacity = dx < -10 ? hp : 0;
    if (lblEnter)  lblEnter.style.opacity  = dy < -10 ? vp : 0;
  }

  function onEnd() {
    active = false;
    card.classList.remove('dragging');
    if      (dx > 80)                    actionKeep();
    else if (dx < -80)                   actionQueue();
    else if (dy < -80 && item.is_dir)    actionEnter();
    else {
      card.style.transform = '';
      if (lblKeep)   lblKeep.style.opacity = 0;
      if (lblDelete) lblDelete.style.opacity = 0;
      if (lblEnter && lblEnter)  lblEnter.style.opacity = 0;
    }
  }

  card.addEventListener('mousedown',  e => { startX=e.clientX; startY=e.clientY; active=true; card.classList.add('dragging'); });
  window.addEventListener('mousemove', e => { if (active) onMove(e.clientX, e.clientY); });
  window.addEventListener('mouseup',   () => { if (active) onEnd(); });
  card.addEventListener('touchstart',  e => { startX=e.touches[0].clientX; startY=e.touches[0].clientY; active=true; }, {passive:true});
  card.addEventListener('touchmove',   e => { if (active) { onMove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); } }, {passive:false});
  card.addEventListener('touchend',    () => { if (active) onEnd(); });
  card.addEventListener('contextmenu', e => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, item);
  });
}

function getCurrentItem() {
  return getFilteredItems()[0];
}

function actionKeep() {
  const item = getCurrentItem();
  if (!item) return;
  history.push({ action: 'keep', item });
  item._done = true;
  keptCount++;
  showToast(t('toastKept', item.name));
  renderAll();
  playSound('keep');
}

function actionQueue() {
  const item = getCurrentItem();
  if (!item) return;
  history.push({ action: 'queue', item });
  item._done = true;
  deleteQueue.push(item);
  showToast(t('toastQueued', item.name));
  playSound('delete');
  renderAll();

}

function rescueFromQueue(path) {
  const idx = deleteQueue.findIndex(f => f.path === path);
  if (idx === -1) return;
  const item = deleteQueue.splice(idx, 1)[0];
  item._done = false;
  showToast(t('toastRescued', item.name));
  playSound('rescue');
  renderAll();
}

function actionUndo() {
  if (history.length === 0) { showToast(t('toastNoUndo')); return; }
  const last = history.pop();
  const item = last.item;
  if (last.action === 'keep') {
    item._done = false;
    keptCount = Math.max(0, keptCount - 1);
    showToast(t('toastUndone', item.name));
  } else if (last.action === 'queue') {
    const qi = deleteQueue.findIndex(f => f.path === item.path);
    if (qi !== -1) deleteQueue.splice(qi, 1);
    item._done = false;
    showToast(t('toastUndone', item.name));
  }
  playSound('undo');
  renderAll();
}

function renderQueueBar() {
  const bar = document.getElementById('queue-bar');
  if (deleteQueue.length === 0) {
    bar.style.display = 'none';
    return;
  }
  const totalSize = deleteQueue.reduce((a, f) => a + f.size, 0);
  bar.style.display = 'flex';
  bar.innerHTML = `
    <div class="queue-info">
      <span class="queue-count">${t('queueCount', deleteQueue.length)}</span>
      <span class="queue-size">${t('queueWillFree', formatSize(totalSize))}</span>
    </div>
    <div class="queue-actions">
      <button class="btn-queue-review" onclick="togglePanel()">${t('queueView')}</button>
      <button class="btn-queue-delete" onclick="confirmDeleteAll()">${t('queueDeleteAll')}</button>
    </div>
  `;
}

function togglePanel() {
  panelOpen = !panelOpen;
  const panel = document.getElementById('side-panel');
  panel.classList.toggle('open', panelOpen);
  if (panelOpen) renderPanel();
}

function renderPanel() {
  const panel = document.getElementById('side-panel');
  if (deleteQueue.length === 0) {
    panel.innerHTML = `
      <div class="panel-header">
        <span>${t('panelTitle')}</span>
        <button class="panel-close" onclick="togglePanel()">✕</button>
      </div>
      <div class="panel-empty">${t('panelEmpty')}</div>
    `;
    return;
  }
  const totalSize = deleteQueue.reduce((a, f) => a + f.size, 0);
  let rows = deleteQueue.map(f => `
    <div class="panel-item">
      <div class="panel-item-info">
        <span class="panel-item-icon">${getIcon(f)}</span>
        <div class="panel-item-text">
          <span class="panel-item-name">${f.name}</span>
          <span class="panel-item-size">${formatSize(f.size)}</span>
        </div>
      </div>
      <button class="btn-rescue" onclick="rescueFromQueue('${f.path.replace(/\\/g, '\\\\')}')">
        ${t('rescue')}
      </button>
    </div>
  `).join('');

  panel.innerHTML = `
    <div class="panel-header">
      <span>${t('panelTitle')} <span class="panel-count">${deleteQueue.length}</span></span>
      <button class="panel-close" onclick="togglePanel()">✕</button>
    </div>
    <div class="panel-summary">${t('queueWillFree', formatSize(totalSize))}</div>
    <div class="panel-list">${rows}</div>
    <button class="btn-delete-all" onclick="confirmDeleteAll()">${t('queueDeleteAll')}</button>
  `;
}

function confirmDeleteAll() {
  if (deleteQueue.length === 0) return;
  document.getElementById('confirm-name').textContent = t('queueMoveTitle', deleteQueue.length);
  document.getElementById('confirm-msg').textContent = t('confirmMsg');
  document.getElementById('confirm-overlay').classList.remove('hidden');
  document.getElementById('confirm-yes').textContent = t('confirmYes');
  document.getElementById('confirm-no').textContent = t('confirmNo');
}

async function executeDeleteAll() {
  document.getElementById('confirm-overlay').classList.add('hidden');
  let failed = 0;

  for (const item of [...deleteQueue]) {
    try {
      await invoke('delete_file', { path: item.path });
      deletedHistory.push({
        timestamp: new Date().toISOString(),
        path: item.path,
        size: item.size || 0,
        source: 'queue'
      });
      deletedCount++;
      deleteQueue.splice(deleteQueue.indexOf(item), 1);
    } catch (e) {
      failed++;
    }
  }
  localStorage.setItem('deletedHistory', JSON.stringify(deletedHistory.slice(-2000)));

  if (panelOpen) { panelOpen = false; document.getElementById('side-panel').classList.remove('open'); }
  playSound('confirm_delete');
  renderAll();
}
function cancelDelete() {
  document.getElementById('confirm-overlay').classList.add('hidden');
}

async function actionEnter() {
  const item = getCurrentItem();
  if (!item || !item.is_dir) return;
  pathStack.push({ path: currentPath, items: JSON.parse(JSON.stringify(items)), deleted: deletedCount, kept: keptCount });
  await loadDirectory(item.path);
  playSound('enter');
}

async function actionBack() {
  if (pathStack.length === 0) return;
  const prev = pathStack.pop();
  currentPath = prev.path;
  items = prev.items;
  deletedCount = prev.deleted;
  keptCount = prev.kept;
  history = [];
  playSound('back');
  renderAll();
  showToast(t('toastBack'));
}

async function navToPath(path) {
  pathStack = [];
  await loadDirectory(path);
}

function updateStats() {
  const remaining = getFilteredItems().length;
  document.getElementById('stat-kept').textContent    = keptCount;
  document.getElementById('stat-deleted').textContent = deletedCount;
  document.getElementById('stat-remain').textContent  = remaining;
  document.querySelector('#stats .stat:nth-child(1) small').textContent = t('kept');
  document.querySelector('#stats .stat:nth-child(2) small').textContent = t('deleted');
  document.querySelector('#stats .stat:nth-child(3) small').textContent = t('remaining');
}

function updateButtons() {
  const item = getCurrentItem();
  const btnEnter = document.getElementById('btn-enter');
  const btnBack  = document.getElementById('btn-back');
  const btnKeep  = document.getElementById('btn-keep');
  const btnDelete = document.getElementById('btn-delete');
  btnKeep.textContent = t('keep');
  btnDelete.textContent = t('delete');
  btnBack.textContent = t('back');
  btnEnter.textContent = t('enter');
  btnEnter.style.display = (item && item.is_dir) ? '' : 'none';
  btnBack.style.display  = pathStack.length > 0 ? '' : 'none';
}

function goToStart() {
  currentPath = '';
  pathStack = [];
  items = [];
  deletedCount = 0;
  keptCount = 0;
  deleteQueue = [];
  history = [];
  panelOpen = false;
  dirCache.clear();
  document.getElementById('side-panel').classList.remove('open');
  showStartScreen();
}

function openSettings() {
  renderSettingsView('root');
}

function toggleRiskReason(path) {
  const id = 'risk-reason-' + path.replace(/[^a-z0-9]/gi, '_');
  const element = document.getElementById(id);
  if (!element) return;
  element.classList.toggle('open');
}

function getShortcutsMarkup() {
  const rows = [
    { key: '←', desc: t('shortcutKeep') },
    { key: '→', desc: t('shortcutQueueDelete') },
    { key: '↑', desc: t('shortcutEnterFolder') },
    { key: '↓', desc: t('shortcutGoBack') },
    { key: 'Ctrl + ↑', desc: t('shortcutPreviewOpen') },
    { key: 'Ctrl + ↓', desc: t('shortcutPreviewClose') },
    { key: 'Z', desc: t('shortcutUndo') },
    { key: 'Enter', desc: t('shortcutConfirmDelete') },
    { key: 'Esc', desc: t('shortcutCloseDialogs') },
  ];

  return `
    <div class="settings-section-title">${t('settingsShortcutsTitle')}</div>
    <div class="settings-shortcuts-list">
      ${rows.map(r => `
        <div class="shortcut-row">
          <span class="shortcut-key">${r.key}</span>
          <span class="shortcut-desc">${r.desc}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function getAppearanceMarkup() {
  const palettes = [
    { key: 'pink', label: t('themePink') },
    { key: 'teal', label: t('themeTeal') },
    { key: 'ocean', label: t('themeOcean') },
    { key: 'sunset', label: t('themeSunset') },
    { key: 'forest', label: t('themeForest') },
  ];
  return `
    <div class="settings-list">
      <div class="settings-item">
        <span class="settings-item-label">${t('settingsMode')}</span>
        <div class="queue-actions">
          <button class="btn-queue-review" onclick="applyThemeMode('dark')">${t('modeDark')}</button>
          <button class="btn-queue-review" onclick="applyThemeMode('light')">${t('modeLight')}</button>
        </div>
      </div>
      <div class="settings-item">
        <span class="settings-item-label">${t('settingsTheme')}</span>
        <select class="settings-input" onchange="applyTheme(this.value)" style="max-width:170px">
          ${palettes.map(p => `<option value="${p.key}" ${currentTheme === p.key ? 'selected' : ''}>${p.label}</option>`).join('')}
        </select>
      </div>
      <div class="settings-item">
        <span class="settings-item-label">${t('settingsLanguage')}</span>
        <select class="settings-input" onchange="setLang(this.value); closeSettings(); renderSettingsView('appearance')" style="max-width:170px">
          <option value="tr" ${currentLang === 'tr' ? 'selected' : ''}>${t('langTr')}</option>
          <option value="en" ${currentLang === 'en' ? 'selected' : ''}>${t('langEn')}</option>
        </select>
      </div>
    </div>
  `;
}

function getAccessibilityMarkup() {
  const settings = getSettings();
  return `
    <div class="settings-list">
      <div class="settings-item"><label class="settings-toggle"><input type="checkbox" ${settings.a11yLarge ? 'checked' : ''} onchange="toggleA11y('a11yLarge', this.checked)"><span class="settings-item-label">${t('a11yLargeText')}</span></label></div>
      <div class="settings-item"><label class="settings-toggle"><input type="checkbox" ${settings.a11yContrast ? 'checked' : ''} onchange="toggleA11y('a11yContrast', this.checked)"><span class="settings-item-label">${t('a11yHighContrast')}</span></label></div>
      <div class="settings-item"><label class="settings-toggle"><input type="checkbox" ${settings.a11yReduceMotion ? 'checked' : ''} onchange="toggleA11y('a11yReduceMotion', this.checked)"><span class="settings-item-label">${t('a11yReducedMotion')}</span></label></div>
      <div class="settings-item"><label class="settings-toggle"><input type="checkbox" ${settings.a11yColorAssist ? 'checked' : ''} onchange="toggleA11y('a11yColorAssist', this.checked)"><span class="settings-item-label">${t('a11yColorAssist')}</span></label></div>
    </div>
  `;
}

function getGuideMarkup() {
  const settings = getSettings();
  return `
    <div class="settings-section-title">${t('settingsGuideTitle')}</div>
    <div class="settings-list">
      <div class="settings-item">
        <label class="settings-toggle">
          <input type="checkbox" ${settings.hideOnboarding ? 'checked' : ''} onchange="toggleGuideHide(this.checked)">
          <span class="settings-item-label">${t('settingsGuideDontShow')}</span>
        </label>
      </div>
      <div class="settings-item">
        <button class="settings-add-btn" onclick="closeSettings(); openOnboarding()">${t('settingsGuideOpen')}</button>
      </div>
    </div>
  `;
}

function getBackupMarkup() {
  return `
    <div class="settings-section-title">${t('backupTitle')}</div>
    <div class="settings-desc">${deletedHistory.length === 0 ? t('backupEmpty') : `${deletedHistory.length} ${t('filesToDelete').toLowerCase()}`}</div>
    <div class="settings-list">
      <div class="settings-item"><button class="settings-add-btn" onclick="exportBackupReport()">${t('backupExport')}</button></div>
      <div class="settings-item"><button class="settings-remove-btn" onclick="clearBackupReport()">${t('backupClear')}</button></div>
    </div>
  `;
}

function renderSettingsView(view) {
  const settings = getSettings();
  const disabledKeys = settings.disabledExclusions || [];
  const customPaths = settings.customExcluded || [];

  let content = '';
  let title = t('settingsTitle');
  let backBtn = '';

  if (view !== 'root') {
    backBtn = `<button class="settings-back-btn" onclick="renderSettingsView('root')">${t('back')}</button>`;
  }

  if (view === 'root') {
    content = `
      <div class="settings-menu-grid">
        <button class="settings-menu-btn" onclick="renderSettingsView('appearance')">${t('settingsMenuAppearance')}</button>
        <button class="settings-menu-btn" onclick="renderSettingsView('sound')">${t('settingsMenuSound')}</button>
        <button class="settings-menu-btn" onclick="renderSettingsView('duplicates')">${t('settingsMenuDup')}</button>
        <button class="settings-menu-btn" onclick="renderSettingsView('accessibility')">${t('settingsMenuAccessibility')}</button>
        <button class="settings-menu-btn" onclick="renderSettingsView('guide')">${t('settingsMenuGuide')}</button>
        <button class="settings-menu-btn" onclick="renderSettingsView('backup')">${t('settingsMenuBackup')}</button>
        <button class="settings-menu-btn" onclick="renderSettingsView('shortcuts')">${t('settingsMenuShortcuts')}</button>
      </div>
    `;
  } else if (view === 'appearance') {
    title = t('settingsMenuAppearance');
    content = getAppearanceMarkup();
  } else if (view === 'sound') {
    title = t('settingsMenuSound');
    content = `
      <div class="settings-section-title">${t('settingsSoundTitle')}</div>
      <div class="settings-list">
        <div class="settings-item">
          <label class="settings-toggle">
            <input type="checkbox" id="setting-music" ${localStorage.getItem('music') !== 'off' ? 'checked' : ''}
              onchange="toggleMusicSetting(this.checked)">
            <span class="settings-item-label">${t('settingsMusic')}</span>
          </label>
        </div>
        <div class="settings-item">
          <span class="settings-item-label">${t('settingsMusicVol')}</span>
          <input type="range" min="0" max="100" value="${Math.round((parseFloat(localStorage.getItem('musicVolume') || '0.5')) * 100)}"
            class="settings-slider" oninput="setMusicVolume(this.value)">
          <span class="settings-slider-val" id="music-vol-val">${Math.round((parseFloat(localStorage.getItem('musicVolume') || '0.5')) * 100)}%</span>
        </div>
        <div class="settings-item">
          <label class="settings-toggle">
            <input type="checkbox" id="setting-sfx" ${localStorage.getItem('sfx') !== 'off' ? 'checked' : ''}
              onchange="toggleSfxSetting(this.checked)">
            <span class="settings-item-label">${t('settingsSfx')}</span>
          </label>
        </div>
        <div class="settings-item">
          <span class="settings-item-label">${t('settingsSfxVol')}</span>
          <input type="range" min="0" max="100" value="${Math.round((parseFloat(localStorage.getItem('sfxVolume') || '0.5')) * 100)}"
            class="settings-slider" oninput="setSfxVolume(this.value)">
          <span class="settings-slider-val" id="sfx-vol-val">${Math.round((parseFloat(localStorage.getItem('sfxVolume') || '0.5')) * 100)}%</span>
        </div>
      </div>
    `;
  } else if (view === 'duplicates') {
    title = t('settingsMenuDup');
    content = `
      <div class="settings-section-title">${t('settingsExcluded')}</div>
      <div class="settings-desc">${t('settingsExcludedDesc')}</div>
      <div class="settings-list">
        ${DEFAULT_EXCLUDED.map(e => `
          <div class="settings-item">
            <label class="settings-toggle">
              <input type="checkbox" ${!disabledKeys.includes(e.key) ? 'checked' : ''}
                onchange="toggleExclusion('${e.key}', this.checked)">
              <span class="settings-item-label">${e.label}</span>
            </label>
            <span class="settings-item-path">${e.path}</span>
          </div>
        `).join('')}
      </div>

      <div class="settings-section-title" style="margin-top:16px">${t('settingsCustom')}</div>
      <div class="settings-desc">${t('settingsCustomDesc')}</div>
      <div class="settings-list" id="custom-excluded-list">
        ${customPaths.map((p, i) => `
          <div class="settings-item">
            <span class="settings-item-label">${p}</span>
            <button class="settings-remove-btn" onclick="removeCustomExclusion(${i})">✕</button>
          </div>
        `).join('')}
      </div>
      <div class="settings-add-row">
        <input type="text" id="custom-path-input" placeholder="${t('settingsCustomPlaceholder')}" class="settings-input" />
        <button class="settings-add-btn" onclick="addCustomExclusion()">${t('settingsAdd')}</button>
      </div>
    `;
  } else if (view === 'shortcuts') {
    title = t('settingsMenuShortcuts');
    content = getShortcutsMarkup();
  } else if (view === 'accessibility') {
    title = t('settingsMenuAccessibility');
    content = getAccessibilityMarkup();
  } else if (view === 'guide') {
    title = t('settingsMenuGuide');
    content = getGuideMarkup();
  } else if (view === 'backup') {
    title = t('settingsMenuBackup');
    content = getBackupMarkup();
  }

  const overlayHtml = `
    <div id="settings-box">
      <div id="settings-header">
        <div>${backBtn}</div>
        <span>${title}</span>
        <button onclick="closeSettings()">✕</button>
      </div>
      <div id="settings-content">
        ${content}
      </div>
    </div>
  `;
  let overlay = document.getElementById('settings-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'settings-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = overlayHtml;
}

function toggleGuideHide(checked) {
  const settings = getSettings();
  settings.hideOnboarding = !!checked;
  saveSettings(settings);
}

function toggleA11y(key, checked) {
  const settings = getSettings();
  settings[key] = !!checked;
  saveSettings(settings);
  applyAccessibilitySettings();
}

function exportBackupReport() {
  if (deletedHistory.length === 0) {
    showToast(t('backupEmpty'));
    return;
  }
  const lines = ["timestamp,path,size_bytes,source"];
  for (const row of deletedHistory) {
    lines.push(`"${row.timestamp}","${(row.path || '').replace(/"/g,'""')}",${row.size || 0},"${row.source || 'queue'}"`);
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `swipedel-delete-report-${Date.now()}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast(t('backupExported'));
}

function clearBackupReport() {
  deletedHistory = [];
  localStorage.setItem('deletedHistory', JSON.stringify(deletedHistory));
  renderSettingsView('backup');
}

function closeSettings() {
  document.querySelectorAll('#settings-overlay').forEach(el => el.remove());
}

function toggleExclusion(key, enabled) {
  const settings = getSettings();
  const disabled = settings.disabledExclusions || [];
  if (enabled) {
    settings.disabledExclusions = disabled.filter(k => k !== key);
  } else {
    settings.disabledExclusions = [...disabled, key];
  }
  saveSettings(settings);
}

function addCustomExclusion() {
  const input = document.getElementById('custom-path-input');
  const val = input.value.trim();
  if (!val) return;
  const settings = getSettings();
  settings.customExcluded = [...(settings.customExcluded || []), val];
  saveSettings(settings);
  input.value = '';
  closeSettings();
  renderSettingsView('duplicates');
}

function removeCustomExclusion(idx) {
  const settings = getSettings();
  settings.customExcluded = (settings.customExcluded || []).filter((_, i) => i !== idx);
  saveSettings(settings);
  closeSettings();
  renderSettingsView('duplicates');
}

async function quitApp() {
  const overlay = document.createElement('div');
  overlay.id = 'quit-overlay';
  overlay.innerHTML = `
    <div id="quit-box">
      <div id="quit-icon">👋</div>
      <div id="quit-title">${t('quitTitle')}</div>
      <div id="quit-buttons">
        <button id="quit-yes" onclick="confirmQuit()">${t('quitYes')}</button>
        <button id="quit-no" onclick="cancelQuit()">${t('quitNo')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
async function confirmQuit() {
  const { exit } = window.__TAURI__.process;
  await exit(0);
}

function cancelQuit() {
  const el = document.getElementById('quit-overlay');
  if (el) el.remove();
}

function showContextMenu(x, y, item) {
  removeContextMenu();
  const menu = document.createElement('div');
  menu.id = 'context-menu';
  menu.style.left = x + 'px';
  menu.style.top  = y + 'px';

  const isImage = ['jpg','jpeg','png','gif','webp','bmp'].includes(item.extension);
  const isVideo = ['mp4','mov','avi','mkv','webm'].includes(item.extension);
  const isText  = ['txt','md','js','ts','py','rs','go','java','c','cpp','html','css','json'].includes(item.extension);
  const isPdf   = item.extension === 'pdf';
  const canPreview = isImage || isVideo || isText || isPdf;

  menu.innerHTML = `
    ${canPreview ? `<div class="ctx-item" onclick="openPreview('${item.path.replace(/\\/g, '\\\\')}', '${item.extension}', '${item.name}')">${t('ctxPreview')}</div>` : ''}
    <div class="ctx-item" onclick="openFile('${item.path.replace(/\\/g, '\\\\')}')">${t('ctxOpenFile')}</div>
    <div class="ctx-item" onclick="openInExplorer('${item.path.replace(/\\/g, '\\\\')}')">${t('ctxOpenLocation')}</div>
    <div class="ctx-separator"></div>
    <div class="ctx-item ctx-item-danger" onclick="removeContextMenu()">${t('ctxClose')}</div>
  `;
  document.body.appendChild(menu);
  setTimeout(() => document.addEventListener('click', removeContextMenu, { once: true }), 0);
}

function removeContextMenu() {
  const m = document.getElementById('context-menu');
  if (m) m.remove();
}

async function openInExplorer(path) {
  removeContextMenu();
  try {
    await invoke('open_in_explorer', { path });
  } catch (e) {
    showToast(`${t('errOpenLocation')}: ${e}`);
  }
}

function applyThemeMode(mode) {
  currentMode = mode;
  localStorage.setItem('themeMode', mode);
  document.documentElement.setAttribute('data-mode', mode);
}

function applyAccessibilitySettings() {
  const settings = getSettings();
  document.documentElement.toggleAttribute('data-a11y-large', !!settings.a11yLarge);
  document.documentElement.toggleAttribute('data-a11y-contrast', !!settings.a11yContrast);
  document.documentElement.toggleAttribute('data-a11y-reduce-motion', !!settings.a11yReduceMotion);
  document.documentElement.toggleAttribute('data-a11y-color-assist', !!settings.a11yColorAssist);
}

function maybeShowOnboarding() {
  const settings = getSettings();
  if (settings.hideOnboarding) return;
  openOnboarding();
}

function openOnboarding() {
  if (document.getElementById('onboarding-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  const settings = getSettings();
  const guideSteps = [
    t('onboardingStep1'),
    t('onboardingStep2'),
    t('onboardingStep3'),
    t('onboardingStep4'),
    t('onboardingStep5'),
    t('onboardingStep6'),
    t('onboardingStep7'),
    t('onboardingStep8'),
    t('onboardingStep9'),
    t('onboardingStep10'),
  ];
  overlay.innerHTML = `
    <div id="onboarding-box">
      <div class="onboarding-title">${t('onboardingTitle')}</div>
      <div class="onboarding-steps">
        ${guideSteps.map((step, index) => `<div>${index + 1}. ${step}</div>`).join('')}
      </div>
      <label class="settings-toggle">
        <input type="checkbox" id="onboarding-hide" ${settings.hideOnboarding ? 'checked' : ''}>
        <span class="settings-item-label">${t('settingsGuideDontShow')}</span>
      </label>
      <button class="start-btn" onclick="closeOnboarding()">${t('onboardingClose')}</button>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeOnboarding() {
  const hide = document.getElementById('onboarding-hide')?.checked;
  const settings = getSettings();
  settings.hideOnboarding = !!hide;
  saveSettings(settings);
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.remove();
}

async function openFile(path) {
  removeContextMenu();
  try {
    await invoke('open_file', { path });
  } catch (e) {
    showToast(`${t('errOpenFile')}: ${e}`);
  }
}

async function openPreview(path, ext, name) {
  removeContextMenu();
  const isImage = ['jpg','jpeg','png','gif','webp','bmp'].includes(ext);
  const isVideo = ['mp4','mov','avi','mkv','webm'].includes(ext);
  const isText  = ['txt','md','js','ts','py','rs','go','java','c','cpp','html','css','json'].includes(ext);
  const isPdf   = ext === 'pdf';

  const overlay = document.createElement('div');
  overlay.id = 'preview-overlay';

  let content = '';

  if (isImage) {
    try {
      const base64 = await invoke('get_image_thumbnail', { path });
      const mime = ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : ext;
      content = `<img src="data:image/${mime};base64,${base64}" class="preview-img" />`;
    } catch (e) {
      content = `<div class="preview-error">${t('errLoadImage')}</div>`;
    }
  } else if (isVideo) {
    content = `<video controls class="preview-video">
      <source src="asset://localhost/${path.replace(/\\/g, '/')}" />
    </video>`;
  } else if (isText) {
    try {
      const text = await invoke('read_text_file', { path });
      const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      content = `<pre class="preview-text">${escaped}</pre>`;
    } catch (e) {
      content = `<div class="preview-error">${t('errReadFile')}</div>`;
    }
  } else if (isPdf) {
    content = `<iframe src="asset://localhost/${path.replace(/\\/g, '/')}" class="preview-pdf"></iframe>`;
  }

  overlay.innerHTML = `
    <div id="preview-box">
      <div id="preview-header">
        <span id="preview-title">${name}</span>
        <button id="preview-close" onclick="closePreview()">✕</button>
      </div>
      <div id="preview-content">${content}</div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.addEventListener('keydown', previewEscHandler);
}

function previewEscHandler(e) {
  if (e.key === 'Escape') closePreview();
}

function closePreview() {
  const el = document.getElementById('preview-overlay');
  if (el) el.remove();
  document.removeEventListener('keydown', previewEscHandler);
}

let duplicateGroups = [];
let dupGroupIndex = 0;
let dupItemIndex = 0;

async function openDuplicateFinder() {
  const overlay = document.createElement('div');
  overlay.id = 'dup-overlay';
  overlay.innerHTML = `
    <div id="dup-box">
      <div id="dup-header">
        <span>${t('dupTitle')}</span>
        <button onclick="closeDuplicateFinder()">✕</button>
      </div>
      <div id="dup-content">
        <div class="dup-loading">
          <div>${t('dupScanning')}</div>
          <div class="dup-progress-wrap">
            <div class="dup-progress-bar" id="dup-progress-bar" style="width:0%"></div>
          </div>
          <div class="dup-progress-text" id="dup-progress-text">${t('dupPreparing')}</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const { listen } = window.__TAURI__.event;
  const hashStart = Date.now();
  const unlisten = await listen('dup-progress', e => {
    const { stage, current, total } = e.payload;
    const bar = document.getElementById('dup-progress-bar');
    const txt = document.getElementById('dup-progress-text');
    if (!bar || !txt) return;
    if (stage === 'collect') {
      txt.textContent = t('dupListing');
      bar.style.width = '5%';
    } else if (stage === 'hash') {
      const pct = total > 0 ? Math.round((current / total) * 100) : 0;
      bar.style.width = pct + '%';
      const elapsed = Math.max((Date.now() - hashStart) / 1000, 1);
      const rate = current / elapsed;
      const remaining = Math.max(total - current, 0);
      const eta = rate > 0 ? Math.ceil(remaining / rate) : 0;
      txt.textContent = `${current} / ${total} (${pct}%) • ${t('dupEta', eta)}`;
    } else if (stage === 'done') {
      bar.style.width = '100%';
      txt.textContent = t('dupDone');
    }
  });

  try {
    duplicateGroups = await invoke('find_duplicates', { 
      path: currentPath,
      excludedPaths: getExcludedPaths(),
      lang: currentLang
    });
    unlisten();
    if (duplicateGroups.length === 0) {
      document.getElementById('dup-content').innerHTML = `
        <div class="dup-empty">${t('dupEmpty')}</div>
      `;
      return;
    }
    duplicateGroups.sort((a, b) => {
      const sizeA = a.reduce((s, f) => s + f.size, 0);
      const sizeB = b.reduce((s, f) => s + f.size, 0);
      return sizeB - sizeA;
    });
    dupGroupIndex = 0;
    renderDuplicateGroup();
  } catch (e) {
    unlisten();
    document.getElementById('dup-content').innerHTML = `<div class="dup-empty">${t('errGeneric')}: ${e}</div>`;
  }
}

function renderDuplicateGroup() {
  const group = duplicateGroups[dupGroupIndex];
  const totalGroups = duplicateGroups.length;
  const totalWaste = group.slice(1).reduce((a, f) => a + f.size, 0);

  const content = document.getElementById('dup-content');
  content.innerHTML = `
    <div class="dup-nav">
      <button class="dup-nav-btn" onclick="prevDupGroup()" ${dupGroupIndex === 0 ? 'disabled' : ''}>←</button>
      <span>${dupGroupIndex + 1} / ${totalGroups} ${t('dupGroupSuffix')}</span>
      <button class="dup-nav-btn" onclick="nextDupGroup()" ${dupGroupIndex === totalGroups - 1 ? 'disabled' : ''}>→</button>
    </div>
    <div class="dup-waste">${t('dupWaste', formatSize(totalWaste))}</div>
    <div class="dup-list">
      ${group.map((f, i) => `
        <div class="dup-item ${i === 0 ? 'dup-original' : ''}">
          <div class="dup-item-info">
            <span class="dup-item-icon">${getIcon(f)}</span>
            <div class="dup-item-text">
              <span class="dup-item-name">
                ${f.name}
                ${f.risk_score > RISK_THRESHOLDS.warningMax ? `<span class="dup-risky-badge">${t('dupRisky')}</span>` : f.risk_score > RISK_THRESHOLDS.safeMax ? `<span class="dup-risky-badge" style="border-color:#c9a952;color:#c9a952;background:#3a2a0a">${t('dupCaution')}</span>` : ''}
              </span>
              <span class="dup-item-path">${f.path}</span>
              <span class="dup-item-size">${formatSize(f.size)}</span>
              <span class="dup-item-risk" style="color:${f.risk_score > RISK_THRESHOLDS.warningMax ? 'var(--red)' : f.risk_score > RISK_THRESHOLDS.safeMax ? '#c9a952' : 'var(--green)'}">
                ${getRiskIcon(f.risk_score)} ${getRiskLabel(f.risk_score)} (${f.risk_score}/100)
              </span>
            </div>
          </div>
          <div class="dup-item-actions">
            ${i === 0 ? `<span class="dup-badge">${t('dupOriginal')}</span>` : `
              <button class="dup-delete-btn" onclick="deleteDuplicate('${f.path.replace(/\\/g, '\\\\')}', ${dupGroupIndex}, ${i})">${t('delete')}</button>
            `}
          </div>
        </div>
      `).join('')}
    </div>
    <button class="dup-delete-all-btn" onclick="deleteAllDuplicatesInGroup(${dupGroupIndex})">
      ${t('dupDeleteGroup')}
    </button>
  `;
}

function prevDupGroup() {
  if (dupGroupIndex > 0) { dupGroupIndex--; renderDuplicateGroup(); }
}

function nextDupGroup() {
  if (dupGroupIndex < duplicateGroups.length - 1) { dupGroupIndex++; renderDuplicateGroup(); }
}

async function deleteDuplicate(path, groupIdx, itemIdx) {
  try {
    const entry = duplicateGroups[groupIdx]?.[itemIdx];
    await invoke('delete_file', { path });
    deletedHistory.push({
      timestamp: new Date().toISOString(),
      path,
      size: entry?.size || 0,
      source: 'duplicate'
    });
    localStorage.setItem('deletedHistory', JSON.stringify(deletedHistory.slice(-2000)));
    duplicateGroups[groupIdx].splice(itemIdx, 1);
    if (duplicateGroups[groupIdx].length <= 1) {
      duplicateGroups.splice(groupIdx, 1);
      if (duplicateGroups.length === 0) {
        document.getElementById('dup-content').innerHTML = `<div class="dup-empty">✅ Tüm kopyalar temizlendi!</div>`;
        return;
      }
      dupGroupIndex = Math.min(dupGroupIndex, duplicateGroups.length - 1);
    }
    renderDuplicateGroup();
    showToast(t('toastDeleted'));
  } catch (e) {
    showToast(`${t('errGeneric')}: ${e}`);
  }
}

async function deleteAllDuplicatesInGroup(groupIdx) {
  const group = duplicateGroups[groupIdx];
  for (let i = group.length - 1; i >= 1; i--) {
    try {
      await invoke('delete_file', { path: group[i].path });
      deletedHistory.push({
        timestamp: new Date().toISOString(),
        path: group[i].path,
        size: group[i].size || 0,
        source: 'duplicate'
      });
      group.splice(i, 1);
    } catch (e) {}
  }
  localStorage.setItem('deletedHistory', JSON.stringify(deletedHistory.slice(-2000)));
  duplicateGroups.splice(groupIdx, 1);
  if (duplicateGroups.length === 0) {
    document.getElementById('dup-content').innerHTML = `<div class="dup-empty">${t('dupAllCleaned')}</div>`;
    return;
  }
  dupGroupIndex = Math.min(dupGroupIndex, duplicateGroups.length - 1);
  renderDuplicateGroup();
  showToast(t('toastCopiesDeleted'));
}

function closeDuplicateFinder() {
  const el = document.getElementById('dup-overlay');
  if (el) el.remove();
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

document.getElementById('btn-keep').onclick   = actionKeep;
document.getElementById('btn-delete').onclick = actionQueue;
document.getElementById('btn-enter').onclick  = actionEnter;
document.getElementById('btn-back').onclick   = actionBack;
document.getElementById('confirm-yes').onclick = executeDeleteAll;
document.getElementById('confirm-no').onclick  = cancelDelete;

document.addEventListener('keydown', e => {
  const item = getCurrentItem();
  if (e.key === 'ArrowLeft')  { e.preventDefault(); actionKeep(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); actionQueue(); }
  if (e.key === 'ArrowUp' && !e.ctrlKey && item && item.is_dir) { e.preventDefault(); actionEnter(); }
  if (e.key === 'ArrowDown' && !e.ctrlKey)  { e.preventDefault(); actionBack(); }
  if (e.key === 'ArrowUp' && e.ctrlKey && item) { e.preventDefault(); openPreview(item.path, item.extension, item.name); }
  if (e.key === 'ArrowDown' && e.ctrlKey) { e.preventDefault(); closePreview(); }
  if (e.key === 'z' || e.key === 'Z') { e.preventDefault(); actionUndo(); }
  if (e.key === 'Enter' && !document.getElementById('confirm-overlay').classList.contains('hidden')) executeDeleteAll();
  if (e.key === 'Escape') {
    cancelDelete();
    if (panelOpen) togglePanel();
    cancelQuit();
  }
});

init();
