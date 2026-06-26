import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import GlowOrb from '../ui/GlowOrb';
import TechIcon from '../ui/TechIcon';
import { services } from '../../data/portfolio';

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-500 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}12 0%, transparent 70%)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />

      {/* Number watermark */}
      <div className="absolute -top-3 -right-2 text-7xl font-medium font-display text-white/4 select-none pointer-events-none group-hover:text-white/8 transition-colors">
        0{index + 1}
      </div>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 relative overflow-hidden"
        style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{ background: service.color }}
        />
        <TechIcon name={service.iconName} size={26} />
      </div>

      <h3 className="text-lg font-medium font-display mb-2 group-hover:text-gradient transition-all">
        {service.title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
        {service.desc}
      </p>

      {/* Bottom reveal line */}
      <div className="absolute bottom-5 left-6 right-6 h-px bg-white/5 overflow-hidden">
        <div
          className="h-full w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
          style={{ background: `linear-gradient(90deg, transparent, ${service.color})` }}
        />
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative section-padding bg-void overflow-hidden">
      <GlowOrb color="#6366f1" size={500} x="50%" y="50%" opacity={0.06} />

      <div className="section-container">
        <SectionLabel
          label="What I Do"
          title="Premium"
          highlight="Services"
          subtitle="End-to-end development services tailored to your business needs."
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
