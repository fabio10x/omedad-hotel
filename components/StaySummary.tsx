import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useBookingStore } from '../store/useBookingStore';
import BookingSearchFields from './BookingSearchFields';

interface StaySummaryProps {
  context: 'rooms' | 'checkout';
  variant?: 'light' | 'dark';
}

const formatStayDate = (dateStr: string) => {
  try {
    return format(parseISO(dateStr), 'MMM d, yyyy');
  } catch {
    return dateStr;
  }
};

const StaySummary: React.FC<StaySummaryProps> = ({ context, variant = 'light' }) => {
  const navigate = useNavigate();
  const { checkIn, checkOut, guests, setSelectedRoomId, setHasConfirmedSearch } =
    useBookingStore();
  const [isEditing, setIsEditing] = useState(false);

  const guestCount = parseInt(guests, 10);
  const isDark = variant === 'dark';

  const handleUpdateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasConfirmedSearch(true);
    setIsEditing(false);
    if (context === 'checkout') {
      setSelectedRoomId(null);
      navigate('/rooms');
    }
  };

  const handleChangeDatesCheckout = () => {
    setSelectedRoomId(null);
    navigate('/rooms');
  };

  const shellClass = isDark
    ? 'bg-stone-800 border-stone-700 text-white'
    : 'bg-white border-stone-200 text-stone-900 shadow-md';

  const mutedClass = isDark ? 'text-stone-400' : 'text-stone-500';
  const accentClass = isDark ? 'text-gold-400' : 'text-gold-600';

  return (
    <div className={`rounded-lg border p-4 md:p-5 ${shellClass}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <Calendar className={`shrink-0 mt-0.5 ${accentClass}`} size={22} />
          <div className="min-w-0">
            <p className={`text-xs font-bold uppercase tracking-wider ${mutedClass}`}>
              Your stay
            </p>
            <p className="font-serif font-bold text-lg mt-0.5 break-words">
              {formatStayDate(checkIn)} → {formatStayDate(checkOut)}
            </p>
            <p className={`text-sm mt-1 flex items-center gap-1.5 ${mutedClass}`}>
              <Users size={14} className={accentClass} />
              {guestCount} Guest{guestCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {context === 'checkout' ? (
          <button
            type="button"
            onClick={handleChangeDatesCheckout}
            className={`shrink-0 px-4 py-2 text-sm font-bold uppercase tracking-wider border rounded-md transition-colors ${
              isDark
                ? 'border-gold-500 text-gold-400 hover:bg-gold-500/10'
                : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
            }`}
          >
            Change dates
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing((open) => !open)}
            className={`shrink-0 px-4 py-2 text-sm font-bold uppercase tracking-wider border rounded-md transition-colors flex items-center justify-center gap-2 ${
              isDark
                ? 'border-gold-500 text-gold-400 hover:bg-gold-500/10'
                : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
            }`}
          >
            {isEditing ? (
              <>
                Hide <ChevronUp size={16} />
              </>
            ) : (
              <>
                Change dates <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
      </div>

      {context === 'checkout' && (
        <p className={`text-xs mt-3 ${mutedClass}`}>
          Changing dates will return you to room selection. Availability and price may
          change.
        </p>
      )}

      {context === 'rooms' && isEditing && (
        <form
          onSubmit={handleUpdateSearch}
          className="mt-5 pt-5 border-t border-stone-200 flex flex-col md:flex-row gap-4 items-end"
        >
          <BookingSearchFields compact idPrefix="stay-summary" />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-gold-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-gold-700 transition-colors rounded-md shrink-0"
          >
            Update search
          </button>
        </form>
      )}
    </div>
  );
};

export default StaySummary;
