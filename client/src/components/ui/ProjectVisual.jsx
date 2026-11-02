// Real screenshot in a browser frame, or an illustrative UI for projects with no public site.
function Browser({ project, eager }) {
  const { shot, title, live } = project;
  const host = live.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <figure className="browser">
      <figcaption className="browser-bar">
        <i /><i /><i />
        <span>{host}</span>
      </figcaption>
      <div className="browser-view">
        <img
          src={`/img/${shot}-1280.webp`}
          srcSet={`/img/${shot}-720.webp 720w, /img/${shot}-1280.webp 1280w`}
          sizes="(max-width: 860px) 92vw, 60vw"
          width="1280"
          height="800"
          alt={`${title} website homepage`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </figure>
  );
}

function PebackPhone() {
  return (
    <div className="stage" role="img" aria-label="Illustration of the Peback app showing a points balance and a payment that earns points">
      <div className="phone" aria-hidden="true">
        <div className="phone-notch" />
        <p className="ph-hello">Your rewards</p>
        <div className="ph-balance">
          <span>Points balance</span>
          <strong>2,480</strong>
          <em>Use them on your next payment</em>
        </div>
        <div className="ph-toast">+120 points earned</div>
        <p className="ph-label">Recent</p>
        <ul className="ph-list">
          <li><b>Payment</b><span className="up">+120 pts</span></li>
          <li><b>Payment</b><span className="up">+45 pts</span></li>
          <li><b>Points redeemed</b><span>−500 pts</span></li>
        </ul>
        <div className="ph-cta">Pay with points</div>
      </div>
      <span className="stage-note">Illustrative UI</span>
    </div>
  );
}

function BacklinkMonitor() {
  const rows = [
    ['partner-blog.example', 'Live', 'ok'],
    ['news-site.example', 'Live', 'ok'],
    ['directory.example', 'Removed', 'bad'],
    ['review-hub.example', 'Live', 'ok'],
    ['forum.example', 'Unreachable', 'warn'],
  ];
  return (
    <div className="stage" role="img" aria-label="Illustration of a backlink monitor listing links and their status">
      <div className="monitor" aria-hidden="true">
        <div className="mon-head">
          <b>Backlink health</b>
          <span><i className="dot ok" /> Daily check complete</span>
        </div>
        <ul>
          {rows.map(([domain, status, tone]) => (
            <li key={domain} className={tone}>
              <span>{domain}</span>
              <span className="mon-status"><i className={`dot ${tone}`} /> {status}</span>
            </li>
          ))}
        </ul>
      </div>
      <span className="stage-note">Illustrative UI</span>
    </div>
  );
}

export default function ProjectVisual({ project, eager = false }) {
  if (project.visual === 'peback') return <PebackPhone />;
  if (project.visual === 'backlinks') return <BacklinkMonitor />;
  return <Browser project={project} eager={eager} />;
}
