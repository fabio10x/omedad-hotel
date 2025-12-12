import React, { useState } from 'react';
import { Calendar, Users } from 'lucide-react';

const BookingForm: React.FC = () => {
  // Set default dates to Today and Tomorrow
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState('2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Checking availability for: \nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 items-end md:items-center w-full max-w-5xl mx-auto"
    >
      <div className="flex-1 w-full">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Check In</label>
        <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-600 w-5 h-5" />
            <input 
              type="date" 
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-stone-700 uppercase text-sm"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
        </div>
      </div>

      <div className="flex-1 w-full">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Check Out</label>
        <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-600 w-5 h-5" />
            <input 
              type="date" 
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-stone-700 uppercase text-sm"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
        </div>
      </div>

      <div className="flex-1 w-full">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Guests</label>
        <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-600 w-5 h-5" />
            <select 
              className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-stone-700 bg-white appearance-none"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-stone-900 text-white font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors rounded-md h-[46px]"
      >
        Check
      </button>
    </form>
  );
};

export default BookingForm;