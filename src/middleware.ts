import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

// Gate /admin pages and /api/admin endpoints. Login routes stay public.
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	if (path === "/admin/login" || path === "/api/admin/login") {
		return NextResponse.next();
	}

	const { env } = await getCloudflareContext({ async: true });
	const ok = await verifySession(req.cookies.get(COOKIE_NAME)?.value, env.AUTH_SECRET ?? "");
	if (ok) return NextResponse.next();

	if (path.startsWith("/api/")) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const url = req.nextUrl.clone();
	url.pathname = "/admin/login";
	return NextResponse.redirect(url);
}
