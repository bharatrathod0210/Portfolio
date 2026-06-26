import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const COLORS = ['#a855f7', '#22d3ee', '#6366f1', '#f59e0b', '#10b981', '#ec4899', '#ef4444', '#3b82f6'];
const TYPES = ['Full-time', 'Part-time', 'Freelance', 'Internship', 'Contract'];

export default function ExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      role: '', company: '', type: 'Full-time', duration: '', period: '',
      description: '', achievements: '', tech: '', color: '#a855f7', order: 0,
    },
  });

  const selectedColor = watch('color');

  useEffect(() => {
    if (isEdit) {
      api.get(`/experience/${id}`).then((res) => {
        const e = res.data;
        reset({
          role: e.role,
          company: e.company,
          type: e.type || 'Full-time',
          duration: e.duration,
          period: e.period || '',
          description: e.description,
          achievements: e.achievements?.join('\n') || '',
          tech: e.tech?.join(', ') || '',
          color: e.color || '#a855f7',
          order: e.order || 0,
        });
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await api.put(`/experience/${id}`, data);
        toast.success('Experience updated!');
      } else {
        await api.post('/experience', data);
        toast.success('Experience added!');
      }
      navigate('/admin/experience');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/experience" className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
          <FiArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display">{isEdit ? 'Edit Experience' : 'New Experience'}</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {isEdit ? 'Update experience details' : 'Add a work experience entry'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Role & Company */}
        <div className="glass rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider">Position Details</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Role / Title *</label>
              <input
                placeholder="Senior Full Stack Developer"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                  errors.role ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                }`}
                {...register('role', { required: 'Role is required' })}
              />
              {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Company *</label>
              <input
                placeholder="Tech Company Pvt. Ltd."
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                  errors.company ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                }`}
                {...register('company', { required: 'Company is required' })}
              />
              {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Type</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                {...register('type')}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a12]">{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Duration *</label>
              <input
                placeholder="2023 — Present"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                  errors.duration ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                }`}
                {...register('duration', { required: 'Duration is required' })}
              />
              {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Period</label>
              <input
                placeholder="1+ year"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                {...register('period')}
              />
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Accent Color</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue('color', color)}
                  className={`w-8 h-8 rounded-lg transition-all ${
                    selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a12] scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: color }}
                />
              ))}
            </div>
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

        {/* Description & Achievements */}
        <div className="glass rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider">Details</h2>

          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Description *</label>
            <textarea
              rows={4}
              placeholder="Describe your role and responsibilities..."
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all resize-none ${
                errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
              }`}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
              Key Achievements
            </label>
            <textarea
              rows={4}
              placeholder="One achievement per line:&#10;Reduced API response time by 60%&#10;Built real-time dashboard for 10k+ users"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
              {...register('achievements')}
            />
            <p className="text-white/20 text-xs mt-1">One achievement per line</p>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Tech Stack</label>
            <input
              placeholder="React, Node.js, MongoDB, AWS"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
              {...register('tech')}
            />
            <p className="text-white/20 text-xs mt-1">Comma-separated list</p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }}
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiSave size={15} /> {isEdit ? 'Update Experience' : 'Add Experience'}
              </>
            )}
          </button>
          <Link to="/admin/experience" className="px-6 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
