import { useState, useEffect, useRef, forwardRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight, FiFolder } from 'react-icons/fi';
import SectionLabel from '../ui/SectionLabel';
import GlowOrb from '../ui/GlowOrb';
import MagneticButton from '../ui/MagneticButton';
import { projects as staticProjects, personal } from '../../data/portfolio';

const CATEGORIES = ['All', 'fullstack', 'frontend', 'backend', 'mobile', 'other'];

// ── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard = forwardRef(({ project, index }, forwardedRef) => {
  const localRef = useRef(null);
  const ref = forwardedRef || localRef;
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const color = project.color || '#D4AF37';
  const techList = project.techStack || project.tech || [];
  const coverImage = project.images?.[0]?.url || project.image || null;
  const liveUrl = project.liveLink || project.live || '';
  const githubUrl = project.githubLink || project.github || '';
  const shortText = project.shortDesc || project.description || '';

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 18,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -18,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(12px)`
          : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
        transition: 'transform 0.25s ease',
      }}
      className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 holographic-border"
    >
      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, ${color}18 0%, transparent 65%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/3">
        {coverImage ? (
          <img
            src={coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: `${color}10` }}
          >
            <FiFolder size={40} style={{ color, opacity: 0.4 }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium"
            style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
          >
            ★ Featured
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37]/40 transition-all"
              aria-label="Live demo"
            >
              <FiExternalLink size={16} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37]/40 transition-all"
              aria-label="GitHub"
            >
              <FiGithub size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-xs font-mono capitalize" style={{ color }}>
              {project.category}
            </span>
            <h3 className="text-lg font-medium font-display mt-0.5 group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <FiArrowRight
            size={16}
            className="text-white/20 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
          />
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
          {shortText}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {techList.slice(0, 4).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
          {techList.length > 4 && (
            <span className="tech-tag">+{techList.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/5 animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-white/5 rounded w-1/4" />
        <div className="h-5 bg-white/5 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
        <div className="flex gap-2 mt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 w-14 bg-white/5 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Directly use static projects
  const projects = staticProjects;

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Only show categories that actually have projects
  const availableCategories = ['All', ...new Set(projects.map((p) => p.category))];

  return (
    <section id="projects" className="relative section-padding bg-transparent overflow-hidden">
      <GlowOrb color="#D4AF37" size={600} x="90%" y="20%" opacity={0.05} />
      <GlowOrb color="#E5E4E2" size={400} x="5%" y="80%" opacity={0.04} />

      <div className="section-container">
        <SectionLabel
          label="My Work"
          title="Featured"
          highlight="Projects"
          subtitle="A selection of projects that showcase my full-stack engineering capabilities."
          center
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5E4E2] text-void shadow-neon-gold'
                  : 'glass border border-white/10 text-white/40 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-lg">No projects in this category yet.</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project._id || project.id}
                  project={project}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <div className="mt-16 flex justify-center">
          <MagneticButton>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <FiGithub size={16} />
              View All Projects on GitHub
              <FiArrowRight size={14} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
