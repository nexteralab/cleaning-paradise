"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, FileText, LogOut } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/browser";

const NAV = [
	{ href: "/admin", label: "Leads", icon: Users },
	{ href: "/admin/blog", label: "Blog", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	// El login no lleva sidebar.
	if (pathname === "/admin/login") return <>{children}</>;

	async function logout() {
		await supabaseBrowser().auth.signOut();
		router.push("/admin/login");
		router.refresh();
	}

	const isActive = (href: string) =>
		href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

	return (
		<div className="flex min-h-screen flex-col bg-ink-50 md:flex-row">
			{/* Sidebar (top bar en mobile) */}
			<aside className="flex w-full items-center gap-1 border-b border-ink-200 bg-white px-3 py-2 md:sticky md:top-0 md:h-screen md:w-[220px] md:shrink-0 md:flex-col md:items-stretch md:border-r md:border-b-0 md:px-4 md:py-6">
				<div className="hidden px-3 pb-6 md:block">
					<div className="text-[15px] font-semibold text-ink-900">Cleaning Paradise</div>
					<div className="text-xs text-ink-500">Admin</div>
				</div>
				<nav className="flex flex-1 items-center gap-1 md:flex-none md:flex-col md:items-stretch">
					{NAV.map(({ href, label, icon: Icon }) => (
						<Link
							key={href}
							href={href}
							className={`inline-flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium no-underline transition-colors ${
								isActive(href)
									? "bg-ink-900 text-white"
									: "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
							}`}
						>
							<Icon size={16} />
							{label}
						</Link>
					))}
				</nav>
				<div className="md:mt-auto">
					<button
						onClick={logout}
						className="inline-flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:bg-pink-50 hover:text-pink-600"
					>
						<LogOut size={16} /> <span className="hidden md:inline">Log out</span>
					</button>
				</div>
			</aside>
			<main className="min-w-0 flex-1">{children}</main>
		</div>
	);
}
