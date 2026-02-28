import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderOpen, Send, Bell, TrendingUp, Plus, ArrowRight,
  Users, Clock, CheckCircle, XCircle, BarChart3,
} from 'lucide-react';
import { getProjectsByOwner, getApplicationsByUser, getProjectById } from '../services/db';
import type { Project, Application } from '../types';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [applications, setApplications] = useState<{ app: Application; project: Project }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) { navigate('/login'); return; }
    Promise.all([
      getProjectsByOwner(currentUser.id),
      getApplicationsByUser(currentUser.id),
    ]).then(async ([projs, apps]) => {
      setProjects(projs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      const withProjects = await Promise.all(
        apps.map(async (app) => {
          const project = await getProjectById(app.projectId);
          return project ? { app, project } : null;
        })
      );
      setApplications(withProjects.filter(Boolean) as { app: Application; project: Project }[]);
      setLoading(false);
    });
  }, [currentUser]);

  if (!currentUser) return null;

  const pendingApps = applications.filter(a => a.app.status === 'pending');
  const acceptedApps = applications.filter(a => a.app.status === 'accepted');
  const openProjects = projects.filter(p => p.status === 'open');

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header with gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-blue-900/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, <span className="gradient-text">{currentUser.name.split(' ')[0]}</span>
              </h1>
              <p className="text-gray-400 mt-1">Here's what's happening with your projects</p>
            </div>
            <Link
              to="/post"
              className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              <Plus size={16} /> New Project
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 -mt-2 stagger-children">
          {[
            { icon: <FolderOpen size={20} />, label: 'My Projects', value: projects.length, color: 'purple' },
            { icon: <TrendingUp size={20} />, label: 'Open Projects', value: openProjects.length, color: 'green' },
            { icon: <Send size={20} />, label: 'Applications', value: applications.length, color: 'blue' },
            { icon: <CheckCircle size={20} />, label: 'Accepted', value: acceptedApps.length, color: 'emerald' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5 glass-card-hover">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-400 mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{loading ? '—' : stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-purple-400" />
                Recent Projects
              </h2>
              <Link to="/profile" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 glass-card animate-pulse" />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <FolderOpen size={40} className="mx-auto mb-3 text-gray-600" />
                <h3 className="text-white font-semibold mb-2">No projects yet</h3>
                <p className="text-gray-500 text-sm mb-5">Start by creating your first project</p>
                <Link to="/post" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors">
                  <Plus size={16} /> Post a Project
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
                {projects.slice(0, 4).map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Applications */}
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock size={16} className="text-yellow-400" />
                Pending Applications
              </h3>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => <div key={i} className="h-16 bg-gray-800/40 rounded-lg animate-pulse" />)}
                </div>
              ) : pendingApps.length === 0 ? (
                <p className="text-gray-500 text-sm">No pending applications</p>
              ) : (
                <div className="space-y-3">
                  {pendingApps.slice(0, 5).map(({ app, project }) => (
                    <Link
                      key={app.id}
                      to={`/project/${project.id}`}
                      className="block bg-gray-800/40 hover:bg-gray-800/60 rounded-lg p-3 transition-colors"
                    >
                      <p className="text-white text-sm font-medium truncate">{project.title}</p>
                      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                        <Clock size={11} className="text-yellow-400" /> Awaiting review
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Bell size={16} className="text-purple-400" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { to: '/post', icon: <Plus size={16} />, label: 'Post a Project' },
                  { to: '/browse', icon: <Users size={16} />, label: 'Browse Projects' },
                  { to: '/messages', icon: <Send size={16} />, label: 'Messages' },
                  { to: '/profile', icon: <FolderOpen size={16} />, label: 'My Profile' },
                ].map(action => (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="flex items-center gap-3 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg p-3 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <span className="text-purple-400">{action.icon}</span>
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
