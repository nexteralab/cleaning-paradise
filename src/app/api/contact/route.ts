import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { sendLeadEmails, type Lead } from "@/lib/email";

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
	await env.DB.prepare(
		`INSERT INTO leads
			(first_name, last_name, email, phone, street, unit, city, zip, services, service, date, time, frequency, notes, promo, source)
		 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
	)
		.bind(
			firstName,
			s("lastName"),
			email,
			s("phone"),
			s("street"),
			s("unit"),
			s("city"),
			s("zip"),
			JSON.stringify(services),
			s("service"),
			s("date"),
			s("time"),
			s("frequency"),
			s("notes"),
			body.promo ? 1 : 0,
			s("source") ?? "contact",
		)
		.run();

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
