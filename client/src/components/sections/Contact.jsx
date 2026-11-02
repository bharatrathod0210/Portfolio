import { useState } from 'react';
import { personal } from '../../data/portfolio';
import { ArrowUpRight } from '../ui/Icons';

export default function Contact() {
  const [opened, setOpened] = useState(false);

  // There is no backend, so the form hands the message to the visitor's email app.
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = Object.fromEntries(new FormData(e.currentTarget));
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <section id="contact" className="section wrap contact">
      <div data-reveal>
        <p className="eyebrow"><span className="gold">06</span> Contact</p>
        <h2 className="contact-title">Have a project? <em>Let's talk.</em></h2>
        <ul className="contact-list">
          <li><a className="text-link" href={`mailto:${personal.email}`}>{personal.email}</a></li>
          <li><a className="text-link" href={`tel:${personal.phone.replace(/\s/g, '')}`}>{personal.phone}</a></li>
          <li className="muted">{personal.location}</li>
        </ul>
      </div>

      <form className="form" onSubmit={onSubmit} data-reveal style={{ '--d': '80ms' }}>
        <label>
          <span>Your name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Your email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span>What are you building?</span>
          <textarea name="message" rows="4" required />
        </label>
        <button type="submit" className="btn btn-solid">Send message <ArrowUpRight /></button>
        <p className="form-note muted" role="status">
          {opened
            ? `Your email app should have opened with the message ready to send. If it didn't, write to ${personal.email}.`
            : 'This opens your email app with the message filled in.'}
        </p>
      </form>
    </section>
  );
}
