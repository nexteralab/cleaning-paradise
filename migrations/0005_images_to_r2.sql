-- Las imágenes del blog pasaron de Supabase Storage a R2 (prefijo blog/),
-- servidas por /img/<name>. Reescribe covers y las incrustadas en el markdown.

UPDATE posts SET
	cover_url = REPLACE(cover_url, 'https://hzltqqipoimexejgcpuo.supabase.co/storage/v1/object/public/blog/', '/img/'),
	content   = REPLACE(content, 'https://hzltqqipoimexejgcpuo.supabase.co/storage/v1/object/public/blog/', '/img/');
