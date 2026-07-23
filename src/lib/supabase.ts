// Thin Supabase (PostgREST) wrapper — same pattern as lib/email/send.ts:
// plain fetch, no SDK dependency, runs cleanly on Cloudflare Workers.
// All calls use the service role key (server-only); RLS has no public policies.

function creds(env: CloudflareEnv): { url: string; key: string } | null {
	const url = env.SUPABASE_URL;
	const key = env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !key) {
		// Supabase is optional — a missing key must never break the caller.
		console.warn("[supabase] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — skipping");
		return null;
	}
	return { url, key };
}

function headers(key: string): Record<string, string> {
	return {
		apikey: key,
		Authorization: `Bearer ${key}`,
		"Content-Type": "application/json",
	};
}

async function logError(op: string, table: string, res: Response): Promise<void> {
	const detail = await res.text().catch(() => "");
	console.error(`[supabase] ${op} ${table} ${res.status}: ${detail}`);
}

export async function supabaseInsert(
	env: CloudflareEnv,
	table: string,
	row: Record<string, unknown>,
): Promise<boolean> {
	const c = creds(env);
	if (!c) return false;
	const res = await fetch(`${c.url}/rest/v1/${table}`, {
		method: "POST",
		headers: { ...headers(c.key), Prefer: "return=minimal" },
		body: JSON.stringify(row),
	});
	if (!res.ok) {
		await logError("insert", table, res);
		return false;
	}
	return true;
}

// `query` is a raw PostgREST query string, e.g. "select=*&published=eq.true&order=published_at.desc"
export async function supabaseSelect<T>(
	env: CloudflareEnv,
	table: string,
	query = "select=*",
): Promise<T[]> {
	const c = creds(env);
	if (!c) return [];
	const res = await fetch(`${c.url}/rest/v1/${table}?${query}`, { headers: headers(c.key) });
	if (!res.ok) {
		await logError("select", table, res);
		return [];
	}
	return (await res.json()) as T[];
}

// `match` is a PostgREST filter string, e.g. "id=eq.123"
export async function supabaseUpdate(
	env: CloudflareEnv,
	table: string,
	match: string,
	row: Record<string, unknown>,
): Promise<boolean> {
	const c = creds(env);
	if (!c) return false;
	const res = await fetch(`${c.url}/rest/v1/${table}?${match}`, {
		method: "PATCH",
		headers: { ...headers(c.key), Prefer: "return=minimal" },
		body: JSON.stringify(row),
	});
	if (!res.ok) {
		await logError("update", table, res);
		return false;
	}
	return true;
}

export async function supabaseDelete(
	env: CloudflareEnv,
	table: string,
	match: string,
): Promise<boolean> {
	const c = creds(env);
	if (!c) return false;
	const res = await fetch(`${c.url}/rest/v1/${table}?${match}`, {
		method: "DELETE",
		headers: headers(c.key),
	});
	if (!res.ok) {
		await logError("delete", table, res);
		return false;
	}
	return true;
}
