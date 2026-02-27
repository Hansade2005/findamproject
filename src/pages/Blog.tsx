import { useState } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const BLOG_CATEGORIES = ['All', 'Renting Tips', 'Safety & Scam Alerts', 'Buying & Selling Tips', 'Business Tips', 'Job Tips', 'FindAm Updates'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">FindAm Blog</h1>
        <p className="text-gray-500">Tips, guides, and updates for Cameroon's marketplace community</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {BLOG_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === cat
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400 hover:text-orange-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(post => (
          <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800';
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">{post.category}</span>
              </div>
              <h2 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-3 mb-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>{post.readTime} read</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-orange-500 font-semibold hover:underline">
                  Read <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
