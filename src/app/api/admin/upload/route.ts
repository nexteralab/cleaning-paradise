import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";

// Sube imágenes del blog a R2.
// Se sirven por /blog-img/<name> (ver src/app/blog-img/[name]/route.ts).

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(req: Request) {
	if (!(await getSessionUserId())) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const form = await req.formData().catch(() => null);
	const file = form?.get("file");
	if (!(file instanceof File)) {
		return NextResponse.json({ error: "file required" }, { status: 400 });
	}
	if (!file.type.startsWith("image/")) {
		return NextResponse.json({ error: "only images allowed" }, { status: 400 });
	}
	if (file.size > MAX_BYTES) {
		return NextResponse.json({ error: "max 10MB" }, { status: 413 });
	}

	const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
	const name = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
	const { env } = await getCloudflareContext({ async: true });
	await env.BUCKET.put(`blog/${name}`, file.stream(), {
		httpMetadata: { contentType: file.type },
	});
	return NextResponse.json({ url: `/blog-img/${name}` });
}
