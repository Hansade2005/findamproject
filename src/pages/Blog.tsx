import { useState } from 'react';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const BLOG_CATEGORIES = ['All', 'Renting Tips', 'Safety & Scam Alerts', 'Buying & Selling Tips', 'Business Tips', 'Job Tips', 'FindAm Updates'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-blue-900/10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-4">
            <BookOpen size={14} />
            Blog
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Latest Articles</h1>
          <p className="text-gray-400">Tips, guides, and updates for the developer community</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-gray-800/60 text-gray-400 border-gray-700/50 hover:border-purple-500/50 hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => (
            <article key={post.id} className="bg-gray-800/60 border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all group">
              <div className="aspect-[16/9] overflow-hidden bg-gray-700/50">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800';
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-purple-500/20">{post.category}</span>
                </div>
                <h2 className="font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                    Read <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={40} className="mx-auto mb-3 text-gray-600" />
            <h3 className="text-white font-semibold mb-2">No articles found</h3>
            <p className="text-gray-500 text-sm">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
