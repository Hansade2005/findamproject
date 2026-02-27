export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: January 2026</p>
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
          <p>When you use FindAm, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Contact information (name, phone, email) when you post an ad</li>
            <li>Listing content you submit</li>
            <li>Usage data and browsing activity on the Platform</li>
            <li>Device and browser information</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Display your listings to potential buyers</li>
            <li>Improve platform performance and user experience</li>
            <li>Prevent fraud and abuse</li>
            <li>Communicate service updates</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Information Sharing</h2>
          <p>Your contact information (phone/WhatsApp) is visible to other users when you post an ad. We do not sell your personal data to third parties. We may share information with law enforcement when required by law.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
          <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure. Use the Platform at your own risk.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies</h2>
          <p>We use cookies and local storage to remember your preferences (such as your selected city) and to analyze Platform usage. You can disable cookies in your browser settings.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
          <p>You have the right to request deletion of your listings and personal data by contacting us. We will process such requests within 30 days.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
          <p>For privacy questions, contact us at <a href="mailto:support@findam.market" className="text-orange-500 hover:underline">support@findam.market</a></p>
        </section>
      </div>
    </div>
  );
}
