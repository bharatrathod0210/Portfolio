import { Link } from 'react-router-dom';
import { ArrowLeft } from '../components/ui/Icons';

export default function NotFound() {
  return (
    <section className="notfound wrap">
      <p className="eyebrow">Error 404</p>
      <h1 className="case-title">This page <em>wandered off.</em></h1>
      <Link to="/" className="btn btn-solid"><ArrowLeft /> Back home</Link>
    </section>
  );
}
