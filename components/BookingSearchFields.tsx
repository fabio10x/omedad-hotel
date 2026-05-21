import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';

export const getTodayString = () => new Date().toISOString().split('T')[0];

interface BookingSearchFieldsProps {
  compact?: boolean;
  idPrefix?: string;
}

const BookingSearchFields: React.FC<BookingSearchFieldsProps> = ({
  compact = false,
  idPrefix = 'booking',
}) => {
  const { checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests } = useBookingStore();
  const today = getTodayString();

  const labelClass = compact
    ? 'block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1'
    : 'block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1';

  const inputClass = compact
    ? 'w-full pl-9 pr-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-stone-700 text-sm'
    : 'w-full pl-10 pr-4 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-stone-700 uppercase text-sm';

  const iconClass = compact ? 'w-4 h-4' : 'w-5 h-5';
  const iconPos = compact ? 'left-2.5' : 'left-3';

  return (
    <>
      <div className="flex-1 w-full min-w-0">
        <label htmlFor={`${idPrefix}-check-in`} className={labelClass}>
          Check In
        </label>
        <div className="relative">
          <Calendar
            className={`absolute ${iconPos} top-1/2 -translate-y-1/2 text-gold-600 ${iconClass}`}
          />
          <input
            id={`${idPrefix}-check-in`}
            type="date"
            className={inputClass}
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex-1 w-full min-w-0">
        <label htmlFor={`${idPrefix}-check-out`} className={labelClass}>
          Check Out
        </label>
        <div className="relative">
          <Calendar
            className={`absolute ${iconPos} top-1/2 -translate-y-1/2 text-gold-600 ${iconClass}`}
          />
          <input
            id={`${idPrefix}-check-out`}
            type="date"
            className={inputClass}
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex-1 w-full min-w-0">
        <label htmlFor={`${idPrefix}-guests`} className={labelClass}>
          Guests
        </label>
        <div className="relative">
          <Users
            className={`absolute ${iconPos} top-1/2 -translate-y-1/2 text-gold-600 ${iconClass}`}
          />
          <select
            id={`${idPrefix}-guests`}
            className={`${inputClass} appearance-none ${compact ? 'py-2' : 'py-2.5'} bg-white`}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default BookingSearchFields;
