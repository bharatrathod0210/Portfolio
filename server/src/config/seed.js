import Project from '../models/Project.model.js';

const seedProjects = [
  {
    title: 'ShopNest — E-Commerce Platform',
    shortDesc: 'Full-stack e-commerce with Razorpay & Stripe payments, real-time inventory, and admin dashboard.',
    description: `ShopNest is a production-grade e-commerce platform built for a fashion retail client. 
It features a fully responsive storefront, real-time inventory tracking, Razorpay and Stripe payment 
integration with webhooks, order management, customer accounts, and a comprehensive admin dashboard 
with sales analytics. Supports UPI, cards, net banking via Razorpay and international cards via Stripe. 
The platform handles 500+ daily transactions with 99.9% uptime.`,
    techStack: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'Stripe', 'Redux', 'Tailwind CSS', 'Cloudinary'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
        publicId: 'portfolio/projects/shopnest',
      },
    ],
    liveLink: 'https://shopnest-demo.vercel.app',
    githubLink: 'https://github.com/bharatrathod0210',
    category: 'fullstack',
    featured: true,
    color: '#a855f7',
    order: 1,
  },
  {
    title: 'PayFlow — Payment Dashboard',
    shortDesc: 'Multi-gateway payment dashboard supporting Razorpay, Stripe, PayPal, and Paytm.',
    description: `PayFlow is a unified payment management dashboard that integrates multiple payment gateways 
— Razorpay, Stripe, PayPal, and Paytm — into a single interface. Features include transaction monitoring, 
refund management, webhook handling, subscription billing, payout tracking, and detailed financial reports. 
Built for fintech startups managing high-volume transactions across multiple payment providers.`,
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Stripe', 'PayPal', 'Paytm', 'Chart.js'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
        publicId: 'portfolio/projects/payflow',
      },
    ],
    liveLink: 'https://payflow-demo.vercel.app',
    githubLink: 'https://github.com/bharatrathod0210',
    category: 'fullstack',
    featured: true,
    color: '#2563eb',
    order: 2,
  },
  {
    title: 'TaskFlow — Project Management',
    shortDesc: 'Kanban-style workspace with real-time collaboration, drag-and-drop, and team analytics.',
    description: `TaskFlow is a modern project management SaaS built for remote teams. 
It features Kanban boards with drag-and-drop, real-time collaboration via Socket.io, 
time tracking, sprint planning, role-based access control, and a detailed analytics dashboard. 
Used by 3 startups with 50+ active users.`,
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'Redis', 'Tailwind CSS'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80',
        publicId: 'portfolio/projects/taskflow',
      },
    ],
    liveLink: 'https://taskflow-demo.vercel.app',
    githubLink: 'https://github.com/bharatrathod0210',
    category: 'fullstack',
    featured: true,
    color: '#22d3ee',
    order: 3,
  },
  {
    title: 'NexChat — AI Chat Application',
    shortDesc: 'Real-time messaging with GPT-4 AI assistant, file sharing, and end-to-end encryption.',
    description: `NexChat is a real-time chat application with an integrated GPT-4 AI assistant. 
Features include room-based messaging, AI-powered smart replies, file and image sharing, 
read receipts, message reactions, and end-to-end encryption. 
Built with Socket.io for sub-100ms message delivery.`,
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'OpenAI API', 'Cloudinary', 'JWT'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
        publicId: 'portfolio/projects/nexchat',
      },
    ],
    liveLink: 'https://nexchat-demo.vercel.app',
    githubLink: 'https://github.com/bharatrathod0210',
    category: 'fullstack',
    featured: false,
    color: '#6366f1',
    order: 4,
  },
];

// Unique marker to detect if current seed version is already applied
const SEED_VERSION = 'v2-payments';

export const seedDatabase = async () => {
  try {
    const count = await Project.countDocuments();
    console.log(`📦 Projects in DB: ${count}`);

    // Check if seed version marker exists
    const versionExists = await Project.findOne({ _seedVersion: SEED_VERSION });
    if (versionExists) {
      console.log('✅ Seed already applied — skipping');
      return;
    }

    // Wipe old seed data (only docs without a real liveLink or with seed publicIds)
    await Project.deleteMany({
      'images.publicId': { $regex: /^portfolio\/projects\// },
    });

    // Insert fresh seed with version marker on first doc
    const toInsert = seedProjects.map((p, i) =>
      i === 0 ? { ...p, _seedVersion: SEED_VERSION } : p
    );

    await Project.insertMany(toInsert);
    console.log(`✅ Seeded ${seedProjects.length} projects successfully`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    // Don't throw — seed failure should not crash the server
  }
};
