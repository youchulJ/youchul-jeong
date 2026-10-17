import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import config from '../astro.config.mjs';

const root = path.resolve('dist');
const base = `/${config.base.split('/').filter(Boolean).join('/')}`.replace(/\/$/, '') + '/';
const origin = 'https://site.invalid';

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith('.html') ? [file] : [];
  }));
  return nested.flat();
}

const pages = await htmlFiles(root);
assert(pages.includes(path.join(root, 'index.html')), 'Home page is missing');
assert(pages.includes(path.join(root, 'journal/index.html')), 'Journal page is missing');
const failures = [];
let checked = 0;
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(root, file).split(path.sep).join('/');
  const pageURL = new URL(base + relative.replace(/index\.html$/, ''), origin);
  for (const match of html.matchAll(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/g)) {
    const value = match[2].replaceAll('&amp;', '&');
    if (!value || value.startsWith('#')) continue;
    const url = new URL(value, pageURL);
    if (url.origin !== origin) continue;
    const label = `${relative}: ${value}`;
    if (!url.pathname.startsWith(base)) {
      failures.push(`${label} escapes the deployment base ${base}`);
      continue;
    }
    const target = path.resolve(root, decodeURIComponent(url.pathname.slice(base.length)));
    if (target !== root && !target.startsWith(root + path.sep)) {
      failures.push(`${label} escapes dist`);
      continue;
    }
    try {
      const info = await stat(target);
      if (info.isDirectory()) await stat(path.join(target, 'index.html'));
      checked++;
    } catch {
      failures.push(`${label} has no generated target`);
    }
  }
}
assert.equal(failures.length, 0, failures.join('\n'));
console.log(`Verified ${pages.length} pages and ${checked} local links/assets under ${base}`);
