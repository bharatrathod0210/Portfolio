import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiFolder, FiBriefcase, FiMail, FiLogOut,
  FiMenu, FiX, FiExternalLink,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/admin', icon: FiHome, label: 'Dashboard', end: true },
  { to: '/admin/projects', icon: FiFolder, label: 'Projects' },
  { to: '/admin/experience', icon: FiBriefcase, label: 'Experience' },
  { to: '/admin/messages', icon: FiMail, label: 'Messages' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`${mobile ? 'w-full' : 'w-64'} flex flex-col h-full`}
      style={{ background: 'rgba(5,5,8,0.95)', borderRight: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-black font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Portfolio CMS
            </div>
            <div className="text-xs text-white/30 font-mono mt-0.5">Admin Panel</div>
          </div>
          {mobile && (
            <button onClick={() => setSidebarOpen(false)} className="text-white/40 hover:text-white">
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => mobile && setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* View site */}
      <div className="px-4 pb-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/30 hover:text-white hover:bg-white/5 transition-all"
        >
          <FiExternalLink size={17} />
          View Portfolio
        </a>
      </div>

      {/* User */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {admin?.name?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{admin?.name}</p>
            <p className="text-xs text-white/30 truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FiLogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-void">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 md:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/5 bg-void/95 backdrop-blur sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-white/60 hover:text-white">
            <FiMenu size={22} />
          </button>
          <span className="text-sm font-bold font-display text-gradient">Portfolio CMS</span>
          <div className="w-8" />
        </div>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
