-- Migración 0005 — elimina los 5 posts placeholder del seed original
-- (tenían content vacío; solo queda el artículo completo de spring cleaning).
-- Ejecutar en Supabase → SQL Editor.

delete from public.posts
where slug in (
	'green-cleaning-products-that-actually-work',
	'cleaning-seattles-historic-homes',
	'move-in-cleaning-checklist-for-new-homes',
	'allergen-free-home-a-complete-guide',
	'why-your-office-needs-professional-cleaning'
)
and content = '';
