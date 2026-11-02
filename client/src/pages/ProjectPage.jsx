import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/portfolio';
import ProjectVisual from '../components/ui/ProjectVisual';
import { ArrowUpRight, ArrowLeft } from '../components/ui/Icons';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFound />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="case wrap" key={project.slug}>
      <Link to="/#work" className="back">
        <ArrowLeft /> All work
      </Link>

      <header className="case-head">
        <p className="eyebrow rise">{project.category}</p>
        <h1 className="case-title rise" style={{ '--d': '60ms' }}>{project.title}</h1>
        <p className="case-lead rise" style={{ '--d': '120ms' }}>{project.shortDesc}</p>
      </header>

      <div className="case-visual rise" style={{ '--d': '180ms' }}>
        <ProjectVisual project={project} eager />
      </div>

      <div className="case-grid">
        <aside className="case-meta">
          <div>
            <h2 className="eyebrow">Stack</h2>
            <ul className="tags">
              {project.tech.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Link</h2>
            {project.live ? (
              <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
                Visit live site <ArrowUpRight />
              </a>
            ) : (
              <p className="muted">{project.linkNote || 'Not publicly available'}</p>
            )}
          </div>
        </aside>

        <div className="case-body">
          <section>
            <h2 className="eyebrow">Overview</h2>
            <p className="case-desc">{project.description}</p>
          </section>
          {project.highlights.map((block) => (
            <section key={block.title}>
              <h2 className="eyebrow">{block.title}</h2>
              <ul className="checks">
                {block.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <Link to={`/projects/${next.slug}`} className="next">
        <span className="eyebrow">Next project</span>
        <span className="next-title">{next.title} <ArrowUpRight /></span>
      </Link>
    </article>
  );
}
