import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import SectionLabel from '../ui/SectionLabel';
import { testimonials } from '../../data/portfolio';

// Double the testimonials for seamless infinite scroll
const extendedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);
  
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="testimonials" className="relative section-padding bg-surface overflow-hidden">
      
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-void via-purple-500/10 to-void blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 mb-16">
        <SectionLabel
          label="Recognition"
          title="Client"
          highlight="Endorsements"
          center
        />
      </div>

      <div className="relative w-full overflow-hidden pb-12 cursor-none">
        
        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

        <motion.div 
          ref={carouselRef}
          className="flex gap-8 px-16 w-max"
          animate={{ x: [0, -width] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: 'paused' }} // Pauses infinite scroll on hover
        >
          {extendedTestimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="w-[350px] md:w-[450px] flex-shrink-0 glass-card p-8 rounded-3xl border border-white/5 relative group hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="absolute -top-6 -right-6 text-9xl font-serif text-white/5 group-hover:text-cyan-400/10 transition-colors pointer-events-none select-none">"</div>
              
              <div className="flex items-center gap-1 mb-6 text-yellow-500">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <FiStar key={idx} fill="currentColor" size={16} className="filter drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                ))}
              </div>
              
              <p className="text-white/70 text-lg leading-relaxed font-light mb-8 min-h-[120px] relative z-10 group-hover:text-white/90 transition-colors">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 relative z-10">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-medium font-display text-white border border-white/20 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${testimonial.color}, #020206)` }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-medium text-white group-hover:text-[#D4AF37] transition-colors">{testimonial.name}</h4>
                  <p className="text-xs font-mono text-white/40">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
