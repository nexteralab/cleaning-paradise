import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

// Solo UX: si no hay cookie, mandar al login sin renderizar nada.
// NO es el control de acceso — la firma se verifica en cada página y ruta con
// getSessionUserId() (ver src/lib/session.ts), que corre en runtime node.
// Acá no se pueden leer bindings de forma confiable en `next dev`.
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

export function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	if (path === "/admin/login" || req.cookies.has(SESSION_COOKIE)) {
		return NextResponse.next();
	}
	if (path.startsWith("/api/")) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const url = req.nextUrl.clone();
	url.pathname = "/admin/login";
	return NextResponse.redirect(url);
}
