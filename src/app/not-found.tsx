import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
	title: "Page Not Found | Cleaning Paradise",
	robots: { index: false },
};

const links = [
	{ label: "Home", href: "/" },
	{ label: "Services", href: "/cleaning-services-in-wa" },
	{ label: "Locations", href: "/locations" },
	{ label: "Get a free quote", href: "/contact" },
];

export default function NotFound() {
	return (
		<section className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-24">
			<div className="max-w-[560px] text-center">
				<div className="mb-4 text-[13px] font-bold tracking-[0.12em] text-pink-500 uppercase">
					404 — Page not found
				</div>
				<h1 className="mb-4 font-heading text-[clamp(34px,5vw,56px)] leading-[1.1] font-normal tracking-[-0.02em] text-ink-900">
					This page took the day off
				</h1>
				<p className="mx-auto mb-9 max-w-[440px] text-[15.5px] leading-[1.7] text-ink-600">
					The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to
					a spotless start.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-3">
					{links.map((l, i) => (
						<Link
							key={l.href}
							href={l.href}
							className={`inline-flex items-center gap-2 rounded-full px-[22px] py-3 text-[14px] font-semibold no-underline transition-colors ${
								i === links.length - 1
									? "bg-pink-500 text-white hover:bg-pink-600"
									: "bg-ink-50 text-ink-800 hover:bg-ink-100"
							}`}
						>
							{l.label}
							{i === links.length - 1 && <ArrowRight size={15} />}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
