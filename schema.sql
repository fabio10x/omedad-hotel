-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create the Rooms table
create table "Aura-standard" (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  price_per_night numeric not null,
  image_url text not null,
  total_inventory integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the Bookings table
create table "Aura-standard-booking" (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid references "Aura-standard"(id) on delete cascade not null,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  check_in_date date not null,
  check_out_date date not null,
  number_of_guests integer not null default 1,
  total_price numeric not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert some initial dummy data for rooms
insert into "Aura-standard" (title, description, price_per_night, image_url, total_inventory)
values
  ('Standard Double Room', 'Our Standard Double Room offers a perfect blend of comfort and style. Featuring a plush double bed, modern workspace, and floor-to-ceiling windows offering city views.', 8210, 'https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/5c3bd3f8.jpg?impolicy=resizecrop&rw=1200&ra=fit', 10),
  ('Twin Room', 'Ideal for friends or colleagues traveling together. The Twin Room features two comfortable single beds, a spacious seating area, and all modern amenities to ensure a restful stay.', 5500, 'https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/6aed5eda.jpg?impolicy=resizecrop&rw=1200&ra=fit', 10),
  ('Deluxe Suite', 'Experience the height of luxury in our Deluxe Suite. With a separate living area, premium furnishings, and an oversized bathroom, it is your private sanctuary in Addis Ababa.', 10500, 'https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/7a1881ba.jpg?impolicy=resizecrop&rw=1200&ra=fit', 5);

-- Storage Setup for Room Images
insert into storage.buckets (id, name, public)
values ('Aura-standard-images', 'Aura-standard-images', true)
on conflict (id) do nothing;

-- Policies to allow public read/write to the image bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'Aura-standard-images' );

create policy "Allow Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'Aura-standard-images' );
  
create policy "Allow Updates"
  on storage.objects for update
  using ( bucket_id = 'Aura-standard-images' );
  
create policy "Allow Deletes"
  on storage.objects for delete
  using ( bucket_id = 'Aura-standard-images' );

-- Add amenities array to rooms
alter table "Aura-standard" add column if not exists amenities text[] default '{}';

-- After initial setup, run schema-rls.sql for RLS, availability RPC, and secure storage policies.
