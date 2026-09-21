import { headers } from "next/headers";
import { getAuth } from "./auth";

// Chequeo real de sesión, para páginas y rutas de /admin. El middleware solo
// mira que exista la cookie; acá Better Auth la valida contra la tabla `session`.

export type SessionUser = { id: string; role: "admin" | "user" };

// Cualquier usuario logueado entra al panel; `role` decide qué ve
// (Usuarios es solo para admin — ver src/app/admin/users/page.tsx).
export async function getSessionUser(): Promise<SessionUser | null> {
	const auth = await getAuth();
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) return null;
	return { id: session.user.id, role: session.user.role === "admin" ? "admin" : "user" };
}

export async function getSessionUserId(): Promise<string | null> {
	return (await getSessionUser())?.id ?? null;
}
