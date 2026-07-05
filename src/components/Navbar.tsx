"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const links = [
	{ href: "/services", label: "Services" },
	{ href: "/locations", label: "Locations" },
	{ href: "/blog", label: "Blog" },
	{ href: "/about", label: "About Us" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<div className="fixed top-4 right-4 left-4 z-[9999] md:top-6 md:right-auto md:left-6">
			<nav className="flex items-center gap-4 rounded-[14px] bg-white px-5 py-3 shadow-[0_8px_32px_rgba(30,62,162,0.15)] backdrop-blur-[10px] md:gap-7 md:px-7 md:py-3.5">
				<Link
					href="/"
					onClick={() => setOpen(false)}
					className="font-serif text-lg tracking-[-0.01em] whitespace-nowrap text-ink-900"
				>
					Cleaning Paradise
				</Link>
				<div className="hidden flex-1 items-center justify-center gap-7 md:flex">
					{links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							className="text-sm font-medium whitespace-nowrap text-ink-600 transition-colors duration-200 hover:text-pink-500"
						>
							{l.label}
						</Link>
					))}
				</div>
				<a
					href="tel:+14256100241"
					className="hidden rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-all duration-200 ease-(--ease-out) hover:bg-[#2A2A3C] hover:shadow-[0_4px_20px_rgba(19,19,32,0.3)] md:block"
				>
					(425) 610-0241
				</a>
				<div className="ml-auto flex items-center gap-2 md:hidden">
					<a
						href="tel:+14256100241"
						aria-label="Call (425) 610-0241"
						className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white"
					>
						<Phone size={16} />
					</a>
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onClick={() => setOpen(!open)}
						className="flex h-9 w-9 items-center justify-center rounded-full text-ink-900"
					>
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>
			{open && (
				<div className="mt-2 flex flex-col gap-1 rounded-[14px] bg-white p-3 shadow-[0_8px_32px_rgba(30,62,162,0.15)] md:hidden">
					{links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							onClick={() => setOpen(false)}
							className="rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-pink-50 hover:text-pink-500"
						>
							{l.label}
						</Link>
					))}
					<a
						href="tel:+14256100241"
						className="mt-1 rounded-full bg-ink-900 px-5 py-2.5 text-center text-sm font-semibold text-white"
					>
						(425) 610-0241
					</a>
				</div>
			)}
		</div>
	);
}
