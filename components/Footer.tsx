import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOTEL_NAME, ADDRESS, PHONE, PHONE_TEL, EMAIL_DISPLAY, EMAIL_MAILTO } from '../constants';
import SocialLinks from './SocialLinks';

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
            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Follow us</p>
              <SocialLinks iconClassName="text-stone-400 hover:text-gold-500 transition-colors" />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif text-white font-semibold uppercase tracking-widest">Contact Us</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
              <span>{ADDRESS}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gold-500 shrink-0" />
              <a href={PHONE_TEL} className="hover:text-gold-500 transition-colors">
                {PHONE}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gold-500 shrink-0" />
              <a href={EMAIL_MAILTO} className="hover:text-gold-500 transition-colors break-all">
                {EMAIL_DISPLAY}
              </a>
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
                <li><Link to="/admin" className="hover:text-gold-500 transition-colors opacity-50">Staff Login</Link></li>
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
