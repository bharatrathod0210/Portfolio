import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiDownload, FiMapPin, FiMail, FiArrowRight, FiTerminal } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import photo from '../../assets/photo.jpg';
import SectionLabel from '../ui/SectionLabel';
import MagneticButton from '../ui/MagneticButton';
import { personal } from '../../data/portfolio';

const stats = [
  { value: personal.yearsExp, label: 'Years Experience', glow: '#a855f7' },
  { value: personal.projectsBuilt, label: 'Projects Delivered', glow: '#22d3ee' },
  { value: personal.clients, label: 'Happy Clients', glow: '#6366f1' },
  { value: personal.openSource, label: 'Open Source Contributions', glow: '#f59e0b' },
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="relative section-padding bg-void overflow-hidden">
      {/* Cinematic Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-purple-500/5 blur-[120px] -translate-y-1/2 pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center mb-20">
          <SectionLabel
            label="Who I Am"
            title="Engineering"
            highlight="Digital Excellence"
            center
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 3D Holographic Image Frame */}
          <motion.div 
            style={{ y: y1, opacity }}
            className="lg:col-span-5 relative perspective-2000"
          >
            <div className="relative w-full aspect-[4/5] rounded-3xl preserve-3d group tilt-card">
              {/* Animated Glow Behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-cyan-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Glass Frame */}
              <div className="absolute inset-0 glass-strong border-neon-purple rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                {/* Scanline Effect */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan" style={{ top: '0%' }} />
                </div>
                
                {personal.avatar ? (
                  <img
                    src={photo}
                    alt={personal.name}
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 filter group-hover:filter-none"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-void to-purple-900/20">
                    <FiTerminal size={64} className="text-cyan-400 mb-4 opacity-50" />
                    <img src={logo} alt="BR Logo" className="h-20 w-auto object-contain opacity-80" />
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
              </div>
              
              {/* Floating Element 1 */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-8 top-12 glass-card px-4 py-3 rounded-2xl border-neon-cyan flex items-center gap-3"
              >
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-100">Status: Online</span>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-8 bottom-12 glass-card px-5 py-4 rounded-2xl border-neon-purple"
              >
                <div className="text-2xl font-light text-[#D4AF37]">{personal.projectsBuilt}</div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Projects</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content & Story */}
          <motion.div 
            style={{ y: y2, opacity }}
            className="lg:col-span-7 lg:pl-12"
          >
            <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 blur-[100px] rounded-full" />
              
              <h3 className="text-2xl font-display font-medium mb-6 text-white/90" style={{ letterSpacing: '0.05em' }}>
                Building <span style={{
                 background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'white'
                }}>Scalable</span> Web Applications
              </h3>
              
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6">
                I build high-performance web applications using the MERN stack. From secure payment integrations to robust backend workflows, I deliver professional solutions tailored to business needs.
              </p>
              
              <div className="space-y-4 text-white/60 text-lg leading-relaxed font-light mb-10">
                {personal.bio.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1">Location</div>
                    <div className="text-sm text-white/90 font-medium">{personal.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1">Email</div>
                    <a href={`mailto:${personal.email}`} className="text-sm text-white/90 font-medium hover:text-cyan-400 transition-colors">
                      {personal.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <a href={personal.resume} target="_blank" rel="noreferrer" className="btn-primary text-sm py-3.5">
                    <FiDownload size={16} /> Download CV
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline text-sm py-3.5">
                    Contact Me <FiArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cinematic Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-3xl text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${stat.glow}, transparent)` }} />
              <div 
                className="text-4xl md:text-5xl font-light font-display mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                style={{ color: stat.glow, textShadow: `0 0 20px ${stat.glow}60` }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
