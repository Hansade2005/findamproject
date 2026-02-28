import { useState } from 'react';
import { MessageSquare, Send, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', name: 'Alex Chen', lastMessage: "Hey, I'd love to join your AI project!", time: '2h ago', unread: 2, avatar: 'A' },
  { id: '2', name: 'Maria Garcia', lastMessage: 'The frontend is looking great!', time: '5h ago', unread: 0, avatar: 'M' },
  { id: '3', name: 'James Park', lastMessage: 'Can we discuss the database schema?', time: '1d ago', unread: 1, avatar: 'J' },
];

export default function Messages() {
  const { currentUser } = useAuth();
  const [selectedConvo, setSelectedConvo] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md">
          <MessageSquare size={48} className="mx-auto text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to view messages</h2>
          <p className="text-gray-400 mb-6">Connect and communicate with project collaborators.</p>
          <Link to="/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">Sign In</Link>
        </div>
      </div>
    );
  }

  const selected = MOCK_CONVERSATIONS.find((c) => c.id === selectedConvo);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Messages</h1>
        <div className="glass rounded-xl overflow-hidden flex" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Sidebar */}
          <div className="w-80 border-r border-white/5 flex flex-col">
            <div className="p-3 border-b border-white/5">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full glass-input rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {MOCK_CONVERSATIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConvo(c.id)}
                  className={`w-full text-left p-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${selectedConvo === c.id ? 'bg-white/5 border-l-2 border-purple-500' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium truncate">{c.name}</span>
                      <span className="text-gray-600 text-xs">{c.time}</span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">{c.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                    {selected.avatar}
                  </div>
                  <span className="text-white font-medium">{selected.name}</span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="text-center text-gray-600 text-xs my-4">Today</div>
                  <div className="flex justify-start mb-3">
                    <div className="glass-light rounded-xl rounded-bl-sm px-4 py-2 max-w-xs">
                      <p className="text-gray-300 text-sm">{selected.lastMessage}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-white/5">
                  <form onSubmit={(e) => { e.preventDefault(); setMessage(''); }} className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 glass-input rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500"
                    />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-lg transition-colors">
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare size={40} className="mx-auto text-gray-600 mb-3" />
                  <p className="text-gray-500 text-sm">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
