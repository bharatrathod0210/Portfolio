import { personal } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p suppressHydrationWarning>© {new Date().getFullYear()} {personal.name}</p>
        <ul>
          <li><a href={personal.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href={personal.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
}
