import { Link } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';
import type { Project } from '../types';

interface Props {
  project: Project;
}

const categoryColors: Record<string, string> = {
  'Web Development': 'bg-blue-500/20 text-blue-300 border-blue-500/20',
  'Mobile App': 'bg-green-500/20 text-green-300 border-green-500/20',
  'AI / Machine Learning': 'bg-pink-500/20 text-pink-300 border-pink-500/20',
  'Game Development': 'bg-orange-500/20 text-orange-300 border-orange-500/20',
  'Data Science': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/20',
  'Open Source': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20',
  'Design': 'bg-purple-500/20 text-purple-300 border-purple-500/20',
  'Blockchain': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/20',
  'IoT': 'bg-teal-500/20 text-teal-300 border-teal-500/20',
  'Other': 'bg-gray-500/20 text-gray-300 border-gray-500/20',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function ProjectCard({ project }: Props) {
  const spotsLeft = project.teamSize - project.currentMembers;
  const colorClass = categoryColors[project.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/20';

  return (
    <Link to={`/project/${project.id}`} className="block group">
      <div className="glass-card rounded-xl p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-base leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
              {project.title}
            </h3>
            <p className="text-gray-500 text-xs mt-1">{project.ownerName}</p>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0 border ${
              project.status === 'open'
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                : 'bg-gray-600/30 text-gray-400 border-gray-600/20'
            }`}
          >
            {project.status === 'open' ? '● Open' : '● Closed'}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        {/* Category */}
        <div className="mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${colorClass}`}>
            {project.category}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-white/5 text-gray-300 px-2 py-0.5 rounded-md border border-white/5"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="text-xs text-gray-500">+{project.skills.length - 4}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {project.currentMembers}/{project.teamSize}
            </span>
            {project.status === 'open' && spotsLeft > 0 && (
              <span className="text-purple-400">{spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left</span>
            )}
          </div>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {timeAgo(project.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
