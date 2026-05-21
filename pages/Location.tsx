import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import {
  ADDRESS,
  LOCATION,
  PHONE,
  PHONE_TEL,
  EMAIL_DISPLAY,
  EMAIL_MAILTO,
  MAP_EMBED_SRC,
  FORMSPREE_URL,
} from '../constants';
import ScrollReveal from '../components/ScrollReveal';
import SocialLinks from '../components/SocialLinks';

const Location: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
        <div className="bg-stone-900 text-white py-16 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact & Location</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                <ScrollReveal>
                    <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8">Get In Touch</h2>
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900">Address</h3>
                                <p className="text-stone-600">{ADDRESS}</p>
                                <p className="text-stone-500 text-sm mt-1">{LOCATION}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900">Phone</h3>
                                <a href={PHONE_TEL} className="text-stone-600 hover:text-gold-600 transition-colors">
                                    {PHONE}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900">Email</h3>
                                <a href={EMAIL_MAILTO} className="text-stone-600 hover:text-gold-600 transition-colors break-all">
                                    {EMAIL_DISPLAY}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-3 rounded-full text-gold-600 shrink-0">
                                <span className="block w-6 h-6 text-center text-sm font-bold leading-6">@</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900 mb-3">Social Media</h3>
                                <SocialLinks variant="list" />
                            </div>
                        </div>

                         <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900">Check-in / Out</h3>
                                <p className="text-stone-600">Check-in: 2:00 PM</p>
                                <p className="text-stone-600">Check-out: 11:00 AM</p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200} className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-serif font-bold mb-6">Send us a message</h3>

                    {status === 'success' ? (
                      <div className="text-center py-8">
                        <p className="text-lg font-serif font-bold text-stone-900 mb-2">Message sent!</p>
                        <p className="text-stone-600 mb-6">Thank you for reaching out. We will get back to you soon.</p>
                        <button
                          type="button"
                          onClick={() => setStatus('idle')}
                          className="text-gold-600 font-bold hover:underline"
                        >
                          Send another message
                        </button>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleContactSubmit}>
                        <div>
                          <label htmlFor="contact-name" className="block text-sm font-medium text-stone-700 mb-1">
                            Name
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={status === 'submitting'}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none disabled:opacity-60"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-medium text-stone-700 mb-1">
                            Email
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'submitting'}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none disabled:opacity-60"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-message" className="block text-sm font-medium text-stone-700 mb-1">
                            Message
                          </label>
                          <textarea
                            id="contact-message"
                            name="message"
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={status === 'submitting'}
                            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none disabled:opacity-60"
                            placeholder="How can we help you?"
                          />
                        </div>
                        {status === 'error' && (
                          <p className="text-red-600 text-sm">
                            Something went wrong. Please try again or email us directly.
                          </p>
                        )}
                        <button
                          type="submit"
                          disabled={status === 'submitting'}
                          className="w-full bg-stone-900 text-white font-bold py-3 uppercase tracking-widest hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                      </form>
                    )}
                </ScrollReveal>

            </div>

            <ScrollReveal className="mt-16">
                <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4 text-center">Find Us in Bole</h2>
                <div className="rounded-lg overflow-hidden shadow-lg border border-stone-200">
                    <iframe
                        src={MAP_EMBED_SRC}
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Aura web service — Bole, Addis Ababa"
                        className="w-full min-h-[320px] md:min-h-[450px]"
                    />
                </div>
            </ScrollReveal>
        </div>
    </div>
  );
};

export default Location;