/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#050505',
        surface: '#0a0a0a',
        panel: '#111111',
        border: 'rgba(255,255,255,0.08)',
        gold: {
          400: '#F3E5AB',
          500: '#D4AF37',
          600: '#AA8C2C',
          neon: '#FFD700',
        },
        platinum: {
          400: '#F5F5F5',
          500: '#E5E4E2',
          600: '#B0B0B0',
        },
        silver: {
          400: '#E0E0E0',
          500: '#C0C0C0',
          600: '#808080',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Syne', 'Inter', 'sans-serif'],
        heading: ['Syne', 'Clash Display', 'Inter', 'sans-serif'],
        cursive: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'neon-gold': '0 0 20px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15)',
        'neon-platinum': '0 0 20px rgba(229,228,226,0.4), 0 0 60px rgba(229,228,226,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card': '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};
