# Al Khail CRM Prototype

React + Vite CRM UI prototype for Al Khail (TechKhwa Solutions).

## Local development

```bash
cd alkahil-crm
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Production build

```bash
cd alkahil-crm
npm run build
npm run preview
```

## Deploy on Vercel

This repo is ready for [Vercel](https://vercel.com). Two equivalent setups:

### Option A — Root directory (recommended)

1. Import [Al-khalil-crm-prototype](https://github.com/AhmadRazaNewMan/Al-khalil-crm-prototype) in Vercel.
2. Set **Root Directory** to `alkahil-crm`.
3. Vercel auto-detects **Vite**; `alkahil-crm/vercel.json` adds SPA routing for React Router.
4. Deploy.

### Option B — Repo root

Leave **Root Directory** empty. The root `vercel.json` runs install/build inside `alkahil-crm/` and outputs `alkahil-crm/dist`.

### After deploy

- Routes like `/dashboard`, `/inbox`, `/leads` work on refresh (SPA rewrite to `index.html`).
- No environment variables required for this static prototype (auth is client-side demo only).

## Repo layout

| Path | Description |
|------|-------------|
| `alkahil-crm/` | Vite + React application |
| `desing.md` | Design notes |
| `vercel.json` | Vercel config when root directory is repo root |
