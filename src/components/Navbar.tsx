import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, FolderOpen, LogOut, User, PlusCircle, Search,
  Bell, Bookmark, Sparkles, ChevronDown, Compass,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Explore', to: '/browse', icon: <Compass size={16} /> },
    ...(currentUser ? [
      { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={16} /> },
      { label: 'Post', to: '/post', icon: <PlusCircle size={16} /> },
    ] : []),
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(6,6,15,0.85)] backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20"
              >
                <FolderOpen size={18} className="text-white" />
              </motion.div>
              <span className="text-white font-bold text-lg tracking-tight">
                find<span className="gradient-text">a</span>project
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'text-white bg-white/[0.08]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.icon}
                  {link.label}
                  {isActive(link.to) && (
                    <motion.div layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-2">
              {currentUser ? (
                <>
                  <Link to="/bookmarks"
                    className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
                  >
                    <Bookmark size={18} />
                  </Link>
                  <Link to="/notifications"
                    className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
                  >
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                  </Link>

                  {/* Profile dropdown */}
                  <div className="relative ml-1">
                    <button onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                        {currentUser.name[0]}
                      </div>
                      <span className="text-gray-300 text-sm font-medium max-w-[100px] truncate">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <ChevronDown size={14} className={`text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 glass rounded-2xl p-2 shadow-xl shadow-black/40"
                        >
                          <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                            <p className="text-white text-sm font-semibold truncate">{currentUser.name}</p>
                            <p className="text-gray-500 text-xs truncate">{currentUser.email}</p>
                          </div>
                          <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors">
                            <User size={15} /> My Profile
                          </Link>
                          <Link to="/bookmarks" className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors">
                            <Bookmark size={15} /> Bookmarks
                          </Link>
                          <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors">
                            <Sparkles size={15} /> Settings
                          </Link>
                          <div className="border-t border-white/[0.06] mt-1 pt-1">
                            <button onClick={handleLogout}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors w-full text-left"
                            >
                              <LogOut size={15} /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login"
                    className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                  <Link to="/signup"
                    className="btn-glow text-sm text-white px-5 py-2.5 rounded-xl font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white p-2">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#0a0a1a] border-l border-white/[0.06] p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <span className="text-white font-bold text-lg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-white">
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.to) ? 'text-white bg-white/[0.08]' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.icon} {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-white/[0.06] mt-6 pt-6">
                {currentUser ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {currentUser.name[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{currentUser.name}</p>
                        <p className="text-gray-500 text-xs">{currentUser.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-sm">
                      <User size={16} /> Profile
                    </Link>
                    <Link to="/bookmarks" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] text-sm">
                      <Bookmark size={16} /> Bookmarks
                    </Link>
                    <button onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm w-full text-left"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block text-center text-gray-300 hover:text-white py-3 rounded-xl border border-white/[0.08] text-sm font-medium">
                      Sign In
                    </Link>
                    <Link to="/signup" className="block text-center btn-glow text-white py-3 rounded-xl text-sm font-semibold">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-[72px]" />
    </>
  );
}
