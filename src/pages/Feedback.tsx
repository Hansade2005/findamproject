import { useState } from 'react';
import { CheckCircle, Star, Send } from 'lucide-react';

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ type: '', message: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
          <p className="text-gray-400">Your feedback helps us make findaproject better for everyone.</p>
          <button onClick={() => { setSubmitted(false); setRating(0); setForm({ type: '', message: '', email: '' }); }} className="mt-6 text-purple-400 hover:text-purple-300 text-sm">
            Send more feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-3">Share Your Feedback</h1>
          <p className="text-gray-400">Help us improve the platform for the community</p>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
          {/* Star Rating */}
          <div className="text-center mb-6">
            <p className="text-gray-300 font-medium mb-3">How would you rate your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={36}
                    className={star <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Feedback Type *</label>
              <select name="type" value={form.type} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors">
                <option value="">Select type</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="general">General Feedback</option>
                <option value="compliment">Compliment</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Your Feedback *</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us what you think..." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 resize-none transition-colors" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email (optional)</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors">
              <Send size={18} />
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
