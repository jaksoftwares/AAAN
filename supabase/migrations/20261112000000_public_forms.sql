-- AAAN website, Phase 1: form submissions.
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query > paste > Run).
-- Safe to re-run: every statement uses "if not exists" or "create or replace".

-- ---------------------------------------------------------------------------
-- Enquiries: quote requests, partnership, investor, media, careers, general.
-- ---------------------------------------------------------------------------
create table if not exists public.enquiries (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  type                 text not null check (type in ('quote', 'partnership', 'investor', 'media', 'careers', 'general')),
  lang                 text not null default 'en' check (lang in ('en', 'fr')),
  name                 text not null,
  email                text not null,
  phone                text,
  company              text,
  country              text,
  crop                 text,
  product              text,
  quantity             text,
  unit                 text,
  destination          text,
  delivery_period      text,
  message              text not null,
  consent_text_version text not null,
  consent_at           timestamptz not null,
  routed_to            text not null,
  status               text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  source_page          text,
  user_agent           text
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status, routed_to);

-- ---------------------------------------------------------------------------
-- Farmer and cooperative sign-ups.
-- ---------------------------------------------------------------------------
create table if not exists public.farmer_signups (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  full_name            text not null,
  phone                text not null,
  country              text not null check (country in ('Kenya', 'Ghana', 'Côte d''Ivoire')),
  hub                  text not null,
  crops                text[] not null default '{}',
  farm_size            text not null,
  farm_unit            text not null check (farm_unit in ('acres', 'hectares')),
  cooperative_member   boolean not null,
  consent_text_version text not null,
  consent_at           timestamptz not null,
  routed_to            text not null,
  status               text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  source_page          text,
  user_agent           text
);

create index if not exists farmer_signups_created_at_idx on public.farmer_signups (created_at desc);
create index if not exists farmer_signups_country_idx on public.farmer_signups (country, status);

-- ---------------------------------------------------------------------------
-- Newsletter subscribers. One row per address.
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  email                text not null unique,
  lang                 text not null default 'en' check (lang in ('en', 'fr')),
  consent_text_version text not null,
  consent_at           timestamptz not null,
  status               text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed'))
);

-- ---------------------------------------------------------------------------
-- Security: the public website never reads or writes these tables directly.
-- All writes go through the website's server (service-role key), which bypasses RLS.
-- Row-level security is switched on, and no policies are created, so the anon and
-- authenticated roles have no access at all.
-- ---------------------------------------------------------------------------
alter table public.enquiries enable row level security;
alter table public.farmer_signups enable row level security;
alter table public.newsletter_subscribers enable row level security;

revoke all on table public.enquiries from anon, authenticated;
revoke all on table public.farmer_signups from anon, authenticated;
revoke all on table public.newsletter_subscribers from anon, authenticated;
