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
		<div className="fixed top-[30px] right-4 left-[30px] z-[9999] md:top-[42px] md:right-auto md:left-[42px]">
			<nav className="flex items-center gap-4 rounded-2xl bg-white/60 py-2 pr-2 pl-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-[12px] md:gap-6">
				<Link
					href="/"
					onClick={() => setOpen(false)}
					className="text-lg font-semibold tracking-[-0.02em] whitespace-nowrap text-black"
				>
					Cleaning Paradise
				</Link>
				<div className="hidden flex-1 items-center justify-center gap-6 md:flex">
					{links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							className="text-sm font-medium whitespace-nowrap text-[#1f2937] transition-opacity duration-150 hover:opacity-60"
						>
							{l.label}
						</Link>
					))}
				</div>
				<a
					href="tel:+14256100241"
					className="hidden rounded-xl bg-black px-5 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#1f2937] md:block"
				>
					(425) 610-0241
				</a>
				<div className="ml-auto flex items-center gap-2 md:hidden">
					<a
						href="tel:+14256100241"
						aria-label="Call (425) 610-0241"
						className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white"
					>
						<Phone size={16} />
					</a>
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onClick={() => setOpen(!open)}
						className="flex h-9 w-9 items-center justify-center rounded-xl text-black"
					>
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>
			{open && (
				<div className="mt-2 flex flex-col gap-1 rounded-2xl bg-white/60 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-[12px] md:hidden">
					{links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							onClick={() => setOpen(false)}
							className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#1f2937] transition-opacity hover:opacity-60"
						>
							{l.label}
						</Link>
					))}
					<a
						href="tel:+14256100241"
						className="mt-1 rounded-xl bg-black px-5 py-2.5 text-center text-sm font-medium text-white"
					>
						(425) 610-0241
					</a>
				</div>
			)}
		</div>
	);
}
