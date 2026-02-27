import { MessageCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Messages() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={32} className="text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Messages</h1>
        <p className="text-gray-500 mb-2">Connect with buyers and sellers directly through WhatsApp — no login required!</p>
        <div className="flex items-center gap-2 justify-center text-gray-400 text-sm mb-8">
          <Lock size={14} />
          <span>Account-based messaging coming soon</span>
        </div>
        <div className="space-y-3">
          <a
            href="https://wa.me/14075755460"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={18} />
            Contact Support on WhatsApp
          </a>
          <Link to="/listings" className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
