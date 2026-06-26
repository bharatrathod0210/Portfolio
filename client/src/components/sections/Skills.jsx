import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import GlowOrb from '../ui/GlowOrb';
import TechIcon from '../ui/TechIcon';
import { skills } from '../../data/portfolio';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Payments', 'Database', 'DevOps'];

// ── Skill card with logo + animated bar ──────────────────────────────────────
function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group glass rounded-xl p-4 border border-white/5 hover:border-purple-500/25 transition-all duration-300"
    >
      {/* Logo + name row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/8 transition-colors">
          <TechIcon name={skill.name} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors truncate">
              {skill.name}
            </span>
            <span className="text-xs font-mono text-purple-400 ml-2 flex-shrink-0">
              {skill.level}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.1, delay: 0.3 + index * 0.04, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #a855f7, #22d3ee)',
            boxShadow: '0 0 8px rgba(168,85,247,0.5)',
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Scrolling tech logo strip ─────────────────────────────────────────────────
function TechStrip() {
  const strip = [...skills, ...skills]; // duplicate for seamless loop
  return (
    <div className="relative mt-20 py-6 border-y border-white/5 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {strip.map((skill, i) => (
          <div key={i} className="flex items-center gap-3 text-white/25 hover:text-white/60 transition-colors flex-shrink-0">
            <TechIcon name={skill.name} size={18} />
            <span className="text-sm font-mono font-medium tracking-wide">{skill.name}</span>
            <span className="text-purple-500/30 text-xs">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative section-padding overflow-hidden" style={{ background: '#050508' }}>
      <GlowOrb color="#6366f1" size={500} x="80%" y="20%" opacity={0.07} />
      <GlowOrb color="#a855f7" size={400} x="10%" y="70%" opacity={0.06} />

      <div className="section-container" ref={ref}>
        <SectionLabel
          label="Expertise"
          title="Technical"
          highlight="Arsenal"
          subtitle="Technologies and tools I use to architect and build high-performance digital products."
          center
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                  : 'glass border border-white/10 text-white/40 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>

        {/* Scrolling strip */}
        <TechStrip />
      </div>
    </section>
  );
}
