-- Plugin `admin` de Better Auth (gestión de usuarios desde el panel).
-- Columnas que el plugin espera; nullable, sin backfill.
ALTER TABLE `user` ADD `banned` integer DEFAULT false;
ALTER TABLE `user` ADD `ban_reason` text;
ALTER TABLE `user` ADD `ban_expires` integer;
ALTER TABLE `session` ADD `impersonated_by` text;
