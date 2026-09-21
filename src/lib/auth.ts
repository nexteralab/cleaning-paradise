// Better Auth sobre D1 (drizzle adapter), igual que app-demo. Credenciales en
// `account` (provider_id = 'credential'), sesión en `session`, cookie firmada
// por Better Auth con AUTH_SECRET. Nadie del proyecto hashea ni compara.
//
// La instancia se crea perezosa porque en `next dev` el env de Cloudflare
// llega por getCloudflareContext, no en import time.
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { hashPassword, verifyPassword } from "better-auth/crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as authSchema from "@/db/auth.schema";
import { sendEmail } from "@/lib/email/send";
import { resetPassword } from "@/lib/email/templates/resetPassword";

// ponytail: puente para los hashes previos a la migración 0008
// (pbkdf2$<iters>$<salt_hex>$<hash_hex>). Better Auth rehashea con scrypt al
// cambiar la contraseña; cuando ningún `account.password` empiece por
// "pbkdf2$" se borra esto y queda `verifyPassword` a secas.
async function verifyLegacyPbkdf2(stored: string, password: string): Promise<boolean> {
	const [, iterations, saltHex, hashHex] = stored.split("$");
	const salt = Uint8Array.from(saltHex.match(/../g) ?? [], (h) => parseInt(h, 16));
	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(password),
		"PBKDF2",
		false,
		["deriveBits"],
	);
	const bits = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations: Number(iterations), hash: "SHA-256" },
		key,
		256,
	);
	const hex = [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
	return hex === hashHex;
}

function build(env: CloudflareEnv) {
	const db = drizzle(env.DB, { schema: authSchema });
	return betterAuth({
		database: drizzleAdapter(db, { provider: "sqlite", schema: authSchema }),
		// Sin signup público — los usuarios los crea un admin desde /admin/users
		// (plugin admin) o con scripts/create-admin.mjs.
		emailAndPassword: {
			enabled: true,
			disableSignUp: true,
			// Invitaciones y "olvidé mi clave" usan el mismo link de reset.
			// 24h para que una invitación no caduque antes de que la abran.
			resetPasswordTokenExpiresIn: 60 * 60 * 24,
			sendResetPassword: async ({ user, url }) => {
				await sendEmail(env, { to: user.email, ...resetPassword(user.name, url) });
			},
			password: {
				hash: hashPassword,
				verify: ({ hash, password }) =>
					hash.startsWith("pbkdf2$")
						? verifyLegacyPbkdf2(hash, password)
						: verifyPassword({ hash, password }),
			},
		},
		// `role` lo aporta el plugin admin (input: false — nadie se asigna rol
		// desde el cliente). lastLoginAt se declara para que listUsers lo devuelva.
		user: {
			additionalFields: {
				lastLoginAt: { type: "date", required: false, input: false },
			},
		},
		// admin: crea usuarios, cambia rol/contraseña, borra. Solo role 'admin'.
		plugins: [admin()],
		secret: env.AUTH_SECRET,
		// Sin baseURL: Better Auth lo deriva del request entrante.
		// Cada sesión nueva = un login; se marca acá para que cuente venga de donde venga.
		databaseHooks: {
			session: {
				create: {
					after: async (session) => {
						await db
							.update(authSchema.user)
							.set({ lastLoginAt: new Date() })
							.where(eq(authSchema.user.id, session.userId));
					},
				},
			},
		},
	});
}

export type Auth = ReturnType<typeof build>;

let cached: { env: CloudflareEnv; auth: Auth } | undefined;

export async function getAuth(): Promise<Auth> {
	const { env } = await getCloudflareContext({ async: true });
	if (cached?.env !== env) cached = { env, auth: build(env) };
	return cached.auth;
}
