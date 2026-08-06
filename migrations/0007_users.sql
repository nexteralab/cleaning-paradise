-- Usuarios del admin — única fuente de verdad del login. Sin fila acá, nadie
-- entra: no hay password de emergencia ni fallback.
--
-- Las altas NO van como migración: un hash de credencial no se commitea.
-- Se corren a mano con `npm run db` / `npm run db:prod` (ver abajo).
--
-- password_hash: PBKDF2-SHA256, formato  pbkdf2$<iters>$<salt_hex>$<hash_hex>
-- (bcrypt/argon no corren en Workers). Generar el hash:
--
--   node -e 'const p=process.argv[1],s=crypto.getRandomValues(new Uint8Array(16)),h=x=>[...x].map(b=>b.toString(16).padStart(2,"0")).join("");crypto.subtle.importKey("raw",new TextEncoder().encode(p),"PBKDF2",false,["deriveBits"]).then(k=>crypto.subtle.deriveBits({name:"PBKDF2",salt:s,iterations:100000,hash:"SHA-256"},k,256)).then(b=>console.log(`pbkdf2$100000$${h(s)}$${h(new Uint8Array(b))}`))' 'el-password'
--
-- Y el alta (ojo: en producción va con `npm run db:prod -- --command "..."`):
--
--   INSERT INTO users (id, email, password_hash, name) VALUES (
--     lower(hex(randomblob(16))),
--     'persona@ejemplo.com',
--     'pbkdf2$100000$…$…',
--     'Nombre'
--   );

CREATE TABLE users (
	id TEXT PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	password_hash TEXT NOT NULL,
	name TEXT,
	role TEXT NOT NULL DEFAULT 'admin',
	created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
	last_login_at TEXT
);
