# CauseHub — NGO Admin Dashboard

A React (Vite) admin dashboard for an NGO-style operation: a shared sidebar,
API-backed tables with infinite scroll, member/volunteer detail profiles,
light/dark theming, and a responsive layout that collapses to an off-canvas
sidebar on mobile.

## Stack

- React 19 + Vite
- react-router-dom (route-level lazy loading / code splitting)
- lucide-react (icons)
- @fontsource/plus-jakarta-sans (self-hosted variable font, no external font CDN)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Connecting a real API

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend:

```bash
cp .env.example .env
# VITE_API_BASE_URL=https://api.yourngo.org/v1
```

Expected endpoints:

```
GET {VITE_API_BASE_URL}/members
GET {VITE_API_BASE_URL}/members/:id
GET {VITE_API_BASE_URL}/volunteers
GET {VITE_API_BASE_URL}/volunteers/:id
GET {VITE_API_BASE_URL}/donations
```

If `VITE_API_BASE_URL` is left blank, or a request to it fails, the app
transparently falls back to generated mock data (`src/data/mockData.js`) so
the UI keeps working without a backend. See `src/api/peopleApi.js`.

Each record returned by the API should roughly match the shape produced by
the mock generator: `id, name, email, phone, donations, status, gender,
country, zipcode, bio, address, ...`. The `gender` field (`'male' |
'female'`) only controls which placeholder doodle avatar shows up when a
record has no `avatarUrl` — see "Avatars" below.

## Structure

```
src/
  api/           config.js, peopleApi.js — fetch + mock fallback
  context/       ThemeContext, theme-context, useTheme — light/dark theme
  components/    Sidebar, Topbar, Layout, DataTable, Avatar, ThemeToggle,
                 StatusPill, Skeletons, ErrorState, BlankPage
  pages/         Dashboard, Members, Volunteers, Donations, Events,
                 communication/Email, communication/WhatsApp,
                 communication/Message, AccountProfile,
                 RecordProfile (member/volunteer detail), Login, NotFound
  data/          mockData.js — deterministic generated demo data
  hooks/         useDebouncedValue, useInfiniteScroll, useApiData
  styles/        theme.css (design tokens, light/dark), states.css (skeleton/error)
```

## Sidebar

- Dashboard, Members, Volunteers, Donations, Events as top-level links.
- "Communication" expands into Email / WhatsApp / Message sub-links.
- Profile + Logout are pinned to the bottom of the sidebar.
- Active route is highlighted via `NavLink`'s `isActive` state.
- **Responsive:** below 960px the sidebar becomes an off-canvas drawer,
  opened via the hamburger button in the topbar and closed via backdrop tap,
  the × button, or navigating to a new page.

## Theme

- Toggle button lives in the topbar (sun/moon switch).
- Theme preference is stored in `localStorage` and respects the OS
  `prefers-color-scheme` on first visit.
- All colors are CSS variables in `src/styles/theme.css` under
  `[data-theme='dark']` / `[data-theme='light']` — add a new theme by adding
  another `[data-theme='...']` block.

## Avatars (photo or doodle fallback)

`components/Avatar.jsx` shows a record's `avatarUrl` photo when present and
valid. If there's no photo, or the image fails to load, it falls back to a
simple male or female doodle illustration (`components/avatars/`) based on
the record's `gender` field — so the UI never shows a broken image or empty
circle.

## Tables (Members / Volunteers / Donations)

`components/DataTable.jsx` is a single reusable table that:

- Fetches its data through `useApiData` (loading skeleton + error state with
  retry built in).
- Debounces the search input (`useDebouncedValue`, 250ms) before filtering.
- Uses **infinite scroll** instead of pagination — an `IntersectionObserver`
  sentinel (`useInfiniteScroll`) reveals 25 more rows as you scroll.
- Memoizes each row (`React.memo`) so re-renders only touch rows whose props
  actually changed.
- Computes the filtered list with `useMemo`, keyed off the debounced query
  and status filter.
- Scrolls horizontally on narrow screens instead of squashing columns.

Members and Volunteers share the same column set (name, contact, email,
donations, status, actions). Donations reuses the same table with an
"amount / method" variant instead of a single donations total.

Clicking a Members/Volunteers row navigates to `/members/:id` or
`/volunteers/:id`, which renders `RecordProfile.jsx` — the detail screen
modeled on the second reference screenshot.

## Responsive behavior summary

- Sidebar → off-canvas drawer under 960px.
- Topbar search hides under 720px to make room for the title/menu button.
- Table toolbar stacks and the search box goes full-width under 640px.
- Table body scrolls horizontally instead of compressing columns.
- Profile and dashboard grids collapse to a single column on narrow screens.

## Optimizations applied

- **Code splitting / lazy loading** — every page is `React.lazy`-loaded in
  `App.jsx`, wrapped in a single `Suspense` boundary in `Layout.jsx`.
- **Debouncing** — search inputs in `DataTable` via `useDebouncedValue`.
- **Memoization** — `React.memo` on `Sidebar`, `Topbar`, `Avatar`,
  `StatusPill`, `ThemeToggle`, and table `Row`; `useMemo` for filtered
  datasets and dashboard stats; `useCallback` for handlers passed to
  memoized children and for fetcher functions passed to `useApiData`.
- **Infinite scroll over pagination** — only the visible "page" of rows is
  in the DOM at a given time.
- **Abort on unmount/refetch** — `useApiData` cancels in-flight requests via
  `AbortController` when the component unmounts or a new fetch starts.
- **Stale-while-loading** — `useApiData` keeps showing the last known data
  while a refetch is in flight, rather than blanking the screen.

## What's intentionally left blank

Per the brief, **Events** and **Communication → Email/WhatsApp/Message**
are placeholder screens (`BlankPage.jsx`) ready for the next round of work.
Dashboard has KPI cards wired to the mock/API data plus a placeholder block
for charts/activity.

## Notes / next steps

- Add/Edit/Delete actions in the table are stubbed (delete shows a
  `window.alert`) — wire these up to your backend.
- The "Logout" button currently just navigates to `/login`; hook up real
  auth there.
- `useApiData`'s `refetch()` is available from every page (`Members`,
  `Volunteers`, `Donations`, `RecordProfile`) if you want to add manual
  refresh buttons later.
