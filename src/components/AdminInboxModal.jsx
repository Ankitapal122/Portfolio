import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminInboxModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await api.getMessages();
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await api.getMessages();
        if (!cancelled) setMessages(data);
      } catch (err) {
        console.error('Failed to load messages:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message from SQLite database?')) {
      await api.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleStatusChange = async (id, status) => {
    await api.updateMessageStatus(id, status);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const filteredMessages = messages.filter((m) => {
    if (activeTab === 'unread') return m.status === 'unread';
    if (activeTab === 'read') return m.status === 'read';
    return true;
  });

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#121212] border border-red-600/40 rounded-3xl shadow-[0_0_60px_rgba(229,9,20,0.3)] flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="px-6 md:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                DISPATCH TERMINAL // SQLITE DATABASE
              </h2>
              <p className="text-[11px] font-mono text-white/50">
                Connected: portfolio.db &bull; {messages.length} Total Messages Logged
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white/80 hover:text-white transition-all flex items-center gap-1.5"
            >
              <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 md:px-8 py-3 border-b border-white/5 flex gap-3 text-xs font-mono bg-[#0c0c0c]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'all' ? 'bg-red-600 text-white font-bold' : 'text-white/60 hover:text-white'}`}
          >
            All Dispatches ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'unread' ? 'bg-red-600 text-white font-bold' : 'text-white/60 hover:text-white'}`}
          >
            Unread ({messages.filter(m => m.status === 'unread').length})
          </button>
          <button
            onClick={() => setActiveTab('read')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'read' ? 'bg-red-600 text-white font-bold' : 'text-white/60 hover:text-white'}`}
          >
            Archived ({messages.filter(m => m.status === 'read').length})
          </button>
        </div>

        {/* Message Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
          {loading && messages.length === 0 ? (
            <div className="py-16 text-center text-white/50 font-mono text-sm">
              Connecting to SQLite database...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-16 text-center text-white/50 font-mono text-sm space-y-2">
              <p>📭 No messages found in database matching this filter.</p>
              <p className="text-xs text-white/30">Submit a message via the Contact Form to test real-time SQLite persistence.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div key={msg.id} className="pt-4 first:pt-0 space-y-3 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${msg.status === 'unread' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-white/30'}`} />
                    <span className="font-bold text-sm text-white">
                      {msg.first_name} {msg.last_name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs font-mono text-red-400 hover:underline"
                    >
                      &lt;{msg.email}&gt;
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                    <span>{new Date(msg.created_at).toLocaleString()}</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase text-[10px]">
                      ID: #{msg.id}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-white/90 font-light leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <div className="flex items-center gap-2">
                    {msg.status === 'unread' ? (
                      <button
                        onClick={() => handleStatusChange(msg.id, 'read')}
                        className="text-white/60 hover:text-white hover:underline"
                      >
                        ✓ Mark as Read
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(msg.id, 'unread')}
                        className="text-white/60 hover:text-white hover:underline"
                      >
                        ↩ Mark as Unread
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-500/80 hover:text-red-400 hover:underline"
                  >
                    🗑 Delete Record
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>STORAGE ENGINE: SQLITE 3 &bull; NODE:SQLITE</span>
          <span>PRESS ESC OR CLOSE TO EXIT</span>
        </div>

      </div>
    </div>
  );
};

export default AdminInboxModal;
