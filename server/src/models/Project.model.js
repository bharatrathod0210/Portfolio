import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  shortDesc: { type: String, maxlength: 200 },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  images: [{ url: String, publicId: String }],
  liveLink: { type: String, default: '' },
  githubLink: { type: String, default: '' },
  category: { type: String, enum: ['fullstack', 'frontend', 'backend', 'mobile', 'other'], default: 'fullstack' },
  featured: { type: Boolean, default: false },
  color: { type: String, default: '#a855f7' },
  order: { type: Number, default: 0 },
  _seedVersion: { type: String, default: '' }, // internal seed tracking
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
