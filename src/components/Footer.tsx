import { Link } from 'react-router-dom';
import { FolderOpen, Github, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[rgba(6,6,15,0.9)]">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <FolderOpen size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                find<span className="gradient-text">a</span>project
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-5">
              The platform for builders & creators. Find your next side project, assemble your dream team, and build something extraordinary together.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-white hover:border-purple-500/30 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Browse Projects', to: '/browse' },
                { label: 'Post a Project', to: '/post' },
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Sign Up', to: '/signup' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-purple-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Categories</h4>
            <ul className="space-y-2.5">
              {['Web Development', 'Mobile App', 'AI / Machine Learning', 'Open Source'].map((c) => (
                <li key={c}>
                  <Link to={`/browse?category=${encodeURIComponent(c)}`} className="text-gray-500 hover:text-purple-400 text-sm transition-colors">{c}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] mt-10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} findaproject. Made with <Heart size={12} className="text-red-400" /> by the community.
          </p>
          <p className="text-gray-700 text-xs">Data stored locally in your browser via IndexedDB</p>
        </div>
      </div>
    </footer>
  );
}
