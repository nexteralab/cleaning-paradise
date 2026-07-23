import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { sendLeadEmails, type Lead } from "@/lib/email";
import { supabaseInsert } from "@/lib/supabase";

// Public endpoint — the contact & quote forms POST here to create a lead.
export async function POST(req: Request) {
	let body: Record<string, unknown>;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "invalid body" }, { status: 400 });
	}

	const email = typeof body.email === "string" ? body.email.trim() : "";
	const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
	if (!email || !firstName) {
		return NextResponse.json({ error: "name and email are required" }, { status: 400 });
	}

	const s = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : null);
	const services = Array.isArray(body.services) ? (body.services as string[]) : [];

	const { env, ctx } = await getCloudflareContext({ async: true });
	const saved = await supabaseInsert(env, "leads", {
		first_name: firstName,
		last_name: s("lastName"),
		email,
		phone: s("phone"),
		street: s("street"),
		unit: s("unit"),
		city: s("city"),
		zip: s("zip"),
		services,
		service: s("service"),
		date: s("date"),
		time: s("time"),
		frequency: s("frequency"),
		sqft: s("sqft"),
		pets: s("pets"),
		notes: s("notes"),
		promo: !!body.promo,
		source: s("source") ?? "contact",
	});
	if (!saved) {
		return NextResponse.json({ error: "could not save lead" }, { status: 502 });
	}

	// Fire notification + confirmation emails without blocking the response.
	// The lead is already saved, so email failures never lose the lead.
	const lead: Lead = {
		firstName,
		lastName: s("lastName"),
		email,
		phone: s("phone"),
		street: s("street"),
		unit: s("unit"),
		city: s("city"),
		zip: s("zip"),
		services,
		service: s("service"),
		date: s("date"),
		time: s("time"),
		frequency: s("frequency"),
		sqft: s("sqft"),
		pets: s("pets"),
		notes: s("notes"),
		promo: !!body.promo,
		source: s("source") ?? "contact",
	};
	ctx.waitUntil(sendLeadEmails(env, lead));

	return NextResponse.json({ ok: true });
}
