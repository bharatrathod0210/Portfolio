import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, default: 'Full-time' },
  duration: { type: String, required: true },
  period: { type: String, default: '' },
  description: { type: String, required: true },
  achievements: { type: [String], default: [] },
  tech: { type: [String], default: [] },
  color: { type: String, default: '#a855f7' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
