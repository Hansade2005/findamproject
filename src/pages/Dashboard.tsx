import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Users, Eye, PlusCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAllProjects } from '../services/db';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects().then((projects) => {
      setAllProjects(projects);
      if (currentUser) {
        setMyProjects(projects.filter((p) => p.ownerId === currentUser.id));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [currentUser]);

  const openProjects = allProjects.filter((p) => p.status === 'open').length;
  const recentProjects = [...allProjects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md">
          <FolderOpen size={48} className="mx-auto text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to access your dashboard</h2>
          <p className="text-gray-400 mb-6">Track your projects and manage your collaborations.</p>
          <Link to="/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-600/25">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {currentUser.name.split(' ')[0]}!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <FolderOpen size={20} />, label: 'My Projects', value: myProjects.length, colorClass: 'text-purple-400' },
            { icon: <Users size={20} />, label: 'Collaborations', value: 0, colorClass: 'text-blue-400' },
            { icon: <Eye size={20} />, label: 'Open Projects', value: openProjects, colorClass: 'text-emerald-400' },
            { icon: <TrendingUp size={20} />, label: 'Total Projects', value: allProjects.length, colorClass: 'text-orange-400' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-5">
              <div className={`${stat.colorClass} mb-3`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* My Projects */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">My Projects</h2>
            <Link to="/post" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
              <PlusCircle size={16} /> New Project
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => <div key={i} className="glass rounded-xl h-52 animate-pulse" />)}
            </div>
          ) : myProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="glass rounded-xl text-center py-12">
              <FolderOpen size={36} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-500 mb-4">You haven't posted any projects yet.</p>
              <Link to="/post" className="text-purple-400 hover:text-purple-300 text-sm">Post your first project →</Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">Recent Projects</h2>
            <Link to="/browse" className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Browse all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
