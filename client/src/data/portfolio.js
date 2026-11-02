// ─── Bharat Rathod — Portfolio Data ───────────────────────────────────────────

export const personal = {
  name: 'Bharat Rathod',
  role: 'Full Stack & React Native Developer',
  tagline: 'Building scalable web applications',
  bio: `I'm a full stack developer who works across the MERN stack and React Native. I build scalable, secure products that solve real business problems, from database design and backend architecture to payment flows and the interfaces people use every day.`,
  location: 'India',
  email: 'bharat.rathod0210@gmail.com',
  phone: '+91 9898515206',
  github: 'https://github.com/bharatrathod0210',
  linkedin: 'https://www.linkedin.com/in/bharat-rathod-876b2a288',
  instagram: 'https://instagram.com/bharat_0210',
  resume: 'https://drive.google.com/file/d/1KqTegEr2FxWOVz3W-5o8imbchb8azs4C/view?usp=drive_link',
  yearsExp: '2+',
  projectsBuilt: '30+',
  clients: '15+',
};

export const skills = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP'] },
  { category: 'Mobile', items: ['React Native'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io', 'JWT Auth'] },
  { category: 'Payments', items: ['Razorpay', 'Stripe', 'NMI'] },
  { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Redis'] },
  { category: 'DevOps', items: ['Git & GitHub', 'Docker', 'Vercel', 'AWS S3'] },
];

export const techStack = [
  'React.js', 'React Native', 'Next.js', 'Node.js', 'Express.js', 'MongoDB',
  'TypeScript', 'Tailwind CSS', 'Razorpay', 'Stripe', 'NMI', 'Docker', 'AWS',
];

export const projects = [
  {
    slug: 'cloud-job-manager',
    title: 'Cloud Job Manager',
    category: 'Full stack · SaaS',
    shortDesc: 'US-based job management system that runs the whole workflow, from first quote to final invoice.',
    description:
      'A job management platform for US service companies, with separate experiences for Company, Worker, Customer and Super Admin. It handles the complete lifecycle: a company creates a quote, converts it to a contract, assigns it to workers and generates the invoice on completion. NMI handles payment processing and Dropbox handles digital signatures.',
    highlights: [
      {
        title: 'End-to-end workflow',
        items: ['Quotes convert into contracts', 'Contracts are assigned to workers as jobs', 'Invoices are generated when work is completed'],
      },
      {
        title: 'Roles and integrations',
        items: ['Company, Worker, Customer and Super Admin roles', 'NMI payment processing', 'Dropbox digital signatures on documents'],
      },
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'NMI', 'Dropbox API'],
    shot: 'cloudjob',
    live: 'https://cloudjobmanager.com',
  },
  {
    slug: 'peback',
    title: 'Peback',
    category: 'Mobile app · Rewards',
    shortDesc: 'React Native payments app where every payment earns points that users can spend on their next one.',
    description:
      'Peback is a rewards-driven payments app built in React Native. Users sign in, pay through the app and earn points on their payments. Those points then work as value at checkout, so they can be applied against future payments. The full payment gateway is integrated, which makes the loop from payment to reward to redemption work inside the app.',
    highlights: [
      {
        title: 'The rewards loop',
        items: ['Users earn points when they pay through the app', 'Points build up in their account', 'Points can be redeemed on later payments'],
      },
      {
        title: 'App foundations',
        items: ['Mobile app built with React Native', 'User login and accounts', 'Full payment gateway integration'],
      },
    ],
    tech: ['React Native', 'Payment Gateway', 'User Auth', 'Rewards System'],
    visual: 'peback',
    linkNote: 'Mobile app, no public link yet',
  },
  {
    slug: 'annakshetram',
    title: 'Annakshetram',
    category: 'E-commerce · Admin panel',
    shortDesc: 'Complete e-commerce store for organic Satvik food, with Razorpay checkout and a full admin panel to run it.',
    description:
      'Annakshetram sells organic, preservative-free Satvik food and ready-to-use masalas online. The storefront takes a customer from browsing to a paid order, and a dedicated admin panel lets the business manage everything behind it without touching code: products, orders, refunds, delivery charges, banners and reviews.',
    highlights: [
      {
        title: 'Storefront',
        items: [
          'Category browsing and detailed product pages',
          'Cart drawer, customer accounts and order history',
          'Address and payment checkout with delivery charges by location',
          'Razorpay payments with verification and failed-payment handling',
          'Customer reviews and WhatsApp contact',
        ],
      },
      {
        title: 'Admin panel',
        items: [
          'Dashboard with sales metrics such as average order value and completion rate',
          'Product and category management',
          'Order status tracking and refunds',
          'Homepage banners, review moderation and user management',
          'Shipping charges and store settings',
          'Payment logs and application logs',
        ],
      },
    ],
    tech: ['React', 'REST API', 'Razorpay', 'Cloudinary', 'Render'],
    shot: 'annakshetram',
    live: 'https://apiszen.com/Annakshetram/',
  },
  {
    slug: 'feohs',
    title: 'Feohs',
    category: 'Full stack · API marketplace',
    shortDesc: 'Grant discovery platform with Razorpay-powered applications and an API marketplace for developers.',
    description:
      'Feohs helps people and organisations find verified grants and funding matched to their eligibility. Applications are paid through Razorpay, and a built-in API marketplace lets developers generate API keys and use Feohs APIs inside their own software.',
    highlights: [
      {
        title: 'Grant platform',
        items: ['Grant discovery and applications', 'Razorpay integration for application payments'],
      },
      {
        title: 'API marketplace',
        items: ['Developers generate their own API keys', 'Feohs APIs can be consumed from third-party software'],
      },
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'API Gateway'],
    shot: 'feohs',
    live: 'https://feohs.com',
  },
  {
    slug: 'apiszen',
    title: 'Apiszen',
    category: 'Website · React & Node',
    shortDesc: 'Corporate website for a software and ERP consulting agency, built with React and Node.js.',
    description:
      'Apiszen is the public website of a software development and enterprise consulting agency. It explains a broad offering clearly: web, mobile, custom software, UI/UX, AI, cloud and DevOps, alongside ERP implementation and business process consulting. Dedicated pages for services, technologies and industries plus a blog give each topic room, and a Node.js API receives project enquiries.',
    highlights: [
      {
        title: 'Content structure',
        items: [
          'Individual pages for each service',
          'Technologies, industries and company pages',
          'Blog with individual article pages',
          'Delivery process, FAQ and industry sections on the homepage',
        ],
      },
      {
        title: 'Engineering',
        items: [
          'React front end with split vendor bundles',
          'Node.js API for the contact form',
          'SEO metadata and structured data',
          'Calendly booking for discovery calls',
        ],
      },
    ],
    tech: ['React', 'Node.js', 'Tailwind CSS', 'REST API', 'SEO'],
    shot: 'apiszen',
    live: 'https://apiszen.com/',
  },
  {
    slug: 'track-backlinks',
    title: 'Track Backlinks',
    category: 'Backend · Automation',
    shortDesc: 'Automated backlink monitoring that warns users the moment their links disappear.',
    description:
      'A backlink validation tool that checks whether company advertisements and backlinks still exist on third-party sites. Daily cron jobs monitor link health and warn users as soon as a backlink is removed or becomes unreachable.',
    highlights: [
      {
        title: 'Monitoring',
        items: ['Daily cron jobs check every tracked link', 'Puppeteer inspects third-party pages', 'Removed or unreachable links trigger warnings'],
      },
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Cron Jobs', 'Puppeteer'],
    visual: 'backlinks',
  },
];

export const experience = [
  {
    id: 1,
    role: 'MERN Stack Developer',
    company: 'Feohs Information',
    type: 'Full-time',
    duration: 'Sept 2025 — Present',
    description:
      'Leading the development of Feohs.com, a scholarship grant platform. Architected the API marketplace allowing developers to generate API keys and consume services. Integrated Razorpay for seamless grant applications and payments.',
    achievements: [
      'Architected a highly scalable API marketplace for third-party developers',
      'Integrated Razorpay processing for thousands of grant applications',
      'Optimized backend services for high concurrency and low latency',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay'],
  },
  {
    id: 2,
    role: 'MERN Stack Developer',
    company: 'Sparrow Softtech',
    type: 'Full-time',
    duration: 'May 2024 — July 2025',
    description:
      'Developed and maintained robust full-stack applications. Spearheaded the development of Cloud Job Manager, handling end-to-end workflows from quote creation to invoicing. Integrated complex third-party services like NMI payments and Dropbox.',
    achievements: [
      'Built Cloud Job Manager handling multi-role US-based workflows',
      'Integrated NMI payment gateway for secure transaction processing',
      'Implemented automated cron jobs for the Track Backlinks platform',
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Cron', 'Dropbox API'],
  },
];

export const services = [
  {
    title: 'Full stack development',
    desc: 'Production-ready applications built with MongoDB, Express, React and Node.js, designed to scale with the business.',
  },
  {
    title: 'Mobile apps',
    desc: 'React Native apps with user accounts, payments and reward systems.',
  },
  {
    title: 'Backend & APIs',
    desc: 'REST APIs, microservices, automated cron jobs and database optimisation that stay reliable under load.',
  },
  {
    title: 'Payment integration',
    desc: 'NMI, Razorpay and Stripe integrations covering subscriptions, webhooks and refunds.',
  },
];

export const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Operations Manager, US Services',
    text: 'Bharat completely automated our workflow with the Cloud Job Manager. The Dropbox and NMI integrations were flawless. Our efficiency has skyrocketed.',
  },
  {
    name: 'Michael Chen',
    role: 'Founder, Feohs',
    text: 'The API marketplace Bharat built for us is incredible. It is secure, scalable, and exactly what we needed to expand our grant platform ecosystem.',
  },
];
