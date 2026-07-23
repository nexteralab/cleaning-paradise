-- ============================================================
-- BLOG — tabla posts (modelo basado en app-demo posts.schema.ts
-- + campos de diseño propios: kicker, category, accent, lead).
-- Ejecutar una vez en Supabase → SQL Editor.
-- ============================================================

create table public.posts (
	id uuid primary key default gen_random_uuid(),
	title text not null,
	slug text not null unique,
	kicker text not null default '',
	category text not null default '',
	accent text not null default 'pink' check (accent in ('pink', 'blue')),
	excerpt text not null default '',
	lead text not null default '',
	content text not null default '', -- markdown
	cover_url text,
	author text not null default 'Cleaning Paradise Team',
	tags text[] not null default '{}',
	meta_title text,
	meta_description text,
	read_time_minutes integer,
	published boolean not null default false,
	published_at timestamptz,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;
