-- Leads de los formularios de contacto/cotización. Equivalente SQLite de la
-- tabla `leads` de Supabase. services: JSON array en TEXT. promo: 0/1.

CREATE TABLE leads (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
	first_name TEXT NOT NULL,
	last_name TEXT,
	email TEXT NOT NULL,
	phone TEXT,
	street TEXT,
	unit TEXT,
	city TEXT,
	zip TEXT,
	services TEXT NOT NULL DEFAULT '[]',
	service TEXT,
	date TEXT,
	time TEXT,
	frequency TEXT,
	sqft TEXT,
	pets TEXT,
	notes TEXT,
	promo INTEGER NOT NULL DEFAULT 0,
	source TEXT NOT NULL DEFAULT 'contact',
	status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX leads_created_idx ON leads (created_at DESC);
