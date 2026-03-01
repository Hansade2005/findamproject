import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getBookmarksByUser, getProjectById, removeBookmark } from '../services/db';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

export default function SavedProjects() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState<(Project & { bookmarkId: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) { setLoading(false); return; }
    getBookmarksByUser(currentUser.id).then(async (bookmarks) => {
      const results: (Project & { bookmarkId: string })[] = [];
      for (const bm of bookmarks) {
        const p = await getProjectById(bm.projectId);
        if (p) results.push({ ...p, bookmarkId: bm.id });
      }
      setProjects(results);
      setLoading(false);
    });
  }, [currentUser]);

  const handleRemove = async (bookmarkId: string) => {
    await removeBookmark(bookmarkId);
    setProjects((prev) => prev.filter((p) => p.bookmarkId !== bookmarkId));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md">
          <Heart size={48} className="mx-auto text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to see saved projects</h2>
          <p className="text-gray-400 mb-6">Save projects you're interested in.</p>
          <Link to="/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white mb-1">Saved Projects</h1>
          <p className="text-gray-400">Projects you've bookmarked</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <div key={i} className="glass rounded-xl h-52 animate-pulse" />)}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div key={p.id} className="relative">
                <ProjectCard project={p} />
                <button
                  onClick={() => handleRemove(p.bookmarkId)}
                  className="absolute top-3 right-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 p-2 rounded-lg transition-colors z-10"
                  title="Remove bookmark"
                >
                  <Bookmark size={16} className="fill-current" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl text-center py-16">
            <Bookmark size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No saved projects yet</h3>
            <p className="text-gray-500 mb-4">Browse projects and bookmark the ones you like!</p>
            <Link to="/browse" className="text-purple-400 hover:text-purple-300 text-sm">Browse Projects →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
