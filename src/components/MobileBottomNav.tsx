import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, PlusCircle, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MobileBottomNav() {
  const location = useLocation();
  const { currentUser } = useAuth();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/browse', icon: Compass, label: 'Explore' },
    { to: '/post', icon: PlusCircle, label: 'Post', special: true },
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: currentUser ? '/profile' : '/login', icon: User, label: currentUser ? 'Profile' : 'Sign In' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/[0.06] flex md:hidden z-40 safe-area-bottom">
      {navItems.map(({ to, icon: Icon, label, special }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 text-[10px] font-medium transition-all ${
              special
                ? 'text-white'
                : active
                ? 'text-purple-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {special ? (
              <div className="w-10 h-10 -mt-4 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-0.5">
                <Icon size={20} className="text-white" />
              </div>
            ) : (
              <Icon size={20} className={active ? 'text-purple-400' : ''} />
            )}
            <span className={`mt-0.5 ${special ? 'text-purple-300 font-semibold' : ''}`}>{label}</span>
            {active && !special && (
              <div className="absolute bottom-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
