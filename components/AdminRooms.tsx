import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AVAILABLE_AMENITIES = [
  'Free High Speed WiFi',
  'Flat Screen TV',
  'Breakfast Included',
  'Private Bath',
  'Air Conditioning',
  'Mini Bar',
  'Room Service'
];

const AdminRooms: React.FC = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_night: '',
    total_inventory: '',
    amenities: [] as string[],
  });
  const [customAmenity, setCustomAmenity] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['admin-rooms'],
    queryFn: async () => {
      const { data, error } = await supabase.from('Aura-standard').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('Aura-standard').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!editingRoomId && !imageFile) throw new Error("Image is required for new rooms");
      
      let imageUrl = undefined;

      if (imageFile) {
        // Upload image to Aura-standard-images bucket
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `rooms/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('Aura-standard-images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('Aura-standard-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrlData.publicUrl;
      }

      const roomData: any = {
        title: formData.title,
        description: formData.description,
        price_per_night: Number(formData.price_per_night),
        total_inventory: Number(formData.total_inventory),
        amenities: formData.amenities,
      };

      if (imageUrl) {
        roomData.image_url = imageUrl;
      }

      if (editingRoomId) {
        // Update existing room
        const { error: dbError } = await supabase.from('Aura-standard')
          .update(roomData)
          .eq('id', editingRoomId);
        if (dbError) throw dbError;
      } else {
        // Insert new room
        const { error: dbError } = await supabase.from('Aura-standard')
          .insert(roomData);
        if (dbError) throw dbError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      resetForm();
    }
  });

  const resetForm = () => {
    setIsAdding(false);
    setEditingRoomId(null);
    setFormData({ title: '', description: '', price_per_night: '', total_inventory: '', amenities: [] });
    setCustomAmenity('');
    setImageFile(null);
  };

  const handleEdit = (room: any) => {
    setFormData({
      title: room.title,
      description: room.description,
      price_per_night: room.price_per_night.toString(),
      total_inventory: room.total_inventory.toString(),
      amenities: room.amenities || [],
    });
    setEditingRoomId(room.id);
    setCustomAmenity('');
    setImageFile(null);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Room Listings</h2>
        <button 
          onClick={() => isAdding ? resetForm() : setIsAdding(true)}
          className="bg-stone-900 text-white px-6 py-2 rounded text-sm uppercase tracking-wider font-bold hover:bg-gold-600 transition-colors"
        >
          {isAdding ? 'Cancel' : '+ Add New Room'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md border border-stone-200 space-y-4">
          <h3 className="font-bold border-b pb-2 mb-4 text-stone-800">
            {editingRoomId ? 'Edit Room' : 'Add New Room'}
          </h3>
          
          <div>
            <label className="block text-sm mb-1 text-stone-600 font-bold">Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-stone-300 p-2 rounded" placeholder="e.g. Presidential Suite" />
          </div>
          
          <div>
            <label className="block text-sm mb-1 text-stone-600 font-bold">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-stone-300 p-2 rounded" rows={3} placeholder="Describe the room..."></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-stone-600 font-bold">Price per night (ETB)</label>
              <input required type="number" min="0" value={formData.price_per_night} onChange={e => setFormData({...formData, price_per_night: e.target.value})} className="w-full border border-stone-300 p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-stone-600 font-bold">Total Inventory</label>
              <input required type="number" min="1" value={formData.total_inventory} onChange={e => setFormData({...formData, total_inventory: e.target.value})} className="w-full border border-stone-300 p-2 rounded" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-2 text-stone-600 font-bold">Amenities</label>
            
            <div className="mb-3 flex flex-wrap gap-2">
              {formData.amenities.map(amenity => (
                <span key={amenity} className="bg-stone-900 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  {amenity}
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, amenities: formData.amenities.filter(a => a !== amenity)})}
                    className="hover:text-red-400 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-stone-50 p-3 border border-stone-200 rounded mb-3">
              {AVAILABLE_AMENITIES.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 text-sm text-stone-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.amenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, amenities: [...formData.amenities, amenity]});
                      } else {
                        setFormData({...formData, amenities: formData.amenities.filter(a => a !== amenity)});
                      }
                    }}
                    className="rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Custom amenity (e.g. Balcony)" 
                value={customAmenity}
                onChange={e => setCustomAmenity(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
                      setFormData({...formData, amenities: [...formData.amenities, customAmenity.trim()]});
                      setCustomAmenity('');
                    }
                  }
                }}
                className="flex-1 border border-stone-300 p-2 rounded text-sm"
              />
              <button 
                type="button"
                onClick={() => {
                  if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
                    setFormData({...formData, amenities: [...formData.amenities, customAmenity.trim()]});
                    setCustomAmenity('');
                  }
                }}
                className="bg-stone-200 text-stone-800 px-4 py-2 rounded text-sm font-bold hover:bg-stone-300"
              >
                Add
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-1 text-stone-600 font-bold">Room Image {editingRoomId && '(Optional: leave empty to keep current)'}</label>
            <input required={!editingRoomId} type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full border border-stone-300 p-2 rounded bg-stone-50" />
            <p className="text-xs text-stone-400 mt-1">Image will be securely uploaded to Aura-standard-images bucket.</p>
          </div>
          
          <div className="pt-4 border-t mt-4 flex gap-4">
            <button 
              type="submit" 
              disabled={saveMutation.isPending}
              className="bg-green-600 text-white px-8 py-2 rounded font-bold uppercase text-sm disabled:opacity-50"
            >
              {saveMutation.isPending ? 'Saving...' : 'Save Room'}
            </button>
          </div>
          {saveMutation.isError && <p className="text-red-500 text-sm mt-2">Error saving room. Did you create the public Storage Bucket in Supabase?</p>}
        </form>
      )}

      {isLoading ? (
        <p className="text-stone-500">Loading rooms...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto border border-stone-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-900 text-white">
                <th className="p-4 border-b border-stone-700">Image</th>
                <th className="p-4 border-b border-stone-700">Title</th>
                <th className="p-4 border-b border-stone-700">Price</th>
                <th className="p-4 border-b border-stone-700">Inventory</th>
                <th className="p-4 border-b border-stone-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room: any) => (
                <tr key={room.id} className="border-b hover:bg-stone-50">
                  <td className="p-4">
                    <img src={room.image_url} alt={room.title} className="w-20 h-16 object-cover rounded shadow-sm" />
                  </td>
                  <td className="p-4 font-bold text-stone-900">{room.title}</td>
                  <td className="p-4 text-stone-600">ETB {room.price_per_night}</td>
                  <td className="p-4 text-stone-600">{room.total_inventory}</td>
                  <td className="p-4 space-x-2 flex items-center h-24">
                    <button 
                      onClick={() => handleEdit(room)}
                      className="text-sm bg-stone-200 text-stone-800 px-3 py-1 rounded hover:bg-stone-300 font-bold"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Delete this room? This might break existing bookings attached to it.')) {
                          deleteMutation.mutate(room.id);
                        }
                      }}
                      disabled={deleteMutation.isPending && deleteMutation.variables === room.id}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50 hover:bg-red-700 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {rooms?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-stone-500">No rooms found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
