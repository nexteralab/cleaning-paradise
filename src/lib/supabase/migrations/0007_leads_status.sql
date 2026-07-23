-- Migración 0007 — Ejecutar una vez en Supabase → SQL Editor.
-- El admin ahora gestiona el status del lead desde Supabase (antes vivía en D1).

alter table public.leads add column status text not null default 'new';
