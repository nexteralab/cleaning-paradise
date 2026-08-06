// Sesión del admin: cookie firmada con HMAC-SHA256 (WebCrypto, sin dependencias).
// Las credenciales viven en la tabla `users` (PBKDF2); acá solo se firma y se
// verifica la sesión con AUTH_SECRET.
//
// AUTH_SECRET entra por parámetro: en `next dev` vive en el env de Cloudflare
// (getCloudflareContext), no en process.env.

export const SESSION_COOKIE = "cp_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

async function hmac(secret: string, data: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
	return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Double HMAC: compara digests, no los valores — el timing del === no filtra
// nada sobre el secreto porque el atacante no puede invertir el digest.
async function eq(secret: string, a: string, b: string): Promise<boolean> {
	return (await hmac(secret, `cmp:${a}`)) === (await hmac(secret, `cmp:${b}`));
}

// La cookie lleva el id del usuario: <uid>.<exp>.<firma>. Así el server sabe
// quién es sin ir a la DB (los ids son hex, nunca traen puntos).
export async function createSession(secret: string, userId: string): Promise<string> {
	const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
	return `${userId}.${exp}.${await hmac(secret, `${userId}.${exp}`)}`;
}

// Devuelve el id del usuario, o null si la cookie no sirve.
export async function verifySession(
	secret: string | undefined,
	value: string | undefined,
): Promise<string | null> {
	if (!secret || !value) return null;
	const [uid, exp, sig] = value.split(".");
	if (!uid || !exp || !sig || !Number(exp) || Number(exp) < Date.now()) return null;
	return (await eq(secret, sig, await hmac(secret, `${uid}.${exp}`))) ? uid : null;
}

// --- users.password_hash --------------------------------------------------
// PBKDF2-SHA256 (bcrypt/argon no corren en Workers). Formato:
//   pbkdf2$<iteraciones>$<salt_hex>$<hash_hex>

const PBKDF2_ITERATIONS = 100_000;

const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
const unhex = (s: string) => Uint8Array.from(s.match(/../g) ?? [], (h) => parseInt(h, 16));

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<string> {
	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(password),
		"PBKDF2",
		false,
		["deriveBits"],
	);
	const bits = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
		key,
		256,
	);
	return hex(new Uint8Array(bits));
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
	return `pbkdf2$${PBKDF2_ITERATIONS}$${hex(salt)}$${hash}`;
}

export async function verifyPassword(stored: string, input: string): Promise<boolean> {
	const [scheme, iterations, salt, hash] = stored.split("$");
	if (scheme !== "pbkdf2" || !Number(iterations) || !salt || !hash) return false;
	// Digests hex de largo fijo: el === no filtra nada del password.
	return (await pbkdf2(input, unhex(salt), Number(iterations))) === hash;
}
