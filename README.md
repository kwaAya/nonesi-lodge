# Nonesi Lodge — Website & Admin Portal

A static lodge website with an admin portal built on plain HTML/CSS/JS, backed by localStorage for the demo and Supabase for the live version.

---

## Project structure

```
/                    Main lodge website (index.html, css/, images/)
admin/               Admin portal pages
  js/
    admin-shell.js   Shared CSS, sidebar, demo banner, toast — injected on every inner page
    demo-data.js     Seed data + DemoData CRUD helpers (localStorage)
    supabase.js      Supabase client, authGuard scaffold, credentials
  login.html         Standalone login page (split-screen, no shell)
  index.html         Dashboard
  rooms.html         Room management (card grid)
  gallery.html       Photo gallery management
  inquiries.html     Guest inquiry management
  settings.html      Lodge settings
```

---

## Running locally

Open any `.html` file directly in a browser. No build step required.

---

## Deployment checklist (before going live with Supabase auth)

1. **Move the Supabase anon key to an environment variable.**
   `admin/js/supabase.js` currently has `SUPABASE_ANON_KEY` hardcoded. Because it's a publishable anon key (Supabase RLS enforces data access), live browser exposure is intentionally safe — but best practice before production is to inject it via your host's environment (e.g. a Vercel environment variable read at build time, or a server-generated config snippet).

2. **Wire up `signOut()` in `admin-shell.js`.**
   The sidebar sign-out button calls `shellSignOut()` (defined in `admin-shell.js`), which currently only redirects to `login.html`. When `supabase.js` is activated, replace the body of `shellSignOut()` with a call to `supabase.js`'s `signOut()` so the Supabase session is properly terminated before the redirect.

3. **Enable Row Level Security** on all Supabase tables before switching `authGuard()` to enforce authentication.

4. **Update the email invitation redirect URL** in the Supabase dashboard (Auth → URL Configuration → Site URL) to the production domain so invite links don't point to `localhost`.

---

## Tech stack

- HTML / CSS / Vanilla JS (no framework, no build step)
- [Supabase](https://supabase.com) — auth + database (scaffolded, not yet active)
- Google Fonts: Cormorant Garamond + Plus Jakarta Sans
- Hosted on Vercel (or any static host)

---

*Built by [Aya Core Studios](https://ayacore.studio)*
