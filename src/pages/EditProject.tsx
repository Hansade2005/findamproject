import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getProjectById, updateProject } from '../services/db';
import type { Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, SKILLS_LIST } from '../types';

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    teamSize: 3,
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (!id) return;
    getProjectById(id).then((p) => {
      if (!p || (currentUser && p.ownerId !== currentUser.id)) {
        navigate('/dashboard');
        return;
      }
      setProject(p);
      setForm({ title: p.title, description: p.description, category: p.category, teamSize: p.teamSize });
      setSkills([...p.skills]);
      setLoading(false);
    });
  }, [id, currentUser]);

  const toggleSkill = (skill: string) => {
    setSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  const addCustomSkill = () => {
    const t = skillInput.trim();
    if (t && !skills.includes(t)) {
      setSkills((prev) => [...prev, t]);
      setSkillInput('');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setSaving(true);
    const updated: Project = {
      ...project,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      teamSize: form.teamSize,
      skills,
    };
    await updateProject(updated);
    navigate(`/project/${project.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!project || !currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to={`/project/${project.id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Project
        </Link>

        <div className="glass rounded-xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Edit Project</h1>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={6}
                className="w-full glass-input rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 text-white text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-gray-800">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Size</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={form.teamSize}
                  onChange={(e) => setForm({ ...form, teamSize: parseInt(e.target.value) || 1 })}
                  className="w-full glass-input rounded-xl px-4 py-3 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills Needed</label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="bg-purple-500/20 text-purple-300 text-xs px-2.5 py-1 rounded-lg border border-purple-500/20 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/20 transition-colors"
                  >
                    {skill} ×
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomSkill(); } }}
                  placeholder="Add custom skill..."
                  className="flex-1 glass-input rounded-lg px-3 py-2 text-white text-xs placeholder-gray-500"
                />
                <button type="button" onClick={addCustomSkill} className="glass-light rounded-lg px-3 py-2 text-xs text-gray-300 hover:text-white transition-colors">Add</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS_LIST.filter((s) => !skills.includes(s)).slice(0, 15).map((skill) => (
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

            <button
              type="submit"
              disabled={saving || !form.title.trim() || !form.description.trim()}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
