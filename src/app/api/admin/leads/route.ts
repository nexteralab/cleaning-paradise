import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";

const STATUSES = ["new", "contacted", "won", "lost"];

// Update a lead's status.
export async function PATCH(req: Request) {
	if (!(await getSessionUserId())) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
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
	if (!(await getSessionUserId())) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const id = Number(new URL(req.url).searchParams.get("id"));
	if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
	const { env } = await getCloudflareContext({ async: true });
	await env.DB.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();
	return NextResponse.json({ ok: true });
}
