-- Migración 0001 — YA EJECUTADA en producción (tabla leads). No repetir.
-- Ejecutar una vez en Supabase → SQL Editor.
-- Tabla espejo de leads (la fuente de verdad sigue siendo D1).

create table public.leads (
	id bigint generated always as identity primary key,
	created_at timestamptz not null default now(),
	first_name text not null,
	last_name text,
	email text not null,
	phone text,
	street text,
	unit text,
	city text,
	zip text,
	services jsonb not null default '[]',
	service text,
	date text,
	time text,
	frequency text,
	sqft text,
	pets text,
	notes text,
	promo boolean not null default false,
	source text not null default 'contact'
);

-- RLS activado SIN policies públicas: solo la service role key (el Worker)
-- puede leer/escribir. El equipo ve los leads desde el dashboard de Supabase.
alter table public.leads enable row level security;
