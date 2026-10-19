import { getCloudflareContext } from "@opennextjs/cloudflare";

// Sirve las imágenes del blog desde R2. El key siempre es blog/<name>, así que
// no hay forma de pedir otros objetos del bucket. Los nombres son únicos e
// inmutables (timestamp + uuid) → cache eterno.
//
// JPEG/PNG/WebP salen reducidos a WebP con el binding de Images (?w=800 para
// tarjetas, 1600 por defecto). La versión reducida se guarda en R2 bajo
// blog-opt/ para transformar cada imagen una sola vez. GIF/SVG van tal cual.

const WIDTHS = [800, 1600];
const OPTIMIZABLE = /^image\/(jpeg|png|webp)$/;
const HEADERS = { "Cache-Control": "public, max-age=31536000, immutable" };

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
	const { name } = await params;
	const w = Number(new URL(req.url).searchParams.get("w"));
	const width = WIDTHS.includes(w) ? w : 1600;
	const { env } = await getCloudflareContext({ async: true });

	const optKey = `blog-opt/${width}/${name}`;
	const cached = await env.BUCKET.get(optKey);
	if (cached) {
		return new Response(cached.body, { headers: { ...HEADERS, "Content-Type": "image/webp" } });
	}

	const obj = await env.BUCKET.get(`blog/${name}`);
	if (!obj) return new Response("Not found", { status: 404 });
	const type = obj.httpMetadata?.contentType ?? "application/octet-stream";
	if (!OPTIMIZABLE.test(type) || !env.IMAGES) {
		return new Response(obj.body, { headers: { ...HEADERS, "Content-Type": type, ETag: obj.httpEtag } });
	}

	try {
		const result = await env.IMAGES.input(obj.body)
			.transform({ width, fit: "scale-down" })
			.output({ format: "image/webp", quality: 80 });
		const bytes = await new Response(result.image()).arrayBuffer();
		await env.BUCKET.put(optKey, bytes, { httpMetadata: { contentType: "image/webp" } });
		return new Response(bytes, { headers: { ...HEADERS, "Content-Type": "image/webp" } });
	} catch {
		// Si Images falla, se sirve el original (el body ya se consumió: se relee).
		const raw = await env.BUCKET.get(`blog/${name}`);
		if (!raw) return new Response("Not found", { status: 404 });
		// Cache corto: el próximo intento puede salir optimizado.
		return new Response(raw.body, { headers: { "Cache-Control": "public, max-age=3600", "Content-Type": type } });
	}
}
