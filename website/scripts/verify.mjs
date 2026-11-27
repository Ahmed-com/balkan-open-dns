import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, PAGES } from '../src/data/site.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function assert(cond, msg) {
  if (!cond) {
    throw new Error(msg);
  }
}

function collectKeyShape(obj, prefix = '') {
  const keys = [];
  if (Array.isArray(obj)) {
    keys.push(`${prefix}[len=${obj.length}]`);
    obj.forEach((item, idx) => {
      if (item && typeof item === 'object') {
        keys.push(...collectKeyShape(item, `${prefix}[${idx}]`));
      }
    });
    return keys;
  }
  for (const [k, v] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') {
      keys.push(...collectKeyShape(v, next));
    } else {
      assert(typeof v === 'string' && v.trim().length > 0, `Empty translation string at ${next}`);
      keys.push(next);
    }
  }
  return keys;
}

// 1. Translation completeness parity across all 6 languages
const baseMod = await import('../src/i18n/en.mjs');
const baseShape = collectKeyShape(baseMod.default).join('\n');
for (const loc of LOCALES) {
  const mod = await import(`../src/i18n/${loc.code}.mjs`);
  const shape = collectKeyShape(mod.default).join('\n');
  assert(shape === baseShape, `Translation key parity mismatch for locale ${loc.code}`);
}
console.log(`[PASS] Translation completeness parity verified across ${LOCALES.length} locales`);

// 2. Verify all required build artifacts & 60 localized pages exist
const requiredStatic = ['index.html', '404.html', 'sitemap.xml', 'robots.txt', '_headers', 'assets/main.css', 'assets/main.js', 'assets/favicon.svg'];
for (const f of requiredStatic) {
  const p = path.join(DIST, f);
  assert(fs.existsSync(p) && fs.statSync(p).size > 0, `Missing static output: ${f}`);
}

const forbiddenPatterns = [
  /google-analytics|googletagmanager|gtag\(|plausible\.io|hotjar/i,
  /ICANN[- ]approved|is currently delegated by OpenNIC|has been approved by OpenNIC|publicly operational .balkan/i,
];

let checkedPages = 0;
let checkedLinks = 0;

for (const loc of LOCALES) {
  for (const page of PAGES) {
    const relDir = page.slug ? path.join(loc.code, page.slug) : loc.code;
    const htmlPath = path.join(DIST, relDir, 'index.html');
    assert(fs.existsSync(htmlPath), `Missing localized HTML: ${htmlPath}`);
    const html = fs.readFileSync(htmlPath, 'utf8');
    checkedPages++;

    assert(html.includes(`<html lang="${loc.htmlLang}">`), `Wrong html lang in ${relDir}`);
    assert(html.includes('<main id="main-content">'), `Missing main landmark in ${relDir}`);
    assert(/<h1>[^<]+<\/h1>/.test(html), `Missing h1 in ${relDir}`);
    assert(html.includes('<link rel="canonical"'), `Missing canonical link in ${relDir}`);
    assert(html.includes('hreflang="x-default"'), `Missing x-default hreflang in ${relDir}`);
    assert(html.includes('class="notice-bar"'), `Missing mandatory .balkan status notice bar in ${relDir}`);

    for (const pat of forbiddenPatterns) {
      assert(!pat.test(html), `Forbidden tracking or status claim matched in ${relDir}`);
    }

    // Validate every relative href/src resolves inside dist
    const refRe = /(?:href|src)="([^"]+)"/g;
    let m;
    while ((m = refRe.exec(html)) !== null) {
      const target = m[1];
      if (target.startsWith('#') || target.startsWith('http://') || target.startsWith('https://')) {
        continue;
      }
      checkedLinks++;
      const cleanTarget = target.split('#')[0].split('?')[0];
      const resolved = path.resolve(path.dirname(htmlPath), cleanTarget);
      const exists =
        fs.existsSync(resolved) ||
        (cleanTarget.endsWith('/') && fs.existsSync(path.join(resolved, 'index.html')));
      assert(exists, `Broken relative asset/page link in ${relDir}: ${target}`);
    }
  }
}

console.log(`[PASS] Verified ${checkedPages} HTML pages, ${checkedLinks} relative links, SEO metadata, and zero forbidden claims.`);
