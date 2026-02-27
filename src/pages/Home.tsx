import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, Code2, Smartphone, Brain, Gamepad2,
  Database, GitBranch, Palette, Layers, Cpu, Globe,
  Users, FolderOpen, Zap,
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
      setFeaturedProjects(open.slice(0, 3));
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-950 to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-6">
              <Zap size={14} />
              Find your next side project
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-none">
              Build something{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors whitespace-nowrap"
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
      <section className="border-y border-gray-800 bg-gray-900/50">
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
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-200">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FolderOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p>No projects yet. Be the first to post one!</p>
            <Link to="/post" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
              Post a project →
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-y border-purple-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a project idea?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Post your project and find talented collaborators to bring your idea to life.
          </p>
          <Link
            to="/post"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
          >
            Post a Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
