import { Link } from 'react-router-dom';
import { Users, Shield, Zap, Heart, Rocket, Globe, Code2, Star } from 'lucide-react';

const STATS = [
  { value: '2024', label: 'Founded' },
  { value: '500+', label: 'Developers' },
  { value: '100+', label: 'Projects' },
  { value: '10', label: 'Categories' },
  { value: '24/7', label: 'Open Source' },
];

const VALUES = [
  { icon: <Users size={24} />, color: 'from-purple-500 to-purple-600', title: 'Community First', desc: 'Built by developers, for developers. We prioritize collaboration and open communication in everything we do.' },
  { icon: <Shield size={24} />, color: 'from-blue-500 to-blue-600', title: 'Trust & Quality', desc: 'We foster a community of trust. Verified profiles, project reviews, and transparent communication standards.' },
  { icon: <Zap size={24} />, color: 'from-amber-500 to-orange-500', title: 'Simple & Fast', desc: 'No complicated signup. Browse instantly, post projects in minutes, and connect directly with team members.' },
  { icon: <Heart size={24} />, color: 'from-pink-500 to-rose-500', title: 'Free & Open', desc: 'Free to browse, free to post. We believe in open access to collaboration opportunities for everyone.' },
];

const TEAM = [
  { name: 'Alex Chen', role: 'Founder & Lead Dev', avatar: 'AC', gradient: 'from-purple-500 to-blue-500' },
  { name: 'Sarah Kim', role: 'Design Lead', avatar: 'SK', gradient: 'from-pink-500 to-rose-500' },
  { name: 'Marcus Williams', role: 'Backend Engineer', avatar: 'MW', gradient: 'from-green-500 to-emerald-500' },
  { name: 'Priya Sharma', role: 'Community Manager', avatar: 'PS', gradient: 'from-amber-500 to-orange-500' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-blue-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/10 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-6">
            <Rocket size={14} />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            About find<span className="text-purple-400">a</span>project
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We're building the best platform for developers, designers, and creators to find projects, build teams, and collaborate on amazing ideas together.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            To simplify collaboration by connecting passionate people through a platform that makes finding and building projects effortless and enjoyable.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {STATS.map(stat => (
            <div key={stat.label} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center hover:border-purple-500/30 transition-colors">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map(v => (
            <div key={v.title} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-200 group">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {v.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TEAM.map(member => (
            <div key={member.name} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5 text-center hover:border-purple-500/30 transition-colors">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-lg font-bold mx-auto mb-3`}>
                {member.avatar}
              </div>
              <h3 className="font-semibold text-white text-sm">{member.name}</h3>
              <p className="text-gray-400 text-xs mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="text-purple-400" size={20} /> Built With
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'IndexedDB', 'Lucide Icons', 'React Router'].map(tech => (
              <span key={tech} className="bg-gray-700/60 text-gray-300 rounded-full px-4 py-1.5 text-sm hover:bg-gray-700 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-y border-purple-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Star className="text-purple-400 mx-auto mb-4" size={32} />
          <h2 className="text-3xl font-bold text-white mb-4">Join the Community</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Whether you're looking for a project to contribute to or need teammates for your idea, we've got you covered.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/browse" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors">
              Browse Projects
            </Link>
            <Link to="/signup" className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
