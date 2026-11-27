import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, PAGES } from '../src/data/site.mjs';
import { renderHtmlPage, escapeHtml } from '../src/templates/layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = (process.env.SITE_URL || 'https://ahmed-com.github.io/balkan-open-dns').replace(/\/+$/, '');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });

// Copy static assets
fs.copyFileSync(path.join(ROOT, 'src/styles/main.css'), path.join(DIST, 'assets/main.css'));
fs.copyFileSync(path.join(ROOT, 'src/scripts/main.js'), path.join(DIST, 'assets/main.js'));
fs.copyFileSync(path.join(ROOT, 'src/static/favicon.svg'), path.join(DIST, 'assets/favicon.svg'));
fs.copyFileSync(path.join(ROOT, 'src/static/_headers'), path.join(DIST, '_headers'));

// Load translations and generate 60 localized pages
const dicts = {};
for (const loc of LOCALES) {
  const mod = await import(`../src/i18n/${loc.code}.mjs`);
  dicts[loc.code] = mod.default;
}

const sitemapEntries = [];

for (const loc of LOCALES) {
  for (const page of PAGES) {
    const outDir = page.slug ? path.join(DIST, loc.code, page.slug) : path.join(DIST, loc.code);
    fs.mkdirSync(outDir, { recursive: true });
    const html = renderHtmlPage({ locale: loc, page, dict: dicts[loc.code], siteUrl: SITE_URL });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

    const locUrl = `${SITE_URL}/${loc.code}/${page.slug ? page.slug + '/' : ''}`;
    const altLinks = LOCALES.map(
      (a) =>
        `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${SITE_URL}/${a.code}/${page.slug ? page.slug + '/' : ''}"/>`,
    ).join('\n');
    sitemapEntries.push(`  <url>\n    <loc>${locUrl}</loc>\n${altLinks}\n  </url>`);
  }
}

// Root landing / language selector + redirect to ./en/
const langLinks = LOCALES.map(
  (loc) => `<li><a href="./${loc.code}/">${escapeHtml(loc.shortLabel)} · ${escapeHtml(loc.nativeName)}</a></li>`,
).join('\n      ');

const rootIndex = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=./en/">
  <title>Balkan Open DNS — Select Language</title>
  <link rel="canonical" href="${SITE_URL}/en/">
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/">
  <link rel="icon" type="image/svg+xml" href="./assets/favicon.svg">
  <link rel="stylesheet" href="./assets/main.css">
</head>
<body>
  <main id="main-content" class="section">
    <div class="container">
      <h1>Balkan Open DNS</h1>
      <p>Select your language / Odaberite jezik / Zgjidhni gjuhën / Изберете јазик:</p>
      <ul class="clean-list">
      ${langLinks}
      </ul>
    </div>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(DIST, 'index.html'), rootIndex, 'utf8');

const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — Balkan Open DNS</title>
  <link rel="stylesheet" href="/assets/main.css">
</head>
<body>
  <main id="main-content" class="section">
    <div class="container">
      <h1>404 — Page Not Found</h1>
      <p>The requested page does not exist. The proposed .balkan TLD is not active or delegated.</p>
      <p><a href="./en/">Return to Balkan Open DNS (English)</a></p>
    </div>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(DIST, '404.html'), notFoundHtml, 'utf8');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml, 'utf8');

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsTxt, 'utf8');

console.log(`Built ${LOCALES.length * PAGES.length} localized pages into ${DIST}`);
