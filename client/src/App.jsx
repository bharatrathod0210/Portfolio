import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';
import { metaFor } from './utils/seo';

// Fades [data-reveal] elements in as they enter the viewport. One shared observer per page.
function useReveal(pathname) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not([data-in])');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-in', '');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

function useRouteEffects() {
  const { pathname, hash } = useLocation();
  useReveal(pathname);

  useEffect(() => {
    document.title = metaFor(pathname).title;
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
}

export default function App() {
  useRouteEffects();
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <div className="progress" aria-hidden="true" />
      <Navbar />
      <main id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
