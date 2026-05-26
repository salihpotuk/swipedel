# Pre-Push Checklist

## 1) Quick quality checks

- `cmd /c npm run check`
- Verify app launches in `TR` and `EN`
- Verify ML badge is `ML` when model assets exist

## 2) Functional smoke test

- Pick folder -> cards render
- Keep/Delete/Undo flows work
- Queue panel count and size text is localized
- Risk badge colors and labels look correct
- Duplicate finder opens and lists groups
- Preview/context menu actions open correctly

## 3) Release/build checks

- `cmd /c npm run build`
- If bundling fails due network/WiX on Windows, compile check still passes if:
  - `cargo check --manifest-path src-tauri/Cargo.toml`
  - app binary is produced before bundling step

## 4) Git hygiene

- `git status` contains only intended files
- No `target/`, `node_modules/`, or local datasets in commit
- Model assets under `src-tauri/ml_assets/` are present if ML mode is required
