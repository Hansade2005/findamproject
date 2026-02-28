import { useState } from 'react';
import { MessageCircle, Lock, Search, Send, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO_CONVERSATIONS = [
  { id: 1, name: 'Alice Johnson', avatar: 'AJ', lastMessage: "Hey! I saw your project and I'd love to contribute.", time: '2m ago', unread: 2, gradient: 'from-purple-500 to-blue-500' },
  { id: 2, name: 'Bob Smith', avatar: 'BS', lastMessage: 'The PR looks great, let me review it tonight.', time: '1h ago', unread: 0, gradient: 'from-green-500 to-emerald-500' },
  { id: 3, name: 'Carol Davis', avatar: 'CD', lastMessage: 'Can we schedule a call to discuss the architecture?', time: '3h ago', unread: 1, gradient: 'from-pink-500 to-rose-500' },
  { id: 4, name: 'David Lee', avatar: 'DL', lastMessage: 'Thanks for accepting my application!', time: '1d ago', unread: 0, gradient: 'from-amber-500 to-orange-500' },
];

export default function Messages() {
  const { currentUser } = useAuth();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={32} className="text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Messages</h1>
          <p className="text-gray-400 mb-2">Sign in to message project collaborators and team members.</p>
          <div className="flex items-center gap-2 justify-center text-gray-500 text-sm mb-6">
            <Lock size={14} />
            <span>Secure messaging between team members</span>
          </div>
          <div className="space-y-3">
            <Link to="/login" className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors text-center">
              Sign In
            </Link>
            <Link to="/browse" className="block w-full bg-gray-700 hover:bg-gray-600 text-gray-300 py-3 rounded-xl font-semibold transition-colors text-center">
              Browse Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selected = DEMO_CONVERSATIONS.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-700/50">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Search messages..." className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {DEMO_CONVERSATIONS.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full text-left p-3 flex items-start gap-3 transition-colors border-b border-gray-700/30 ${selectedChat === conv.id ? 'bg-purple-600/10' : 'hover:bg-gray-700/30'}`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${conv.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white text-sm truncate">{conv.name}</span>
                      <span className="text-gray-500 text-xs shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0">{conv.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-xl overflow-hidden flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b border-gray-700/50 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-white text-sm font-bold`}>{selected.avatar}</div>
                  <div>
                    <h3 className="font-medium text-white text-sm">{selected.name}</h3>
                    <p className="text-green-400 text-xs">Online</p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex justify-center">
                    <span className="text-gray-500 text-xs bg-gray-700/50 px-3 py-1 rounded-full">Today</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{selected.avatar}</div>
                    <div className="bg-gray-700/60 rounded-xl rounded-tl-none px-4 py-2.5 max-w-xs">
                      <p className="text-gray-200 text-sm">{selected.lastMessage}</p>
                      <p className="text-gray-500 text-xs mt-1">{selected.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 flex-row-reverse">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="bg-purple-600/30 border border-purple-500/20 rounded-xl rounded-tr-none px-4 py-2.5 max-w-xs">
                      <p className="text-gray-200 text-sm">Thanks for reaching out! Let's discuss this further.</p>
                      <p className="text-gray-500 text-xs mt-1">Just now</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-700/50">
                  <div className="flex gap-2">
                    <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500" />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-colors">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <MessageCircle size={48} className="text-gray-600 mx-auto mb-3" />
                  <h3 className="text-white font-medium mb-1">Select a conversation</h3>
                  <p className="text-gray-500 text-sm">Choose a conversation from the list to start messaging.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center gap-3">
          <Clock size={18} className="text-purple-400 shrink-0" />
          <p className="text-purple-300 text-sm">
            <span className="font-medium">Coming soon:</span> Real-time messaging with notifications. Currently showing demo conversations.
          </p>
        </div>
      </div>
    </div>
  );
}
