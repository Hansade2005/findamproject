import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FolderOpen, LogOut, User, PlusCircle, Search, MessageCircle, Info, Mail, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-purple-400'
      : 'text-gray-300 hover:text-white';

  return (
    <nav className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <FolderOpen size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              find<span className="text-purple-400">a</span>project
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/browse" className={`text-sm font-medium transition-colors ${isActive('/browse')}`}>Browse</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about')}`}>About</Link>
            <Link to="/blog" className={`text-sm font-medium transition-colors ${isActive('/blog')}`}>Blog</Link>
            <Link to="/pricing" className={`text-sm font-medium transition-colors ${isActive('/pricing')}`}>Pricing</Link>
            {currentUser && (
              <>
                <Link to="/post" className={`text-sm font-medium transition-colors ${isActive('/post')}`}>Post</Link>
                <Link to="/messages" className={`text-sm font-medium transition-colors ${isActive('/messages')}`}>Messages</Link>
                <Link to="/profile" className={`text-sm font-medium transition-colors ${isActive('/profile')}`}>Profile</Link>
              </>
            )}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Hi, {currentUser.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2">Sign In</Link>
                <Link to="/signup" className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 px-4 py-4 space-y-2">
          {[
            { to: '/browse', icon: <Search size={16} />, label: 'Browse Projects' },
            { to: '/about', icon: <Info size={16} />, label: 'About' },
            { to: '/blog', icon: <BookOpen size={16} />, label: 'Blog' },
            { to: '/contact', icon: <Mail size={16} />, label: 'Contact' },
          ].map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors">
              {item.icon} {item.label}
            </Link>
          ))}
          {currentUser ? (
            <>
              <Link to="/post" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                <PlusCircle size={16} /> Post a Project
              </Link>
              <Link to="/messages" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                <MessageCircle size={16} /> Messages
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                <User size={16} /> My Profile
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white py-2.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors w-full text-left">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white py-2.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors">Sign In</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-center font-medium mt-2">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
