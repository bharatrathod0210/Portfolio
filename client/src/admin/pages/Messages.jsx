import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiTrash2, FiCheck, FiStar, FiSearch, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | unread | starred

  useEffect(() => {
    api.get('/contact').then((res) => {
      setMessages(res.data);
      setLoading(false);
    });
  }, []);

  const handleRead = async (id) => {
    await api.patch(`/contact/${id}/read`);
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
    if (selected?._id === id) setSelected((s) => ({ ...s, read: true }));
  };

  const handleStar = async (id, e) => {
    e.stopPropagation();
    const res = await api.patch(`/contact/${id}/star`);
    setMessages((prev) => prev.map((m) => (m._id === id ? res.data : m)));
    if (selected?._id === id) setSelected(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await api.delete(`/contact/${id}`);
    toast.success('Message deleted');
    setMessages((prev) => prev.filter((m) => m._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.read) handleRead(msg._id);
  };

  const filtered = messages.filter((m) => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'unread' && !m.read) || (filter === 'starred' && m.starred);
    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="p-6 md:p-8 h-[calc(100vh-64px)] md:h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold font-display">Messages</h1>
          <p className="text-white/30 text-sm mt-1">
            {messages.length} total · <span className="text-purple-400">{unreadCount} unread</span>
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-4 flex-shrink-0">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex gap-1">
          {['all', 'unread', 'starred'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-mono capitalize transition-all ${
                filter === f
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'glass border border-white/10 text-white/40 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Message list */}
        <div className="w-full md:w-80 lg:w-96 flex-shrink-0 glass rounded-xl border border-white/5 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/5 text-xs font-mono text-white/30 uppercase tracking-wider">
            Inbox ({filtered.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="p-4 animate-pulse">
                  <div className="h-3 bg-white/5 rounded w-1/2 mb-2" />
                  <div className="h-2.5 bg-white/5 rounded w-3/4" />
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-white/30 text-sm">No messages found</div>
            ) : (
              filtered.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left p-4 hover:bg-white/5 transition-colors ${
                    selected?._id === msg._id ? 'bg-white/5 border-l-2 border-purple-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />}
                        <p className={`text-sm font-medium truncate ${!msg.read ? 'text-white' : 'text-white/50'}`}>
                          {msg.name}
                        </p>
                      </div>
                      <p className="text-xs text-white/30 truncate mt-0.5">{msg.subject}</p>
                      <p className="text-xs text-white/20 truncate mt-0.5">{msg.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs text-white/20">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                      {msg.starred && <FiStar size={11} className="text-yellow-400 fill-yellow-400" />}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message detail */}
        <div className="hidden md:flex flex-1 glass rounded-xl border border-white/5 flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                {/* Header */}
                <div className="p-5 border-b border-white/5 flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-white">{selected.subject}</h2>
                    <p className="text-sm text-white/40 mt-1">
                      From: <span className="text-white/70">{selected.name}</span>{' '}
                      <span className="text-white/30">&lt;{selected.email}&gt;</span>
                    </p>
                    <p className="text-xs text-white/20 mt-0.5 font-mono">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => handleStar(selected._id, e)}
                      className={`p-2 rounded-lg transition-colors ${
                        selected.starred
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-white/30 hover:text-yellow-400 hover:bg-yellow-400/10'
                      }`}
                      title="Star"
                    >
                      <FiStar size={16} className={selected.starred ? 'fill-yellow-400' : ''} />
                    </button>
                    {!selected.read && (
                      <button
                        onClick={() => handleRead(selected._id)}
                        className="p-2 rounded-lg text-white/30 hover:text-green-400 hover:bg-green-400/10 transition-colors"
                        title="Mark as read"
                      >
                        <FiCheck size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selected._id)}
                      className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 p-5 overflow-y-auto">
                  <p className="text-white/60 leading-relaxed whitespace-pre-wrap text-sm">
                    {selected.message}
                  </p>
                </div>

                {/* Reply */}
                <div className="p-4 border-t border-white/5">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
                  >
                    <FiMail size={14} /> Reply via Email
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-white/20"
              >
                <FiMail size={48} className="mb-3 opacity-20" />
                <p className="text-sm">Select a message to read</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
