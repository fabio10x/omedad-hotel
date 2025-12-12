import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, Wifi, Car, Coffee, MapPin } from 'lucide-react';
import { IMAGES, HOTEL_NAME } from '../constants';
import ScrollReveal from '../components/ScrollReveal';
import BookingForm from '../components/BookingForm';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we need to scroll to the booking section (passed from Navbar "Book Now")
    if (location.state && (location.state as any).scrollToBooking) {
        const element = document.getElementById('booking-form-section');
        if (element) {
            // Small delay to ensure render is complete/transition finished
            setTimeout(() => {
                const yOffset = -100;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 100);
        }
        // Clean up state
        window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <div className="absolute inset-0">
          <img 
            src={IMAGES.hero} 
            alt="Omedad Hotel Exterior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pb-20 md:pb-0">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 text-gold-400 mb-4">
               {[1,2,3,4,5].map((s) => <Star key={s} fill="currentColor" size={20} />)}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 tracking-tight">
              {HOTEL_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 font-light max-w-2xl mx-auto mb-10">
              Luxury and comfort in the heart of Bole, Addis Ababa.
            </p>
            <Link 
              to="/rooms" 
              className="px-8 py-4 bg-gold-600 text-white font-bold uppercase tracking-widest hover:bg-gold-700 transition-all transform hover:scale-105"
            >
              View Our Rooms
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Booking Form (Overlapping) */}
      <div id="booking-form-section" className="relative z-20 px-4 -mt-10 md:-mt-24 pb-12">
        <ScrollReveal delay={200}>
          <BookingForm />
        </ScrollReveal>
      </div>

      {/* Overview Section */}
      <section className="py-10 md:py-20 px-4 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold-600 font-serif italic text-lg">Welcome</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mt-2">A Haven in Kirkos</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="relative h-96 overflow-hidden rounded-lg shadow-xl">
                 <img 
                    src={IMAGES.dining[1]} 
                    alt="Hotel Interior" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-duration-700 transition-transform duration-700" 
                />
            </ScrollReveal>
            <ScrollReveal delay={200}>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">Experience Ethiopian Hospitality</h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                    Located in the vibrant neighborhood of Kirkos, {HOTEL_NAME} offers a perfect blend of modern luxury and traditional charm. 
                    Rated 5.0 stars by our guests, we pride ourselves on exceptional service. Whether you are here for business in Meskel Square or leisure, 
                    our prime location makes us the perfect choice.
                </p>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-stone-700">
                        <div className="p-2 bg-stone-100 rounded-full"><MapPin size={18} className="text-gold-600"/></div>
                        <span>Prime Location in Bole</span>
                    </li>
                    <li className="flex items-center gap-3 text-stone-700">
                        <div className="p-2 bg-stone-100 rounded-full"><Wifi size={18} className="text-gold-600"/></div>
                        <span>High-Speed Complimentary Wi-Fi</span>
                    </li>
                    <li className="flex items-center gap-3 text-stone-700">
                        <div className="p-2 bg-stone-100 rounded-full"><Coffee size={18} className="text-gold-600"/></div>
                        <span>Free Breakfast Included</span>
                    </li>
                     <li className="flex items-center gap-3 text-stone-700">
                        <div className="p-2 bg-stone-100 rounded-full"><Car size={18} className="text-gold-600"/></div>
                        <span>Secure Free Parking</span>
                    </li>
                </ul>
            </ScrollReveal>
        </div>
      </section>

      {/* Featured Room Preview */}
      <section className="bg-stone-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
             <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-800 pb-8">
                    <div>
                        <h2 className="text-4xl font-serif">Accommodation</h2>
                        <p className="text-stone-400 mt-2">Designed for your utmost comfort.</p>
                    </div>
                    <Link to="/rooms" className="text-gold-500 hover:text-gold-400 mt-4 md:mt-0 font-medium flex items-center gap-2">
                        View All Suites &rarr;
                    </Link>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 5].map((idx, i) => (
                    <ScrollReveal key={idx} delay={i * 100}>
                        <div className="group relative overflow-hidden rounded-md h-80 cursor-pointer">
                            <img 
                                src={IMAGES.rooms[idx]} 
                                alt="Room Preview" 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90"></div>
                            <div className="absolute bottom-6 left-6">
                                <span className="text-gold-400 text-sm font-bold uppercase tracking-wider">
                                    {i === 2 ? 'Twin Room' : 'Double Room'}
                                </span>
                                <h3 className="text-xl font-bold mt-1 group-hover:text-gold-200 transition-colors">
                                    Starting from ETB 5,500
                                </h3>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;