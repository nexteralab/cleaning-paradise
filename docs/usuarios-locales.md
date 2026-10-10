# Usuarios del admin

Usuarios que existen hoy en la base **local** de desarrollo (`.wrangler/state`).
Todos tienen rol `admin` y ninguno está bloqueado. Las contraseñas de los usuarios
anteriores no se pueden recuperar (en la base solo hay hash); para entrar en local usar
`admin@local.test`. Son claves de la base local, nunca de producción.

| Email | Nombre | Clave | Para qué | Creado (UTC) | Último login (UTC) |
| --- | --- | --- | --- | --- | --- |
| nexteralab@gmail.com | Nextera Lab | (no recuperable) | Cuenta del equipo | 2026-08-06 | 2026-08-06 |
| dev@local.test | Dev Local | (no recuperable) | Pruebas | 2026-09-14 | 2026-09-14 |
| test@local.test | Test Renamed | (no recuperable) | Pruebas | 2026-09-21 | 2026-09-21 |
| juan@local.test | Juan Local | (no recuperable) | Pruebas | 2026-09-26 | 2026-09-26 |
| admin@local.test | Admin Local | `CP-aDu1CtW2DMx3` | Admin principal en local | 2026-10-10 | — |

Producción: pendiente de listar (`npm run db:prod -- --command "SELECT email, name, role FROM user"`).

Al crear o borrar un usuario, actualizar esta tabla.

---

Referencia rápida:

- Crear: `node scripts/create-admin.mjs <email> <password> "<Nombre>"` (agregar `--remote` para producción).
- Listar: `npm run db -- --command "SELECT email, name, role FROM user"` (`db:prod` para producción).
- Contraseña olvidada: no se recupera; se cambia desde `/admin/profile` o `/admin/reset-password`, o se recrea el usuario.
