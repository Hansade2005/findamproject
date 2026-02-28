import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Clock, CheckCircle, Send, Sparkles, Github, Twitter } from 'lucide-react';

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
    <div className="min-h-screen bg-[#06060f]">
      {/* Header */}
      <div className="relative border-b border-white/[0.04]">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm font-medium mb-6">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-gray-300">Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Contact Us</h1>
            <p className="text-gray-400 text-lg max-w-lg mx-auto">Have questions or feedback? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 space-y-5"
            >
              <h2 className="text-white font-bold text-lg">Reach Out</h2>
              {[
                { icon: <Mail size={18} />, label: 'Email', value: 'hello@findaproject.dev', href: 'mailto:hello@findaproject.dev', color: 'text-purple-400 bg-purple-500/10' },
                { icon: <MessageCircle size={18} />, label: 'Discord', value: 'Join our community', href: '#', color: 'text-blue-400 bg-blue-500/10' },
                { icon: <Github size={18} />, label: 'GitHub', value: 'findaproject', href: '#', color: 'text-gray-300 bg-white/[0.06]' },
                { icon: <Twitter size={18} />, label: 'Twitter', value: '@findaproject', href: '#', color: 'text-sky-400 bg-sky-500/10' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{item.label}</p>
                    <p className="text-gray-300 text-sm font-medium group-hover:text-purple-400 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-purple-400" />
                <h2 className="text-white font-bold">Response Time</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">General inquiries</span>
                  <span className="text-white font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bug reports</span>
                  <span className="text-white font-medium">Within 12 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Partnership</span>
                  <span className="text-white font-medium">Within 48 hours</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-purple-400" />
                <h2 className="text-white font-bold">Location</h2>
              </div>
              <p className="text-gray-400 text-sm">Fully remote team, worldwide</p>
              <p className="text-gray-600 text-xs mt-1">We're a distributed team across multiple time zones</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-8"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thanks for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <h2 className="text-white font-bold text-lg mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                        className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none input-glow" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                        className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none input-glow" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full glass rounded-xl px-4 py-3 text-white text-sm focus:outline-none input-glow appearance-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="How can we help you?"
                      className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none input-glow resize-none" />
                  </div>
                  <button type="submit" className="w-full btn-glow text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
