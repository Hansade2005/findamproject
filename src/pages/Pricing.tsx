import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: 0,
    duration: '7 days',
    features: ['1 listing', '3 photos', 'Basic visibility', 'WhatsApp contact button'],
    cta: 'Post Free Ad',
    highlight: false,
  },
  {
    name: 'Standard',
    price: 500,
    duration: '14 days',
    features: ['1 listing', '5 photos', 'Better visibility', 'WhatsApp + Call buttons', 'Appear in category top'],
    cta: 'Get Standard',
    highlight: false,
  },
  {
    name: 'Featured',
    price: 2000,
    duration: '30 days',
    features: ['1 listing', '10 photos', 'Featured badge', 'Homepage placement', 'Priority in search', 'WhatsApp + Call buttons'],
    cta: 'Get Featured',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: 5000,
    duration: '30 days',
    features: ['Up to 20 listings', 'Unlimited photos', 'Verified seller badge', 'Dedicated shop page', 'All Featured benefits', 'Priority support'],
    cta: 'Go Business',
    highlight: false,
  },
];

const FAQ = [
  { q: 'How do I pay?', a: 'We accept MTN Mobile Money and Orange Money. Send payment to our number and you\'ll receive confirmation within 1 hour.' },
  { q: 'When does my plan start?', a: 'Your plan activates as soon as payment is confirmed, usually within 1 hour of sending mobile money.' },
  { q: 'Can I upgrade my plan?', a: 'Yes! Contact us via WhatsApp and we\'ll help you upgrade your current plan.' },
  { q: 'Is the free plan really free?', a: 'Yes, completely free with no hidden charges. Your ad stays live for 7 days.' },
  { q: 'What happens when my plan expires?', a: 'Your ad is automatically removed. You can repost anytime for free or with a paid plan.' },
];

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white text-center mb-8">
        <div className="text-2xl mb-1">🎉</div>
        <h2 className="text-xl font-bold">All Plans FREE for Early Users!</h2>
        <p className="text-green-100 text-sm mt-1">Limited time offer for our first 1,000 members. Join the waitlist today!</p>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Simple, Transparent Pricing</h1>
        <p className="text-gray-500">Choose the plan that works best for you</p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {PLANS.map(plan => (
          <div key={plan.name} className={`bg-white rounded-2xl border-2 p-5 flex flex-col relative ${plan.highlight ? 'border-orange-500 shadow-lg' : 'border-gray-200'}`}>
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                {plan.badge}
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
            <div className="mb-1">
              {plan.price === 0 ? (
                <span className="text-3xl font-extrabold text-orange-500">Free</span>
              ) : (
                <span className="text-3xl font-extrabold text-gray-900">{plan.price.toLocaleString()} <span className="text-lg font-medium text-gray-500">CFA</span></span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-4">Active for {plan.duration}</p>
            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/post-ad"
              className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                plan.highlight
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Payment Methods</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">MTN</div>
            <div>
              <p className="font-semibold text-gray-800">MTN Mobile Money</p>
              <p className="text-xs text-gray-500">Fast & secure payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl px-5 py-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">OM</div>
            <div>
              <p className="font-semibold text-gray-800">Orange Money</p>
              <p className="text-xs text-gray-500">Available across Cameroon</p>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">After payment, send proof to <a href="https://wa.me/14075755460" className="text-orange-500 font-medium hover:underline">our WhatsApp</a></p>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
