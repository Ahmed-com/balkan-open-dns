# Website Deployment Guide (Phase 2 — Not Yet Published)

> **Publication Status:** The Balkan Open DNS static website (`website/`) is currently **under review on branch `phase-2-website`** and has **not** been published.

## 1. Architecture Summary

- **Output directory:** `website/dist/`
- **Build command:** `cd website && npm run check`
- **Dependencies:** Zero runtime npm dependencies (`$0` cost, zero VPS RAM/CPU usage).
- **Path portability:** All internal page and asset links use relative paths so the exact same build works at a domain root (Cloudflare Pages) or a project subpath (GitHub Pages).

Set `SITE_URL` at build time to match the canonical deployment origin:
```bash
SITE_URL="https://ahmed-com.github.io/balkan-open-dns" npm run build
```

---

## 2. Option A — Cloudflare Pages (Free Tier)

1. Connect `https://github.com/Ahmed-com/balkan-open-dns` to Cloudflare Pages (only after explicit owner authorization).
2. Configure build settings:
   - **Root directory:** `website`
   - **Build command:** `SITE_URL="https://<your-pages-domain>" npm run check`
   - **Build output directory:** `dist`
3. Cloudflare Pages automatically applies `website/dist/_headers` (`Content-Security-Policy`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, immutable asset cache).

---

## 3. Option B — GitHub Pages (Free Tier)

1. Enable GitHub Pages in repository settings using **GitHub Actions** as the source (only after explicit owner authorization).
2. Deploy `website/dist/` via `actions/upload-pages-artifact` + `actions/deploy-pages` with `SITE_URL="https://ahmed-com.github.io/balkan-open-dns"`.
3. Note: GitHub Pages does not parse `_headers`; the built HTML includes defense-in-depth `<meta http-equiv="Content-Security-Policy">` and `<meta name="referrer" content="no-referrer">`.
