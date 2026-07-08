// Passwordless-dependency admin auth: an HMAC-signed, HttpOnly session cookie.
// ponytail: single shared password + signed cookie. Swap for Better-Auth if you
// ever need multiple accounts/roles.

export const COOKIE_NAME = "cp_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

const enc = new TextEncoder();

async function hmacHex(secret: string, data: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		"raw",
		enc.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
	return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time string compare (equal length) to avoid timing leaks. */
export function timingSafeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let out = 0;
	for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return out === 0;
}

/** Returns the cookie value for a fresh session. */
export async function signSession(secret: string): Promise<{ value: string; maxAge: number }> {
	const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
	const sig = await hmacHex(secret, String(exp));
	return { value: `${exp}.${sig}`, maxAge: MAX_AGE };
}

/** Verifies a session cookie: signature valid AND not expired. */
export async function verifySession(token: string | undefined, secret: string): Promise<boolean> {
	if (!token || !secret) return false;
	const dot = token.indexOf(".");
	if (dot < 1) return false;
	const exp = token.slice(0, dot);
	const sig = token.slice(dot + 1);
	if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
	const expected = await hmacHex(secret, exp);
	return timingSafeEqual(sig, expected);
}
