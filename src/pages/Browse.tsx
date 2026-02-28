import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, LayoutGrid, List, Sparkles } from 'lucide-react';
import { getAllProjects } from '../services/db';
import type { Project } from '../types';
import { CATEGORIES } from '../types';
import ProjectCard from '../components/ProjectCard';

export default function Browse() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    getAllProjects().then((data) => {
      setProjects(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = query.toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.skills.some(s => s.toLowerCase().includes(q)) || p.category.toLowerCase().includes(q);
      return matchQ && (!category || p.category === category) && (!status || p.status === status);
    });
  }, [projects, query, category, status]);

  const updateFilter = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    value ? p.set(key, value) : p.delete(key);
    setSearchParams(p);
  };
  const clearAll = () => { setSearchParams({}); setLocalQuery(''); };
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); updateFilter('q', localQuery); };
  const activeCount = [query, category, status].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#06060f]">
      {/* Header */}
      <div className="relative border-b border-white/[0.04]">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black text-white mb-2">Explore Projects</h1>
            <p className="text-gray-500">
              {loading ? 'Loading...' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} available`}
              {activeCount > 0 && ` · ${activeCount} filter${activeCount !== 1 ? 's' : ''} active`}
            </p>
          </motion.div>

          <form onSubmit={handleSearch} className="flex gap-3 mt-6 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text" value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search by title, skill, or keyword..."
                className="w-full glass rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none input-glow text-sm"
              />
            </div>
            <button type="submit" className="btn-glow text-white px-6 py-3 rounded-xl font-semibold text-sm">
              Search
            </button>
            <button type="button" onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                showFilters || activeCount > 0 ? 'glass text-purple-300 border-purple-500/30' : 'glass text-gray-400'
              }`}
            >
              <SlidersHorizontal size={15} /> Filters {activeCount > 0 && `(${activeCount})`}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-6 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select value={category} onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none input-glow appearance-none"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select value={status} onChange={(e) => updateFilter('status', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none input-glow appearance-none"
                  >
                    <option value="">All</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              {activeCount > 0 && (
                <button onClick={clearAll} className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors">
                  <X size={14} /> Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active chips */}
        {activeCount > 0 && !showFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {query && (
              <span className="flex items-center gap-1.5 glass text-purple-300 text-xs px-3 py-1.5 rounded-full">
                "{query}" <button onClick={() => { updateFilter('q', ''); setLocalQuery(''); }}><X size={12} /></button>
              </span>
            )}
            {category && (
              <span className="flex items-center gap-1.5 glass text-purple-300 text-xs px-3 py-1.5 rounded-full">
                {category} <button onClick={() => updateFilter('category', '')}><X size={12} /></button>
              </span>
            )}
            {status && (
              <span className="flex items-center gap-1.5 glass text-purple-300 text-xs px-3 py-1.5 rounded-full">
                {status} <button onClick={() => updateFilter('status', '')}><X size={12} /></button>
              </span>
            )}
            <button onClick={clearAll} className="text-gray-600 hover:text-white text-xs px-2">Clear all</button>
          </div>
        )}

        {/* View toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex glass rounded-xl p-1 gap-1">
            {[
              { mode: 'grid' as const, icon: <LayoutGrid size={15} /> },
              { mode: 'list' as const, icon: <List size={15} /> },
            ].map(v => (
              <button key={v.mode} onClick={() => setViewMode(v.mode)}
                className={`p-2 rounded-lg transition-all ${viewMode === v.mode ? 'bg-white/[0.1] text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {v.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl h-56 skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <Sparkles size={48} className="mx-auto mb-4 text-gray-700" />
            <h3 className="text-white font-bold text-lg mb-2">No projects found</h3>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters.</p>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-purple-400 hover:text-purple-300 text-sm font-medium">Clear filters</button>
            )}
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
