// ─── Bharat Rathod — Portfolio Data ───────────────────────────────────────────

export const personal = {
  name: 'Bharat Rathod',
  role: 'Full Stack Developer',
  tagline: 'Building scalable web applications',
  bio: `I'm a passionate Full Stack Developer specializing in the MERN stack. 
I craft scalable, performant, and secure web applications that solve 
real-world problems. From efficient databases to robust backend architectures — 
I build professional applications that make an impact.`,
  location: 'India',
  email: 'bharat.rathod0210@gmail.com',
  phone: '+91 9898515206',
  github: 'https://github.com/bharatrathod0210',
  linkedin: 'https://www.linkedin.com/in/bharat-rathod-876b2a288',
  instagram: 'https://instagram.com/bharat_0210',
  resume: 'https://drive.google.com/file/d/1KqTegEr2FxWOVz3W-5o8imbchb8azs4C/view?usp=drive_link',
  avatar: '/src/assets/photo.jpg',
  yearsExp: '2+',
  projectsBuilt: '30+',
  clients: '15+',
  openSource: '5+',
};

export const skills = [
  // Frontend
  { name: 'React.js',      category: 'Frontend', level: 95 },
  { name: 'Next.js',       category: 'Frontend', level: 88 },
  { name: 'TypeScript',    category: 'Frontend', level: 82 },
  { name: 'Tailwind CSS',  category: 'Frontend', level: 95 },
  { name: 'Framer Motion', category: 'Frontend', level: 80 },
  { name: 'Three.js',      category: 'Frontend', level: 70 },
  { name: 'GSAP',          category: 'Frontend', level: 75 },
  // Backend
  { name: 'Node.js',       category: 'Backend',  level: 90 },
  { name: 'Express.js',    category: 'Backend',  level: 90 },
  { name: 'REST APIs',     category: 'Backend',  level: 92 },
  { name: 'GraphQL',       category: 'Backend',  level: 68 },
  { name: 'Socket.io',     category: 'Backend',  level: 75 },
  { name: 'JWT Auth',      category: 'Backend',  level: 88 },
  // Payments
  { name: 'Razorpay',      category: 'Payments', level: 90 },
  { name: 'Stripe',        category: 'Payments', level: 88 },
  { name: 'NMI',           category: 'Payments', level: 85 },
  // Database
  { name: 'MongoDB',       category: 'Database', level: 88 },
  { name: 'PostgreSQL',    category: 'Database', level: 72 },
  { name: 'Redis',         category: 'Database', level: 65 },
  // DevOps
  { name: 'Git & GitHub',  category: 'DevOps',   level: 92 },
  { name: 'Docker',        category: 'DevOps',   level: 68 },
  { name: 'Vercel',        category: 'DevOps',   level: 90 },
  { name: 'AWS S3',        category: 'DevOps',   level: 70 },
];

export const techStack = [
  'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB',
  'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js', 'Docker',
  'AWS', 'NMI', 'Razorpay', 'Framer Motion'
];

export const projects = [
  {
    id: 1,
    title: 'Cloud Job Manager',
    shortDesc: 'US-based end-to-end job management system with complete workflow automation.',
    description: 'A comprehensive US-based job management platform featuring multiple roles (Company, Worker, Customer, Super Admin). Integrates NMI payment processing and Dropbox for digital signatures. The system handles the complete lifecycle: Company creates quotes -> converts to contracts -> assigns to workers -> generates invoices upon completion.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'NMI', 'Dropbox API'],
    category: 'fullstack',
    featured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    live: 'http://cloudjobmanager.com',
    github: '', 
    color: '#D4AF37', 
  },
  {
    id: 2,
    title: 'Track Backlinks',
    shortDesc: 'Automated cron-based backlink validation and tracking system.',
    description: 'A robust backlink validation tool that automatically checks if company advertisements and backlinks exist on third-party sites. Utilizing daily cron jobs, it actively monitors link health and immediately warns users if their backlinks are removed or unreachable.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Cron Jobs', 'Puppeteer'],
    category: 'backend',
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    live: 'http://trackbacklinks.io',
    github: '',
    color: '#E5E4E2', 
  },
  {
    id: 3,
    title: 'Feohs',
    shortDesc: 'Scholarship grant platform with integrated API marketplace.',
    description: 'A platform dedicated to scholarship grants, featuring seamless Razorpay integration for user grant applications. Additionally, it includes a robust API marketplace where developers can generate API keys to consume Feohs APIs directly within their own software ecosystems.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'API Gateway'],
    category: 'fullstack',
    featured: true,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    live: 'http://feohs.com',
    github: '',
    color: '#C0C0C0', 
  }
];

export const experience = [
  {
    id: 1,
    role: 'MERN Stack Developer',
    company: 'Feohs Information',
    type: 'Full-time',
    duration: 'Sept 2025 — Present',
    period: 'Present',
    description: 'Leading the development of Feohs.com, a scholarship grant platform. Architected the API marketplace allowing developers to generate API keys and consume services. Integrated Razorpay for seamless grant applications and payments.',
    achievements: [
      'Architected a highly scalable API marketplace for third-party developers',
      'Integrated Razorpay processing for thousands of grant applications',
      'Optimized backend services for high concurrency and low latency',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay'],
    color: '#D4AF37',
  },
  {
    id: 2,
    role: 'MERN Stack Developer',
    company: 'Sparrow Softtech',
    type: 'Full-time',
    duration: 'May 2024 — July 2025',
    period: '1 year 3 mos',
    description: 'Developed and maintained robust full-stack applications. Spearheaded the development of Cloud Job Manager, handling end-to-end workflows from quote creation to invoicing. Integrated complex third-party services like NMI payments and Dropbox.',
    achievements: [
      'Built Cloud Job Manager handling multi-role US-based workflows',
      'Integrated NMI payment gateway for secure transaction processing',
      'Implemented automated cron jobs for Trackbacklinks platform',
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Cron', 'Dropbox API'],
    color: '#E5E4E2',
  }
];

export const services = [
  {
    iconName: 'React.js',
    title: 'MERN Development',
    desc: 'Full-stack applications built with MongoDB, Express, React, and Node.js. Scalable, performant, production-ready.',
    color: '#D4AF37',
  },
  {
    iconName: 'Next.js',
    title: 'Frontend Engineering',
    desc: 'Responsive and dynamic user interfaces using React and Next.js, tailored for professional business solutions.',
    color: '#E5E4E2',
  },
  {
    iconName: 'Node.js',
    title: 'Backend & APIs',
    desc: 'Robust REST APIs, microservices architecture, automated cron jobs, and database optimization.',
    color: '#C0C0C0',
  },
  {
    iconName: 'Razorpay',
    title: 'Payment Integration',
    desc: 'Seamless payment gateway integration — NMI, Razorpay, Stripe. Subscriptions, webhooks, refunds.',
    color: '#D4AF37',
  },
];

export const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Operations Manager, US Services',
    avatar: 'SJ',
    text: 'Bharat completely automated our workflow with the Cloud Job Manager. The Dropbox and NMI integrations were flawless. Our efficiency has skyrocketed.',
    rating: 5,
    color: '#D4AF37',
  },
  {
    name: 'Michael Chen',
    role: 'Founder, Feohs',
    avatar: 'MC',
    text: 'The API marketplace Bharat built for us is incredible. It is secure, scalable, and exactly what we needed to expand our grant platform ecosystem.',
    rating: 5,
    color: '#E5E4E2',
  },
];
