-- Blog posts. Equivalente SQLite de la tabla `posts` de Supabase.
-- tags: JSON array en TEXT (SQLite no tiene arrays). published: 0/1.
-- fechas: TEXT ISO-8601 en UTC.

CREATE TABLE posts (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	slug TEXT NOT NULL UNIQUE,
	kicker TEXT NOT NULL DEFAULT '',
	category TEXT NOT NULL DEFAULT '',
	accent TEXT NOT NULL DEFAULT 'pink' CHECK (accent IN ('pink', 'blue')),
	excerpt TEXT NOT NULL DEFAULT '',
	lead TEXT NOT NULL DEFAULT '',
	content TEXT NOT NULL DEFAULT '',
	cover_url TEXT,
	author TEXT NOT NULL DEFAULT 'Cleaning Paradise Team',
	tags TEXT NOT NULL DEFAULT '[]',
	meta_title TEXT,
	meta_description TEXT,
	read_time_minutes INTEGER,
	published INTEGER NOT NULL DEFAULT 0,
	published_at TEXT,
	created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
	updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX posts_published_idx ON posts (published, published_at DESC);
