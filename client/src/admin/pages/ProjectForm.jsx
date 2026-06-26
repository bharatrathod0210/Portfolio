import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import ImageUploader from '../components/ImageUploader';

const CATEGORIES = ['fullstack', 'frontend', 'backend', 'mobile', 'other'];
const COLORS = ['#a855f7', '#22d3ee', '#6366f1', '#f59e0b', '#10b981', '#ec4899', '#ef4444', '#3b82f6'];

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [selectedColor, setSelectedColor] = useState('#a855f7');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: '', shortDesc: '', description: '', techStack: '',
      liveLink: '', githubLink: '', category: 'fullstack',
      featured: false, order: 0,
    },
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/projects/${id}`).then((res) => {
        const p = res.data;
        reset({
          title: p.title,
          shortDesc: p.shortDesc || '',
          description: p.description,
          techStack: p.techStack?.join(', ') || '',
          liveLink: p.liveLink || '',
          githubLink: p.githubLink || '',
          category: p.category,
          featured: p.featured,
          order: p.order || 0,
        });
        setImages(p.images || []);
        setSelectedColor(p.color || '#a855f7');
        setLoading(false);
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    const payload = { ...data, images, color: selectedColor };
    try {
      if (isEdit) {
        await api.put(`/projects/${id}`, payload);
        toast.success('Project updated!');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created!');
      }
      navigate('/admin/projects');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/projects" className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
          <FiArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display">{isEdit ? 'Edit Project' : 'New Project'}</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {isEdit ? 'Update project details' : 'Add a new project to your portfolio'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="glass rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider">Basic Info</h2>

          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Title *</label>
            <input
              placeholder="My Awesome Project"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
              }`}
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Short Description</label>
            <input
              placeholder="One-liner for project cards (max 200 chars)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
              {...register('shortDesc')}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Full Description *</label>
            <textarea
              rows={5}
              placeholder="Detailed description of the project..."
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all resize-none ${
                errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
              }`}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Category</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                {...register('category')}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0a0a12] capitalize">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Display Order</label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                {...register('order', { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Accent Color</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-lg transition-all ${
                    selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a12] scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              className="w-4 h-4 accent-purple-500"
              {...register('featured')}
            />
            <label htmlFor="featured" className="text-sm text-white/50 cursor-pointer">
              Mark as Featured project
            </label>
          </div>
        </div>

        {/* Tech & Links */}
        <div className="glass rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider">Tech & Links</h2>

          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Tech Stack *</label>
            <input
              placeholder="React, Node.js, MongoDB, Tailwind CSS"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                errors.techStack ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
              }`}
              {...register('techStack', { required: 'Tech stack is required' })}
            />
            <p className="text-white/20 text-xs mt-1">Comma-separated list</p>
            {errors.techStack && <p className="text-red-400 text-xs mt-1">{errors.techStack.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Live Link</label>
              <input
                type="url"
                placeholder="https://myproject.vercel.app"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                {...register('liveLink')}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">GitHub Link</label>
              <input
                type="url"
                placeholder="https://github.com/user/repo"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                {...register('githubLink')}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="glass rounded-xl p-6 border border-white/5 space-y-4">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider">Project Images</h2>
          <ImageUploader images={images} onChange={setImages} />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiSave size={15} /> {isEdit ? 'Update Project' : 'Create Project'}
              </>
            )}
          </button>
          <Link to="/admin/projects" className="px-6 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
