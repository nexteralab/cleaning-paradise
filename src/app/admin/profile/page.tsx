import { notFound, redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";
import ProfileForm from "./ProfileForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Perfil — Admin", robots: { index: false } };

export default async function ProfilePage() {
	const uid = await getSessionUserId();
	if (!uid) redirect("/admin/login");
	const { env } = await getCloudflareContext({ async: true });
	const user = await env.DB.prepare(
		"SELECT email, name, role, created_at, last_login_at FROM users WHERE id = ?",
	)
		.bind(uid)
		.first<{
			email: string;
			name: string | null;
			role: string;
			created_at: string;
			last_login_at: string | null;
		}>();
	if (!user) notFound();
	return <ProfileForm user={user} />;
}
