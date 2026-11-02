import { testimonials } from '../../data/portfolio';
import SectionHead from '../ui/SectionHead';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section wrap">
      <SectionHead index="05" label="Testimonials" title={<>What clients <em>say.</em></>} />
      <div className="quotes">
        {testimonials.map((t, i) => (
          <figure className="quote" key={t.name} data-reveal style={{ '--d': `${i * 80}ms` }}>
            <blockquote>{t.text}</blockquote>
            <figcaption><b>{t.name}</b><span className="muted">{t.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
