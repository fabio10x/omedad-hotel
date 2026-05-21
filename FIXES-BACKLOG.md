# Aura web service — Fixes & improvements backlog

Use this file to work through changes **one at a time**. Check boxes when done.

**Legend:** 🔴 Before launch · 🟠 Guest trust / accuracy · 🟡 Consistency / polish · 🟢 Housekeeping · ⚪ Optional / later

---

## Already completed (reference)

- [x] Rebrand: Omedad Hotel → **Aura web service** / **Aura**
- [x] Contacts: phone `tel:`, email display vs `mailto:`, social platform links
- [x] Location copy: all **Bole** (removed Kirkos / Meskel Square confusion)
- [x] Google Maps embed on Contact & Location page
- [x] Contact form → **Formspree** (`https://formspree.io/f/xojbdaje`)
- [x] Booking UX: **Your stay** bar on Rooms + Checkout; change dates → back to Rooms
- [x] Sticky stay/search bar on Rooms (under navbar while scrolling)
- [x] Checkout success copy (option A): request received, pending until admin confirms
- [x] Room availability uses `total_inventory` (not sold out after first booking)
- [x] README updated for Supabase / Vite / Formspree
- [x] `index.css` added (fixes 404)
- [x] Home featured rooms: first 3 from Supabase
- [x] Items 1–3: Supabase Auth admin, RLS, secure storage (`schema-rls.sql`)

---

## 🔴 Before launch (security & admin)

### 1. Admin authentication ✅

**Done:** Supabase Auth. Email + password login (empty email field, no default). Any user in Supabase Authentication can sign in. Sign out supported.

**You must:** Create staff users in Supabase; disable public sign-up.

**Files:** `pages/Admin.tsx`

---

### 2. Supabase Row Level Security (RLS) ✅

**Done:** `schema-rls.sql` — rooms public read, admin write; bookings public insert (`pending` only), admin read/update/delete; `get_booked_counts` RPC for availability.

**You must:** Run `schema-rls.sql` in Supabase SQL Editor.

**Files:** `schema-rls.sql`, `pages/Rooms.tsx`

---

### 3. Supabase Storage policies ✅

**Done:** Public read on `Aura-standard-images`; upload/update/delete only for `authenticated` (included in `schema-rls.sql`).

**Files:** `schema-rls.sql`, `components/AdminRooms.tsx`

---

## 🟠 Guest trust & booking accuracy

### 4. Use `total_inventory` in availability ✅

**Problem:** One confirmed booking marked the entire room type sold out.

**Done:** Sold out when `confirmed bookings for dates >= total_inventory`. Only **confirmed** bookings count (pending does not block).

**Files:** `pages/Rooms.tsx`

---

### 5. Checkout success message vs database status ✅

**Problem:** Checkout showed **“Booking Confirmed!”** but insert uses `status: 'pending'`.

**Done (option A):** Success screen — **“Request received”** / **“We'll contact you soon…”**; submit button **“Submit request”**. DB still `pending` until admin confirms.

**Files:** `pages/Checkout.tsx`

---

## 🟡 Consistency & polish

### 6. Home page room previews vs live database ✅

**Done:** Home fetches **first 3 rooms** from Supabase (`created_at` order): live image, title, price. Cards link to `/rooms`. Loading skeleton + error/empty states.

**Files:** `pages/Home.tsx`

---

### 7. Social links → your real profiles

**Problem:** Links open platform homepages (instagram.com, tiktok.com, …), not **your** accounts.

**Files:** `constants.ts` → `SOCIAL_LINKS` (`href` for each platform)

**Done when:** Each icon goes to your profile/channel.

---

### 8. Footer placeholder links

**Problem:** About Us, Terms & Conditions, Privacy Policy, Careers use `href="#"`.

**Files:** `components/Footer.tsx`

**Done when:** Real pages or external URLs, or remove unused links.

---

### 9. Database table names (optional refactor)

**Problem:** Tables `"Aura-standard"` and `"Aura-standard-booking"` need quotes in SQL; hyphenated names are awkward.

**Files:** `schema.sql`, `pages/Rooms.tsx`, `pages/Checkout.tsx`, `pages/Admin.tsx`, `components/AdminRooms.tsx`

**Note:** Renaming requires migration in Supabase + updating every query. Low priority if everything works.

**Done when:** Renamed (e.g. `rooms`, `bookings`) or consciously kept as-is.

---

## 🟢 Housekeeping (dev experience)

### 10. Update README ✅

**Done:** `README.md` documents Vite, Supabase env vars, `schema.sql`, Formspree, scripts, deploy, troubleshooting. No Gemini key.

---

### 11. Missing `index.css` ✅

**Done:** Created `index.css` at project root (linked from `index.html`). Main styles remain in `index.html` + Tailwind CDN.

---

### 12. Remove dead Gemini config (optional)

**Problem:** `vite.config.ts` injects `GEMINI_API_KEY` / `process.env.API_KEY` — unused in source.

**Files:** `vite.config.ts`

**Done when:** Removed or documented if you plan to use Gemini later.

---

## ⚪ Optional / later

### 13. Vite `index.html` import map

**Note:** `index.html` includes an esm.sh import map; Vite bundles from `node_modules`. Harmless but redundant — clean up only if you hit module conflicts.

---

### 14. Hash router vs browser router

**Note:** App uses `HashRouter` (`/#/rooms`). Good for static hosting. Switch to `BrowserRouter` only if your host supports SPA rewrites.

---

## Decisions to make before some fixes

Answer these when you tackle the related item:

| # | Question | Affects |
|---|----------|---------|
| 1 | Bookings stay **pending** until admin confirms, or auto-**confirmed**? | Item 5 |
| 2 | Each room row = one **type** with many units (`total_inventory`), or one physical room? | Item 4 |
| 3 | Who uses admin — only you or staff? | Item 1 |
| 4 | Home: static marketing OK, or must match live DB prices? | Item 6 |

---

## Suggested order (one-by-one)

1. ~~Item **5** — Checkout wording~~ ✅  
2. ~~Item **4** — `total_inventory` logic~~ ✅  
3. ~~Item **10** + **11** — README + `index.css`~~ ✅  
4. ~~Item **6** — Home vs DB~~ ✅  
5. ~~Items **1** + **2** + **3** — Security~~ ✅ (run `schema-rls.sql` + create admin user in Supabase)  
6. Items **7**, **8**, **9** — Polish when ready  

---

## Quick links in codebase

| Topic | Main files |
|-------|------------|
| Booking flow | `store/useBookingStore.ts`, `components/BookingForm.tsx`, `components/StaySummary.tsx`, `pages/Rooms.tsx`, `pages/Checkout.tsx` |
| Admin | `pages/Admin.tsx`, `components/AdminRooms.tsx` |
| Supabase | `lib/supabase.ts`, `schema.sql`, `.env.local` |
| Contact | `pages/Location.tsx`, `constants.ts` (`FORMSPREE_URL`) |
| Brand / contact constants | `constants.ts` |

---

*Last updated: backlog created after booking UX + sticky bar work. Edit this file as you complete items.*
