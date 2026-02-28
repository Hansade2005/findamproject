import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Search, Users, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MOCK_CONVERSATIONS = [
  { id: '1', name: 'Sarah Kim', avatar: 'SK', lastMessage: 'Sounds great! Let me review the PR.', time: '2m ago', unread: 2, color: 'from-pink-500 to-rose-500' },
  { id: '2', name: 'Alex Chen', avatar: 'AC', lastMessage: 'The design looks fantastic!', time: '1h ago', unread: 0, color: 'from-purple-500 to-blue-500' },
  { id: '3', name: 'Marcus J.', avatar: 'MJ', lastMessage: 'Can you push the latest changes?', time: '3h ago', unread: 1, color: 'from-blue-500 to-cyan-500' },
  { id: '4', name: 'Priya Patel', avatar: 'PP', lastMessage: 'Meeting at 3pm tomorrow?', time: '1d ago', unread: 0, color: 'from-emerald-500 to-teal-500' },
];

export default function Messages() {
  const { currentUser } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#06060f] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-5">
            <MessageCircle size={32} className="text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Messages</h2>
          <p className="text-gray-500 mb-6">Sign in to chat with project collaborators.</p>
          <Link to="/login" className="btn-glow text-white px-6 py-3 rounded-xl font-semibold inline-block">
            Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  const selected = MOCK_CONVERSATIONS.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-[#06060f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-black text-white">Messages</h1>
          <p className="text-gray-500 text-sm mt-1">Chat with your project collaborators</p>
        </motion.div>

        <div className="glass-card rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
          <div className="flex h-full">
            {/* Sidebar */}
            <div className={`w-full sm:w-80 border-r border-white/[0.06] flex flex-col ${selectedChat ? 'hidden sm:flex' : 'flex'}`}>
              <div className="p-4">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" placeholder="Search conversations..."
                    className="w-full glass rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none input-glow" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {MOCK_CONVERSATIONS.map((conv) => (
                  <button key={conv.id} onClick={() => setSelectedChat(conv.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-white/[0.04] ${
                      selectedChat === conv.id ? 'bg-white/[0.06]' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${conv.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-semibold">{conv.name}</span>
                        <span className="text-gray-600 text-[10px]">{conv.time}</span>
                      </div>
                      <p className="text-gray-500 text-xs truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden sm:flex' : 'flex'}`}>
              {selected ? (
                <>
                  <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06]">
                    <button onClick={() => setSelectedChat(null)} className="sm:hidden text-gray-400 hover:text-white mr-1">
                      <ArrowRight size={18} className="rotate-180" />
                    </button>
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-sm font-bold`}>
                      {selected.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{selected.name}</h3>
                      <p className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Online
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 p-5 overflow-y-auto space-y-4">
                    <div className="text-center">
                      <span className="glass text-gray-500 text-xs px-3 py-1 rounded-full">Today</span>
                    </div>
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1`}>
                        {selected.avatar}
                      </div>
                      <div className="glass rounded-2xl rounded-tl-md px-4 py-3 max-w-[70%]">
                        <p className="text-gray-300 text-sm">{selected.lastMessage}</p>
                        <span className="text-gray-600 text-[10px] mt-1 block">{selected.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/[0.06]">
                    <div className="flex gap-3">
                      <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 glass rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none input-glow"
                        onKeyDown={(e) => { if (e.key === 'Enter') setMessageInput(''); }}
                      />
                      <button className="btn-glow text-white px-5 py-3 rounded-xl">
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                      <MessageCircle size={28} className="text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Select a conversation</h3>
                    <p className="text-gray-500 text-sm">Choose from your existing conversations or start a new one.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
