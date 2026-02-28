import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, ArrowRight, Code2, Smartphone, Brain, Gamepad2,
  Database, GitBranch, Palette, Layers, Cpu, Globe,
  Users, FolderOpen, Zap, Sparkles, TrendingUp, Star,
  ArrowUpRight, Rocket, Shield, Heart
} from 'lucide-react';
import { getAllProjects } from '../services/db';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

const CATEGORY_DEFS = [
  { label: 'Web Development', icon: <Code2 size={20} />, color: 'from-blue-500 to-cyan-400' },
  { label: 'Mobile App', icon: <Smartphone size={20} />, color: 'from-green-500 to-emerald-400' },
  { label: 'AI / Machine Learning', icon: <Brain size={20} />, color: 'from-pink-500 to-rose-400' },
  { label: 'Game Development', icon: <Gamepad2 size={20} />, color: 'from-orange-500 to-amber-400' },
  { label: 'Data Science', icon: <Database size={20} />, color: 'from-cyan-500 to-teal-400' },
  { label: 'Open Source', icon: <GitBranch size={20} />, color: 'from-yellow-500 to-orange-400' },
  { label: 'Design', icon: <Palette size={20} />, color: 'from-purple-500 to-violet-400' },
  { label: 'Blockchain', icon: <Layers size={20} />, color: 'from-indigo-500 to-blue-400' },
  { label: 'IoT', icon: <Cpu size={20} />, color: 'from-teal-500 to-green-400' },
  { label: 'Other', icon: <Globe size={20} />, color: 'from-gray-500 to-slate-400' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects().then((projects) => {
      setFeaturedProjects(projects.filter((p) => p.status === 'open').slice(0, 6));
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/browse?q=${encodeURIComponent(searchQuery.trim())}` : '/browse');
  };

  return (
    <div className="min-h-screen bg-[#06060f]">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="particles-bg" />
        <div className="absolute inset-0 mesh-gradient" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium mb-8"
            >
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-gray-300">The platform for builders & creators</span>
              <ArrowRight size={14} className="text-gray-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.95]"
            >
              Build something
              <br />
              <span className="gradient-text">extraordinary</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Connect with talented developers, designers, and creators worldwide.
              Find your next project or assemble your dream team.
            </motion.p>

            {/* Search */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearch}
              className="flex gap-3 max-w-xl mx-auto mb-8"
            >
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, skills, ideas..."
                  className="w-full glass rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none input-glow transition-all text-[15px]"
                />
              </div>
              <button type="submit" className="btn-glow text-white px-7 py-4 rounded-2xl font-semibold text-[15px] whitespace-nowrap">
                Search
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 text-sm"
            >
              <Link to="/browse" className="text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1.5">
                <Sparkles size={13} /> Explore projects
              </Link>
              <Link to="/signup" className="text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1.5">
                <Rocket size={13} /> Post your idea
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FolderOpen size={20} />, value: '100+', label: 'Projects', color: 'text-purple-400' },
              { icon: <Users size={20} />, value: '500+', label: 'Developers', color: 'text-blue-400' },
              { icon: <TrendingUp size={20} />, value: '95%', label: 'Success Rate', color: 'text-emerald-400' },
              { icon: <Star size={20} />, value: '4.9', label: 'Avg. Rating', color: 'text-amber-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`${stat.color} mb-2 flex justify-center`}>{stat.icon}</div>
                <div className="text-3xl font-black text-white stat-glow">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-3xl font-black text-white"
            >
              Explore Categories
            </motion.h2>
            <p className="text-gray-500 text-sm mt-2">Find projects that match your expertise</p>
          </div>
          <Link to="/browse" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        >
          {CATEGORY_DEFS.map(({ label, icon, color }) => (
            <motion.div key={label} variants={item}>
              <Link to={`/browse?category=${encodeURIComponent(label)}`} className="group block">
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    {icon}
                  </div>
                  <p className="text-gray-400 text-xs font-semibold leading-tight group-hover:text-white transition-colors">{label}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ FEATURED PROJECTS ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-white">Featured Projects</h2>
            <p className="text-gray-500 text-sm mt-2">Open projects seeking talented collaborators</p>
          </div>
          <Link to="/browse" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
            See all <ArrowRight size={14} />
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl text-center py-20">
            <FolderOpen size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 mb-4">No projects yet. Be the first to post one!</p>
            <Link to="/post" className="btn-glow text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              Post a Project <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="border-y border-white/[0.04] bg-[rgba(10,10,25,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Three simple steps to find your next project or collaborator</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <Search size={24} />, title: 'Discover', desc: 'Browse hundreds of open projects across 10+ categories or search by skills and interests.' },
              { step: '02', icon: <Users size={24} />, title: 'Connect', desc: 'Apply to join projects that excite you. Share your skills and experience with project owners.' },
              { step: '03', icon: <Rocket size={24} />, title: 'Build', desc: 'Collaborate with your team, build something amazing, and grow your portfolio together.' },
            ].map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-2xl p-7 text-center relative"
              >
                <span className="absolute top-4 right-5 text-[60px] font-black text-white/[0.03] leading-none">{s.step}</span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-5 text-purple-400">
                  {s.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-white mb-3">Why findaproject?</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Everything you need to find and build amazing projects</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: <Shield size={22} />, title: 'Verified Projects', desc: 'All projects are reviewed to ensure quality and legitimacy.' },
            { icon: <Zap size={22} />, title: 'Instant Matching', desc: 'Our smart system matches you with projects suited to your skills.' },
            { icon: <Heart size={22} />, title: 'Community Driven', desc: 'Join a community of passionate builders and creators.' },
            { icon: <Star size={22} />, title: 'Portfolio Growth', desc: 'Build real projects to showcase on your resume and portfolio.' },
            { icon: <Globe size={22} />, title: 'Global Network', desc: 'Connect with talented people from around the world.' },
            { icon: <Sparkles size={22} />, title: 'Open Source First', desc: 'Many projects are open source — learn and contribute freely.' },
          ].map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-[#06060f] to-blue-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="animated-border glass rounded-3xl p-12 sm:p-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Ready to build?</h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg">
              Join thousands of developers and start collaborating on amazing projects today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-glow text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-2">
                Get Started Free <ArrowUpRight size={18} />
              </Link>
              <Link to="/browse" className="glass text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white/[0.08] transition-colors">
                Browse Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
