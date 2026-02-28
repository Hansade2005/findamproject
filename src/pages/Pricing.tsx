import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles, Zap } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Post up to 3 projects', 'Basic profile', 'Browse all projects', 'Apply to 5 projects/month'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    features: ['Unlimited projects', 'Featured badge', 'Priority in search', 'Unlimited applications', 'Team management tools', 'Direct messaging'],
    cta: 'Go Pro',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    features: ['Everything in Pro', 'Up to 10 team members', 'Organization profile', 'Analytics dashboard', 'Priority support', 'Custom branding'],
    cta: 'Start Team Plan',
    highlight: false,
  },
];

const FAQ = [
  { q: 'Is the free plan really free?', a: 'Yes, completely free with no hidden charges. Post projects, browse, and collaborate at no cost.' },
  { q: 'Can I upgrade or downgrade anytime?', a: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your billing cycle.' },
  { q: 'Do you offer refunds?', a: 'We offer a 14-day money-back guarantee on all paid plans. No questions asked.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-blue-900/10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          {/* Early access banner */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-green-300 text-sm font-medium mb-6">
            <Sparkles size={14} />
            All plans FREE during beta!
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Simple, Transparent Pricing</h1>
          <p className="text-gray-400">Choose the plan that works best for you</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {PLANS.map(plan => (
            <div key={plan.name} className={`bg-gray-800/60 rounded-2xl border-2 p-6 flex flex-col relative ${plan.highlight ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-gray-700/50'}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mb-5 line-through decoration-green-400">Currently free during beta</p>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle size={15} className="text-green-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
