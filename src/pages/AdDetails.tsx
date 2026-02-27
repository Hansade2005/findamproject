import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Share2, Flag, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockListings, formatPrice, getTimeAgo } from '../data/mockData';
import ListingCard from '../components/ListingCard';

export default function AdDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [currentImage, setCurrentImage] = useState(0);
  const [showReportForm, setShowReportForm] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const listing = mockListings.find(l => l.id === id);
  const similar = mockListings.filter(l => l.category === listing?.category && l.id !== listing?.id).slice(0, 4);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
        <p className="text-gray-500 mb-6">This ad may have been removed or expired.</p>
        <Link to="/listings" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors">Browse All Ads</Link>
      </div>
    );
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back */}
      <Link to="/listings" className="inline-flex items-center gap-1 text-gray-500 hover:text-orange-500 text-sm mb-4 transition-colors">
        <ChevronLeft size={16} /> Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            <div className="relative aspect-[4/3]">
              <img
                src={listing.images[currentImage]}
                alt={listing.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800';
                }}
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {listing.featured && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Featured</span>}
                {listing.urgent && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Urgent</span>}
              </div>
              {listing.images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage(Math.max(0, currentImage - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"><ChevronLeft size={20} /></button>
                  <button onClick={() => setCurrentImage(Math.min(listing.images.length - 1, currentImage + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"><ChevronRight size={20} /></button>
                </>
              )}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                <Eye size={12} />
                <span>{listing.views} views</span>
              </div>
            </div>
          </div>

          {/* Title & Price */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-xl font-bold text-gray-900 flex-1">{listing.title}</h1>
              <div className="text-right shrink-0">
                <div className="text-2xl font-extrabold text-orange-500">
                  {listing.listingType === 'job' && listing.salary ? formatPrice(listing.salary) : formatPrice(listing.price)}
                </div>
                {listing.priceUnit && <span className="text-gray-500 text-sm">{listing.priceUnit}</span>}
                {listing.negotiable && <div className="text-green-600 text-xs font-semibold mt-0.5">Negotiable</div>}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
              <div className="flex items-center gap-1"><MapPin size={14} />{listing.neighborhood ? `${listing.neighborhood}, ` : ''}{listing.city}</div>
              <span>{getTimeAgo(listing.postedDaysAgo)}</span>
              <span>Category: <span className="text-orange-500 font-medium capitalize">{listing.category.replace('_', ' ')}</span></span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{listing.description}</p>
            {listing.bedrooms && (
              <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                <div className="text-center"><div className="font-bold text-gray-900">{listing.bedrooms}</div><div className="text-xs text-gray-500">Bedrooms</div></div>
                {listing.bathrooms && <div className="text-center"><div className="font-bold text-gray-900">{listing.bathrooms}</div><div className="text-xs text-gray-500">Bathrooms</div></div>}
                <div className="text-center"><div className="font-bold text-gray-900">{listing.furnished ? 'Yes' : 'No'}</div><div className="text-xs text-gray-500">Furnished</div></div>
              </div>
            )}
            {listing.vehicleMake && (
              <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                <div className="text-center"><div className="font-bold text-gray-900">{listing.vehicleMake}</div><div className="text-xs text-gray-500">Make</div></div>
                <div className="text-center"><div className="font-bold text-gray-900">{listing.vehicleModel}</div><div className="text-xs text-gray-500">Model</div></div>
                <div className="text-center"><div className="font-bold text-gray-900">{listing.vehicleYear}</div><div className="text-xs text-gray-500">Year</div></div>
              </div>
            )}
          </div>

          {/* Q&A / Comments */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Questions & Comments</h2>
            {comments.length === 0 && <p className="text-gray-400 text-sm mb-4">No comments yet. Be the first to ask!</p>}
            {comments.map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-2">{c}</div>
            ))}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Ask a question or leave a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
                onKeyDown={e => e.key === 'Enter' && handleAddComment()}
              />
              <button onClick={handleAddComment} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">Post</button>
            </div>
          </div>

          {/* Share + Report */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Share:</span>
              <a href={`https://wa.me/?text=${encodeURIComponent(listing.title + ' - ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors">
                <MessageCircle size={13} /> WhatsApp
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">
                <Share2 size={13} /> Facebook
              </a>
            </div>
            <button onClick={() => setShowReportForm(!showReportForm)} className="flex items-center gap-1 text-xs text-red-500 hover:underline">
              <Flag size={13} /> Report this ad
            </button>
          </div>
          {showReportForm && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
              <p className="text-red-700 font-semibold mb-2">Report this listing</p>
              <p className="text-red-600 text-xs mb-3">Please contact us at <a href="mailto:support@findam.market" className="underline">support@findam.market</a> with details about your concern.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Seller Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Seller Information</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl font-bold">
                {listing.sellerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{listing.sellerName}</p>
                <p className="text-xs text-gray-500">Member since 2025</p>
                {listing.reviews > 0 && <p className="text-xs text-orange-500">⭐ {listing.reviews} reviews</p>}
              </div>
            </div>
            <div className="space-y-2">
              <a
                href={`https://wa.me/${listing.sellerWhatsapp}?text=Hi, I'm interested in: ${encodeURIComponent(listing.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <a
                href={`tel:${listing.sellerPhone}`}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors"
              >
                <Phone size={18} /> Call Seller
              </a>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="font-bold text-gray-900 mb-3">Location</h2>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <MapPin size={16} className="text-orange-500" />
              <span>{listing.neighborhood ? `${listing.neighborhood}, ` : ''}{listing.city}, Cameroon</span>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(listing.city + ', Cameroon')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center text-sm text-orange-500 border border-orange-300 py-2 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Get Directions
            </a>
          </div>

          {/* Safety Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-semibold text-amber-800 mb-2">Safety Tips</h3>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Meet in a safe, public location</li>
              <li>• Do not pay in advance</li>
              <li>• Verify the item before paying</li>
              <li>• Report suspicious listings</li>
            </ul>
            <Link to="/safety" className="text-xs text-orange-600 font-semibold mt-2 block hover:underline">Read Safety Policy →</Link>
          </div>
        </div>
      </div>

      {/* Similar Ads */}
      {similar.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Ads</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {similar.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      )}
    </div>
  );
}
