import { Link } from 'react-router-dom';
import { FolderOpen, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-navbar mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <FolderOpen size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                find<span className="text-purple-400">a</span>project
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Connect with developers, designers, and creators. Find your next project or post one for others to join.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: 'Browse Projects', to: '/browse' },
                { label: 'Post a Project', to: '/post' },
                { label: 'Sign Up', to: '/signup' },
                { label: 'About', to: '/about' },
                { label: 'Sign In', to: '/login' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Categories</h4>
            <ul className="space-y-2">
              {['Web Development', 'Mobile App', 'AI / Machine Learning', 'Open Source'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/browse?category=${encodeURIComponent(cat)}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} findaproject. Built with React &amp; IndexedDB.
          </p>
          <p className="text-gray-600 text-xs">Data is stored locally in your browser</p>
        </div>
      </div>
    </footer>
  );
}
