import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, FolderOpen, Eye, EyeOff, Sparkles } from 'lucide-react';
import { getUserByEmail, hashPassword } from '../services/db';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email.trim() || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const user = await getUserByEmail(form.email.toLowerCase().trim());
      if (!user) { setError('No account found with that email.'); setLoading(false); return; }
      if (user.password !== hashPassword(form.password)) { setError('Incorrect password.'); setLoading(false); return; }
      setCurrentUser(user);
      navigate('/profile');
    } catch { setError('Something went wrong.'); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#06060f] flex items-center justify-center p-4 relative">
      <div className="particles-bg" />
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <FolderOpen size={22} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl">find<span className="gradient-text">a</span>project</span>
          </Link>
          <h1 className="text-3xl font-black text-white mt-8 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to continue building</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-2 glass rounded-xl p-3 mb-6 text-xs text-purple-300">
            <Sparkles size={14} />
            <span><strong>Demo:</strong> alice@example.com / password123</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none input-glow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none input-glow pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <button type="submit" disabled={loading}
              className="w-full btn-glow text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
