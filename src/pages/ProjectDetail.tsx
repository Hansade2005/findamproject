import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Users, Calendar, Tag, CheckCircle, XCircle,
  Clock, Send, Trash2, Bookmark, BookmarkCheck, MessageCircle,
} from 'lucide-react';
import {
  getProjectById, getApplicationsByProject, createApplication,
  updateApplication, updateProject, deleteProject,
  addComment, getCommentsByProject, addBookmark, removeBookmark, getUserBookmarkForProject,
} from '../services/db';
import type { Project, Application, Comment as CommentType, Bookmark as BookmarkType } from '../types';
import { useAuth } from '../context/AuthContext';

const categoryColors: Record<string, string> = {
  'Web Development': 'bg-blue-500/20 text-blue-300',
  'Mobile App': 'bg-green-500/20 text-green-300',
  'AI / Machine Learning': 'bg-pink-500/20 text-pink-300',
  'Game Development': 'bg-orange-500/20 text-orange-300',
  'Data Science': 'bg-cyan-500/20 text-cyan-300',
  'Open Source': 'bg-yellow-500/20 text-yellow-300',
  'Design': 'bg-purple-500/20 text-purple-300',
  'Blockchain': 'bg-indigo-500/20 text-indigo-300',
  'IoT': 'bg-teal-500/20 text-teal-300',
  'Other': 'bg-gray-500/20 text-gray-300',
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [userApp, setUserApp] = useState<Application | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState('');
  const [bookmark, setBookmark] = useState<BookmarkType | null>(null);
  const [bookmarking, setBookmarking] = useState(false);

  const isOwner = currentUser && project?.ownerId === currentUser.id;

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getProjectById(id),
      getApplicationsByProject(id),
      getCommentsByProject(id),
    ]).then(([proj, apps, cmts]) => {
      if (!proj) { navigate('/browse'); return; }
      setProject(proj);
      setApplications(apps);
      setComments(cmts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
      if (currentUser) {
        const existing = apps.find((a) => a.userId === currentUser.id);
        if (existing) setUserApp(existing);
        getUserBookmarkForProject(currentUser.id, id).then((bm) => {
          if (bm) setBookmark(bm);
        });
      }
      setLoading(false);
    });
  }, [id, currentUser]);

  const handleBookmark = async () => {
    if (!currentUser || !project) return;
    setBookmarking(true);
    if (bookmark) {
      await removeBookmark(bookmark.id);
      setBookmark(null);
    } else {
      const bm = await addBookmark(currentUser.id, project.id);
      setBookmark(bm);
    }
    setBookmarking(false);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !project || !commentText.trim()) return;
    const c = await addComment({
      projectId: project.id,
      userId: currentUser.id,
      userName: currentUser.name,
      text: commentText.trim(),
    });
    setComments((prev) => [...prev, c]);
    setCommentText('');
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !project) return;
    if (!message.trim()) { setError('Please write a message.'); return; }

    setSubmitting(true);
    setError('');
    try {
      const app = await createApplication({
        projectId: project.id,
        userId: currentUser.id,
        message: message.trim(),
        status: 'pending',
      });
      setUserApp(app);
      setApplications((prev) => [...prev, app]);
      setMessage('');
      setSuccessMsg('Application submitted successfully!');
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplicationUpdate = async (app: Application, newStatus: Application['status']) => {
    const updated = { ...app, status: newStatus };
    await updateApplication(updated);
    setApplications((prev) => prev.map((a) => (a.id === app.id ? updated : a)));

    // Update project member count
    if (newStatus === 'accepted' && project) {
      const updatedProject = { ...project, currentMembers: project.currentMembers + 1 };
      await updateProject(updatedProject);
      setProject(updatedProject);
    }
  };

  const handleToggleStatus = async () => {
    if (!project) return;
    const updated = { ...project, status: project.status === 'open' ? 'closed' as const : 'open' as const };
    await updateProject(updated);
    setProject(updated);
  };

  const handleDelete = async () => {
    if (!project) return;
    await deleteProject(project.id);
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!project) return null;

  const colorClass = categoryColors[project.category] || 'bg-gray-500/20 text-gray-300';
  const spotsLeft = project.teamSize - project.currentMembers;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link to="/browse" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${colorClass}`}>
                      {project.category}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        project.status === 'open'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-600/40 text-gray-400'
                      }`}
                    >
                      {project.status === 'open' ? '● Open' : '● Closed'}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-white leading-snug">{project.title}</h1>
                  <p className="text-gray-400 text-sm mt-1">Posted by {project.ownerName}</p>
                </div>
                <div className="flex gap-2">
                  {currentUser && (
                    <button
                      onClick={handleBookmark}
                      disabled={bookmarking}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                        bookmark
                          ? 'bg-purple-600/30 text-purple-300 hover:bg-purple-600/50'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {bookmark ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                      {bookmark ? 'Saved' : 'Save'}
                    </button>
                  )}
                  {isOwner && (
                    <>
                      <button
                        onClick={handleToggleStatus}
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {project.status === 'open' ? 'Close Project' : 'Reopen Project'}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="text-xs bg-red-900/30 hover:bg-red-900/50 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{project.description}</p>
            </div>

            {/* Skills */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-white font-semibold mb-3">Skills Needed</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-purple-500/20 text-purple-300 text-sm px-3 py-1.5 rounded-lg border border-purple-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply form */}
            {!isOwner && (
              <div className="glass rounded-xl p-6">
                <h2 className="text-white font-semibold mb-4">Apply to Join</h2>

                {!currentUser ? (
                  <div className="text-center py-4">
                    <p className="text-gray-400 mb-3">You need to be logged in to apply.</p>
                    <Link
                      to="/login"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Sign In to Apply
                    </Link>
                  </div>
                ) : userApp ? (
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${
                    userApp.status === 'accepted'
                      ? 'bg-green-500/10 border border-green-500/20'
                      : userApp.status === 'rejected'
                      ? 'bg-red-500/10 border border-red-500/20'
                      : 'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    {userApp.status === 'accepted' && <CheckCircle size={18} className="text-green-400" />}
                    {userApp.status === 'rejected' && <XCircle size={18} className="text-red-400" />}
                    {userApp.status === 'pending' && <Clock size={18} className="text-yellow-400" />}
                    <div>
                      <p className="text-white font-medium text-sm">
                        Application {userApp.status === 'pending' ? 'Pending' : userApp.status === 'accepted' ? 'Accepted!' : 'Rejected'}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {userApp.status === 'pending' && 'The project owner will review your application.'}
                        {userApp.status === 'accepted' && 'Congratulations! You\'ve been accepted to the project.'}
                        {userApp.status === 'rejected' && 'Unfortunately your application was not accepted.'}
                      </p>
                    </div>
                  </div>
                ) : project.status === 'closed' ? (
                  <p className="text-gray-400 text-sm">This project is no longer accepting applications.</p>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Why do you want to join this project?
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Tell the project owner about your relevant experience and what you can contribute..."
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 resize-none"
                      />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium text-sm transition-colors"
                    >
                      <Send size={16} />
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Applications (owner view) */}
            {isOwner && applications.length > 0 && (
              <div className="glass rounded-xl p-6">
                <h2 className="text-white font-semibold mb-4">
                  Applications ({applications.length})
                </h2>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="bg-gray-700/40 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                              {app.userId.substring(0, 1).toUpperCase()}
                            </div>
                            <span className="text-white text-sm font-medium">Applicant</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                app.status === 'accepted'
                                  ? 'bg-green-500/20 text-green-400'
                                  : app.status === 'rejected'
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">{app.message}</p>
                        </div>
                        {app.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApplicationUpdate(app, 'accepted')}
                              className="flex items-center gap-1 text-xs bg-green-600/20 hover:bg-green-600/40 text-green-400 px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                              <CheckCircle size={12} /> Accept
                            </button>
                            <button
                              onClick={() => handleApplicationUpdate(app, 'rejected')}
                              className="flex items-center gap-1 text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                              <XCircle size={12} /> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

            {/* Comments */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MessageCircle size={18} /> Discussion ({comments.length})
              </h2>

              {comments.length > 0 && (
                <div className="space-y-4 mb-6">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                          {c.userName.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium">{c.userName}</span>
                        <span className="text-gray-500 text-xs">
                          {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {currentUser ? (
                <form onSubmit={handleComment} className="flex gap-3">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </form>
              ) : (
                <p className="text-gray-500 text-sm">
                  <Link to="/login" className="text-purple-400 hover:underline">Sign in</Link> to join the discussion.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Project info */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Project Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-gray-500" />
                  <div>
                    <div className="text-gray-400">Team Size</div>
                    <div className="text-white font-medium">
                      {project.currentMembers}/{project.teamSize} members
                    </div>
                  </div>
                </div>
                {project.status === 'open' && spotsLeft > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <Tag size={16} className="text-gray-500" />
                    <div>
                      <div className="text-gray-400">Available Spots</div>
                      <div className="text-purple-400 font-medium">{spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-gray-500" />
                  <div>
                    <div className="text-gray-400">Posted</div>
                    <div className="text-white font-medium">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team progress */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3">Team Progress</h3>
              <div className="mb-2 flex justify-between text-xs text-gray-400">
                <span>{project.currentMembers} members</span>
                <span>{project.teamSize} max</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (project.currentMembers / project.teamSize) * 100)}%` }}
                />
              </div>
              <p className="text-gray-500 text-xs mt-2">
                {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} available` : 'Team is full'}
              </p>
            </div>

            {/* Applications count (owner) */}
            {isOwner && (
              <div className="glass rounded-xl p-5">
                <h3 className="text-white font-semibold mb-3">Applications</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-yellow-500/10 rounded-lg p-2">
                    <div className="text-yellow-400 font-bold">{applications.filter(a => a.status === 'pending').length}</div>
                    <div className="text-gray-500 text-xs">Pending</div>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-2">
                    <div className="text-green-400 font-bold">{applications.filter(a => a.status === 'accepted').length}</div>
                    <div className="text-gray-500 text-xs">Accepted</div>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-2">
                    <div className="text-red-400 font-bold">{applications.filter(a => a.status === 'rejected').length}</div>
                    <div className="text-gray-500 text-xs">Rejected</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Project</h3>
            <p className="text-gray-400 text-sm mb-5">
              Are you sure you want to delete "{project.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
