import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell, CheckCircle, XCircle, Clock, Send, FolderOpen,
  Users, Trash2, Check,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'accepted' | 'rejected' | 'pending' | 'new_project' | 'team_full';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'accepted', title: 'Application Accepted!', message: 'You were accepted to "AI Chatbot Platform"', time: '2 hours ago', read: false, link: '/browse' },
  { id: '2', type: 'pending', title: 'New Application', message: 'Someone applied to your project "React Dashboard"', time: '5 hours ago', read: false, link: '/profile' },
  { id: '3', type: 'new_project', title: 'New Project in Web Dev', message: 'A new project matching your skills was posted', time: '1 day ago', read: true, link: '/browse' },
  { id: '4', type: 'rejected', title: 'Application Update', message: 'Your application to "Blockchain Wallet" was declined', time: '2 days ago', read: true },
  { id: '5', type: 'team_full', title: 'Team Complete!', message: 'Your project "Mobile Fitness App" team is now full', time: '3 days ago', read: true, link: '/profile' },
];

const typeConfig = {
  accepted: { icon: <CheckCircle size={18} />, color: 'text-green-400', bg: 'bg-green-500/10' },
  rejected: { icon: <XCircle size={18} />, color: 'text-red-400', bg: 'bg-red-500/10' },
  pending: { icon: <Clock size={18} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  new_project: { icon: <FolderOpen size={18} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  team_full: { icon: <Users size={18} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Bell size={28} className="text-purple-400" />
              Notifications
            </h1>
            <p className="text-gray-400 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              <Check size={16} /> Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 glass-card p-1.5 mb-6">
          {(['all', 'unread'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === tab ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'all' ? `All (${notifications.length})` : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <Bell size={40} className="mx-auto mb-3 text-gray-600" />
            <h3 className="text-white font-semibold mb-2">No notifications</h3>
            <p className="text-gray-500 text-sm">
              {filter === 'unread' ? 'All notifications have been read.' : 'You have no notifications yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 stagger-children">
            {filtered.map(notification => {
              const config = typeConfig[notification.type];
              const Wrapper = notification.link ? Link : 'div';
              return (
                <Wrapper
                  key={notification.id}
                  {...(notification.link ? { to: notification.link } : {})}
                  className={`glass-card p-4 flex items-start gap-4 transition-all cursor-pointer hover:border-purple-500/30 ${
                    !notification.read ? 'border-purple-500/20 bg-purple-500/5' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center ${config.color} flex-shrink-0`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`text-sm font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-0.5">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-gray-600 text-xs mt-2">{notification.time}</p>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteNotification(notification.id); }}
                    className="text-gray-600 hover:text-red-400 p-1 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </Wrapper>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
