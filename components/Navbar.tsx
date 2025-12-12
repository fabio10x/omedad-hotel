import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Hotel } from 'lucide-react';
import { NAVIGATION, HOTEL_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleBookNow = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById('booking-form-section');
      if (element) {
        const yOffset = -100; // Offset for sticky header
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToBooking: true } });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-black/30 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
                <Hotel className={`h-8 w-8 ${isScrolled ? 'text-gold-600' : 'text-white'}`} />
                <span className={`font-serif text-2xl font-bold tracking-wider ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                {HOTEL_NAME}
                </span>
            </NavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {NAVIGATION.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors uppercase tracking-widest ${
                    isActive
                      ? 'text-gold-500 border-b-2 border-gold-500'
                      : isScrolled
                      ? 'text-gray-700 hover:text-gold-600'
                      : 'text-gray-200 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button 
                onClick={handleBookNow}
                className={`ml-4 px-6 py-2 rounded-none font-semibold transition-colors ${
                isScrolled 
                ? 'bg-gold-600 text-white hover:bg-gold-700' 
                : 'bg-white text-gold-700 hover:bg-gray-100'
            }`}>
                Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-gold-500 focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `block px-3 py-4 rounded-md text-base font-medium w-full text-center ${
                  isActive
                    ? 'text-gold-600 bg-gray-50'
                    : 'text-gray-700 hover:text-gold-600 hover:bg-gray-50'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
            <button 
                onClick={handleBookNow}
                className="w-full mt-4 px-6 py-3 bg-gold-600 text-white font-semibold uppercase tracking-wider hover:bg-gold-700">
                Book Now
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;