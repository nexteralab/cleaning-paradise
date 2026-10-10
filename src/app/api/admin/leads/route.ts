import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";
import { SMS_CONSENT_VERSION } from "@/lib/sms-consent";

const STATUSES = ["new", "contacted", "won", "lost"];
const VERBAL_METHODS = ["phone", "in-person"];

// Update a lead's status, or record a verbal SMS consent (body.smsConsent = "phone" | "in-person").
export async function PATCH(req: Request) {
	const userId = await getSessionUserId();
	if (!userId) {
		return NextResponse.json({ error: "unauthorized" }, { status: 401 });
	}
	const body = (await req.json().catch(() => ({}))) as { id?: unknown; status?: unknown; smsConsent?: unknown };
	const id = Number(body.id);

	if (body.smsConsent !== undefined) {
		const method = String(body.smsConsent);
		if (!id || !VERBAL_METHODS.includes(method)) {
			return NextResponse.json({ error: "id and valid method required" }, { status: 400 });
		}
		const { env } = await getCloudflareContext({ async: true });
		// Solo leads con teléfono y sin consentimiento previo: no se pisa un registro existente.
		const { meta } = await env.DB.prepare(
			`UPDATE leads SET sms_consent = 1, sms_consent_version = ?, sms_consent_method = ?,
			 sms_consent_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now'), sms_consent_by = ?
			 WHERE id = ? AND sms_consent = 0 AND TRIM(COALESCE(phone, '')) != ''`,
		)
			.bind(SMS_CONSENT_VERSION, method, userId, id)
			.run();
		if (!meta.changes) {
			return NextResponse.json({ error: "lead has no phone or already consented" }, { status: 409 });
		}
		return NextResponse.json({ ok: true });
	}

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
