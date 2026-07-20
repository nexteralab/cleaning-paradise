// Augments the Wrangler-generated CloudflareEnv with bindings + secrets the
// generated file doesn't know about (secrets aren't in wrangler.jsonc).
interface CloudflareEnv {
	DB: D1Database;
	BUCKET: R2Bucket;
	ADMIN_PASSWORD: string;
	AUTH_SECRET: string;
	// Resend transactional email (optional — email is skipped if unset).
	RESEND_API_KEY?: string;
	EMAIL_FROM?: string;
	LEAD_NOTIFY_TO?: string;
}
