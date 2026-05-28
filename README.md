# swclit 

Tauri + Vanilla JS desktop file cleaner with:
- Swipe-based keep/delete UX
- Duplicate finder
- Risk scoring (ML-first, legacy fallback)
- TR/EN UI support

## Prerequisites

- Node.js 18+
- Rust toolchain (`stable`)
- Tauri prerequisites for your OS

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Risk Engine

Backend (`src-tauri`) loads model artifacts in this order:
1. `src-tauri/ml_assets/`
2. `src-tauri/`
3. runtime fallback paths

Expected files:
- `dosya_risk_modeli.json`
- `ext_encoder.json`
- `rare_exts.json`

If model files are missing, app falls back to legacy rule-based scoring and UI shows `LEGACY`.

## Pre-push checks

```bash
npm run check
npm run prepush
```

`prepush` runs syntax + Rust checks + Tauri build.
