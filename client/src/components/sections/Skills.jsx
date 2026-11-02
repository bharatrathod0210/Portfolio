import { skills } from '../../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="section wrap skills" aria-label="Skills">
      {skills.map((group) => (
        <div className="skill-row" key={group.category} data-reveal>
          <h3 className="eyebrow">{group.category}</h3>
          <ul>
            {group.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
