// Augments the Wrangler-generated CloudflareEnv with bindings + secrets the
// generated file doesn't know about (secrets aren't in wrangler.jsonc).
interface CloudflareEnv {
	BUCKET: R2Bucket;
	// Firma de la cookie de sesión (ver src/lib/auth.ts) — secret del Worker.
	AUTH_SECRET?: string;
	// Resend transactional email (optional — email is skipped if unset).
	RESEND_API_KEY?: string;
	EMAIL_FROM?: string;
	LEAD_NOTIFY_TO?: string;
}
