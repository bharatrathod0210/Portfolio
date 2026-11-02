import { Link } from 'react-router-dom';
import { projects } from '../../data/portfolio';
import SectionHead from '../ui/SectionHead';
import ProjectVisual from '../ui/ProjectVisual';
import { ArrowUpRight } from '../ui/Icons';

export default function Work() {
  return (
    <section id="work" className="section wrap">
      <SectionHead index="01" label="Selected work" title={<>Six products, <em>shipped.</em></>} />
      <div className="work-list">
        {projects.map((project, i) => (
          <article className="work-card" key={project.slug} style={{ '--i': i }}>
            <div className="work-info">
              <p className="eyebrow"><span className="gold">{String(i + 1).padStart(2, '0')}</span> {project.category}</p>
              <h3 className="work-title">
                <Link to={`/projects/${project.slug}`} className="work-link">{project.title}</Link>
              </h3>
              <p className="muted">{project.shortDesc}</p>
              <ul className="tags">
                {project.tech.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
              </ul>
              <span className="text-link" aria-hidden="true">View case study <ArrowUpRight /></span>
            </div>
            <div className="work-visual">
              <ProjectVisual project={project} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
