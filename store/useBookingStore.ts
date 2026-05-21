import { create } from 'zustand';

interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: string;
  selectedRoomId: string | null;
  /** True after user explicitly searches or updates dates */
  hasConfirmedSearch: boolean;
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
  setGuests: (guests: string) => void;
  setSelectedRoomId: (id: string | null) => void;
  setHasConfirmedSearch: (value: boolean) => void;
}

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

export const useBookingStore = create<BookingState>((set) => ({
  checkIn: today,
  checkOut: tomorrow,
  guests: '2',
  selectedRoomId: null,
  hasConfirmedSearch: false,
  setCheckIn: (date) => set({ checkIn: date }),
  setCheckOut: (date) => set({ checkOut: date }),
  setGuests: (guests) => set({ guests }),
  setSelectedRoomId: (id) => set({ selectedRoomId: id }),
  setHasConfirmedSearch: (value) => set({ hasConfirmedSearch: value }),
}));
