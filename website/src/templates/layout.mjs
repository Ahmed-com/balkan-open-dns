import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FACTS, LOCALES, PAGES } from '../data/site.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAP_DATA = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/balkan-map.json'), 'utf8'),
);

const FOCUS_COUNTRIES = new Set(['BA', 'HR', 'RS', 'AL', 'MK', 'ME', 'XK', 'SI']);

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function pageHref(fromDepth, localeCode, pageSlug) {
  const prefix = fromDepth === 0 ? './' : '../'.repeat(fromDepth);
  return pageSlug ? `${prefix}${localeCode}/${pageSlug}/` : `${prefix}${localeCode}/`;
}

export function assetHref(fromDepth, assetPath) {
  const prefix = fromDepth === 0 ? './' : '../'.repeat(fromDepth);
  return `${prefix}assets/${assetPath}`;
}

function renderPill(pillKey, ui) {
  const cls =
    pillKey === 'verified'
      ? 'pill--verified'
      : pillKey === 'proposed'
        ? 'pill--proposed'
        : pillKey === 'blocked'
          ? 'pill--blocked'
          : 'pill--planned';
  return `<span class="pill ${cls}">${escapeHtml(ui.pills[pillKey] || pillKey)}</span>`;
}

export function renderBalkanMap(ui) {
  const contextPaths = [];
  const focusPaths = [];
  for (const [iso, item] of Object.entries(MAP_DATA.countries)) {
    const isFocus = FOCUS_COUNTRIES.has(iso);
    const fill = isFocus ? '#163256' : '#0e2038';
    const stroke = isFocus ? '#60a5fa' : '#254266';
    const sw = isFocus ? '1.3' : '0.8';
    const el = `<path d="${item.d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"><title>${escapeHtml(item.name)}</title></path>`;
    if (isFocus) focusPaths.push(el);
    else contextPaths.push(el);
  }

  const labelOffsets = {
    Ljubljana: [-56, -8],
    Zagreb: [-10, -10],
    Sarajevo: [-58, 4],
    Belgrade: [9, -5],
    Podgorica: [-64, 10],
    Pristina: [10, -4],
    Skopje: [10, 14],
    Tirana: [-48, 12],
  };

  const cityMarkers = Object.entries(MAP_DATA.cities)
    .map(([city, [cx, cy]]) => {
      const [dx, dy] = labelOffsets[city] || [8, -6];
      return `
        <g>
          <circle cx="${cx}" cy="${cy}" r="7" fill="#60a5fa" opacity="0.22"/>
          <circle cx="${cx}" cy="${cy}" r="3.2" fill="#93c5fd" stroke="#060e1a" stroke-width="1.2"/>
          <text x="${(cx + dx).toFixed(1)}" y="${(cy + dy).toFixed(1)}" fill="#e2e8f0" font-size="11" font-weight="600" font-family="system-ui, sans-serif">${escapeHtml(city)}</text>
        </g>`;
    })
    .join('');

  return `
    <figure class="map-frame">
      <svg viewBox="40 10 560 440" role="img" aria-label="${escapeHtml(ui.map.ariaLabel)}">
        <rect x="40" y="10" width="560" height="440" fill="#060e1a" rx="6"/>
        <g stroke="#10233d" stroke-width="0.6" stroke-dasharray="3 4">
          <line x1="40" y1="110" x2="600" y2="110"/>
          <line x1="40" y1="220" x2="600" y2="220"/>
          <line x1="40" y1="330" x2="600" y2="330"/>
          <line x1="180" y1="10" x2="180" y2="450"/>
          <line x1="320" y1="10" x2="320" y2="450"/>
          <line x1="460" y1="10" x2="460" y2="450"/>
        </g>
        <g>${contextPaths.join('')}</g>
        <g>${focusPaths.join('')}</g>
        ${cityMarkers}
        <g transform="translate(54, 370)">
          <rect x="0" y="0" width="332" height="66" rx="5" fill="#0b1829" fill-opacity="0.93" stroke="#1b365a"/>
          <rect x="12" y="12" width="12" height="10" rx="2" fill="#163256" stroke="#60a5fa"/>
          <text x="30" y="21" fill="#e2e8f0" font-size="10.5" font-family="system-ui, sans-serif">${escapeHtml(ui.map.legendScope)}</text>
          <rect x="12" y="29" width="12" height="10" rx="2" fill="#0e2038" stroke="#254266"/>
          <text x="30" y="38" fill="#cbd5e1" font-size="10.5" font-family="system-ui, sans-serif">${escapeHtml(ui.map.legendContext)}</text>
          <circle cx="18" cy="51" r="3.2" fill="#93c5fd"/>
          <text x="30" y="55" fill="#cbd5e1" font-size="10.5" font-family="system-ui, sans-serif">${escapeHtml(ui.map.legendMarker)}</text>
        </g>
      </svg>
      <figcaption class="map-caption">${escapeHtml(ui.map.caption)}</figcaption>
    </figure>`;
}

function renderPageBody(pageId, dict, depth, locale) {
  const { ui, pages } = dict;
  const p = pages[pageId];

  if (pageId === 'home') {
    const metricsHtml = p.metrics
      .map(
        (m) => `
      <div class="spec-box">
        <span class="spec-box__label">${escapeHtml(m.label)}</span>
        <span class="spec-box__val">${escapeHtml(m.value)}</span>
      </div>`,
      )
      .join('');

    const pillarsHtml = p.pillars
      .map(
        (c) => `
      <article class="card">
        <p>${renderPill(c.pill, ui)}</p>
        <h3>${escapeHtml(c.title)}</h3>
        <p>${escapeHtml(c.body)}</p>
      </article>`,
      )
      .join('');

    const roadmapRowsHtml = p.roadmapRows
      .map(
        ([phase, scope, pillKey, detail]) => `
      <tr>
        <td><strong>${escapeHtml(phase)}</strong></td>
        <td>${escapeHtml(scope)}</td>
        <td>${renderPill(pillKey, ui)}</td>
        <td>${escapeHtml(detail)}</td>
      </tr>`,
      )
      .join('');

    return `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <span class="eyebrow">${escapeHtml(p.eyebrow)}</span>
            <h1>${escapeHtml(p.h1)}</h1>
            <p class="lead">${escapeHtml(p.lead)}</p>
            <div class="btn-row">
              <a class="btn btn-primary" href="${pageHref(depth, locale.code, 'infrastructure')}">${escapeHtml(p.ctaPrimary)}</a>
              <a class="btn btn-secondary" href="${pageHref(depth, locale.code, 'balkan-tld')}">${escapeHtml(p.ctaSecondary)}</a>
            </div>
            <div class="spec-grid">${metricsHtml}</div>
          </div>
          <div>${renderBalkanMap(ui)}</div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <h2 class="section-title">${escapeHtml(p.pillarsTitle)}</h2>
          <p class="section-intro">${escapeHtml(p.pillarsIntro)}</p>
          <div class="grid-3">${pillarsHtml}</div>
        </div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <h2 class="section-title">${escapeHtml(p.roadmapTitle)}</h2>
          <p class="section-intro">${escapeHtml(p.roadmapIntro)}</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Scope</th>
                  <th>Status</th>
                  <th>Verification / Gate</th>
                </tr>
              </thead>
              <tbody>${roadmapRowsHtml}</tbody>
            </table>
          </div>
        </div>
      </section>`;
  }

  const headerBanner = `
    <section class="page-banner">
      <div class="container">
        <h1>${escapeHtml(p.h1)}</h1>
        <p>${escapeHtml(p.subtitle)}</p>
      </div>
    </section>`;

  if (pageId === 'about' || pageId === 'securityPrivacy' || pageId === 'community' || pageId === 'contact') {
    const cardsHtml = p.cards
      .map(
        (c) => `
      <article class="card">
        <h2>${escapeHtml(c.title)}</h2>
        <p>${escapeHtml(c.body)}</p>
      </article>`,
      )
      .join('');
    return `${headerBanner}
      <section class="section">
        <div class="container grid-2">${cardsHtml}</div>
      </section>`;
  }

  if (pageId === 'infrastructure') {
    const specsHtml = p.specs
      .map(
        ([k, v]) => `
      <tr>
        <th>${escapeHtml(k)}</th>
        <td><code>${escapeHtml(v)}</code></td>
      </tr>`,
      )
      .join('');
    const budgetHtml = p.budgetRows
      .map(
        ([comp, ram, disk]) => `
      <tr>
        <td>${escapeHtml(comp)}</td>
        <td>${escapeHtml(ram)}</td>
        <td>${escapeHtml(disk)}</td>
      </tr>`,
      )
      .join('');
    return `${headerBanner}
      <section class="section">
        <div class="container">
          <div class="callout callout--warn">${escapeHtml(p.callout)}</div>
          <div class="table-wrap">
            <table><tbody>${specsHtml}</tbody></table>
          </div>
        </div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <h2 class="section-title">${escapeHtml(p.budgetTitle)}</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Component</th><th>RAM</th><th>Storage</th></tr>
              </thead>
              <tbody>${budgetHtml}</tbody>
            </table>
          </div>
        </div>
      </section>`;
  }

  if (pageId === 'balkanTld') {
    const prereqHtml = p.prereqRows
      .map(
        ([req, st, desc]) => `
      <tr>
        <td><strong>${escapeHtml(req)}</strong></td>
        <td>${escapeHtml(st)}</td>
        <td>${escapeHtml(desc)}</td>
      </tr>`,
      )
      .join('');
    const principlesHtml = p.charterPrinciples.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    return `${headerBanner}
      <section class="section">
        <div class="container">
          <div class="callout callout--warn">${escapeHtml(p.callout)}</div>
          <h2 class="section-title">${escapeHtml(p.prereqTitle)}</h2>
          <div class="table-wrap">
            <table><tbody>${prereqHtml}</tbody></table>
          </div>
        </div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <article class="card">
            <h2>.balkan Charter Principles (Draft Scope)</h2>
            <ul class="clean-list">${principlesHtml}</ul>
          </article>
        </div>
      </section>`;
  }

  if (pageId === 'documentation') {
    const secsHtml = p.sections
      .map(
        (s) => `
      <article class="card">
        <h2>${escapeHtml(s.title)}</h2>
        <p>${escapeHtml(s.body)}</p>
        <pre><code>${escapeHtml(s.code)}</code></pre>
      </article>`,
      )
      .join('');
    const linksHtml = p.docLinks
      .map(
        ([label, rel]) =>
          `<li><a href="${FACTS.repoUrl}/blob/main/${escapeHtml(rel)}" rel="noopener noreferrer">${escapeHtml(label)}</a> (<code>${escapeHtml(rel)}</code>)</li>`,
      )
      .join('');
    return `${headerBanner}
      <section class="section">
        <div class="container grid-2">${secsHtml}</div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <article class="card">
            <h2>${escapeHtml(p.docLinksTitle)}</h2>
            <ul class="clean-list">${linksHtml}</ul>
          </article>
        </div>
      </section>`;
  }

  if (pageId === 'status') {
    const rowsHtml = p.rows
      .map(
        ([comp, pillKey, state, detail]) => `
      <tr>
        <td><strong>${escapeHtml(comp)}</strong></td>
        <td>${renderPill(pillKey, ui)}</td>
        <td>${escapeHtml(state)}</td>
        <td>${escapeHtml(detail)}</td>
      </tr>`,
      )
      .join('');
    const obsHtml = p.observations.map((o) => `<li>${escapeHtml(o)}</li>`).join('');
    return `${headerBanner}
      <section class="section">
        <div class="container">
          <div class="callout callout--warn">${escapeHtml(p.callout)}</div>
          <div class="table-wrap">
            <table><tbody>${rowsHtml}</tbody></table>
          </div>
        </div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <article class="card">
            <h2>${escapeHtml(p.observationsTitle)}</h2>
            <ul class="clean-list">${obsHtml}</ul>
          </article>
        </div>
      </section>`;
  }

  if (pageId === 'faq') {
    const itemsHtml = p.items
      .map(
        (it) => `
      <details class="faq-item">
        <summary>${escapeHtml(it.q)}</summary>
        <p>${escapeHtml(it.a)}</p>
      </details>`,
      )
      .join('');
    return `${headerBanner}
      <section class="section">
        <div class="container faq-list">${itemsHtml}</div>
      </section>`;
  }

  return '';
}

export function renderHtmlPage({ locale, page, dict, siteUrl }) {
  const { ui, pages } = dict;
  const p = pages[page.id];
  const depth = page.slug ? 2 : 1;
  const canonicalUrl = `${siteUrl}/${locale.code}/${page.slug ? page.slug + '/' : ''}`;

  const hreflangs = LOCALES.map((loc) => {
    const url = `${siteUrl}/${loc.code}/${page.slug ? page.slug + '/' : ''}`;
    return `  <link rel="alternate" hreflang="${loc.hreflang}" href="${url}">`;
  }).join('\n');

  const navItems = PAGES.map((pg) => {
    const href = pageHref(depth, locale.code, pg.slug);
    const current = pg.id === page.id ? ' aria-current="page"' : '';
    return `<li><a class="nav-link" href="${href}"${current}>${escapeHtml(ui.nav[pg.id])}</a></li>`;
  }).join('\n            ');

  const langOptions = LOCALES.map((loc) => {
    const href = pageHref(depth, loc.code, page.slug);
    const selected = loc.code === locale.code ? ' selected' : '';
    return `<option value="${href}"${selected}>${escapeHtml(loc.shortLabel)} · ${escapeHtml(loc.nativeName)}</option>`;
  }).join('');

  const footerLinks = PAGES.slice(0, 5)
    .map((pg) => `<li><a href="${pageHref(depth, locale.code, pg.slug)}">${escapeHtml(ui.nav[pg.id])}</a></li>`)
    .join('');

  const footerPolicies = PAGES.slice(5)
    .map((pg) => `<li><a href="${pageHref(depth, locale.code, pg.slug)}">${escapeHtml(ui.nav[pg.id])}</a></li>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="${locale.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'">
  <meta name="referrer" content="no-referrer">
  <title>${escapeHtml(p.title)}</title>
  <meta name="description" content="${escapeHtml(p.description)}">
  <link rel="canonical" href="${canonicalUrl}">
${hreflangs}
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/en/${page.slug ? page.slug + '/' : ''}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(p.title)}">
  <meta property="og:description" content="${escapeHtml(p.description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="icon" type="image/svg+xml" href="${assetHref(depth, 'favicon.svg')}">
  <link rel="stylesheet" href="${assetHref(depth, 'main.css')}">
</head>
<body>
  <a class="skip-link" href="#main-content">${escapeHtml(ui.skipToContent)}</a>
  <div class="notice-bar" role="region" aria-label="Project status notice">
    <div class="container notice-bar__inner">
      <span class="notice-badge">${escapeHtml(ui.noticeBadge)}</span>
      <span>${escapeHtml(ui.noticeText)}</span>
    </div>
  </div>
  <header class="site-header">
    <div class="container">
      <div class="header-row">
        <a class="brand" href="${pageHref(depth, locale.code, '')}">
          <img src="${assetHref(depth, 'favicon.svg')}" alt="" width="34" height="34">
          <span>
            ${escapeHtml(ui.siteName)}
            <span class="brand__sub">${escapeHtml(ui.maintainerLine)}</span>
          </span>
        </a>
        <div class="header-controls">
          <div class="lang-switcher">
            <label for="lang-select">${escapeHtml(ui.langLabel)}</label>
            <select id="lang-select" class="lang-select" aria-label="${escapeHtml(ui.langLabel)}">${langOptions}</select>
          </div>
          <button type="button" class="nav-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-navigation">
            ${escapeHtml(ui.menuButton)}
          </button>
        </div>
      </div>
      <nav id="primary-navigation" class="site-nav" aria-label="${escapeHtml(ui.navLabel)}">
        <ul class="nav-list">
          ${navItems}
        </ul>
      </nav>
    </div>
  </header>
  <main id="main-content">
    ${renderPageBody(page.id, dict, depth, locale)}
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h2>${escapeHtml(ui.footer.aboutTitle)}</h2>
          <p>${escapeHtml(ui.footer.aboutBody)}</p>
          <p><a href="${FACTS.repoUrl}" rel="noopener noreferrer">GitHub Repository</a> · <a href="${FACTS.securityUrl}" rel="noopener noreferrer">Security Advisories</a></p>
        </div>
        <div>
          <h3>${escapeHtml(ui.footer.linksTitle)}</h3>
          <ul class="footer-links">${footerLinks}</ul>
        </div>
        <div>
          <h3>${escapeHtml(ui.footer.policiesTitle)}</h3>
          <ul class="footer-links">${footerPolicies}</ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${escapeHtml(ui.footer.copyright)}</span>
        <span>${escapeHtml(ui.footer.noTracking)}</span>
      </div>
    </div>
  </footer>
  <script src="${assetHref(depth, 'main.js')}" defer></script>
</body>
</html>
`;
}
