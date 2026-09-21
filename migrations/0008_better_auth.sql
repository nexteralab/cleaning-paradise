-- Better Auth (ver src/lib/auth.ts). Esquema núcleo: user, session, account,
-- verification. Timestamps en epoch segundos (drizzle mode:'timestamp').
--
-- Migra `users` → `user` + `account`. El hash PBKDF2 viejo se copia tal cual a
-- account.password: src/lib/auth.ts lo sigue aceptando y Better Auth lo
-- reemplaza por scrypt en el próximo cambio de contraseña. Nadie pierde acceso.
--
-- Altas nuevas: node scripts/create-admin.mjs <email> <password> "<Nombre>" [--remote]

CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`role` text DEFAULT 'user' NOT NULL,
	`last_login_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);

CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);

CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);

INSERT INTO `user` (id, name, email, email_verified, role, last_login_at, created_at, updated_at)
SELECT id, COALESCE(name, email), email, 1, role,
	CAST(strftime('%s', last_login_at) AS INTEGER),
	CAST(strftime('%s', created_at) AS INTEGER),
	CAST(strftime('%s', created_at) AS INTEGER)
FROM users;

INSERT INTO `account` (id, account_id, provider_id, user_id, password, created_at, updated_at)
SELECT lower(hex(randomblob(16))), id, 'credential', id, password_hash,
	CAST(strftime('%s', created_at) AS INTEGER),
	CAST(strftime('%s', created_at) AS INTEGER)
FROM users;

DROP TABLE users;
