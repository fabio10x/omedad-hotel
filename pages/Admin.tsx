import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminRooms from '../components/AdminRooms';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'rooms'>('bookings');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsLoggingIn(false);
    if (error) {
      setLoginError(error.message);
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
  };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Aura-standard-booking')
        .select(`
          *,
          room:room_id (title)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAuthenticated,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('Aura-standard-booking')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('Aura-standard-booking')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-20">
        <p className="text-stone-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-20 px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-serif font-bold mb-2 text-center">Staff Access</h2>
          <p className="text-sm text-stone-500 text-center mb-6">
            Sign in with a staff account from Supabase Authentication.
          </p>
          <div className="mb-4">
            <label htmlFor="admin-email" className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-gold-500 outline-none"
              placeholder="your@email.com"
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="admin-password" className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-gold-500 outline-none"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
          </div>
          {loginError && (
            <p className="text-red-600 text-sm mb-4">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-stone-900 text-white px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-gold-600 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-stone-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          <button
            type="button"
            onClick={handleSignOut}
            className="self-start text-sm font-bold uppercase tracking-wider text-stone-600 border border-stone-300 px-4 py-2 rounded hover:bg-stone-200 transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="flex space-x-4 mb-8 border-b border-stone-200">
          <button
            className={`pb-2 px-4 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'bookings' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Manage Bookings
          </button>
          <button
            className={`pb-2 px-4 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'rooms' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setActiveTab('rooms')}
          >
            Manage Rooms
          </button>
        </div>

        {activeTab === 'bookings' ? (
          isLoading ? (
            <p>Loading bookings...</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-900 text-white">
                    <th className="p-4 border-b border-stone-700">Guest</th>
                    <th className="p-4 border-b border-stone-700">Room</th>
                    <th className="p-4 border-b border-stone-700">Dates</th>
                    <th className="p-4 border-b border-stone-700">Status</th>
                    <th className="p-4 border-b border-stone-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((b: any) => (
                    <tr key={b.id} className="border-b hover:bg-stone-50">
                      <td className="p-4">
                        <div className="font-bold">{b.guest_name}</div>
                        <div className="text-sm text-stone-500">{b.guest_email}</div>
                        <div className="text-sm text-stone-500">{b.guest_phone}</div>
                      </td>
                      <td className="p-4">{b.room?.title}</td>
                      <td className="p-4 text-sm">
                        <div>In: {b.check_in_date}</div>
                        <div>Out: {b.check_out_date}</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold uppercase
                        ${b.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 space-x-2 flex items-center">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            updateStatusMutation.mutate({ id: b.id, status: e.target.value })
                          }
                          disabled={
                            updateStatusMutation.isPending &&
                            updateStatusMutation.variables?.id === b.id
                          }
                          className="text-sm border p-1 rounded bg-white disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                'Are you sure you want to completely delete this booking?'
                              )
                            ) {
                              deleteMutation.mutate(b.id);
                            }
                          }}
                          disabled={
                            deleteMutation.isPending && deleteMutation.variables === b.id
                          }
                          className="text-sm bg-red-600 text-white px-2 py-1 rounded disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bookings?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-stone-500">
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <AdminRooms />
        )}
      </div>
    </div>
  );
};

export default Admin;
