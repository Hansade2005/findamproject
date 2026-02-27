import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500">We're here to help. Reach out any time!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h2 className="font-bold text-gray-900">Get in Touch</h2>
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Email</p>
                <a href="mailto:support@findam.market" className="text-orange-500 hover:underline text-sm">support@findam.market</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Phone</p>
                <a href="tel:+14075755460" className="text-gray-600 hover:text-orange-500 text-sm">+1 407 575 5460</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800 text-sm">WhatsApp</p>
                <a href="https://wa.me/14075755460" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">Chat with Support</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Location</p>
                <p className="text-gray-600 text-sm">Douala, Cameroon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} className="text-orange-500" />
              <h2 className="font-bold text-gray-900">Business Hours</h2>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium text-gray-800">8:00 AM – 6:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-gray-800">9:00 AM – 3:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-gray-400">Closed</span></div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-500">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-gray-900 mb-4">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="report">Report a Scam</option>
                    <option value="ad">Issue with an Ad</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help you?" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 resize-none" />
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                  Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
