import Experience from '../models/Experience.model.js';

export const getExperiences = async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
  res.json(experiences);
};

export const getExperience = async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) { res.status(404); throw new Error('Experience not found'); }
  res.json(exp);
};

export const createExperience = async (req, res) => {
  const { role, company, type, duration, period, description, achievements, tech, color, order } = req.body;
  const exp = await Experience.create({
    role, company, type, duration, period, description,
    achievements: Array.isArray(achievements) ? achievements : (achievements || '').split('\n').filter(Boolean),
    tech: Array.isArray(tech) ? tech : (tech || '').split(',').map(t => t.trim()).filter(Boolean),
    color: color || '#a855f7',
    order: order || 0,
  });
  res.status(201).json(exp);
};

export const updateExperience = async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) { res.status(404); throw new Error('Experience not found'); }
  const { role, company, type, duration, period, description, achievements, tech, color, order } = req.body;
  if (role !== undefined) exp.role = role;
  if (company !== undefined) exp.company = company;
  if (type !== undefined) exp.type = type;
  if (duration !== undefined) exp.duration = duration;
  if (period !== undefined) exp.period = period;
  if (description !== undefined) exp.description = description;
  if (achievements !== undefined) exp.achievements = Array.isArray(achievements) ? achievements : achievements.split('\n').filter(Boolean);
  if (tech !== undefined) exp.tech = Array.isArray(tech) ? tech : tech.split(',').map(t => t.trim()).filter(Boolean);
  if (color !== undefined) exp.color = color;
  if (order !== undefined) exp.order = order;
  const updated = await exp.save();
  res.json(updated);
};

export const deleteExperience = async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) { res.status(404); throw new Error('Experience not found'); }
  await exp.deleteOne();
  res.json({ message: 'Experience deleted' });
};
