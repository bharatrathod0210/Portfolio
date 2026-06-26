import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiSend, FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import SectionLabel from '../ui/SectionLabel';
import GlowOrb from '../ui/GlowOrb';
import MagneticButton from '../ui/MagneticButton';
import api from '../../utils/api';
import { personal } from '../../data/portfolio';

const socials = [
  { icon: FiGithub,    href: personal.github,    label: 'GitHub',    color: '#a855f7' },
  { icon: FiLinkedin,  href: personal.linkedin,   label: 'LinkedIn',  color: '#22d3ee' },
  { icon: FiInstagram, href: personal.instagram,  label: 'Instagram', color: '#ec4899' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    try {
      await api.post('/contact', data);
      toast.success('Message sent! I will get back to you soon.');
      reset();
    } catch {
      toast.error('Failed to send. Please email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative section-padding bg-void overflow-hidden">
      <GlowOrb color="#a855f7" size={500} x="80%" y="30%" opacity={0.08} />
      <GlowOrb color="#22d3ee" size={400} x="10%" y="70%" opacity={0.07} />

      <div className="section-container" ref={ref}>
        <SectionLabel
          label="Get In Touch"
          title="Let's Build"
          highlight="Together"
          subtitle="Have a project in mind? Drop a message and let's create something extraordinary."
          center
        />

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-medium font-display mb-3 tracking-wider">Contact Information</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Open to new projects, creative ideas, and opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <a href={`mailto:${personal.email}`} className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-purple-400 group-hover:border-purple-500/40 group-hover:shadow-neon-purple transition-all flex-shrink-0">
                  <FiMail size={17} />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-mono uppercase tracking-wider">Email</div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors">{personal.email}</div>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${personal.phone}`} className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 transition-all flex-shrink-0">
                  <FiPhone size={17} />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-mono uppercase tracking-wider">Phone</div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors">{personal.phone}</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
                  <FiMapPin size={17} />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-mono uppercase tracking-wider">Location</div>
                  <div className="text-sm text-white/70">{personal.location}</div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <div className="text-xs text-white/30 font-mono uppercase tracking-wider mb-3">Find me on</div>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 transition-all duration-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.boxShadow = `0 0 15px ${color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 glass rounded-2xl p-8 border border-white/5 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Name</label>
                <input
                  placeholder="Your name"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                    errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                  }`}
                  {...register('name', { required: true })}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                    errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                  }`}
                  {...register('email', { required: true })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Subject</label>
              <input
                placeholder="Project Inquiry"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                {...register('subject', { required: true })}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                {...register('message', { required: true })}
              />
            </div>

            <MagneticButton className="w-full">
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend size={15} /> Send Message
                  </>
                )}
              </button>
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
