import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FolderOpen, Send, Plus, Edit2, X, Check } from 'lucide-react';
import { getProjectsByOwner, getApplicationsByUser, getProjectById, updateUser } from '../services/db';
import type { Project, Application } from '../types';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { SKILLS_LIST } from '../types';

export default function Profile() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [myApplications, setMyApplications] = useState<{ app: Application; project: Project }[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'applications'>('projects');
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bio: '' });
  const [editSkills, setEditSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) { navigate('/login'); return; }

    Promise.all([
      getProjectsByOwner(currentUser.id),
      getApplicationsByUser(currentUser.id),
    ]).then(async ([projects, apps]) => {
      setMyProjects(projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      const withProjects = await Promise.all(
        apps.map(async (app) => {
          const project = await getProjectById(app.projectId);
          return project ? { app, project } : null;
        })
      );
      setMyApplications(withProjects.filter(Boolean) as { app: Application; project: Project }[]);
      setLoading(false);
    });
  }, [currentUser]);

  const startEdit = () => {
    if (!currentUser) return;
    setEditForm({ name: currentUser.name, bio: currentUser.bio });
    setEditSkills([...currentUser.skills]);
    setEditing(true);
  };

  const cancelEdit = () => setEditing(false);

  const saveProfile = async () => {
    if (!currentUser) return;
    setSaving(true);
    const updated = {
      ...currentUser,
      name: editForm.name.trim() || currentUser.name,
      bio: editForm.bio.trim(),
      skills: editSkills,
    };
    await updateUser(updated);
    setCurrentUser(updated);
    setEditing(false);
    setSaving(false);
  };

  const toggleSkill = (skill: string) => {
    setEditSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !editSkills.includes(trimmed)) {
      setEditSkills((prev) => [...prev, trimmed]);
      setSkillInput('');
    }
  };

  if (!currentUser) return null;

  const initials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile header */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                    placeholder="Your name"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={2}
                    placeholder="Write a short bio..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                  <p className="text-gray-400 text-sm mt-0.5">{currentUser.email}</p>
                  {currentUser.bio && (
                    <p className="text-gray-300 text-sm mt-2">{currentUser.bio}</p>
                  )}
                </>
              )}
            </div>

            <div>
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={cancelEdit} className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors">
                    <X size={18} />
                  </button>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    <Check size={16} />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={startEdit}
                  className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <Edit2 size={14} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-5 pt-5 border-t border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-white font-medium text-sm">Skills</h3>
            </div>

            {editing ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {editSkills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1 bg-purple-500/20 text-purple-300 text-xs px-2.5 py-1 rounded-lg border border-purple-500/20"
                    >
                      {skill}
                      <button type="button" onClick={() => toggleSkill(skill)}><X size={11} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomSkill(); } }}
                    placeholder="Add skill..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                  <button type="button" onClick={addCustomSkill} className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 px-3 py-1.5 rounded-lg text-xs">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS_LIST.filter((s) => !editSkills.includes(s)).slice(0, 20).map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="text-xs px-2.5 py-1 rounded-lg border bg-gray-700/60 border-gray-600/50 text-gray-400 hover:border-purple-500/50 hover:text-gray-300 transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            ) : currentUser.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {currentUser.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-700/60 text-gray-300 text-xs px-2.5 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No skills added yet. <button onClick={startEdit} className="text-purple-400 hover:text-purple-300">Add skills</button></p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{myProjects.length}</div>
            <div className="text-gray-400 text-sm">Projects Posted</div>
          </div>
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{myApplications.length}</div>
            <div className="text-gray-400 text-sm">Applications Sent</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-800/60 border border-gray-700/50 rounded-xl p-1.5 mb-6">
          {(['projects', 'applications'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'projects' ? `My Projects (${myProjects.length})` : `Applications (${myApplications.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-800/40 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : activeTab === 'projects' ? (
          <div>
            {myProjects.length === 0 ? (
              <div className="text-center py-16">
                <FolderOpen size={40} className="mx-auto mb-3 text-gray-600" />
                <h3 className="text-white font-semibold mb-2">No projects yet</h3>
                <p className="text-gray-500 text-sm mb-5">Post your first project and find collaborators.</p>
                <Link
                  to="/post"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  <Plus size={16} /> Post a Project
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
            <div className="mt-5 text-center">
              <Link
                to="/post"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <Plus size={16} /> Post New Project
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {myApplications.length === 0 ? (
              <div className="text-center py-16">
                <Send size={40} className="mx-auto mb-3 text-gray-600" />
                <h3 className="text-white font-semibold mb-2">No applications yet</h3>
                <p className="text-gray-500 text-sm mb-5">Browse projects and apply to join ones that interest you.</p>
                <Link
                  to="/browse"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  Browse Projects
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myApplications.map(({ app, project }) => (
                  <div key={app.id} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/project/${project.id}`}
                          className="text-white font-medium hover:text-purple-300 transition-colors"
                        >
                          {project.title}
                        </Link>
                        <p className="text-gray-500 text-xs mt-0.5">{project.category} · by {project.ownerName}</p>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{app.message}</p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0 ${
                          app.status === 'accepted'
                            ? 'bg-green-500/20 text-green-400'
                            : app.status === 'rejected'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Applied {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
