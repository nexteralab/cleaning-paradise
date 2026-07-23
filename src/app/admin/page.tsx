import { getCloudflareContext } from "@opennextjs/cloudflare";
import AdminDashboard, { type Lead } from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Cleaning Paradise", robots: { index: false } };

export default async function AdminPage() {
	const { env } = await getCloudflareContext({ async: true });

	const { results } = await env.DB.prepare(
		"SELECT * FROM leads ORDER BY created_at DESC",
	).all<Lead>();

	return <AdminDashboard leads={results ?? []} />;
}
