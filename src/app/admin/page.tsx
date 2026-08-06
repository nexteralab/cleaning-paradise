import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";
import AdminDashboard, { type Lead } from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Cleaning Paradise", robots: { index: false } };

// D1 no tiene arrays ni boolean: services es JSON en TEXT y promo es 0/1.
type Row = Omit<Lead, "services" | "promo"> & { services: string; promo: number };

export default async function AdminPage() {
	if (!(await getSessionUserId())) redirect("/admin/login");
	const { env } = await getCloudflareContext({ async: true });
	const { results } = await env.DB.prepare(
		"SELECT * FROM leads ORDER BY created_at DESC",
	).all<Row>();
	const leads: Lead[] = results.map((r) => ({
		...r,
		services: JSON.parse(r.services || "[]") as string[],
		promo: r.promo === 1,
	}));
	return <AdminDashboard leads={leads} />;
}
