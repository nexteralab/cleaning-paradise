# CMS Setup — Leads & Storage (`/admin`)

Private CMS built into the Next.js app (runs on Cloudflare via `@opennextjs/cloudflare`).
No separate Worker. The code is already committed; this doc is the **setup checklist to
activate it** (provisioning needs your Cloudflare account).

## Stack

| Need | Service | Notes |
|------|---------|-------|
| Store contact leads | **D1** (SQLite) | binding `DB` |
| File / image storage | **R2** | binding `BUCKET` |
| Protect `/admin` | Password + HMAC-signed cookie | secrets `ADMIN_PASSWORD`, `AUTH_SECRET` |
| API + admin UI | Next.js route handlers + `/admin` | same app |

**Not used (on purpose):** Durable Objects and KV — unnecessary for CRUD leads (YAGNI).

## Setup steps (run these — needs your Cloudflare login)

```bash
# 1. Create the D1 database → copy the printed database_id into wrangler.jsonc
#    (replace REPLACE_WITH_D1_DATABASE_ID)
npx wrangler d1 create cleaning-paradise-db

# 2. Apply the schema (remote = production, local = for `next dev`/wrangler dev)
npx wrangler d1 execute cleaning-paradise-db --remote --file=./schema.sql
npx wrangler d1 execute cleaning-paradise-db --local  --file=./schema.sql

# 3. Create the R2 bucket
npx wrangler r2 bucket create cleaning-paradise-files

# 4. Set production secrets (use long random strings)
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put AUTH_SECRET

# 5. Deploy
npm run deploy
```

## Local development

1. Edit `ADMIN_PASSWORD` / `AUTH_SECRET` in `.dev.vars` (git-ignored).
2. Make sure step 2's `--local` schema was applied.
3. `npm run dev` → open `/admin` → log in with the local password.

Bindings work in `next dev` because `next.config.ts` calls `initOpenNextCloudflareForDev()`.

## Files

| File | Purpose |
|------|---------|
| `schema.sql` | `leads` table |
| `wrangler.jsonc` | D1 + R2 bindings (⚠️ `database_id` placeholder to fill in step 1) |
| `.dev.vars` | local secrets |
| `src/cf-env.d.ts` | TS types for bindings + secrets |
| `src/lib/auth.ts` | HMAC session sign/verify, constant-time compare |
| `src/middleware.ts` | gates `/admin` + `/api/admin/*` (login public) |
| `src/app/api/contact/route.ts` | public — creates a lead |
| `src/app/api/admin/login/route.ts` | login (POST) / logout (DELETE) |
| `src/app/api/admin/leads/route.ts` | update status (PATCH) / delete (DELETE) |
| `src/app/api/admin/files/route.ts` | R2 list / upload / download / delete |
| `src/app/admin/login/page.tsx` | login screen |
| `src/app/admin/page.tsx` + `AdminDashboard.tsx` | dashboard (leads + storage) |
| `ContactForm.tsx` | now POSTs to `/api/contact` |
| `Navbar.tsx` / `Footer.tsx` | hidden on `/admin` |

## How auth works

- Login POSTs the password; compared constant-time against `ADMIN_PASSWORD`.
- On success, sets an HttpOnly, Secure, SameSite=Lax cookie `cp_admin` =
  `<exp>.<HMAC-SHA256(exp, AUTH_SECRET)>`, valid 8h.
- Middleware verifies the signature + expiry on every `/admin` and `/api/admin` request.
- Upgrade path: swap for **Better-Auth** (D1 adapter) only if you need multiple
  accounts/roles. Or put **Cloudflare Access** in front of `/admin` for zero-code SSO.

## Data model (`leads`)

`id, first_name, last_name, email, phone, street, unit, city, zip, services (JSON),
service, date, time, frequency, notes, promo, source, status, created_at`

`status`: `new | contacted | won | lost` · `source`: `contact` (or `service:<slug>` once wired).

## Pending / optional

- **Wire the service-page QuoteForm** to `/api/contact` with `source: "service:<slug>"`
  (currently only `/contact` saves leads). ~15 lines, same pattern.
- **New-lead email notification**: Cloudflare Email Routing only *receives*. To *send*,
  add Resend/Postmark (or MailChannels with a verified domain) in `/api/contact`.
