import { motion } from 'framer-motion';

export default function SectionLabel({ label, title, highlight, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 ${center ? 'flex flex-col items-center text-center' : ''}`}
    >
      {/* ── Eyebrow label ── */}
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #a855f7)' }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#a855f7' }}>
          {label}
        </span>
        <span className="block h-px w-7 rounded-full" style={{ background: 'linear-gradient(90deg, #a855f7, transparent)' }} />
      </div>

      {/* ── Main title ── */}
      {title && (
        <h2 className={`section-title-wrap ${center ? 'text-center' : ''}`}>
          {/* Plain word — Clash Display */}
          <span className="section-title-plain">{title} </span>

          {/* Highlighted word — Playfair Display italic + gradient */}
          {highlight && (
            <span className="section-title-highlight">{highlight}</span>
          )}
        </h2>
      )}

      {/* ── Subtitle ── */}
      {subtitle && (
        <p className={`mt-4 font-light leading-relaxed text-white/40 ${center ? 'text-center max-w-xl' : 'max-w-xl'}`}
          style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 'clamp(0.875rem, 1.4vw, 1rem)', letterSpacing: '0.01em' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
