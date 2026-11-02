import { experience } from '../../data/portfolio';
import SectionHead from '../ui/SectionHead';

export default function Experience() {
  return (
    <section id="experience" className="section wrap">
      <SectionHead index="03" label="Experience" title={<>Where I've <em>worked.</em></>} />
      <ol className="exp-list">
        {experience.map((job) => (
          <li className="exp-row" key={job.id} data-reveal>
            <div className="exp-side">
              <p>{job.duration}</p>
              <p className="muted">{job.type}</p>
            </div>
            <div>
              <h3 className="exp-role">{job.role} <span className="gold">· {job.company}</span></h3>
              <p className="muted">{job.description}</p>
              <ul className="checks">
                {job.achievements.map((a) => <li key={a}>{a}</li>)}
              </ul>
              <ul className="tags">
                {job.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
