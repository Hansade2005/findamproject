import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/listings', icon: Search, label: 'Browse' },
    { to: '/post-ad', icon: PlusCircle, label: 'Post Ad' },
    { to: '/messages', icon: MessageCircle, label: 'Messages' },
    { to: '/about', icon: User, label: 'More' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-40">
      {navItems.map(({ to, icon: Icon, label }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors ${
              active ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'
            }`}
          >
            <Icon size={label === 'Post Ad' ? 26 : 22} className={label === 'Post Ad' ? 'text-orange-500' : ''} />
            <span className={label === 'Post Ad' ? 'text-orange-500 font-semibold' : ''}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
