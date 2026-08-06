import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";

// CRUD de posts del blog (D1).

const FIELDS = [
	"title",
	"slug",
	"kicker",
	"category",
	"accent",
	"excerpt",
	"lead",
	"content",
	"cover_url",
	"author",
	"tags",
	"meta_title",
	"meta_description",
	"published",
	"published_at",
] as const;

// Devuelve solo columnas de la whitelist (los nombres nunca vienen del body → seguro interpolarlos).
function pickFields(body: Record<string, unknown>): Record<string, unknown> {
	const row: Record<string, unknown> = {};
	for (const f of FIELDS) {
		if (!(f in body)) continue;
		const v = body[f];
		if (f === "tags") row[f] = JSON.stringify(Array.isArray(v) ? v : []);
		else if (f === "published") row[f] = v ? 1 : 0;
		else row[f] = v ?? null;
	}
	if (typeof body.content === "string") {
		const words = body.content.trim().split(/\s+/).filter(Boolean).length;
		row.read_time_minutes = words > 0 ? Math.max(1, Math.round(words / 200)) : null;
	}
	return row;
}

export async function POST(req: Request) {
	if (!(await getSessionUserId())) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
	if (!body?.title || !body?.slug) {
		return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
	}
	const { env } = await getCloudflareContext({ async: true });
	const row = { id: crypto.randomUUID(), ...pickFields(body) };
	const cols = Object.keys(row);
	try {
		await env.DB.prepare(
			`INSERT INTO posts (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`,
		)
			.bind(...Object.values(row))
			.run();
	} catch (e) {
		console.error("[posts] insert", e);
		return NextResponse.json({ error: "insert failed (slug duplicado?)" }, { status: 500 });
	}
	return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
	if (!(await getSessionUserId())) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
	const id = typeof body?.id === "string" ? body.id : "";
	if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
	const { env } = await getCloudflareContext({ async: true });
	const row = { ...pickFields(body!), updated_at: new Date().toISOString() };
	const cols = Object.keys(row);
	try {
		await env.DB.prepare(`UPDATE posts SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`)
			.bind(...Object.values(row), id)
			.run();
	} catch (e) {
		console.error("[posts] update", e);
		return NextResponse.json({ error: "update failed" }, { status: 500 });
	}
	return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
	if (!(await getSessionUserId())) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const id = new URL(req.url).searchParams.get("id");
	if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
	const { env } = await getCloudflareContext({ async: true });
	await env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
	return NextResponse.json({ ok: true });
}
