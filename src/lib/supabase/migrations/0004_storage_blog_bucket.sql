-- Migración 0004 — bucket público "blog" para imágenes del blog
-- (covers e imágenes del editor). Subida desde el admin con sesión
-- Supabase Auth; lectura pública vía CDN de Supabase.

insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;

create policy "Public read blog images"
	on storage.objects for select
	using (bucket_id = 'blog');

create policy "Auth upload blog images"
	on storage.objects for insert
	to authenticated
	with check (bucket_id = 'blog');

create policy "Auth delete blog images"
	on storage.objects for delete
	to authenticated
	using (bucket_id = 'blog');
