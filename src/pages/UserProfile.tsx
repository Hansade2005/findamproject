import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FolderOpen, Mail, Calendar, MessageSquare } from 'lucide-react';
import { getUserById, getProjectsByOwner, getOrCreateConversation } from '../services/db';
import type { User, Project } from '../types';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getUserById(id), getProjectsByOwner(id)]).then(([u, p]) => {
      if (!u) { navigate('/browse'); return; }
      setUser(u);
      setProjects(p.filter((proj) => proj.status === 'open'));
      setLoading(false);
    });
  }, [id]);

  const handleMessage = async () => {
    if (!currentUser || !user) return;
    const convo = await getOrCreateConversation(currentUser.id, currentUser.name, user.id, user.name);
    navigate(`/messages?convo=${convo.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const joined = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/browse" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="glass rounded-xl p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Calendar size={14} /> Joined {joined}</span>
                <span className="flex items-center gap-1"><FolderOpen size={14} /> {projects.length} projects</span>
              </div>
              {user.bio && <p className="text-gray-300 text-sm mt-3">{user.bio}</p>}
            </div>
            {currentUser && currentUser.id !== user.id && (
              <button
                onClick={handleMessage}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <MessageSquare size={16} /> Message
              </button>
            )}
          </div>

          {user.skills.length > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-700/50">
              <h3 className="text-white font-medium text-sm mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {user.skills.map((skill) => (
                  <span key={skill} className="bg-gray-700/60 text-gray-300 text-xs px-2.5 py-1 rounded-lg">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Open Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="glass rounded-xl text-center py-12">
            <FolderOpen size={36} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-500">No open projects yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
