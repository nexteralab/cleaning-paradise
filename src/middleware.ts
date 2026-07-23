import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Gate /admin pages and /api/admin endpoints with Supabase Auth.
// Login route stays public. getUser() also refreshes expired tokens —
// the setAll dance below propagates the refreshed cookies to the response.
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	if (path === "/admin/login") {
		return NextResponse.next();
	}

	let res = NextResponse.next({ request: req });
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll: () => req.cookies.getAll(),
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
					res = NextResponse.next({ request: req });
					cookiesToSet.forEach(({ name, value, options }) =>
						res.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (user) return res;

	if (path.startsWith("/api/")) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const url = req.nextUrl.clone();
	url.pathname = "/admin/login";
	return NextResponse.redirect(url);
}
