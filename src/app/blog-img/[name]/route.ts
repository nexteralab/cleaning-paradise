import { getCloudflareContext } from "@opennextjs/cloudflare";

// Sirve las imágenes del blog desde R2. El key siempre es blog/<name>, así que
// no hay forma de pedir otros objetos del bucket. Los nombres son únicos e
// inmutables (timestamp + uuid) → cache eterno.

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
	const { name } = await params;
	const { env } = await getCloudflareContext({ async: true });
	const obj = await env.BUCKET.get(`blog/${name}`);
	if (!obj) return new Response("Not found", { status: 404 });
	return new Response(obj.body, {
		headers: {
			"Content-Type": obj.httpMetadata?.contentType ?? "application/octet-stream",
			"Cache-Control": "public, max-age=31536000, immutable",
			ETag: obj.httpEtag,
		},
	});
}
