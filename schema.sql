-- Cleaning Paradise CMS — leads table.
-- Apply:  wrangler d1 execute cleaning-paradise-db --remote --file=./schema.sql
--         wrangler d1 execute cleaning-paradise-db --local  --file=./schema.sql   (for `wrangler dev`)
CREATE TABLE IF NOT EXISTS leads (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name TEXT NOT NULL,
	last_name TEXT,
	email TEXT NOT NULL,
	phone TEXT,
	street TEXT,
	unit TEXT,
	city TEXT,
	zip TEXT,
	services TEXT,          -- JSON array of selected services
	service TEXT,           -- single service (from a service page quote form)
	date TEXT,
	time TEXT,
	frequency TEXT,
	notes TEXT,
	promo INTEGER NOT NULL DEFAULT 0,
	source TEXT NOT NULL DEFAULT 'contact',
	status TEXT NOT NULL DEFAULT 'new',   -- new | contacted | won | lost
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
