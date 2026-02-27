import { useSearchParams, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { mockListings, CITIES } from '../data/mockData';
import ListingCard from '../components/ListingCard';

export default function CityListings() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || '';

  const listings = city ? mockListings.filter(l => l.city === city) : mockListings;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={20} className="text-orange-500" />
        <h1 className="text-2xl font-bold text-gray-900">
          {city ? `Listings in ${city}` : 'All Listings'}
        </h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{listings.length} listings found{city ? ` in ${city}` : ''}</p>

      {/* City Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link to="/listings" className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${!city ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'}`}>
          All Cities
        </Link>
        {CITIES.map(c => (
          <Link key={c} to={`/city?city=${c}`} className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${city === c ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'}`}>
            {c}
          </Link>
        ))}
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-semibold">No listings in {city} yet</p>
          <p className="text-sm mt-1">Be the first to post!</p>
          <Link to="/post-ad" className="inline-block mt-4 bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors">Post Free Ad</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
