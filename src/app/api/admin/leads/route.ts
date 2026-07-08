import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const STATUSES = ["new", "contacted", "won", "lost"];

// Update a lead's status. (Protected by middleware.)
export async function PATCH(req: Request) {
	const body = (await req.json().catch(() => ({}))) as { id?: unknown; status?: unknown };
	const id = Number(body.id);
	const status = String(body.status);
	if (!id || !STATUSES.includes(status)) {
		return NextResponse.json({ error: "id and valid status required" }, { status: 400 });
	}
	const { env } = await getCloudflareContext({ async: true });
	await env.DB.prepare("UPDATE leads SET status = ? WHERE id = ?").bind(status, id).run();
	return NextResponse.json({ ok: true });
}

// Delete a lead.
export async function DELETE(req: Request) {
	const id = Number(new URL(req.url).searchParams.get("id"));
	if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
	const { env } = await getCloudflareContext({ async: true });
	await env.DB.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();
	return NextResponse.json({ ok: true });
}
