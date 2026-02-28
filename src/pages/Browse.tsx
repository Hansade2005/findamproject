import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
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
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.ownerName.toLowerCase().includes(q);
      const matchesCategory = !category || p.category === category;
      const matchesStatus = !status || p.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [projects, query, category, status]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearAll = () => {
    setSearchParams({});
    setLocalQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('q', localQuery);
  };

  const activeFilterCount = [query, category, status].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Browse Projects</h1>
          <p className="text-gray-400">
            {loading ? 'Loading...' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} found`}
            {activeFilterCount > 0 && ` (${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} active)`}
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-3 mt-5 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search by title, skill, or keyword..."
                className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter bar */}
        {showFilters && (
          <div className="glass rounded-xl p-5 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="mt-4 flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <X size={14} /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Active filter chips */}
        {activeFilterCount > 0 && !showFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {query && (
              <span className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-xs px-3 py-1.5 rounded-full border border-purple-500/30">
                "{query}"
                <button onClick={() => { updateFilter('q', ''); setLocalQuery(''); }}><X size={12} /></button>
              </span>
            )}
            {category && (
              <span className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-xs px-3 py-1.5 rounded-full border border-purple-500/30">
                {category}
                <button onClick={() => updateFilter('category', '')}><X size={12} /></button>
              </span>
            )}
            {status && (
              <span className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-xs px-3 py-1.5 rounded-full border border-purple-500/30">
                {status}
                <button onClick={() => updateFilter('status', '')}><X size={12} /></button>
              </span>
            )}
            <button onClick={clearAll} className="text-gray-500 hover:text-white text-xs px-2">
              Clear all
            </button>
          </div>
        )}

        {/* View toggle */}
        <div className="flex justify-end mb-5">
          <div className="flex bg-gray-800 rounded-lg p-1 gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl h-52 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search size={40} className="mx-auto mb-3 text-gray-600" />
            <h3 className="text-white font-semibold mb-2">No projects found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="mt-4 text-purple-400 hover:text-purple-300 text-sm">
                Clear filters
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
