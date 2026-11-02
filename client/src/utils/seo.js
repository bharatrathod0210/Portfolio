import { personal, projects } from '../data/portfolio';

export const SITE_URL = 'https://bharat-rathod.vercel.app';

export function metaFor(pathname) {
  const project = projects.find((p) => `/projects/${p.slug}` === pathname);
  if (project) {
    return {
      title: `${project.title} — ${personal.name}`,
      description: project.shortDesc,
      path: pathname,
    };
  }
  if (pathname === '/') {
    return {
      title: `${personal.name} — ${personal.role}`,
      description:
        'Bharat Rathod is a full stack and React Native developer building web apps, mobile apps and payment systems with React, Node.js and MongoDB.',
      path: '/',
    };
  }
  return { title: `Page not found — ${personal.name}`, description: 'This page does not exist.', path: null };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function headTags(pathname) {
  const { title, description, path } = metaFor(pathname);
  const url = path ? `${SITE_URL}${path === '/' ? '' : path}` : null;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${SITE_URL}/og.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (url) tags.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`);
  else tags.push(`<meta name="robots" content="noindex" />`);
  if (pathname === '/') {
    tags.push(
      `<link rel="preload" as="image" type="image/webp" href="/img/bharat-960.webp" imagesrcset="/img/bharat-560.webp 560w, /img/bharat-960.webp 960w" imagesizes="(max-width: 860px) 80vw, 42vw" />`,
      `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: personal.name,
        jobTitle: personal.role,
        url: SITE_URL,
        sameAs: [personal.github, personal.linkedin],
      })}</script>`
    );
  }
  return tags.join('\n    ');
}
