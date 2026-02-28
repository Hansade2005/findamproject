import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, ArrowUpRight, Bookmark } from 'lucide-react';
import type { Project } from '../types';

interface Props { project: Project; index?: number; }

const categoryGradients: Record<string, string> = {
  'Web Development': 'from-blue-500/20 to-cyan-500/10',
  'Mobile App': 'from-green-500/20 to-emerald-500/10',
  'AI / Machine Learning': 'from-pink-500/20 to-rose-500/10',
  'Game Development': 'from-orange-500/20 to-amber-500/10',
  'Data Science': 'from-cyan-500/20 to-teal-500/10',
  'Open Source': 'from-yellow-500/20 to-orange-500/10',
  'Design': 'from-purple-500/20 to-violet-500/10',
  'Blockchain': 'from-indigo-500/20 to-blue-500/10',
  'IoT': 'from-teal-500/20 to-green-500/10',
  'Other': 'from-gray-500/20 to-slate-500/10',
};

const categoryColors: Record<string, string> = {
  'Web Development': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Mobile App': 'text-green-400 bg-green-500/10 border-green-500/20',
  'AI / Machine Learning': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  'Game Development': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Data Science': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Open Source': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  'Design': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'Blockchain': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'IoT': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  'Other': 'text-gray-400 bg-gray-500/10 border-gray-500/20',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const spotsLeft = project.teamSize - project.currentMembers;
  const progress = (project.currentMembers / project.teamSize) * 100;
  const catColor = categoryColors[project.category] || categoryColors.Other;
  const catGradient = categoryGradients[project.category] || categoryGradients.Other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to={`/project/${project.id}`} className="block group">
        <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
          {/* Top gradient bar */}
          <div className={`h-1 bg-gradient-to-r ${catGradient}`} />

          <div className="p-5 flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold border ${catColor}`}>
                    {project.category}
                  </span>
                  {project.status === 'open' ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      Open
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-500">Closed</span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-[15px] leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                  {project.title}
                </h3>
              </div>
              <motion.div whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 p-1.5 rounded-lg text-gray-600 hover:text-purple-400 hover:bg-purple-500/10 transition-all opacity-0 group-hover:opacity-100"
                onClick={(e) => { e.preventDefault(); }}
              >
                <Bookmark size={14} />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-[13px] line-clamp-2 mb-4 flex-1 leading-relaxed">
              {project.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.skills.slice(0, 3).map((skill) => (
                <span key={skill}
                  className="text-[11px] bg-white/[0.04] text-gray-400 px-2.5 py-1 rounded-lg border border-white/[0.06]"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="text-[11px] text-gray-600 px-2 py-1">
                  +{project.skills.length - 3}
                </span>
              )}
            </div>

            {/* Team progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
                <span className="flex items-center gap-1">
                  <Users size={11} />
                  {project.currentMembers}/{project.teamSize} members
                </span>
                {project.status === 'open' && spotsLeft > 0 && (
                  <span className="text-purple-400 font-medium">
                    {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                  </span>
                )}
              </div>
              <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center text-[10px] text-white font-bold">
                  {project.ownerName[0]}
                </div>
                <span className="text-gray-500 text-xs">{project.ownerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-gray-600">
                  <Clock size={11} />
                  {timeAgo(project.createdAt)}
                </span>
                <ArrowUpRight size={14} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
