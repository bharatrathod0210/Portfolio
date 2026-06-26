import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export default function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    api.get('/experience').then((res) => {
      setExperiences(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    setDeleting(id);
    try {
      await api.delete(`/experience/${id}`);
      toast.success('Experience deleted');
      setExperiences((prev) => prev.filter((e) => e._id !== id));
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display">Experience</h1>
          <p className="text-white/30 text-sm mt-1">{experiences.length} entries</p>
        </div>
        <Link
          to="/admin/experience/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }}
        >
          <FiPlus size={16} /> Add Experience
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-xl h-20 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <div className="glass rounded-xl p-16 text-center border border-white/5">
          <p className="text-white/30 mb-4">No experience entries yet</p>
          <Link
            to="/admin/experience/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }}
          >
            <FiPlus size={16} /> Add your first experience
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-5 border border-white/5 hover:border-purple-500/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Color dot */}
                    <div
                      className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}60` }}
                    />
                    <div>
                      <h3 className="font-semibold text-white/90">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span style={{ color: exp.color }} className="text-sm">{exp.company}</span>
                        <span className="text-white/20 text-xs">•</span>
                        <span className="text-white/30 text-xs font-mono">{exp.type}</span>
                        <span className="text-white/20 text-xs">•</span>
                        <span className="text-white/30 text-xs font-mono">{exp.duration}</span>
                      </div>
                      <p className="text-white/40 text-sm mt-2 line-clamp-2 max-w-2xl">{exp.description}</p>
                      {exp.tech?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.tech.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-xs rounded font-mono"
                              style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}25`, color: exp.color }}
                            >
                              {t}
                            </span>
                          ))}
                          {exp.tech.length > 5 && (
                            <span className="text-xs text-white/30">+{exp.tech.length - 5}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link
                      to={`/admin/experience/edit/${exp._id}`}
                      className="p-2 rounded-lg hover:bg-blue-500/10 text-white/30 hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      disabled={deleting === exp._id}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting === exp._id ? (
                        <span className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin block" />
                      ) : (
                        <FiTrash2 size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
