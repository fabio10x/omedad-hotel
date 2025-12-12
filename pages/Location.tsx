import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ADDRESS, PHONE } from '../constants';
import ScrollReveal from '../components/ScrollReveal';

const Location: React.FC = () => {
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
                                <p className="text-stone-500 text-sm mt-1">Neighborhood: Kirkos</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900">Phone</h3>
                                <p className="text-stone-600">{PHONE}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900">Email</h3>
                                <p className="text-stone-600">info@omedadhotel.com</p>
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
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                            <textarea rows={4} className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full bg-stone-900 text-white font-bold py-3 uppercase tracking-widest hover:bg-gold-600 transition-colors">
                            Send Message
                        </button>
                    </form>
                </ScrollReveal>

            </div>

            <ScrollReveal className="mt-16 h-80 bg-stone-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Map Placeholder */}
                <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=Addis+Ababa&zoom=13&size=1200x400&sensor=false&key=YOUR_API_KEY_HERE" 
                    alt="Map Location" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
                 <div className="absolute inset-0 flex items-center justify-center bg-stone-900/10">
                    <div className="bg-white/90 p-6 rounded-lg text-center shadow-xl">
                        <MapPin className="mx-auto text-red-500 mb-2 h-8 w-8" />
                        <p className="font-bold text-lg">Omedad Hotel</p>
                        <p className="text-sm">2Q39+7HG, Addis Ababa</p>
                    </div>
                 </div>
            </ScrollReveal>
        </div>
    </div>
  );
};

export default Location;