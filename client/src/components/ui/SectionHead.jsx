export default function SectionHead({ index, label, title }) {
  return (
    <header className="sec-head" data-reveal>
      <p className="eyebrow"><span className="gold">{index}</span> {label}</p>
      <h2 className="sec-title">{title}</h2>
    </header>
  );
}
