-- /img/ ya es la carpeta estática de public/img (52 archivos), así que la ruta
-- que sirve R2 se movió a /blog-img/. Todas las URLs /img/17858… son de R2.

UPDATE posts SET
	cover_url = REPLACE(cover_url, '/img/17858', '/blog-img/17858'),
	content   = REPLACE(content, '/img/17858', '/blog-img/17858');
