// Augments the Wrangler-generated CloudflareEnv with bindings + secrets the
// generated file doesn't know about (secrets aren't in wrangler.jsonc).
interface CloudflareEnv {
	DB: D1Database;
	BUCKET: R2Bucket;
	ADMIN_PASSWORD: string;
	AUTH_SECRET: string;
}
