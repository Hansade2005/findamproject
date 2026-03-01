import { useEffect, useState } from 'react';
import { MessageSquare, Send, Search, Plus } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getConversationsByUser, getMessagesByConversation, sendMessage,
  getAllUsers, getOrCreateConversation,
} from '../services/db';
import type { Conversation, Message } from '../types';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

export default function Messages() {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(searchParams.get('convo'));
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [allUsers, setAllUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getConversationsByUser(currentUser.id).then(setConversations);
  }, [currentUser]);

  useEffect(() => {
    if (!selectedId) { setMessages([]); return; }
    getMessagesByConversation(selectedId).then(setMessages);
  }, [selectedId]);

  useEffect(() => {
    if (showNewChat && currentUser) {
      getAllUsers().then((users) => setAllUsers(users.filter((u) => u.id !== currentUser.id).map((u) => ({ id: u.id, name: u.name }))));
    }
  }, [showNewChat, currentUser]);

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !selectedId) return;
    const msg = await sendMessage({
      conversationId: selectedId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
    });
    setMessages((prev) => [...prev, msg]);
    setText('');
    // Update convo list
    setConversations((prev) =>
      prev.map((c) => c.id === selectedId ? { ...c, lastMessage: msg.text, lastMessageAt: msg.createdAt } : c)
        .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
    );
  };

  const startNewChat = async (userId: string, userName: string) => {
    const convo = await getOrCreateConversation(currentUser.id, currentUser.name, userId, userName);
    setConversations((prev) => {
      if (prev.find((c) => c.id === convo.id)) return prev;
      return [convo, ...prev];
    });
    setSelectedId(convo.id);
    setShowNewChat(false);
  };

  const selected = conversations.find((c) => c.id === selectedId);
  const otherName = selected
    ? selected.participantNames[selected.participants.indexOf(currentUser.id) === 0 ? 1 : 0]
    : '';

  const filteredConvos = conversations.filter((c) => {
    if (!searchQuery.trim()) return true;
    const other = c.participantNames[c.participants.indexOf(currentUser.id) === 0 ? 1 : 0];
    return other.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Messages</h1>
        <div className="glass rounded-xl overflow-hidden flex" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Sidebar */}
          <div className="w-80 border-r border-white/5 flex flex-col">
            <div className="p-3 border-b border-white/5 flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full glass-input rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500"
                />
              </div>
              <button
                onClick={() => setShowNewChat(!showNewChat)}
                className="glass-light rounded-lg p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {showNewChat && (
              <div className="p-3 border-b border-white/5 bg-gray-800/30">
                <p className="text-gray-400 text-xs mb-2">Start a new conversation</p>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {allUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => startNewChat(u.id, u.name)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </button>
                  ))}
                  {allUsers.length === 0 && <p className="text-gray-500 text-xs">No other users found</p>}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {filteredConvos.length === 0 ? (
                <div className="p-4 text-center">
                  <MessageSquare size={24} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-gray-500 text-xs">No conversations yet</p>
                </div>
              ) : (
                filteredConvos.map((c) => {
                  const other = c.participantNames[c.participants.indexOf(currentUser.id) === 0 ? 1 : 0];
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full text-left p-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${selectedId === c.id ? 'bg-white/5 border-l-2 border-purple-500' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {other.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium truncate">{other}</span>
                          <span className="text-gray-600 text-xs">{timeAgo(c.lastMessageAt)}</span>
                        </div>
                        <p className="text-gray-500 text-xs truncate">{c.lastMessage || 'No messages yet'}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                    {otherName.charAt(0)}
                  </div>
                  <span className="text-white font-medium">{otherName}</span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-600 text-xs my-8">Start a conversation</div>
                  )}
                  {messages.map((m) => {
                    const isMine = m.senderId === currentUser.id;
                    return (
                      <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-xl px-4 py-2 max-w-xs ${isMine ? 'bg-purple-600/30 rounded-br-sm' : 'glass-light rounded-bl-sm'}`}>
                          <p className="text-gray-200 text-sm">{m.text}</p>
                          <p className="text-gray-500 text-[10px] mt-1">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 border-t border-white/5">
                  <form onSubmit={handleSend} className="flex gap-2">
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 glass-input rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500"
                    />
                    <button type="submit" disabled={!text.trim()} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white p-2.5 rounded-lg transition-colors">
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare size={40} className="mx-auto text-gray-600 mb-3" />
                  <p className="text-gray-500 text-sm">Select a conversation or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
