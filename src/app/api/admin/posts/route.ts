import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { supabaseInsert, supabaseUpdate, supabaseDelete } from "@/lib/supabase";

// CRUD de posts del blog (Supabase). Protegido por el middleware (/api/admin/*).

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

function pickFields(body: Record<string, unknown>): Record<string, unknown> {
	const row: Record<string, unknown> = {};
	for (const f of FIELDS) {
		if (f in body) row[f] = body[f];
	}
	if (typeof row.content === "string") {
		const words = (row.content as string).trim().split(/\s+/).filter(Boolean).length;
		row.read_time_minutes = words > 0 ? Math.max(1, Math.round(words / 200)) : null;
	}
	return row;
}

export async function POST(req: Request) {
	const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
	if (!body?.title || !body?.slug) {
		return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
	}
	const { env } = await getCloudflareContext({ async: true });
	const ok = await supabaseInsert(env, "posts", pickFields(body));
	if (!ok) return NextResponse.json({ error: "insert failed (slug duplicado?)" }, { status: 500 });
	return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
	const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
	const id = typeof body?.id === "string" ? body.id : "";
	if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
	const { env } = await getCloudflareContext({ async: true });
	const row = { ...pickFields(body!), updated_at: new Date().toISOString() };
	const ok = await supabaseUpdate(env, "posts", `id=eq.${encodeURIComponent(id)}`, row);
	if (!ok) return NextResponse.json({ error: "update failed" }, { status: 500 });
	return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
	const id = new URL(req.url).searchParams.get("id");
	if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
	const { env } = await getCloudflareContext({ async: true });
	const ok = await supabaseDelete(env, "posts", `id=eq.${encodeURIComponent(id)}`);
	if (!ok) return NextResponse.json({ error: "delete failed" }, { status: 500 });
	return NextResponse.json({ ok: true });
}
