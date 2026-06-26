import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import SectionLabel from '../ui/SectionLabel';
import GlowOrb from '../ui/GlowOrb';
import api from '../../utils/api';
import { experience as staticExperience } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// ── Single experience card ────────────────────────────────────────────────────
function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;
  const color = exp.color || '#a855f7';
  const achievements = exp.achievements || [];
  const techList = exp.tech || [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col md:flex-row items-start md:items-center justify-between group"
    >
      {/* Timeline node */}
      <div
        className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-12 h-12 rounded-full glass border-2 border-void md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20 transition-all duration-300 group-hover:scale-125"
        style={{
          boxShadow: `0 0 20px ${color}50`,
          borderColor: color,
          background: `${color}15`,
        }}
      >
        <FiBriefcase style={{ color }} size={18} />
      </div>

      {/* Left side — date & company */}
      <div className={`md:w-5/12 mb-6 md:mb-0 pl-24 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'md:order-3 md:pl-16'}`}>
        <div
          className="flex items-center gap-2 font-mono text-sm tracking-wider uppercase mb-2"
          style={{ color, justifyContent: isEven ? 'flex-end' : 'flex-start' }}
        >
          <FiCalendar size={13} />
          {exp.duration}
        </div>
        <h4 className="text-2xl font-medium font-display text-white">{exp.company}</h4>
        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-white/50">
          {exp.type || 'Full-time'}{exp.period ? ` · ${exp.period}` : ''}
        </span>
      </div>

      {/* Center spacer (desktop) */}
      <div className="hidden md:block w-2/12 order-2" />

      {/* Right side — role & details */}
      <div className={`md:w-5/12 pl-24 md:pl-0 ${isEven ? 'md:order-3 md:pl-16' : 'md:text-right md:pr-16'}`}>
        <div className="glass rounded-2xl p-6 border border-white/5 group-hover:border-purple-500/25 transition-all duration-300 relative overflow-hidden">
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)` }}
          />

          <h3 className="text-xl font-medium mb-3 relative z-10" style={{ color }}>
            {exp.role}
          </h3>

          <p className="text-white/50 text-sm leading-relaxed mb-4 font-light relative z-10">
            {exp.description}
          </p>

          {achievements.length > 0 && (
            <ul className="space-y-2 mb-4 relative z-10">
              {achievements.map((a, i) => (
                <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                  <span style={{ color }} className="mt-0.5 flex-shrink-0">▹</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          )}

          {techList.length > 0 && (
            <div className={`flex flex-wrap gap-1.5 relative z-10 ${!isEven ? 'md:justify-end' : ''}`}>
              {techList.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard({ isEven }) {
  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
      <div className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 w-12 h-12 rounded-full bg-white/5 md:-translate-x-1/2 md:-translate-y-1/2 z-20" />
      <div className={`md:w-5/12 mb-6 md:mb-0 pl-24 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'md:order-3 md:pl-16'}`}>
        <div className="h-3 bg-white/5 rounded w-32 mb-2 animate-pulse" />
        <div className="h-6 bg-white/5 rounded w-48 animate-pulse" />
      </div>
      <div className="hidden md:block w-2/12 order-2" />
      <div className={`md:w-5/12 pl-24 md:pl-0 ${isEven ? 'md:order-3 md:pl-16' : 'md:pr-16'}`}>
        <div className="glass rounded-2xl p-6 border border-white/5 space-y-3 animate-pulse">
          <div className="h-5 bg-white/5 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-4/5" />
          <div className="flex gap-2 mt-2">
            {[...Array(3)].map((_, i) => <div key={i} className="h-5 w-16 bg-white/5 rounded" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  // ── Fetch from API ──────────────────────────────────────────────────────────
  useEffect(() => {
    api.get('/experience')
      .then((res) => {
        // Use API data if any exists, otherwise fall back to static
        setExperiences(res.data?.length ? res.data : staticExperience);
      })
      .catch(() => {
        setExperiences(staticExperience);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── GSAP animated timeline line ─────────────────────────────────────────────
  useEffect(() => {
    if (loading || !lineRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <GlowOrb color="#D4AF37" size={500} x="10%" y="30%" opacity={0.05} />
      <GlowOrb color="#E5E4E2" size={400} x="90%" y="70%" opacity={0.04} />

      <div className="section-container">
        <SectionLabel
          label="My Journey"
          title="Work"
          highlight="Experience"
          subtitle="My professional track record building products that matter."
          center
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Animated timeline line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full"
              style={{
                height: '100%',
                background: 'linear-gradient(to bottom, #D4AF37, #E5E4E2, #F3E5AB)',
                boxShadow: '0 0 10px rgba(212,175,55,0.4)',
              }}
            />
          </div>

          <div className="space-y-16">
            {loading
              ? [...Array(3)].map((_, i) => <SkeletonCard key={i} isEven={i % 2 === 0} />)
              : experiences.map((exp, i) => (
                  <ExperienceCard
                    key={exp._id || exp.id}
                    exp={exp}
                    index={i}
                  />
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}
