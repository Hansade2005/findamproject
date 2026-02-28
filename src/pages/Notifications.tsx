import { Link } from 'react-router-dom';
import { Bell, UserPlus, MessageSquare, FolderOpen, Check, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'join_request' | 'message' | 'project_update';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'join_request', title: 'New join request', description: 'Someone wants to join your project "AI Dashboard"', time: '2 hours ago', read: false },
  { id: '2', type: 'message', title: 'New message', description: 'You received a message about "React Marketplace"', time: '5 hours ago', read: false },
  { id: '3', type: 'project_update', title: 'Project updated', description: 'A project you follow was updated', time: '1 day ago', read: true },
];

const ICONS = {
  join_request: <UserPlus size={18} className="text-blue-400" />,
  message: <MessageSquare size={18} className="text-green-400" />,
  project_update: <FolderOpen size={18} className="text-purple-400" />,
};

export default function Notifications() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md">
          <Bell size={48} className="mx-auto text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to view notifications</h2>
          <p className="text-gray-400 mb-6">Stay updated on your projects and collaborations.</p>
          <Link to="/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">Sign In</Link>
        </div>
      </div>
    );
  }

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  const clearAll = () => setNotifications([]);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Notifications</h1>
              <p className="text-gray-400">{unread > 0 ? `${unread} unread` : 'All caught up!'}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={markAllRead} className="glass-light rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                <Check size={14} /> Mark all read
              </button>
              <button onClick={clearAll} className="glass-light rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {notifications.length === 0 ? (
          <div className="glass rounded-xl text-center py-16">
            <Bell size={40} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className={`glass-card rounded-xl p-4 flex items-start gap-4 ${!n.read ? 'border-purple-500/20' : ''}`}>
                <div className="glass-light rounded-lg p-2.5 flex-shrink-0">{ICONS[n.type]}</div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${n.read ? 'text-gray-400' : 'text-white'}`}>{n.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{n.description}</p>
                  <p className="text-gray-600 text-xs mt-1">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
