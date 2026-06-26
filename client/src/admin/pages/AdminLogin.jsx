import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back! 👋');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[150px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="glass rounded-2xl p-8 border border-white/8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-neon-purple">
              <FiLock size={26} />
            </div>
            <h1 className="text-2xl font-bold font-display">Admin Login</h1>
            <p className="text-white/30 text-sm mt-1 font-mono">Portfolio CMS Dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={15} />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                    errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                  }`}
                  {...register('email', { required: 'Email is required' })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={15} />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${
                    errors.password ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
                  }`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1, #22d3ee)' }}
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs font-mono mt-4">
          Portfolio Admin Panel — Bharat Rathod
        </p>
      </motion.div>
    </div>
  );
}
