import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, UserPlus, MessageSquare, FolderOpen, Check, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getNotificationsByUser, markAllNotificationsRead, clearNotifications, markNotificationRead } from '../services/db';
import type { Notification } from '../types';

const ICONS: Record<string, React.ReactElement> = {
  application_received: <UserPlus size={18} className="text-blue-400" />,
  application_accepted: <CheckCircle size={18} className="text-green-400" />,
  application_rejected: <XCircle size={18} className="text-red-400" />,
  new_comment: <MessageSquare size={18} className="text-green-400" />,
  new_message: <MessageSquare size={18} className="text-purple-400" />,
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Notifications() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getNotificationsByUser(currentUser.id).then((n) => {
      setNotifications(n.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    });
  }, [currentUser]);

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

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead(currentUser.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClear = async () => {
    await clearNotifications(currentUser.id);
    setNotifications([]);
  };

  const handleClick = async (n: Notification) => {
    if (!n.read) {
      await markNotificationRead(n.id);
      setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x));
    }
    if (n.link) navigate(n.link);
  };

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
              <button onClick={handleMarkAllRead} className="glass-light rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                <Check size={14} /> Mark all read
              </button>
              <button onClick={handleClear} className="glass-light rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="glass rounded-xl h-20 animate-pulse" />)}
          </div>
        ) : notifications.length === 0 ? (
          <div className="glass rounded-xl text-center py-16">
            <Bell size={40} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-500">No notifications yet</p>
            <p className="text-gray-600 text-sm mt-1">You'll get notified when someone applies to your projects or responds to your applications.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleClick(n)}
                className={`w-full text-left glass-card rounded-xl p-4 flex items-start gap-4 ${!n.read ? 'border-purple-500/20' : ''}`}
              >
                <div className="glass-light rounded-lg p-2.5 flex-shrink-0">
                  {ICONS[n.type] || <Bell size={18} className="text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${n.read ? 'text-gray-400' : 'text-white'}`}>{n.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{n.description}</p>
                  <p className="text-gray-600 text-xs mt-1">{timeAgo(n.createdAt)}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
