import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, Code2, Smartphone, Brain, Gamepad2,
  Database, GitBranch, Palette, Layers, Cpu, Globe,
  Users, FolderOpen, Zap, Sparkles,
} from 'lucide-react';
import { getAllProjects } from '../services/db';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

interface CategoryDef {
  label: string;
  icon: React.ReactElement;
  gradient: string;
}

const CATEGORY_DEFS: CategoryDef[] = [
  { label: 'Web Development', icon: <Code2 size={22} />, gradient: 'from-blue-600 to-blue-700' },
  { label: 'Mobile App', icon: <Smartphone size={22} />, gradient: 'from-green-600 to-green-700' },
  { label: 'AI / Machine Learning', icon: <Brain size={22} />, gradient: 'from-pink-600 to-pink-700' },
  { label: 'Game Development', icon: <Gamepad2 size={22} />, gradient: 'from-orange-600 to-orange-700' },
  { label: 'Data Science', icon: <Database size={22} />, gradient: 'from-cyan-600 to-cyan-700' },
  { label: 'Open Source', icon: <GitBranch size={22} />, gradient: 'from-yellow-600 to-yellow-700' },
  { label: 'Design', icon: <Palette size={22} />, gradient: 'from-purple-600 to-purple-700' },
  { label: 'Blockchain', icon: <Layers size={22} />, gradient: 'from-indigo-600 to-indigo-700' },
  { label: 'IoT', icon: <Cpu size={22} />, gradient: 'from-teal-600 to-teal-700' },
  { label: 'Other', icon: <Globe size={22} />, gradient: 'from-gray-600 to-gray-700' },
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects().then((projects) => {
      const open = projects.filter((p) => p.status === 'open');
      setFeaturedProjects(open.slice(0, 6));
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-6">
              <Sparkles size={14} className="text-purple-400" />
              Find your next side project
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-none glow-text">
              Build something{' '}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animated-bg">
                amazing
              </span>{' '}
              together
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with developers, designers, and creators. Browse open projects looking for contributors, or post your own idea and build your dream team.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-3 max-w-xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by skill, keyword..."
                  className="w-full glass-input rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all whitespace-nowrap hover:shadow-lg hover:shadow-purple-600/25"
              >
                Search
              </button>
            </form>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <Link to="/browse" className="hover:text-purple-400 transition-colors">Browse all projects →</Link>
              <Link to="/signup" className="hover:text-purple-400 transition-colors">Post a project →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { icon: <FolderOpen size={20} />, value: '100+', label: 'Projects Posted' },
              { icon: <Users size={20} />, value: '500+', label: 'Developers' },
              { icon: <Globe size={20} />, value: '10', label: 'Categories' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-purple-400 mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
            <p className="text-gray-400 text-sm mt-1">Find projects that match your skills</p>
          </div>
          <Link to="/browse" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORY_DEFS.map(({ label, icon, gradient }) => (
            <Link
              key={label}
              to={`/browse?category=${encodeURIComponent(label)}`}
              className="group"
            >
              <div className="glass-card rounded-xl p-4 text-center">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <p className="text-gray-300 text-xs font-medium leading-tight">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
            <p className="text-gray-400 text-sm mt-1">Open projects looking for contributors</p>
          </div>
          <Link to="/browse" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
            See all <ArrowRight size={14} />
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl text-center py-16 text-gray-500">
            <FolderOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p>No projects yet. Be the first to post one!</p>
            <Link to="/post" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
              Post a project →
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-96 h-32 bg-purple-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative glass border-y border-purple-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Have a project idea?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Post your project and find talented collaborators to bring your idea to life.
            </p>
            <Link
              to="/post"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-600/25"
            >
              Post a Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
