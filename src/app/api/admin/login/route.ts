import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { signSession, timingSafeEqual, COOKIE_NAME } from "@/lib/auth";

const cookieOpts = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" };

export async function POST(req: Request) {
	let password = "";
	try {
		const body = (await req.json()) as { password?: unknown };
		password = typeof body.password === "string" ? body.password : "";
	} catch {
		return NextResponse.json({ error: "invalid body" }, { status: 400 });
	}

	const { env } = await getCloudflareContext({ async: true });
	const expected = env.ADMIN_PASSWORD ?? "";
	if (!expected || !timingSafeEqual(password, expected)) {
		return NextResponse.json({ error: "Invalid password" }, { status: 401 });
	}

	const { value, maxAge } = await signSession(env.AUTH_SECRET ?? "");
	const res = NextResponse.json({ ok: true });
	res.cookies.set(COOKIE_NAME, value, { ...cookieOpts, maxAge });
	return res;
}

// Logout
export async function DELETE() {
	const res = NextResponse.json({ ok: true });
	res.cookies.set(COOKIE_NAME, "", { ...cookieOpts, maxAge: 0 });
	return res;
}
