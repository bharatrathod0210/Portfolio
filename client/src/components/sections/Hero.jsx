import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode, FiDatabase, FiServer, FiLayers } from 'react-icons/fi';
import gsap from 'gsap';
import MagneticButton from '../ui/MagneticButton';
import { personal } from '../../data/portfolio';
import logo from '../../assets/logo.png';
import photo from '../../assets/photo1.png';

const socials = [
  { icon: FiGithub, href: personal.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
];

const stats = [
  { value: '2+', label: 'Years Exp.' },
  { value: '30+', label: 'Projects' },
  { value: '15+', label: 'Clients' },
];

const techPills = [
  { icon: FiCode, name: 'React.js', color: '#61DAFB' },
  { icon: FiServer, name: 'Node.js', color: '#68A063' },
  { icon: FiDatabase, name: 'MongoDB', color: '#47A248' },
  { icon: FiLayers, name: 'Next.js', color: '#E5E4E2' },
];

// Variants
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
};
const rightPanelVariants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 } },
};

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power3.out',
        delay: 1.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-32 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #E5E4E2 0%, transparent 65%)' }}
        />
        {/* Right-side subtle glow for the card */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Two-column layout ── */}
      <div className="section-container relative z-10 w-full pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ═══════════ LEFT COLUMN ═══════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Top badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.04]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]" />
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]/80">
                  Available for work
                </span>
              </div>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} className="mb-8">
              <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-white/30 mb-5">
                Full Stack Developer
              </p>
              <h1
                className="font-display font-extralight leading-[1.0] mb-6"
                style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }}
              >
                <span className="text-white/90">Bharat</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9A227 70%, #E5E4E2 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradientShift 8s ease infinite',
                  }}
                >
                  Rathod
                </span>
              </h1>
              <div
                className="hero-divider h-px w-24 mb-0"
                style={{ background: 'linear-gradient(90deg, #D4AF37, #E5E4E2, transparent)' }}
              />
            </motion.div>

            {/* Typewriter + description */}
            <motion.div variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
                <div
                  className="font-mono text-sm tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #E5E4E2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    minHeight: '1.4em',
                  }}
                >
                  <TypeAnimation
                    sequence={[
                      'MERN Stack Developer',
                      2500,
                      'Full Stack Engineer',
                      2500,
                      'Payment Integration Expert',
                      2500,
                      'Backend Architect',
                      2500,
                    ]}
                    wrapper="span"
                    cursor
                    repeat={Infinity}
                  />
                </div>
              </div>
              <p className="text-white/40 text-base leading-[1.8] font-light tracking-wide max-w-lg">
                2+ years building high-performance web applications with the MERN stack.
                From robust backend systems to seamless, production-ready interfaces.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-12">
              <MagneticButton>
                <button
                  type="button"
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide text-[#050505] transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E5E4E2 100%)',
                    boxShadow: '0 0 30px rgba(212,175,55,0.2)',
                  }}
                >
                  View Projects
                  <FiExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  type="button"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide text-white/70 border border-white/10 hover:border-[#D4AF37]/40 hover:text-white hover:bg-[#D4AF37]/5 transition-all duration-300"
                >
                  Get in Touch
                </button>
              </MagneticButton>
            </motion.div>

            {/* Stats + Socials */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex items-center gap-8">
                {stats.map(({ value, label }, i) => (
                  <div key={i} className="flex flex-col">
                    <span
                      className="text-2xl font-light tracking-tight"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, #E5E4E2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {value}
                    </span>
                    <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase mt-0.5">{label}</span>
                  </div>
                ))}
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <MagneticButton key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                    >
                      <Icon size={15} />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ═══════════ RIGHT COLUMN — Luxury Editorial Card ═══════════ */}
          <motion.div
            variants={rightPanelVariants}
            initial="hidden"
            animate="show"
            className="relative hidden lg:flex items-center justify-center min-h-[560px]"
          >

            {/* ── Main portrait card ── */}
            <div className="relative w-[320px] h-[440px]">

              {/* Outer ambient glow */}
              <div
                className="absolute -inset-4 rounded-[2.5rem] opacity-25 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }}
              />

              {/* Card shell */}
              <div
                className="relative w-full h-full rounded-[2rem] overflow-hidden"
                style={{
                  border: '1px solid rgba(212,175,55,0.25)',
                  background: 'linear-gradient(160deg, rgba(212,175,55,0.06) 0%, rgba(5,5,5,0.9) 60%)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.15)',
                }}
              >
                {/* Photo */}
                <img
                  src={photo}
                  alt={personal.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="eager"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(5,5,5,0.05) 0%, rgba(5,5,5,0.0) 30%, rgba(5,5,5,0.55) 65%, rgba(5,5,5,0.95) 100%)',
                  }}
                />

                {/* Scanline sweep */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)' }}
                  animate={{ top: ['-5%', '110%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
                />

                {/* Corner brackets */}
                {[
                  { top: 14, left: 14, rotate: 0 },
                  { top: 14, right: 14, rotate: 90 },
                  { bottom: 14, left: 14, rotate: 270 },
                  { bottom: 14, right: 14, rotate: 180 },
                ].map((pos, i) => {
                  const { rotate, ...style } = pos;
                  return (
                    <div key={i} className="absolute w-5 h-5 pointer-events-none" style={style}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M0 7 L0 0 L7 0"
                          stroke="rgba(212,175,55,0.65)"
                          strokeWidth="1.5"
                          fill="none"
                          style={{ transform: `rotate(${rotate}deg)`, transformOrigin: '50% 50%' }}
                        />
                      </svg>
                    </div>
                  );
                })}

                {/* Bottom nameplate */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-mono tracking-[0.35em] uppercase text-white/25 mb-1">
                        Full Stack Developer
                      </p>
                      <h3
                        className="text-lg font-light tracking-wide"
                        style={{
                          background: 'linear-gradient(135deg, #F3E5AB, #D4AF37)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Bharat Rathod
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-50" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]" />
                      </span>
                      <span className="text-[8px] font-mono text-white/25 tracking-widest">AVAILABLE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top decorative accent line */}
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.35))' }}
              />
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6"
                style={{ background: 'linear-gradient(to top, transparent, rgba(212,175,55,0.35))' }}
              />

            </div>

            {/* ── Floating skill bars — RIGHT ── */}
            {[
              { name: 'React.js', level: 95, color: '#61DAFB', delay: 0 },
              { name: 'Node.js',  level: 90, color: '#68A063', delay: 0.3 },
              { name: 'MongoDB',  level: 88, color: '#47A248', delay: 0.6 },
              { name: 'Next.js',  level: 85, color: '#D4AF37', delay: 0.9 },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: skill.delay }}
                className="absolute"
                style={{ right: '-148px', top: `${13 + i * 22}%` }}
              >
                <div
                  className="px-4 py-2.5 rounded-xl w-[132px]"
                  style={{
                    background: 'rgba(8,8,8,0.88)',
                    border: '1px solid rgba(212,175,55,0.14)',
                    backdropFilter: 'blur(24px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-white/55">{skill.name}</span>
                    <span className="text-[9px] font-mono" style={{ color: skill.color }}>{skill.level}%</span>
                  </div>
                  <div className="w-full h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: 1 + skill.delay, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* ── Floating stat chips — LEFT ── */}
            {[
              { value: '2+',  label: 'Years',    delay: 0,   top: '18%' },
              { value: '30+', label: 'Projects', delay: 0.4, top: '45%' },
              { value: '15+', label: 'Clients',  delay: 0.8, top: '72%' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: stat.delay }}
                className="absolute"
                style={{ left: '-96px', top: stat.top }}
              >
                <div
                  className="px-4 py-3 rounded-xl text-center w-[76px]"
                  style={{
                    background: 'rgba(8,8,8,0.88)',
                    border: '1px solid rgba(212,175,55,0.16)',
                    backdropFilter: 'blur(24px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    className="text-lg font-light leading-none mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #E5E4E2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[8px] font-mono text-white/25 tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}

          </motion.div>

        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.button
        type="button"
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-none"
      >
        <div className="w-px h-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)' }}
            animate={{ y: ['-100%', '250%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/25 group-hover:text-[#D4AF37]/60 transition-colors">
          Scroll
        </span>
      </motion.button>
    </section>
  );
}
