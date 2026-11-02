// Renders every route to static HTML after the Vite build, so pages paint before any JS loads.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr');

const { render, routes, headFor } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
// Inline the stylesheet so it never blocks first paint.
const template = fs
  .readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/, (_, href) => `<style>${fs.readFileSync(path.join(dist, href), 'utf8')}</style>`);

const write = (file, url) => {
  const html = template
    .replace('<!--app-head-->', () => headFor(url))
    .replace('<!--app-html-->', () => render(url));
  const target = path.join(dist, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  console.log(`prerendered ${url} -> ${file}`);
};

for (const url of routes) {
  write(url === '/' ? 'index.html' : `${url.slice(1)}.html`, url);
}
write('404.html', '/404');

const base = 'https://bharat-rathod.vercel.app';
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((u) => `  <url><loc>${base}${u === '/' ? '' : u}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);

fs.rmSync(ssrDir, { recursive: true, force: true });
