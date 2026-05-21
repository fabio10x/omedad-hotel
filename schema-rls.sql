-- =============================================================================
-- Aura web service — Row Level Security & storage hardening
-- Run this in Supabase SQL Editor on an EXISTING project (after schema.sql).
-- Admin user: create in Dashboard → Authentication → Users with your email.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Availability RPC (no guest PII; used by public Rooms page)
-- -----------------------------------------------------------------------------
create or replace function public.get_booked_counts(
  check_in_param date,
  check_out_param date
)
returns table(room_id uuid, booked_count bigint)
language sql
security definer
set search_path = public
stable
as $$
  select b.room_id, count(*)::bigint as booked_count
  from "Aura-standard-booking" b
  where b.status = 'confirmed'
    and b.check_in_date <= check_out_param
    and b.check_out_date >= check_in_param
  group by b.room_id;
$$;

grant execute on function public.get_booked_counts(date, date) to anon, authenticated;

-- -----------------------------------------------------------------------------
-- Rooms table RLS
-- -----------------------------------------------------------------------------
alter table "Aura-standard" enable row level security;

drop policy if exists "rooms_select_public" on "Aura-standard";
drop policy if exists "rooms_insert_admin" on "Aura-standard";
drop policy if exists "rooms_update_admin" on "Aura-standard";
drop policy if exists "rooms_delete_admin" on "Aura-standard";

create policy "rooms_select_public"
  on "Aura-standard" for select
  using (true);

create policy "rooms_insert_admin"
  on "Aura-standard" for insert
  to authenticated
  with check (true);

create policy "rooms_update_admin"
  on "Aura-standard" for update
  to authenticated
  using (true)
  with check (true);

create policy "rooms_delete_admin"
  on "Aura-standard" for delete
  to authenticated
  using (true);

-- -----------------------------------------------------------------------------
-- Bookings table RLS
-- -----------------------------------------------------------------------------
alter table "Aura-standard-booking" enable row level security;

drop policy if exists "bookings_insert_public" on "Aura-standard-booking";
drop policy if exists "bookings_select_admin" on "Aura-standard-booking";
drop policy if exists "bookings_update_admin" on "Aura-standard-booking";
drop policy if exists "bookings_delete_admin" on "Aura-standard-booking";

-- Guests may only create pending booking requests
create policy "bookings_insert_public"
  on "Aura-standard-booking" for insert
  with check (status = 'pending');

create policy "bookings_select_admin"
  on "Aura-standard-booking" for select
  to authenticated
  using (true);

create policy "bookings_update_admin"
  on "Aura-standard-booking" for update
  to authenticated
  using (true)
  with check (true);

create policy "bookings_delete_admin"
  on "Aura-standard-booking" for delete
  to authenticated
  using (true);

-- -----------------------------------------------------------------------------
-- Storage: public read, admin write (bucket Aura-standard-images)
-- -----------------------------------------------------------------------------
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Allow Uploads" on storage.objects;
drop policy if exists "Allow Updates" on storage.objects;
drop policy if exists "Allow Deletes" on storage.objects;

drop policy if exists "room_images_public_read" on storage.objects;
drop policy if exists "room_images_admin_insert" on storage.objects;
drop policy if exists "room_images_admin_update" on storage.objects;
drop policy if exists "room_images_admin_delete" on storage.objects;

create policy "room_images_public_read"
  on storage.objects for select
  using (bucket_id = 'Aura-standard-images');

create policy "room_images_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'Aura-standard-images');

create policy "room_images_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'Aura-standard-images');

create policy "room_images_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'Aura-standard-images');
