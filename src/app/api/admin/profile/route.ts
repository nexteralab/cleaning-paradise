import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { getSessionUserId } from "@/lib/session";

// Perfil del usuario logueado: nombre y cambio de contraseña.
// El id del usuario sale de la cookie firmada.

const MIN_PASSWORD = 8;

export async function PATCH(req: Request) {
	const uid = await getSessionUserId();
	if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
	const { env } = await getCloudflareContext({ async: true });

	const user = await env.DB.prepare("SELECT id, password_hash FROM users WHERE id = ?")
		.bind(uid)
		.first<{ id: string; password_hash: string }>();
	if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

	if (typeof body.name === "string") {
		await env.DB.prepare("UPDATE users SET name = ? WHERE id = ?")
			.bind(body.name.trim() || null, uid)
			.run();
	}

	if (body.newPassword !== undefined) {
		const current = typeof body.currentPassword === "string" ? body.currentPassword : "";
		const next = typeof body.newPassword === "string" ? body.newPassword : "";
		if (next.length < MIN_PASSWORD) {
			return NextResponse.json(
				{ error: `La contraseña nueva necesita al menos ${MIN_PASSWORD} caracteres` },
				{ status: 400 },
			);
		}
		if (!(await verifyPassword(user.password_hash, current))) {
			return NextResponse.json({ error: "La contraseña actual no coincide" }, { status: 403 });
		}
		// ponytail: no invalida las sesiones abiertas en otros dispositivos — la
		// cookie es stateless. Si hace falta, una columna session_version que
		// entre en la firma lo resuelve.
		await env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?")
			.bind(await hashPassword(next), uid)
			.run();
	}

	return NextResponse.json({ ok: true });
}
