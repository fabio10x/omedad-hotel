import React from 'react';
import { IMAGES } from '../constants';
import ScrollReveal from '../components/ScrollReveal';

const Dining: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-white">
         <div className="bg-gold-50 py-16 px-4 text-center border-b border-gold-100">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-stone-900">Culinary Delights</h1>
            <p className="text-stone-600 max-w-xl mx-auto text-lg">
                Savor the flavors of Ethiopia and international cuisine in our refined dining spaces.
            </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
                <ScrollReveal>
                    <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">The Restaurant</h2>
                    <p className="text-stone-600 leading-relaxed mb-6">
                        Start your day with our complimentary breakfast buffet featuring fresh pastries, fruits, and traditional Ethiopian coffee. 
                        For lunch and dinner, our chefs prepare a selection of local specialties and international favorites using the freshest ingredients.
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                        The ambiance is warm and inviting, perfect for a business lunch or a romantic dinner.
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={200} className="h-96 rounded-lg overflow-hidden shadow-xl">
                    <img src={IMAGES.dining[0]} alt="Dining Hall" className="w-full h-full object-cover" />
                </ScrollReveal>
            </div>

            <h2 className="text-3xl font-serif font-bold text-center mb-10">Gallery</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {IMAGES.dining.map((img, index) => (
                    <ScrollReveal key={index} delay={index * 100} className="aspect-square overflow-hidden rounded-md group">
                        <img 
                            src={img} 
                            alt={`Dining ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Dining;