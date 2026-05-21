import React from 'react';
import { Wifi, Tv, Coffee, Bath, Wind, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useBookingStore } from '../store/useBookingStore';
import ScrollReveal from '../components/ScrollReveal';
import StaySummary from '../components/StaySummary';

const RoomCard: React.FC<{
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  amenities?: string[];
  reversed?: boolean;
  isSoldOut?: boolean;
  onBook: (id: string) => void;
}> = ({ id, title, price, image, description, amenities = [], reversed, isSoldOut, onBook }) => {
  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('WiFi')) return <Wifi size={16} />;
    if (amenity.includes('TV')) return <Tv size={16} />;
    if (amenity.includes('Breakfast')) return <Coffee size={16} />;
    if (amenity.includes('Bath')) return <Bath size={16} />;
    if (amenity.includes('Conditioning')) return <Wind size={16} />;
    return <Check size={16} />;
  };

  return (
  <ScrollReveal className="py-12 border-b border-stone-200 last:border-0">
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16`}>
      <div className={`w-full md:w-1/2 h-80 md:h-96 overflow-hidden rounded-lg shadow-lg relative`}>
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${isSoldOut ? 'grayscale opacity-70' : ''}`}
        />
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-red-600 text-white font-bold py-2 px-6 rounded shadow-lg tracking-widest uppercase transform -rotate-12 text-lg border-2 border-red-500">
              Booked
            </span>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-3xl font-serif font-bold text-stone-900">{title}</h3>
        </div>
        <p className="text-gold-600 text-xl font-bold mb-6 font-sans">
          ETB {price.toLocaleString()} <span className="text-stone-400 text-sm font-normal">/ night</span>
        </p>
        <p className="text-stone-600 leading-relaxed mb-8">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-stone-500">
          {amenities && amenities.length > 0 ? (
            amenities.map(amenity => (
              <div key={amenity} className="flex items-center gap-2">
                {getAmenityIcon(amenity)} {amenity}
              </div>
            ))
          ) : (
            <div className="col-span-2 italic">No specific amenities listed.</div>
          )}
        </div>

        <button
          onClick={() => !isSoldOut && onBook(id)}
          disabled={isSoldOut}
          className={`self-start px-8 py-3 text-white uppercase tracking-widest text-sm font-bold transition-colors ${isSoldOut ? 'bg-stone-400 cursor-not-allowed' : 'bg-stone-900 hover:bg-gold-600'
            }`}
        >
          {isSoldOut ? 'Unavailable' : 'Book Now'}
        </button>
      </div>
    </div>
  </ScrollReveal>
  );
};

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const { checkIn, checkOut, setSelectedRoomId, hasConfirmedSearch } = useBookingStore();

  const { data: rooms, isLoading, isError } = useQuery({
    queryKey: ['rooms', checkIn, checkOut],
    queryFn: async () => {
      // 1. Fetch all rooms
      const { data: allRooms, error: roomsError } = await supabase
        .from('Aura-standard')
        .select('*');

      if (roomsError) throw roomsError;

      // 2. Overlap counts via RPC (no public access to booking rows)
      const { data: bookedRows, error: bookingsError } = await supabase.rpc(
        'get_booked_counts',
        {
          check_in_param: checkIn,
          check_out_param: checkOut,
        }
      );

      if (bookingsError) throw bookingsError;

      // 3. Compare confirmed bookings to total_inventory per room type
      const bookedCounts = (bookedRows ?? []).reduce<Record<string, number>>(
        (acc, row: { room_id: string; booked_count: number }) => {
          acc[row.room_id] = Number(row.booked_count);
          return acc;
        },
        {}
      );

      const processedRooms = allRooms.map((room) => {
        const inventory = Math.max(1, Number(room.total_inventory) || 1);
        const booked = bookedCounts[room.id] || 0;
        return {
          ...room,
          isSoldOut: booked >= inventory,
        };
      });

      return processedRooms;
    },
    // We add a fallback mechanism in case supabase is not configured yet
    retry: false,
  });

  const handleBook = (id: string) => {
    setSelectedRoomId(id);
    navigate('/checkout');
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Accommodations</h1>
        <p className="text-stone-400 max-w-xl mx-auto">
          Relax in our spacious, elegantly appointed rooms designed for both business and leisure travelers.
        </p>
      </div>

      {/* Single scroll column: sticky only works while its parent includes the room list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {!hasConfirmedSearch && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-lg text-sm mt-8">
            <strong>Tip:</strong> Showing default dates ({checkIn} → {checkOut}). Use{' '}
            <strong>Change dates</strong> below to search for your exact stay.
          </div>
        )}
        <div className="sticky top-20 z-40 bg-stone-50 py-3 mt-6 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-stone-200/80 shadow-sm">
          <StaySummary context="rooms" />
        </div>

        {isLoading ? (
          <p className="text-center py-20 text-stone-500">Loading available rooms...</p>
        ) : isError ? (
          <div className="text-center py-20 text-red-500 max-w-lg mx-auto">
            <p className="font-bold mb-2">Could not fetch rooms from the database.</p>
            <p className="text-sm text-stone-600">Please make sure you have connected your Supabase project and run the SQL schema.</p>
          </div>
        ) : rooms?.length === 0 ? (
          <p className="text-center py-20 text-stone-500 text-xl font-serif">Sorry, no rooms are available for these dates.</p>
        ) : (
          rooms?.map((room, index) => (
            <RoomCard
              key={room.id}
              id={room.id}
              title={room.title}
              price={room.price_per_night}
              image={room.image_url}
              description={room.description}
              amenities={room.amenities}
              reversed={index % 2 !== 0}
              isSoldOut={room.isSoldOut}
              onBook={handleBook}
            />
          ))
        )}
      </div>
    </div>
  );
};


export default Rooms;