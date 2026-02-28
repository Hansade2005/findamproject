import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: February 2026</p>
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
          {[
            { title: '1. Information We Collect', content: 'When you use findaproject, we may collect: account information (name, email) when you register, project content you submit, usage data and browsing activity, and device and browser information.' },
            { title: '2. How We Use Your Information', content: 'We use collected information to: display your projects and profile to other users, improve platform performance and user experience, prevent fraud and abuse, send service updates, and comply with legal obligations.' },
            { title: '3. Data Storage', content: 'findaproject stores data locally in your browser using IndexedDB. No personal data is transmitted to external servers in the current version of the platform.' },
            { title: '4. Information Sharing', content: 'Your profile information is visible to other users when you post projects or applications. We do not sell your personal data to third parties.' },
            { title: '5. Data Security', content: 'We implement reasonable security measures to protect your information. However, no method of storage is 100% secure. Use the Platform at your own risk.' },
            { title: '6. Cookies & Local Storage', content: 'We use local storage to remember your preferences and session data. You can clear this data through your browser settings.' },
            { title: '7. Your Rights', content: 'You have the right to access, modify, or delete your account and all associated data at any time through your profile settings.' },
            { title: '8. Contact', content: '' },
          ].map(section => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-white mb-2">{section.title}</h2>
              {section.content ? (
                <p>{section.content}</p>
              ) : (
                <p>For privacy questions, contact us at <Link to="/contact" className="text-purple-400 hover:text-purple-300">our contact page</Link>.</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
