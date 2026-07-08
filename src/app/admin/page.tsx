import { getCloudflareContext } from "@opennextjs/cloudflare";
import AdminDashboard, { type Lead, type StoredFile } from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Cleaning Paradise", robots: { index: false } };

export default async function AdminPage() {
	const { env } = await getCloudflareContext({ async: true });

	const { results } = await env.DB.prepare(
		"SELECT * FROM leads ORDER BY created_at DESC",
	).all<Lead>();

	const list = await env.BUCKET.list({ limit: 1000 });
	const files: StoredFile[] = list.objects.map((o) => ({
		key: o.key,
		size: o.size,
		uploaded: o.uploaded.toISOString(),
	}));

	return <AdminDashboard leads={results ?? []} files={files} />;
}
