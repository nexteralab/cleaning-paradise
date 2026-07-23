// Augments the Wrangler-generated CloudflareEnv with bindings + secrets the
// generated file doesn't know about (secrets aren't in wrangler.jsonc).
interface CloudflareEnv {
	BUCKET: R2Bucket;
	// Supabase (optional — mirror of leads is skipped if unset).
	SUPABASE_URL?: string;
	SUPABASE_SERVICE_ROLE_KEY?: string;
	// Resend transactional email (optional — email is skipped if unset).
	RESEND_API_KEY?: string;
	EMAIL_FROM?: string;
	LEAD_NOTIFY_TO?: string;
}
