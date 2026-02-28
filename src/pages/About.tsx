import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Globe, Zap, Heart, Shield, Star, ArrowRight, Sparkles, Rocket, Code2 } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const STATS = [
  { value: '100+', label: 'Projects', icon: <Code2 size={18} /> },
  { value: '500+', label: 'Builders', icon: <Users size={18} /> },
  { value: '10+', label: 'Categories', icon: <Globe size={18} /> },
  { value: '95%', label: 'Success Rate', icon: <Star size={18} /> },
];

const VALUES = [
  { icon: <Heart size={22} />, title: 'Community First', desc: 'Built by developers, for developers. We prioritize collaboration and open communication.', color: 'from-pink-500 to-rose-500' },
  { icon: <Shield size={22} />, title: 'Trust & Quality', desc: 'Every project is reviewed for quality. We maintain high standards to ensure great experiences.', color: 'from-blue-500 to-cyan-500' },
  { icon: <Zap size={22} />, title: 'Fast & Simple', desc: 'Post a project in minutes. Find collaborators instantly. No unnecessary complexity.', color: 'from-amber-500 to-orange-500' },
  { icon: <Globe size={22} />, title: 'Open & Global', desc: 'Connect with talented builders worldwide. No borders, no limits — just great projects.', color: 'from-emerald-500 to-teal-500' },
];

const TEAM = [
  { name: 'Alex Chen', role: 'Founder & CEO', avatar: 'AC', color: 'from-purple-500 to-blue-500' },
  { name: 'Sarah Kim', role: 'Head of Design', avatar: 'SK', color: 'from-pink-500 to-rose-500' },
  { name: 'Marcus Johnson', role: 'Lead Engineer', avatar: 'MJ', color: 'from-blue-500 to-cyan-500' },
  { name: 'Priya Patel', role: 'Community Lead', avatar: 'PP', color: 'from-emerald-500 to-teal-500' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#06060f]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="particles-bg" />
        <div className="absolute inset-0 mesh-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium mb-8">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-gray-300">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight">
              Building the future of
              <br />
              <span className="gradient-text">collaboration</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              findaproject is the platform where developers, designers, and creators connect
              to build extraordinary things together. We believe great projects start with great teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center"
              >
                <div className="text-purple-400 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-black text-white stat-glow">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="animated-border glass rounded-3xl p-10 sm:p-14 text-center"
        >
          <Rocket size={32} className="text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            To democratize project collaboration by creating the most intuitive platform where anyone
            can find, join, or create projects that push boundaries. We're building the bridge between
            ideas and execution.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Our Values</h2>
          <p className="text-gray-500">The principles that guide everything we do</p>
        </div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {VALUES.map((v) => (
            <motion.div key={v.title} variants={item} className="glass-card rounded-2xl p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {v.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className="border-y border-white/[0.04] bg-[rgba(10,10,25,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Meet the Team</h2>
            <p className="text-gray-500">The people behind findaproject</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg`}>
                  {member.avatar}
                </div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-black text-white mb-4">Ready to build something amazing?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join our community and start collaborating today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="btn-glow text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 justify-center">
            Get Started Free <ArrowRight size={18} />
          </Link>
          <Link to="/browse" className="glass text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/[0.08] transition-colors">
            Explore Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
