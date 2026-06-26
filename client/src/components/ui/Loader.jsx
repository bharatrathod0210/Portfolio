import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState('loading'); // loading | revealing | done
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => setPhase('revealing'), 400);
          setTimeout(() => setDone(true), 1400);
          return 100;
        }
        // Smoother, slower loading pace for a more premium feel
        const increment = p < 50 ? Math.random() * 5 + 1 : p < 80 ? Math.random() * 3 + 0.5 : Math.random() * 1 + 0.2;
        return Math.min(p + increment, 100);
      });
    }, 50);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050505' }}
        >
          {/* Subtle noise/texture overlay */}
          <div className="absolute inset-0 bg-grid opacity-10" />

          {/* Very soft central glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ opacity: [0.05, 0.15, 0.05], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)' }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-10">
            
            {/* Elegant Typography */}
            <div className="flex flex-col items-center gap-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl font-cursive font-normal tracking-[0.3em] sm:tracking-[0.4em] uppercase"
                style={{
                  background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #E5E4E2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Bharat
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className="text-[9px] sm:text-[10px] font-mono tracking-[0.5em] uppercase text-[#D4AF37] opacity-60"
              >
                MERN Stack Developer
              </motion.p>
            </div>

            {/* Minimalist Progress Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-48 sm:w-64 flex flex-col items-center gap-3 mt-4"
            >
              {/* Thin line track */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                {/* Expanding progress */}
                <motion.div
                  className="absolute inset-y-0 left-0 h-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, transparent, #D4AF37)',
                    boxShadow: '0 0 10px rgba(212,175,55,0.8)',
                  }}
                />
              </div>

              {/* Progress counter */}
              <div className="w-full flex justify-between items-center text-[#D4AF37] opacity-80">
                <span className="text-[9px] font-mono tracking-widest uppercase">Loading</span>
                <span className="text-[10px] font-mono tracking-widest">{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>

          {/* Reveal overlay — smooth split or slide up */}
          <AnimatePresence>
            {phase === 'revealing' && (
              <motion.div
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0, originY: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 z-20"
                style={{ background: '#050505', transformOrigin: 'bottom' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
