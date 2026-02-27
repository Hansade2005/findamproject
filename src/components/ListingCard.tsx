import { Link } from 'react-router-dom';
import { MapPin, Eye, MessageCircle } from 'lucide-react';
import { type Listing, formatPrice, getTimeAgo } from '../data/mockData';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const avatarLetter = listing.sellerName.charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400';
          }}
        />
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {listing.featured && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Featured</span>
          )}
          {listing.urgent && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Urgent</span>
          )}
        </div>
      </div>

      <div className="p-3">
        <Link to={`/ad?id=${listing.id}`} className="block">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 hover:text-orange-500 transition-colors">
            {listing.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-orange-500 font-bold text-base">
              {listing.listingType === 'job' && listing.salary
                ? formatPrice(listing.salary)
                : formatPrice(listing.price)}
            </span>
            {listing.priceUnit && (
              <span className="text-gray-500 text-xs ml-1">{listing.priceUnit}</span>
            )}
          </div>
          {listing.negotiable && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Negotiable</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin size={12} />
          <span className="truncate">{listing.neighborhood ? `${listing.neighborhood}, ` : ''}{listing.city}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold shrink-0">
              {avatarLetter}
            </div>
            <span className="text-xs text-gray-600 truncate max-w-[80px]">{listing.sellerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Eye size={11} />
              <span>{listing.views}</span>
            </div>
            <span className="text-gray-400 text-xs">{getTimeAgo(listing.postedDaysAgo)}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/${listing.sellerWhatsapp}?text=Hi, I'm interested in: ${encodeURIComponent(listing.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle size={13} />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
