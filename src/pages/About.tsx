import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const STATS = [
  { value: '2024', label: 'Founded' },
  { value: '12+', label: 'Cities' },
  { value: '1,000+', label: 'Listings' },
  { value: '500+', label: 'Sellers' },
  { value: '24h', label: 'Support' },
];

const VALUES = [
  { icon: '🤝', title: 'Community First', desc: 'Built by Cameroonians, for Cameroonians. We prioritize local needs and culture in everything we do.' },
  { icon: '🛡️', title: 'Trust & Safety', desc: 'We work hard to keep FindAm safe. Report scams, verify sellers, and follow our safety guidelines.' },
  { icon: '⚡', title: 'Simple & Fast', desc: 'No complicated signup. Browse instantly, post in minutes, connect directly via WhatsApp.' },
  { icon: '💰', title: 'Affordable', desc: 'Free to browse, free to post. Optional paid plans for those who want more visibility.' },
];

const CITIES = ['Douala', 'Yaoundé', 'Bamenda', 'Bafoussam', 'Garoua', 'Maroua', 'Ngaoundéré', 'Bertoua', 'Limbe', 'Buea', 'Kribi', 'Kumba'];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About FindAm</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          FindAm is Cameroon's trusted online marketplace where you can buy, sell, rent, and find jobs — all connected through WhatsApp.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center mb-12">
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-orange-100 text-lg max-w-2xl mx-auto leading-relaxed">
          To simplify commerce in Cameroon by connecting buyers and sellers through a platform that works the way Cameroonians already communicate — on WhatsApp.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-extrabold text-orange-500 mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map(v => (
            <div key={v.title} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
              <div className="text-3xl shrink-0">{v.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="text-orange-500" size={20} /> Cities We Serve
        </h2>
        <div className="flex flex-wrap gap-2">
          {CITIES.map(city => (
            <Link key={city} to={`/city?city=${city}`} className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:border-orange-400 hover:text-orange-500 transition-colors">
              {city}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Join FindAm?</h2>
        <p className="text-orange-100 mb-6">Start browsing or post your first ad today — it's completely free!</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/listings" className="bg-white text-orange-500 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">
            Browse Listings
          </Link>
          <Link to="/post-ad" className="bg-orange-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-800 transition-colors">
            Post Free Ad
          </Link>
        </div>
      </div>
    </div>
  );
}
