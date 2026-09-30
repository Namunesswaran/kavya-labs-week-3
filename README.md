# Kavya Labs

An AI ops-copilot landing page with Google OAuth sign-in, built with Next.js 14 and Tailwind CSS.

Kavya Labs is a fictional Bengaluru AI startup (from the ANDP Simulator's virtual
startup brief) that automates operations triage — routing requests, answering
repetitive questions from a team's own playbooks, and generating live reports.
This repo covers all 3 weeks of the build: the marketing site, the authentication
flow, and the admin dashboard.

## Tech stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — custom color tokens and font pairing (Fraunces + IBM Plex Sans)
- **NextAuth.js** — Google OAuth, JWT sessions

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from
  [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
  Create an OAuth Client ID (type: Web application) and add
  `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

Then:
```bash
npm run dev
```
Open http://localhost:3000.

## What's here

**Week 1 — Landing page**
```
app/page.jsx              — assembles Header, Hero, Features, contact section, Footer
components/Header.jsx     — nav + mobile hamburger menu + auth button
components/Hero.jsx       — headline, CTAs, SVG illustration
components/Features.jsx   — auto-triage / playbook memory / live reporting
components/ContactForm.jsx — working form → POST /api/contact (logs to console;
                              swap in Resend/SendGrid when ready)
components/Footer.jsx
```

**Week 2 — Auth (NextAuth + Google OAuth)**
```
app/api/auth/[...nextauth]/route.js — NextAuth config, Google provider, JWT sessions
app/providers.jsx          — SessionProvider wrapper (client component)
app/signin/page.jsx         — custom sign-in screen, matches the site's design tokens
components/Header.jsx       — shows "Sign in" or "Sign out" + avatar depending on session
```

`session.user` (name, email, image, id) is available anywhere via `useSession()`.

**Week 3 — Admin dashboard (user management + analytics)**
```
app/dashboard/layout.jsx           — server-side auth guard: no session → redirect to /signin
app/dashboard/page.jsx              — overview: stat tiles, requests-per-day chart, status breakdown
app/dashboard/users/page.jsx        — team member table
components/dashboard/DashboardNav.jsx    — sidebar (desktop) / compact bar (mobile), sign out
components/dashboard/StatTile.jsx        — single-number KPI card
components/dashboard/RequestsChart.jsx   — line chart with hover crosshair + tooltip (inline SVG)
components/dashboard/StatusBreakdown.jsx — resolved/pending/escalated bars, status colors + icons
components/dashboard/UsersTable.jsx      — search, role dropdown, suspend/reinstate (local state only)
lib/mock-data.js                          — mock users + request volume; swap for real queries later
```

The dashboard is gated server-side in `app/dashboard/layout.jsx` via `getServerSession` —
visiting `/dashboard` while signed out redirects straight to `/signin?callbackUrl=/dashboard`,
so you land back on the dashboard right after signing in.

**Note:** `lib/mock-data.js` is placeholder data — there's no database yet. The users
table's role changes and suspend/reinstate actions are local UI state only and reset
on refresh. Swap `MOCK_USERS` and `REQUEST_VOLUME` for real queries (e.g. from Postgres,
a request-tracking table) when that's ready; the components don't need to change, just
what feeds them.

The chart colors (`#C4821F` amber, `#8B7CF0` violet, `#3AA87F` green for status-good)
are deliberately slightly different from the UI's `#E8A33D` accent — they're tuned to
pass colorblind-safe contrast checks specifically for small chart marks on a dark
background, which needs darker/more saturated values than a large UI button.

## Design notes

Color palette: deep aubergine background (`#1C1A22`), amber accent (`#E8A33D`), violet
accent (`#6E56CF`) — chosen to avoid the generic cream/terracotta and neon-on-black
looks common in AI-generated designs. Typography pairs a serif display face (Fraunces)
with a technical sans body face (IBM Plex Sans).

## Known issue

`npm audit` flags Next.js/PostCSS advisories concerning self-hosted server deployments
(Image Optimizer, Server Actions, custom servers). Not relevant to a static Vercel
deployment of this site, but worth an `npm audit fix` pass before any real production use.

## Assumption

The brief didn't specify what Kavya Labs' product does. Copy is written around an
AI ops-triage copilot. Swap `components/Hero.jsx` and `components/Features.jsx` copy
if the real product differs.

## Roadmap

- Connect a real database (Postgres, etc.) and swap `lib/mock-data.js` for actual queries.
- Role-based access control — right now any signed-in Google account reaches
  `/dashboard`; there's no check that they're actually an admin.
- Wire the contact form (`app/api/contact/route.js`) to an email service instead of
  just logging to the console.
