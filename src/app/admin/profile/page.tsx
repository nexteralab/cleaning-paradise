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
	// Tabla de Better Auth: timestamps en epoch segundos.
	const row = await env.DB.prepare(
		"SELECT email, name, role, last_login_at FROM user WHERE id = ?",
	)
		.bind(uid)
		.first<{ email: string; name: string; role: string; last_login_at: number | null }>();
	if (!row) notFound();
	return (
		<ProfileForm
			user={{
				...row,
				last_login_at: row.last_login_at ? new Date(row.last_login_at * 1000).toISOString() : null,
			}}
		/>
	);
}
