import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import BookingSearchFields from './BookingSearchFields';

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const { setHasConfirmedSearch } = useBookingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasConfirmedSearch(true);
    navigate('/rooms');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 items-end md:items-center w-full max-w-5xl mx-auto"
    >
      <BookingSearchFields idPrefix="home-booking" />
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-stone-900 text-white font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors rounded-md h-[46px]"
      >
        Check Availability
      </button>
    </form>
  );
};

export default BookingForm;
