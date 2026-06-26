import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './config/seed.js';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import contactRoutes from './routes/contact.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api/health', (_, res) => res.json({ status: 'OK', message: 'Portfolio API running' }));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

// ── Start: connect DB first, then seed, then listen ──────────────────────────
(async () => {
  try {
    await connectDB();       // wait for real connection
    await seedDatabase();    // seed only after DB is confirmed ready
    app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Startup failed:', err.message);
    process.exit(1);
  }
})();
