import Project from '../models/Project.model.js';
import { cloudinary } from '../config/cloudinary.js';

export const getProjects = async (req, res) => {
  const { category, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (featured === 'true') filter.featured = true;
  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json(project);
};

export const createProject = async (req, res) => {
  const { title, shortDesc, description, techStack, liveLink, githubLink, category, featured, color, order, images } = req.body;
  const project = await Project.create({
    title, shortDesc, description,
    techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(t => t.trim()),
    liveLink, githubLink, category,
    featured: featured === 'true' || featured === true,
    color: color || '#a855f7',
    order: order || 0,
    images: images || [],
  });
  res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  const { title, shortDesc, description, techStack, liveLink, githubLink, category, featured, color, order, images } = req.body;
  if (title !== undefined) project.title = title;
  if (shortDesc !== undefined) project.shortDesc = shortDesc;
  if (description !== undefined) project.description = description;
  if (techStack !== undefined) project.techStack = Array.isArray(techStack) ? techStack : techStack.split(',').map(t => t.trim());
  if (liveLink !== undefined) project.liveLink = liveLink;
  if (githubLink !== undefined) project.githubLink = githubLink;
  if (category !== undefined) project.category = category;
  if (featured !== undefined) project.featured = featured === 'true' || featured === true;
  if (color !== undefined) project.color = color;
  if (order !== undefined) project.order = order;
  if (images !== undefined) project.images = images;
  const updated = await project.save();
  res.json(updated);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  for (const img of project.images) {
    if (img.publicId) await cloudinary.v2.uploader.destroy(img.publicId);
  }
  await project.deleteOne();
  res.json({ message: 'Project deleted' });
};
