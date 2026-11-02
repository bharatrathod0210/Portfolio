import Hero from '../components/sections/Hero';
import Work from '../components/sections/Work';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Skills />
      <Experience />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
