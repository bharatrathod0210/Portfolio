import { services } from '../../data/portfolio';
import SectionHead from '../ui/SectionHead';

export default function Services() {
  return (
    <section id="services" className="section wrap">
      <SectionHead index="04" label="Services" title={<>How I can <em>help.</em></>} />
      <ul className="svc-grid">
        {services.map((s, i) => (
          <li className="svc" key={s.title} data-reveal style={{ '--d': `${i * 70}ms` }}>
            <span className="gold svc-n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p className="muted">{s.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
