import { Link } from 'react-router-dom';

export default function SafetyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Safety & Anti-Scam Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: January 2026</p>

      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-red-800 text-lg mb-2">⚠️ Important Safety Warning</h2>
        <p className="text-red-700 text-sm">FindAm is a free classifieds platform. We do NOT hold escrow, guarantee transactions, or facilitate payments. Always meet in person and verify items before paying.</p>
      </div>

      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common Scam Tactics to Avoid</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Advance payment requests:</strong> Never pay before seeing and verifying an item in person.</li>
            <li><strong>Too-good-to-be-true prices:</strong> Unrealistically low prices are often a sign of fraud.</li>
            <li><strong>Pressure tactics:</strong> Scammers often create urgency ("buy now or someone else will").</li>
            <li><strong>Rental scams:</strong> Fake landlords asking for deposits before you've visited the property.</li>
            <li><strong>Fake job offers:</strong> Jobs that ask for upfront registration fees or training payments.</li>
            <li><strong>Shipping scams:</strong> Sellers who can only ship items and can't meet in person.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Safety Tips for Buyers</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Always meet sellers in a safe, public place (mall, police station, bank)</li>
            <li>Bring a friend when meeting strangers for transactions</li>
            <li>Inspect items thoroughly before paying</li>
            <li>Never wire money or send mobile money without seeing the item first</li>
            <li>Trust your instincts — if something feels wrong, walk away</li>
            <li>Research the seller's other listings and review history</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Safety Tips for Sellers</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Meet buyers in well-lit, public areas</li>
            <li>Don't share sensitive personal information beyond necessary contact details</li>
            <li>Verify that payment has cleared before releasing items</li>
            <li>Be cautious of buyers who seem overly eager or offer to pay more than asking price</li>
            <li>Don't accept checks or bank transfers from unknown parties</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Rental Scam Warning</h2>
          <p className="mb-2">Rental scams are common. Protect yourself by:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Visiting the property in person before paying any deposit</li>
            <li>Verifying the landlord's identity and ownership documents</li>
            <li>Never paying a deposit to someone you haven't met</li>
            <li>Avoiding properties with prices far below market value</li>
            <li>Getting a signed lease agreement before moving in</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Report a Scam</h2>
          <p className="mb-3">If you encounter a suspicious listing or have been scammed:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Use the "Report" link on the listing page</li>
            <li>Email us at <a href="mailto:support@findam.market" className="text-orange-500 hover:underline">support@findam.market</a></li>
            <li>Contact us on WhatsApp: <a href="https://wa.me/14075755460" className="text-green-600 hover:underline">+1 407 575 5460</a></li>
            <li>Report to local police if money has been lost</li>
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">FindAm's Commitment</h2>
          <p>We review reported listings and take action against fraudulent users. We work to keep FindAm safe, but we cannot guarantee the behavior of all users. Your safety is ultimately your responsibility.</p>
        </section>
      </div>

      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
        <p className="text-gray-700 font-semibold mb-3">Still have questions about safety?</p>
        <Link to="/contact" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors inline-block">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
