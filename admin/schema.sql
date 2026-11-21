-- ═══════════════════════════════════════════════════════════
--  Aya Core Studios — CMS Admin
--  schema.sql  —  Run this once in your Supabase SQL editor
-- ═══════════════════════════════════════════════════════════
--
--  After running this:
--  1. Go to Storage → Create bucket → name it "gallery" → public: ON
--  2. Go to Authentication → Users → Invite user (lodge owner's email)
-- ═══════════════════════════════════════════════════════════

-- ── ROOMS ──────────────────────────────────────────────────
create table if not exists rooms (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  specs       jsonb not null default '[]',   -- ["Sleeps 2","16 m²","Double bed"]
  amenities   jsonb not null default '[]',   -- [{"icon":"wifi","text":"Free Wi-Fi"}]
  price       text not null,                 -- "R700"
  image_url   text,                          -- Supabase Storage public URL
  select_key  text not null,                 -- pre-fill text for booking form
  sort_order  int  not null default 0,
  active      boolean not null default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── GALLERY ────────────────────────────────────────────────
create table if not exists gallery (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,                 -- Supabase Storage public URL
  alt         text not null,
  caption     text not null,
  in_mosaic   boolean not null default true, -- show in front-page grid?
  sort_order  int  not null default 0,
  created_at  timestamptz default now()
);

-- ── INQUIRIES ──────────────────────────────────────────────
-- Received WhatsApp/email booking inquiries logged here
create table if not exists inquiries (
  id          uuid primary key default gen_random_uuid(),
  guest_name  text not null,
  phone       text,
  email       text,
  check_in    date,
  check_out   date,
  adults      int  default 2,
  children    int  default 0,
  room_pref   text,
  message     text,
  status      text not null default 'new',   -- 'new' | 'contacted' | 'confirmed' | 'cancelled'
  source      text default 'whatsapp',       -- 'whatsapp' | 'email' | 'walk-in'
  notes       text,                          -- internal staff notes
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── SETTINGS ──────────────────────────────────────────────
-- Key/value store for site-wide settings the owner can update
create table if not exists settings (
  key         text primary key,
  value       text not null,
  label       text,                          -- human-readable label for the admin UI
  updated_at  timestamptz default now()
);

-- Seed default settings
insert into settings (key, value, label) values
  ('checkin_time',  '14:00', 'Check-in time'),
  ('checkout_time', '10:00', 'Check-out time'),
  ('phone1',        '072 570 3772', 'Primary phone / WhatsApp'),
  ('phone2',        '071 414 7919', 'Secondary phone'),
  ('email',         'nonesilodge@gmail.com', 'Email address'),
  ('address',       '24 Komani Street, Southbourne, Komani (Queenstown), 5320', 'Full address')
on conflict (key) do nothing;

-- ── ROW LEVEL SECURITY ─────────────────────────────────────
-- Only authenticated users (lodge staff) can read/write
alter table rooms     enable row level security;
alter table gallery   enable row level security;
alter table inquiries enable row level security;
alter table settings  enable row level security;

create policy "Authenticated users only" on rooms     for all using (auth.role() = 'authenticated');
create policy "Authenticated users only" on gallery   for all using (auth.role() = 'authenticated');
create policy "Authenticated users only" on inquiries for all using (auth.role() = 'authenticated');
create policy "Authenticated users only" on settings  for all using (auth.role() = 'authenticated');

-- ── UPDATED_AT TRIGGER ────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger rooms_updated_at     before update on rooms     for each row execute procedure set_updated_at();
create trigger inquiries_updated_at before update on inquiries for each row execute procedure set_updated_at();
create trigger settings_updated_at  before update on settings  for each row execute procedure set_updated_at();
