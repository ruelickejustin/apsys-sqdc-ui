[![Deploy Pages](https://github.com/ruelickejustin/apsys-sqdc-ui/actions/workflows/deploy.yml/badge.svg)](https://github.com/ruelickejustin/apsys-sqdc-ui/actions/workflows/deploy.yml)
# SQDC UI (Svelte + Tailwind + Vite)

Modernes, druckbares SQDC-Board (A4 quer, fette Ziellinie, Monatsraster).
- **Keine Autokolorierung**: Operator tragen Werte per Stift ein.
- **Setup → Vorschau → Drucken** Stepper
- **LocalStorage** für Monats-Config
- PWA (Icon, offline)

## Start
```bash
npm i
npm run dev
```

## Build & Pages
Push auf `main` → GitHub Action baut & deployed `dist/` als Pages.

## Anpassung
- `src/App.svelte`: UI/Logik
- `public/manifest.json`: PWA-Icon/Farben
