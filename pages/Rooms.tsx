import React from 'react';
import { Wifi, Tv, Coffee, Bath, Wind } from 'lucide-react';
import { IMAGES } from '../constants';
import ScrollReveal from '../components/ScrollReveal';

const RoomCard: React.FC<{
  title: string;
  price: string;
  image: string;
  description: string;
  reversed?: boolean;
}> = ({ title, price, image, description, reversed }) => (
  <ScrollReveal className="py-12 border-b border-stone-200 last:border-0">
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16`}>
      <div className="w-full md:w-1/2 h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-serif font-bold text-stone-900">{title}</h3>
        </div>
        <p className="text-gold-600 text-xl font-bold mb-6 font-sans">
            {price} <span className="text-stone-400 text-sm font-normal">/ night</span>
        </p>
        <p className="text-stone-600 leading-relaxed mb-8">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-stone-500">
            <div className="flex items-center gap-2"><Wifi size={16}/> Free High Speed WiFi</div>
            <div className="flex items-center gap-2"><Tv size={16}/> Flat Screen TV</div>
            <div className="flex items-center gap-2"><Coffee size={16}/> Breakfast Included</div>
            <div className="flex items-center gap-2"><Bath size={16}/> Private Bath</div>
            <div className="flex items-center gap-2"><Wind size={16}/> Air Conditioning</div>
        </div>

        <button className="self-start px-8 py-3 bg-stone-900 text-white hover:bg-gold-600 transition-colors uppercase tracking-widest text-sm font-bold">
            Check Availability
        </button>
      </div>
    </div>
  </ScrollReveal>
);

const Rooms: React.FC = () => {
  return (
    <div className="pt-20">
        {/* Header */}
        <div className="bg-stone-900 text-white py-16 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Accommodations</h1>
            <p className="text-stone-400 max-w-xl mx-auto">
                Relax in our spacious, elegantly appointed rooms designed for both business and leisure travelers.
            </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <RoomCard 
                title="Standard Double Room"
                price="ETB 8,210"
                image={IMAGES.rooms[1]}
                description="Our Standard Double Room offers a perfect blend of comfort and style. Featuring a plush double bed, modern workspace, and floor-to-ceiling windows offering city views."
            />
            
            <RoomCard 
                title="Twin Room"
                price="ETB 5,500"
                image={IMAGES.rooms[5]}
                description="Ideal for friends or colleagues traveling together. The Twin Room features two comfortable single beds, a spacious seating area, and all modern amenities to ensure a restful stay."
                reversed={true}
            />

            <RoomCard 
                title="Deluxe Suite"
                price="ETB 10,500"
                image={IMAGES.rooms[2]}
                description="Experience the height of luxury in our Deluxe Suite. With a separate living area, premium furnishings, and an oversized bathroom, it is your private sanctuary in Addis Ababa."
            />
        </div>
    </div>
  );
};

export default Rooms;