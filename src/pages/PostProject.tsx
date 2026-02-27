import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, X, ArrowLeft } from 'lucide-react';
import { createProject } from '../services/db';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, SKILLS_LIST } from '../types';

export default function PostProject() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    teamSize: 3,
    status: 'open' as 'open' | 'closed',
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full text-center">
          <h2 className="text-white text-xl font-bold mb-3">Sign in required</h2>
          <p className="text-gray-400 mb-5">You need to be logged in to post a project.</p>
          <Link
            to="/login"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills((prev) => [...prev, trimmed]);
      setSkillInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) { setError('Project title is required.'); return; }
    if (!form.description.trim()) { setError('Description is required.'); return; }
    if (!form.category) { setError('Please select a category.'); return; }
    if (selectedSkills.length === 0) { setError('Please add at least one skill.'); return; }

    setLoading(true);
    try {
      const project = await createProject({
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        skills: selectedSkills,
        status: form.status,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        teamSize: form.teamSize,
        currentMembers: 1,
      });
      navigate(`/project/${project.id}`);
    } catch (err) {
      setError('Failed to create project. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/browse" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Post a Project</h1>
          <p className="text-gray-400 mt-1">Share your idea and find collaborators to build it with you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Project Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Open Source Code Review Tool"
                  maxLength={100}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={5}
                  placeholder="Describe your project, what you're building, and what kind of contributors you're looking for..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    value={form.teamSize}
                    onChange={(e) => setForm({ ...form, teamSize: Math.max(1, Math.min(20, parseInt(e.target.value) || 1)) })}
                    min={1}
                    max={20}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Skills Needed <span className="text-red-400">*</span></h2>

            {/* Selected skills */}
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-sm px-3 py-1.5 rounded-lg border border-purple-500/20"
                  >
                    {skill}
                    <button type="button" onClick={() => toggleSkill(skill)}>
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Custom skill input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomSkill(); } }}
                placeholder="Add a custom skill..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Add
              </button>
            </div>

            {/* Common skills grid */}
            <div className="flex flex-wrap gap-2">
              {SKILLS_LIST.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    selectedSkills.includes(skill)
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-gray-700/60 border-gray-600/50 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Link
              to="/browse"
              className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-colors"
            >
              <PlusCircle size={18} />
              {loading ? 'Posting...' : 'Post Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
