import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FolderOpen, LogOut, User, PlusCircle, Search, LayoutDashboard, Bell } from 'lucide-react';
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
    <nav className="glass-navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
              <FolderOpen size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              find<span className="text-purple-400">a</span>project
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/browse" className={`text-sm font-medium transition-colors ${isActive('/browse')}`}>
              Browse
            </Link>
            {currentUser && (
              <>
                <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive('/dashboard')}`}>
                  Dashboard
                </Link>
                <Link to="/post" className={`text-sm font-medium transition-colors ${isActive('/post')}`}>
                  Post Project
                </Link>
                <Link to="/messages" className={`text-sm font-medium transition-colors ${isActive('/messages')}`}>
                  Messages
                </Link>
              </>
            )}
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about')}`}>
              About
            </Link>
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link to="/notifications" className="relative text-gray-400 hover:text-white transition-colors p-1">
                  <Bell size={18} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-500 rounded-full"></span>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 glass-light rounded-full px-3 py-1.5 hover:border-purple-500/40 transition-all">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs text-white font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-gray-300 text-sm">{currentUser.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all font-medium hover:shadow-lg hover:shadow-purple-600/25"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-gray-700/30 px-4 py-4 space-y-3">
          <Link to="/browse" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2">
            <Search size={16} /> Browse Projects
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2">
            <FolderOpen size={16} /> About
          </Link>
          {currentUser ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <Link to="/post" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2">
                <PlusCircle size={16} /> Post Project
              </Link>
              <Link to="/messages" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2">
                <Bell size={16} /> Messages
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2">
                <User size={16} /> Profile
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white py-2 w-full text-left">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white py-2">Sign In</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center font-medium">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
