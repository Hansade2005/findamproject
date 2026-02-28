import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: February 2026</p>
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing or using findaproject ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.' },
            { title: '2. Description of Service', content: 'findaproject is an online platform that allows users to post, browse, and collaborate on software projects. The platform acts as a connector and is not a party to any agreement between project owners and contributors.' },
            { title: '3. User Accounts', content: 'You may browse projects without creating an account. To post projects or apply, you need to register. You are responsible for maintaining accurate account information and the security of your credentials.' },
            { title: '4. Prohibited Content', content: 'Users may not post: illegal content, spam or duplicate projects, misleading or fraudulent listings, content that violates intellectual property rights, or any content intended to harass or harm others.' },
            { title: '5. Project Guidelines', content: 'All project listings must be accurate, in the correct category, and comply with applicable laws. findaproject reserves the right to remove any listing that violates these guidelines.' },
            { title: '6. Intellectual Property', content: 'Users retain ownership of their content. By posting on the platform, you grant findaproject a non-exclusive license to display and distribute your content within the platform.' },
            { title: '7. Limitation of Liability', content: 'findaproject is not liable for any damages arising from your use of the Platform, including disputes between users, loss of data, or any consequential damages.' },
            { title: '8. Changes to Terms', content: 'We may modify these terms at any time. Continued use of the Platform constitutes acceptance of updated terms.' },
            { title: '9. Contact', content: '' },
          ].map(section => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-white mb-2">{section.title}</h2>
              {section.content ? (
                <p>{section.content}</p>
              ) : (
                <p>For questions about these Terms, contact us at <Link to="/contact" className="text-purple-400 hover:text-purple-300">our contact page</Link>.</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
