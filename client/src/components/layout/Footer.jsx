import { motion } from 'framer-motion';
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import MagneticButton from '../ui/MagneticButton';
import logo from '../../assets/logo.png';
import { personal } from '../../data/portfolio';

const socials = [
  { icon: FiGithub, href: personal.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
  { icon: FiTwitter, href: personal.twitter, label: 'Twitter' },
  { icon: FiInstagram, href: personal.instagram, label: 'Instagram' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void pt-20 pb-10 border-t border-white/5 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-2 flex items-center justify-center md:justify-start">
              <img src={logo} alt="BR Logo" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-white/40 text-sm font-light">Building Scalable Web Solutions</p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <MagneticButton key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0)] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  <Icon size={20} />
                </a>
              </MagneticButton>
            ))}
          </div>

          {/* Back to Top */}
          <MagneticButton>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
            >
              <span className="text-sm font-mono tracking-widest uppercase">Top</span>
              <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
          </MagneticButton>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-sm text-white/40 font-light">
          <p>
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              Systems Normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
