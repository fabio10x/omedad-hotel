import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { HOTEL_NAME } from '../constants';
import StaySummary from '../components/StaySummary';
import { supabase } from '../lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { differenceInDays, parseISO } from 'date-fns';

const Checkout: React.FC = () => {
  const { checkIn, checkOut, guests, selectedRoomId } = useBookingStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch selected room details
  const { data: room, isLoading } = useQuery({
    queryKey: ['room', selectedRoomId],
    queryFn: async () => {
      if (!selectedRoomId) return null;
      const { data, error } = await supabase
        .from('Aura-standard')
        .select('*')
        .eq('id', selectedRoomId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!selectedRoomId,
  });

  const nights = differenceInDays(parseISO(checkOut), parseISO(checkIn));
  const totalPrice = room ? room.price_per_night * nights : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomId) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('Aura-standard-booking').insert({
        room_id: selectedRoomId,
        guest_name: name,
        guest_email: email,
        guest_phone: phone,
        check_in_date: checkIn,
        check_out_date: checkOut,
        number_of_guests: parseInt(guests),
        total_price: totalPrice,
        status: 'pending',
      });

      if (error) throw error;
      setSuccess(true);
      // Wait a moment and redirect to home
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedRoomId) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h2 className="text-2xl font-serif text-stone-900">No room selected</h2>
        <button onClick={() => navigate('/rooms')} className="mt-4 text-gold-600 hover:underline">
          Go back to Rooms
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="pt-32 text-center min-h-screen px-4">
        <h2 className="text-4xl font-serif text-stone-900 mb-4">Request received</h2>
        <p className="text-stone-600 text-lg max-w-md mx-auto">
          We&apos;ll contact you soon to confirm your reservation with {HOTEL_NAME}.
        </p>
        <p className="text-stone-500 text-sm mt-4">Redirecting you to the home page…</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6 text-center">Complete Your Reservation</h1>

        <div className="mb-8">
          <StaySummary context="checkout" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif font-bold mb-6">Guest Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Full Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Phone</label>
                <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting || isLoading}
                className="w-full mt-6 bg-stone-900 text-white font-bold py-3 uppercase tracking-widest hover:bg-gold-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending request...' : 'Submit request'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="bg-stone-900 text-white p-8 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-serif font-bold mb-6 text-gold-500">Reservation Summary</h2>
            {isLoading ? (
              <p>Loading details...</p>
            ) : room ? (
              <div className="space-y-4 text-stone-300">
                <div className="border-b border-stone-700 pb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{room.title}</h3>
                  <p className="text-sm">{guests} Guest{parseInt(guests) > 1 ? 's' : ''}</p>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-700">
                  <span>Check In</span>
                  <span className="font-bold text-white">{checkIn}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-700">
                  <span>Check Out</span>
                  <span className="font-bold text-white">{checkOut}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-700">
                  <span>Duration</span>
                  <span className="font-bold text-white">{nights} Night{nights > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between pt-4 mt-4">
                  <span className="text-lg">Total Due at Hotel</span>
                  <span className="text-2xl font-bold text-gold-500">ETB {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p>Room not found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
