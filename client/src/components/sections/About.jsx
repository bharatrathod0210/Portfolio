import { personal } from '../../data/portfolio';
import SectionHead from '../ui/SectionHead';

export default function About() {
  const words = personal.bio.split(' ');
  return (
    <section id="about" className="section wrap">
      <SectionHead index="02" label="About" title={<>Close to the code, <em>close to the business.</em></>} />
      <p className="about-text">
        {words.map((word, i) => (
          <span key={i} style={{ '--p': (i / words.length).toFixed(3) }}>{word} </span>
        ))}
      </p>
    </section>
  );
}
