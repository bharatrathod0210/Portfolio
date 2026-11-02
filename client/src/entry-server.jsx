import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { projects } from './data/portfolio';
import { headTags } from './utils/seo';

export const routes = ['/', ...projects.map((p) => `/projects/${p.slug}`)];
export const headFor = headTags;

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
