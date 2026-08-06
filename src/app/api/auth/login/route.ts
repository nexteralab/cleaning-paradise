import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSession, verifyPassword } from "@/lib/auth";

// Público a propósito (el middleware solo cubre /admin/* y /api/admin/*).
// La única fuente de verdad es la tabla `users`: sin fila, no hay login.
// Alta de usuarios: ver migrations/0007_users.sql.
//
// ponytail: sin rate limit propio — si hace falta, una regla de Rate Limiting
// de Cloudflare sobre esta ruta cuesta cero código.
export async function POST(req: Request) {
	const body = (await req.json().catch(() => ({}))) as { email?: unknown; password?: unknown };
	const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
	const password = typeof body.password === "string" ? body.password : "";
	if (!email || !password) {
		return NextResponse.json({ error: "email and password required" }, { status: 400 });
	}

	const { env } = await getCloudflareContext({ async: true });
	const user = await env.DB.prepare("SELECT id, password_hash FROM users WHERE email = ?")
		.bind(email)
		.first<{ id: string; password_hash: string }>();
	if (!user || !(await verifyPassword(user.password_hash, password))) {
		return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
	}
	await env.DB.prepare("UPDATE users SET last_login_at = ? WHERE id = ?")
		.bind(new Date().toISOString(), user.id)
		.run();

	const res = NextResponse.json({ ok: true });
	res.cookies.set(SESSION_COOKIE, await createSession(env.AUTH_SECRET!, user.id), {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE,
	});
	return res;
}
