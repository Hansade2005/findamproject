import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle } from 'lucide-react';
import { CATEGORIES, CITIES } from '../data/mockData';

export default function PostAd() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    negotiable: false,
    city: '',
    neighborhood: '',
    phone: '',
    whatsapp: '',
    listingType: 'sale' as 'sale' | 'rent' | 'job' | 'service',
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm(prev => ({ ...prev, images: files }));
    const previews = files.map(f => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ad Submitted!</h2>
        <p className="text-gray-600 mb-6">Your ad has been submitted and will be reviewed shortly. Thank you!</p>
        <button onClick={() => navigate('/')} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Post Your Ad</h1>
        <p className="text-gray-500 text-sm mt-1">It's completely free to post. Reach thousands of buyers in Cameroon!</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 flex items-center gap-2">
        <CheckCircle size={18} className="text-green-500 shrink-0" />
        <p className="text-green-700 text-sm">Free posting for all users. No hidden charges!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Ad Details</h2>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Listing Type *</label>
            <select name="listingType" value={form.listingType} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400">
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="job">Job Posting</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400">
              <option value="">Select a category</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required maxLength={100} placeholder="e.g. iPhone 14 Pro - Excellent Condition" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
            <p className="text-xs text-gray-400 mt-1">{form.title.length}/100</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="Describe your item, condition, features..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Price & Location</h2>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Price (CFA) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required min="0" placeholder="e.g. 50000" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
            </div>
            <div className="flex items-end pb-2.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="negotiable" checked={form.negotiable} onChange={handleChange} className="accent-orange-500" />
                <span className="text-sm text-gray-700 whitespace-nowrap">Negotiable</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">City *</label>
            <select name="city" value={form.city} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400">
              <option value="">Select city</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Neighborhood</label>
            <input name="neighborhood" value={form.neighborhood} onChange={handleChange} placeholder="e.g. Bonanjo, Akwa" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Images</h2>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-orange-400 transition-colors">
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload images (up to 5)</span>
            <span className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP supported</span>
            <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
          </label>
          {imagePreviews.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt="" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-bold text-gray-900">Contact Info</h2>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</label>
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+237 6XX XXX XXX" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp Number</label>
            <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+237 6XX XXX XXX (or same as phone)" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
          </div>
        </div>

        <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-md">
          Post My Ad — Free!
        </button>
      </form>
    </div>
  );
}
