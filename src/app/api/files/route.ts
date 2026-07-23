import { getCloudflareContext } from "@opennextjs/cloudflare";

// Sirve archivos de R2 públicamente (solo lectura) — imágenes del blog subidas
// antes del bucket de Supabase. Solo lectura — se conserva porque covers viejos pueden apuntar aquí.
export async function GET(req: Request) {
	const key = new URL(req.url).searchParams.get("key");
	if (!key) return new Response("key required", { status: 400 });

	const { env } = await getCloudflareContext({ async: true });
	const obj = await env.BUCKET.get(key);
	if (!obj) return new Response("not found", { status: 404 });

	return new Response(obj.body, {
		headers: {
			"Content-Type": obj.httpMetadata?.contentType ?? "application/octet-stream",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
