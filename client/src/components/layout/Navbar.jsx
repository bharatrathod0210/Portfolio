import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personal } from '../../data/portfolio';

const navItems = [
  { name: 'Work', to: '/#work' },
  { name: 'About', to: '/#about' },
  { name: 'Experience', to: '/#experience' },
  { name: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.key]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav-solid' : ''} ${open ? 'nav-open' : ''}`}>
      <div className="wrap nav-inner">
        <Link to="/" className="brand" aria-label={`${personal.name}, home`}>
          <img src="/img/logo-96.webp" width="36" height="36" alt="" />
          <span>{personal.name}</span>
        </Link>

        <nav id="nav-links" className="nav-links" aria-label="Main">
          {navItems.map((item) => (
            <Link key={item.name} to={item.to}>{item.name}</Link>
          ))}
          <a className="nav-resume" href={personal.resume} target="_blank" rel="noreferrer">Resume</a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
