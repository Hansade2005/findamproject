import { useSearchParams, Link } from 'react-router-dom';
import { Package, Store } from 'lucide-react';
import { mockListings, mockShops } from '../data/mockData';
import ListingCard from '../components/ListingCard';

export default function VendorShop() {
  const [searchParams] = useSearchParams();
  const sellerName = searchParams.get('seller') || '';

  const shop = mockShops.find(s => s.name === sellerName);
  const listings = mockListings.filter(l => l.sellerName === sellerName);

  if (!sellerName) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Store size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Shop Selected</h2>
        <Link to="/shops" className="text-orange-500 hover:underline">Browse All Shops</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Shop Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-extrabold">
            {sellerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-extrabold mb-1">{sellerName}</h1>
            {shop && <p className="text-orange-100 text-sm">{shop.category}</p>}
            <div className="flex items-center gap-2 mt-1">
              <Package size={14} className="text-orange-200" />
              <span className="text-sm text-orange-100">{shop ? shop.itemCount : listings.length} items listed</span>
            </div>
          </div>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Package size={48} className="mx-auto mb-4 text-gray-200" />
          <p className="font-semibold text-gray-600">No listings from this vendor yet</p>
          <p className="text-sm mt-1">Check back soon!</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold text-gray-900 mb-4">{listings.length} Listings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
