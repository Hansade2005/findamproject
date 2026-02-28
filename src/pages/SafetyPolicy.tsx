import { Link } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';

export default function SafetyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-purple-400" size={28} />
          <h1 className="text-3xl font-extrabold text-white">Safety & Community Guidelines</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: February 2026</p>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-8 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-amber-300 mb-1">Community Safety Notice</h2>
            <p className="text-amber-200/80 text-sm">findaproject connects people for collaboration. Always verify identities and communicate through the platform. Report suspicious behavior immediately.</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
          {[
            { title: 'Community Standards', items: ['Be respectful and professional in all interactions', 'Provide accurate information in project listings', 'Honor commitments made to project teams', 'Report any harassment or inappropriate behavior', 'Respect intellectual property and licensing agreements'] },
            { title: 'Safety Tips for Contributors', items: ['Research project owners before committing time', 'Use the platform messaging system for initial communication', 'Clarify expectations, roles, and timelines upfront', 'Never share sensitive credentials or payment information', 'Trust your instincts — if something feels wrong, disengage'] },
            { title: 'Safety Tips for Project Owners', items: ['Verify contributor skills through their profile and portfolio', 'Start with small tasks before assigning major responsibilities', 'Use version control and proper access management', 'Set clear contribution guidelines and code of conduct', 'Be transparent about project goals and compensation'] },
            { title: 'Prohibited Behavior', items: ['Posting fake or misleading projects', 'Harvesting user data or contact information', 'Spamming applications or messages', 'Impersonating other users or organizations', 'Any form of harassment, discrimination, or abuse'] },
            { title: 'How to Report Issues', items: ['Use the "Report" button on any project or profile page', 'Contact us through our contact page', 'Email details to our support team', 'Include screenshots and relevant context in your report'] },
          ].map(section => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Our Commitment</h2>
            <p>We actively review reported content and take action against policy violations. We're committed to maintaining a safe, welcoming community for all members.</p>
          </section>
        </div>

        <div className="mt-8 bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
          <p className="text-gray-300 font-semibold mb-3">Have safety concerns?</p>
          <Link to="/contact" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
