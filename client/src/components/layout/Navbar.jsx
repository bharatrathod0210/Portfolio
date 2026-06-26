import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { personal } from '../../data/portfolio';
import logo from '../../assets/logo.png';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = navItems.map((item) => ({
        id: item.href.substring(1),
        name: item.name,
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i].name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href, name) => {
    setMobileMenuOpen(false);
    setActiveSection(name);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 3 }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled ? 'glass-card border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent'
          }`}>
            
            {/* Logo */}
            <MagneticButton>
              <button
                onClick={() => scrollTo('#hero', 'Home')}
                className="text-xl font-display font-medium tracking-widest hover:text-[#D4AF37] transition-colors relative group"
              >
                <img src={logo} alt="BR Logo" className="h-10 w-auto object-contain" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </MagneticButton>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.name;
                return (
                  <MagneticButton key={item.name}>
                    <button
                      onClick={() => scrollTo(item.href, item.name)}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navPill"
                          className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </button>
                  </MagneticButton>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <MagneticButton>
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full text-sm font-medium tracking-wide bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-md"
                >
                  Resume
                </a>
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-white block transition-all duration-300"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[2px] bg-white block transition-all duration-300"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-white block transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-void/90 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            <div className="flex flex-col items-center gap-6 z-10">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => scrollTo(item.href, item.name)}
                  className={`text-3xl font-display font-light tracking-widest ${
                    activeSection === item.name ? 'text-cyan-400 text-glow-cyan' : 'text-white/60'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                href={personal.resume}
                target="_blank"
                rel="noreferrer"
                className="mt-8 px-8 py-3 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] font-medium tracking-wider"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
