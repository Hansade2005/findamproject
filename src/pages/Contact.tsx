import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, MessageCircle, Send } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-blue-900/10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Contact Us</h1>
          <p className="text-gray-400">We're here to help. Reach out any time!</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6 space-y-5">
              <h2 className="font-bold text-white text-lg">Get in Touch</h2>
              {[
                { icon: <Mail size={20} />, color: 'text-purple-400', label: 'Email', value: 'support@findaproject.dev', href: 'mailto:support@findaproject.dev' },
                { icon: <Phone size={20} />, color: 'text-blue-400', label: 'Phone', value: '+1 407 575 5460', href: 'tel:+14075755460' },
                { icon: <MessageCircle size={20} />, color: 'text-green-400', label: 'Discord', value: 'Join our community', href: '#' },
                { icon: <MapPin size={20} />, color: 'text-amber-400', label: 'Location', value: 'Remote-first, Global', href: undefined },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className={`${item.color} shrink-0 mt-0.5`}>{item.icon}</div>
                  <div>
                    <p className="font-medium text-gray-300 text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-purple-400 hover:text-purple-300 text-sm transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-gray-400 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-purple-400" />
                <h2 className="font-bold text-white">Response Times</h2>
              </div>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: 'General Inquiries', value: 'Within 24 hours' },
                  { label: 'Bug Reports', value: 'Within 12 hours' },
                  { label: 'Urgent Issues', value: 'Within 4 hours' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-medium text-gray-300">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-6 text-purple-400 hover:text-purple-300 text-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-white text-lg mb-5">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors">
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help you?" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 resize-none transition-colors" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors">
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
