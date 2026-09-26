import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Proxy de Next (antes "middleware"). Solo UX: si no hay cookie, mandar al login sin renderizar nada.
// NO es el control de acceso — la sesión se valida en cada página y ruta con
// getSessionUserId() (ver src/lib/session.ts), que corre en runtime node.
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

export function proxy(req: NextRequest) {
	const path = req.nextUrl.pathname;
	// login y reset-password son públicos: el segundo llega desde el email.
	if (path === "/admin/login" || path === "/admin/reset-password" || getSessionCookie(req)) {
		return NextResponse.next();
	}
	if (path.startsWith("/api/")) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const url = req.nextUrl.clone();
	url.pathname = "/admin/login";
	return NextResponse.redirect(url);
}
