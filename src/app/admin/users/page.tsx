import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";
import { getSessionUser } from "@/lib/session";
import UsersManager, { type AdminUser } from "./UsersManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Usuarios — Admin", robots: { index: false } };

export default async function UsersPage() {
	const me = await getSessionUser();
	if (!me) redirect("/admin/login");
	// El plugin admin ya rechaza a no-admins en la API; acá evitamos mostrar la página.
	if (me.role !== "admin") redirect("/admin");

	const auth = await getAuth();
	const { users } = await auth.api.listUsers({
		headers: await headers(),
		query: { limit: 200, sortBy: "createdAt", sortDirection: "asc" },
	});
	// lastLoginAt es additionalField: llega en runtime pero UserWithRole no lo tipa.
	const rows: AdminUser[] = (users as Array<(typeof users)[number] & { lastLoginAt?: Date | null }>).map((u) => ({
		id: u.id,
		name: u.name,
		email: u.email,
		role: u.role === "admin" ? "admin" : "user",
		createdAt: u.createdAt.toISOString(),
		lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
	}));
	return <UsersManager users={rows} meId={me.id} />;
}
