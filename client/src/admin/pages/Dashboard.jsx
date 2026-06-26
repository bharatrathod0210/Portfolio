import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFolder, FiBriefcase, FiMail, FiStar, FiPlus, FiArrowRight } from 'react-icons/fi';
import api from '../../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, featured: 0, experience: 0, messages: 0, unread: 0 });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/projects'),
      api.get('/experience'),
      api.get('/contact'),
    ]).then(([projRes, expRes, msgRes]) => {
      const projects = projRes.data;
      const messages = msgRes.data;
      setStats({
        projects: projects.length,
        featured: projects.filter((p) => p.featured).length,
        experience: expRes.data.length,
        messages: messages.length,
        unread: messages.filter((m) => !m.read).length,
      });
      setRecentProjects(projects.slice(0, 4));
      setRecentMessages(messages.slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FiFolder, color: '#a855f7', to: '/admin/projects' },
    { label: 'Featured', value: stats.featured, icon: FiStar, color: '#22d3ee', to: '/admin/projects' },
    { label: 'Experience', value: stats.experience, icon: FiBriefcase, color: '#6366f1', to: '/admin/experience' },
    { label: 'Unread Msgs', value: stats.unread, icon: FiMail, color: '#f59e0b', to: '/admin/messages' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display">Dashboard</h1>
          <p className="text-white/30 text-sm mt-1">Welcome back! Here's your portfolio overview.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
        >
          <FiPlus size={16} /> New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={card.to}
              className="block glass rounded-xl p-5 border border-white/5 hover:border-purple-500/20 transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ background: `${card.color}20`, border: `1px solid ${card.color}30` }}
              >
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <div className="text-3xl font-black font-display" style={{ color: card.color }}>
                {loading ? '—' : card.value}
              </div>
              <div className="text-xs text-white/30 font-mono mt-1">{card.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="glass rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="font-semibold text-sm">Recent Projects</h2>
            <Link to="/admin/projects" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
              View all <FiArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="px-5 py-3 animate-pulse">
                  <div className="h-3 bg-white/5 rounded w-1/2 mb-2" />
                  <div className="h-2.5 bg-white/5 rounded w-1/3" />
                </div>
              ))
            ) : recentProjects.length === 0 ? (
              <div className="px-5 py-8 text-center text-white/30 text-sm">
                No projects yet.{' '}
                <Link to="/admin/projects/new" className="text-purple-400 hover:underline">Add one</Link>
              </div>
            ) : (
              recentProjects.map((p) => (
                <div key={p._id} className="flex items-center justify-between px-5 py-3 hover:bg-white/3 transition-colors">
                  <div className="flex items-center gap-3">
                    {p.images?.[0]?.url && (
                      <img src={p.images[0].url} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-white/80">{p.title}</p>
                      <p className="text-xs text-white/30 capitalize">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">
                        Featured
                      </span>
                    )}
                    <Link to={`/admin/projects/edit/${p._id}`} className="text-xs text-white/30 hover:text-white transition-colors">
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="glass rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="font-semibold text-sm">Recent Messages</h2>
            <Link to="/admin/messages" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
              View all <FiArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="px-5 py-3 animate-pulse">
                  <div className="h-3 bg-white/5 rounded w-1/2 mb-2" />
                  <div className="h-2.5 bg-white/5 rounded w-2/3" />
                </div>
              ))
            ) : recentMessages.length === 0 ? (
              <div className="px-5 py-8 text-center text-white/30 text-sm">No messages yet</div>
            ) : (
              recentMessages.map((msg) => (
                <Link
                  key={msg._id}
                  to="/admin/messages"
                  className="flex items-start gap-3 px-5 py-3 hover:bg-white/3 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-400 block" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${!msg.read ? 'text-white' : 'text-white/50'}`}>
                        {msg.name}
                      </p>
                      <span className="text-xs text-white/20 flex-shrink-0 ml-2">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-white/30 truncate">{msg.subject}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Add Project', to: '/admin/projects/new', icon: FiFolder, color: '#a855f7' },
          { label: 'Add Experience', to: '/admin/experience/new', icon: FiBriefcase, color: '#22d3ee' },
          { label: 'View Messages', to: '/admin/messages', icon: FiMail, color: '#6366f1' },
        ].map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="glass rounded-xl p-4 border border-white/5 hover:border-purple-500/20 flex items-center gap-3 transition-all group"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${action.color}15`, border: `1px solid ${action.color}25` }}
            >
              <action.icon size={16} style={{ color: action.color }} />
            </div>
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
              {action.label}
            </span>
            <FiArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
