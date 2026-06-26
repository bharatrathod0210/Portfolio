import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    api.get('/projects').then((res) => {
      setProjects(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display">Projects</h1>
          <p className="text-white/30 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
        >
          <FiPlus size={16} /> Add Project
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-xl h-16 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass rounded-xl p-16 text-center border border-white/5">
          <p className="text-white/30 mb-4">No projects yet</p>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
          >
            <FiPlus size={16} /> Create your first project
          </Link>
        </div>
      ) : (
        <div className="glass rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-white/30 text-xs font-mono uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Project</th>
                  <th className="text-left px-5 py-3 hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Tech Stack</th>
                  <th className="text-left px-5 py-3 hidden sm:table-cell">Status</th>
                  <th className="text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.tr
                      key={project._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/3 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {project.images?.[0]?.url ? (
                            <img
                              src={project.images[0].url}
                              alt={project.title}
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex-shrink-0 border border-white/10" />
                          )}
                          <div>
                            <p className="font-medium text-white/80">{project.title}</p>
                            <p className="text-white/30 text-xs line-clamp-1 max-w-xs">
                              {project.shortDesc || project.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="capitalize text-white/40 text-xs">{project.category}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.techStack?.slice(0, 3).map((t) => (
                            <span key={t} className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/40 border border-white/5">
                              {t}
                            </span>
                          ))}
                          {project.techStack?.length > 3 && (
                            <span className="text-xs text-white/30">+{project.techStack.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        {project.featured ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">
                            <FiStar size={10} /> Featured
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-white/30">Normal</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noreferrer"
                              className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-cyan-400 transition-colors" title="Live">
                              <FiExternalLink size={14} />
                            </a>
                          )}
                          {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noreferrer"
                              className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors" title="GitHub">
                              <FiGithub size={14} />
                            </a>
                          )}
                          <Link to={`/admin/projects/edit/${project._id}`}
                            className="p-2 rounded-lg hover:bg-blue-500/10 text-white/30 hover:text-blue-400 transition-colors" title="Edit">
                            <FiEdit2 size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(project._id)}
                            disabled={deleting === project._id}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === project._id ? (
                              <span className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin block" />
                            ) : (
                              <FiTrash2 size={14} />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
