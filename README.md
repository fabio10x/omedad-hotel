# Aura web service

Hotel marketing and booking site for **Aura web service** (Bole, Addis Ababa). Built with React, Vite, Supabase, and Formspree.

## Features

- Room listings with date-based availability (`total_inventory` aware)
- Booking flow: search dates → choose room → guest checkout (pending until admin confirms)
- Admin dashboard: manage bookings and rooms (`/#/admin`)
- Contact form (Formspree) and Google Maps on the Location page

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A [Supabase](https://supabase.com/) project
- A [Formspree](https://formspree.io/) form (contact page) — already configured in `constants.ts` as `FORMSPREE_URL`

**No Gemini API key is required** for this app.

## Run locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and fill in your Supabase values:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   |----------|-------------|
   | `VITE_SUPABASE_URL` | Project URL (Supabase → Settings → API) |
   | `VITE_SUPABASE_ANON_KEY` | `anon` public key |

3. **Database**

   In the Supabase SQL editor, run:

   1. [`schema.sql`](schema.sql) — tables, seed rooms, storage bucket  
   2. [`schema-rls.sql`](schema-rls.sql) — RLS, secure storage, `get_booked_counts` RPC  

4. **Staff accounts (required for `/admin`)**

   In Supabase → **Authentication** → **Users**, create each staff member (email + password).

   Anyone you add there can sign in at `/#/admin` with that email and password. **Disable public sign-up** in Supabase so guests cannot self-register as staff.

5. **Start dev server**

   ```bash
   npm run dev
   ```

   App runs at **http://localhost:3000** (see `vite.config.ts`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

## Project structure (high level)

| Path | Purpose |
|------|---------|
| `pages/` | Home, Rooms, Checkout, Dining, Location, Admin |
| `components/` | Navbar, Footer, booking forms, `StaySummary`, etc. |
| `store/useBookingStore.ts` | Check-in/out, guests, selected room |
| `lib/supabase.ts` | Supabase client |
| `constants.ts` | Brand, contact, social links, Formspree URL, map embed |
| `schema.sql` | Supabase tables and seed data |
| `schema-rls.sql` | RLS policies, availability RPC, storage hardening |

## Configuration notes

- **Routing:** Hash-based (`/#/rooms`) — works on static hosts without server rewrites.
- **Contact email:** Display name vs real `mailto` target are set in `constants.ts` (`EMAIL_DISPLAY`, `EMAIL`).
- **Admin:** Email + password login; any user in Supabase Authentication can access the dashboard (keep public sign-up off).
- **Backlog:** Open [`FIXES-BACKLOG.md`](FIXES-BACKLOG.md) for remaining security, polish, and launch tasks.

## Deploy

1. `npm run build`
2. Upload `dist/` to your static host (Netlify, Vercel, Cloudflare Pages, etc.)
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the host’s environment variables
4. Ensure Supabase RLS and storage policies match your launch requirements

## Troubleshooting

- **Rooms don’t load:** Check `.env.local`, run `schema.sql`, and confirm Supabase project is active.
- **Contact form fails:** Verify the Formspree form at `https://formspree.io/f/xojbdaje` and that the notification email is confirmed in Formspree.
- **404 for `index.css`:** Should be resolved — file exists at project root and is linked from `index.html`.
- **Rooms error after RLS:** Run `schema-rls.sql` so `get_booked_counts` exists.
- **Admin login fails:** Confirm user exists in Supabase Auth and `schema-rls.sql` has been applied.
- **Image upload fails in admin:** Sign in first; storage writes require an authenticated session.
