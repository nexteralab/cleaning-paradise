import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// R2 storage management. (Protected by middleware.)
// GET            -> list objects
// GET ?key=...   -> download/stream one object
// POST (file)    -> upload
// DELETE ?key=.. -> remove
export async function GET(req: Request) {
	const { env } = await getCloudflareContext({ async: true });
	const key = new URL(req.url).searchParams.get("key");

	if (key) {
		const obj = await env.BUCKET.get(key);
		if (!obj) return new Response("Not found", { status: 404 });
		return new Response(obj.body, {
			headers: {
				"Content-Type": obj.httpMetadata?.contentType ?? "application/octet-stream",
				"Content-Disposition": `inline; filename="${key.split("/").pop()}"`,
			},
		});
	}

	const list = await env.BUCKET.list({ limit: 1000 });
	return NextResponse.json({
		objects: list.objects.map((o) => ({
			key: o.key,
			size: o.size,
			uploaded: o.uploaded,
		})),
	});
}

export async function POST(req: Request) {
	const { env } = await getCloudflareContext({ async: true });
	const form = await req.formData();
	const file = form.get("file");
	if (!(file instanceof File)) {
		return NextResponse.json({ error: "no file" }, { status: 400 });
	}
	const key = `${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
	await env.BUCKET.put(key, file.stream(), {
		httpMetadata: { contentType: file.type || "application/octet-stream" },
	});
	return NextResponse.json({ ok: true, key });
}

export async function DELETE(req: Request) {
	const key = new URL(req.url).searchParams.get("key");
	if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });
	const { env } = await getCloudflareContext({ async: true });
	await env.BUCKET.delete(key);
	return NextResponse.json({ ok: true });
}
