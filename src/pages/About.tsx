import { Link } from 'react-router-dom';
import { Code2, Users, Globe, Zap, Heart, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            About <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">findaproject</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We're building the best platform for developers, designers, and creators to find collaborative projects and build amazing things together.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: <Code2 size={24} />, title: 'For Builders', desc: "Whether you're a developer, designer, or creator — find projects that match your skills and passion." },
            { icon: <Users size={24} />, title: 'Collaboration First', desc: 'Connect with like-minded people. Build teams, share knowledge, and create something meaningful.' },
            { icon: <Globe size={24} />, title: 'Open to All', desc: 'From beginners to experts, everyone is welcome. All skill levels, all backgrounds, all ideas.' },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mx-auto mb-4 text-purple-400">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="glass border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <Zap size={20} />, title: 'Post Your Idea', desc: 'Share your project idea with skills needed, team size, and description.' },
              { step: '02', icon: <Users size={20} />, title: 'Find Collaborators', desc: 'Browse contributors or wait for talented people to find your project.' },
              { step: '03', icon: <Heart size={20} />, title: 'Build Together', desc: 'Collaborate, communicate, and bring your vision to life as a team.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-purple-500/40 text-4xl font-black mb-3">{item.step}</div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center mx-auto mb-3 text-purple-400">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to start building?</h2>
        <p className="text-gray-400 mb-8">Join the community and find your next project today.</p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/browse" className="glass-light rounded-xl px-6 py-3 text-white font-medium hover:border-purple-500/40 transition-all">
            Browse Projects
          </Link>
          <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-600/25 flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
