import React from 'react';
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { HOTEL_NAME, ADDRESS, PHONE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-white font-bold tracking-wider">{HOTEL_NAME}</h3>
            <p className="text-sm leading-relaxed text-stone-400">
              Experience the heart of Bole with luxury accommodation, 
              exquisite dining, and world-class service.
            </p>
            <div className="flex space-x-4 pt-4">
                <a href="#" className="hover:text-gold-500 transition-colors"><Facebook size={20}/></a>
                <a href="#" className="hover:text-gold-500 transition-colors"><Instagram size={20}/></a>
                <a href="#" className="hover:text-gold-500 transition-colors"><Twitter size={20}/></a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif text-white font-semibold uppercase tracking-widest">Contact Us</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gold-500 mt-1" />
              <span>{ADDRESS}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gold-500" />
              <span>{PHONE}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gold-500" />
              <span>reservations@omedadhotel.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif text-white font-semibold uppercase tracking-widest">Information</h4>
            <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gold-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Careers</a></li>
            </ul>
          </div>

        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} {HOTEL_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;