import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { personal, techStack } from '../../data/portfolio';
import { ArrowDown, ArrowUpRight } from '../ui/Icons';

const stats = [
  { value: personal.yearsExp, label: 'Years building' },
  { value: personal.projectsBuilt, label: 'Projects built' },
  { value: personal.clients, label: 'Clients served' },
];

export default function Hero() {
  const heroRef = useRef(null);

  // Soft glow that follows the pointer. Writes CSS variables only, so nothing re-renders.
  useEffect(() => {
    const hero = heroRef.current;
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
      return undefined;
    }
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--gx', `${e.clientX}px`);
        hero.style.setProperty('--gy', `${e.clientY}px`);
      });
    };
    hero.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow rise"><i className="dot ok pulse" /> {personal.role}</p>
          <h1 className="hero-title">
            <span className="line"><span>I build software</span></span>{' '}
            <span className="line"><span>that businesses</span></span>{' '}
            <span className="line"><span><em>run on.</em></span></span>
          </h1>
          <p className="hero-lead rise" style={{ '--d': '380ms' }}>
            Web apps, mobile apps and payment systems, from the database to the last pixel.
          </p>
          <div className="hero-cta rise" style={{ '--d': '460ms' }}>
            <Link to="/#work" className="btn btn-solid">View my work <ArrowDown /></Link>
            <a href={personal.resume} target="_blank" rel="noreferrer" className="btn btn-line">
              Resume <ArrowUpRight />
            </a>
          </div>
          <dl className="hero-stats rise" style={{ '--d': '540ms' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-photo">
          <img
            src="/img/bharat-960.webp"
            srcSet="/img/bharat-560.webp 560w, /img/bharat-960.webp 960w"
            sizes="(max-width: 860px) 80vw, 42vw"
            width="960"
            height="1009"
            alt={`Portrait of ${personal.name}`}
            fetchpriority="high"
          />
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <ul key={n}>
              {techStack.map((t) => <li key={t}>{t}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
