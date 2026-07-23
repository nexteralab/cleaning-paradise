import { getCloudflareContext } from "@opennextjs/cloudflare";
import { supabaseSelect } from "@/lib/supabase";
import AdminDashboard, { type Lead } from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — Cleaning Paradise", robots: { index: false } };

export default async function AdminPage() {
	const { env } = await getCloudflareContext({ async: true });
	const leads = await supabaseSelect<Lead>(env, "leads", "select=*&order=created_at.desc");
	return <AdminDashboard leads={leads} />;
}
