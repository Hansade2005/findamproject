import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/browse', icon: Search, label: 'Browse' },
    { to: '/post', icon: PlusCircle, label: 'Post' },
    { to: '/messages', icon: MessageCircle, label: 'Messages' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 flex md:hidden z-40">
      {navItems.map(({ to, icon: Icon, label }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 text-xs font-medium transition-colors ${
              active ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon size={label === 'Post' ? 26 : 22} className={label === 'Post' ? (active ? 'text-purple-400' : 'text-purple-500') : ''} />
            <span className="mt-0.5">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
