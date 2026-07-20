"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, Menu, X } from "lucide-react";

const links = [
	{ href: "/cleaning-services-in-wa", label: "Services" },
	{ href: "/locations", label: "Locations" },
	{ href: "/blog", label: "Blog" },
	{ href: "/about-us", label: "About Us" },
	{ href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	if (pathname?.startsWith("/admin")) return null;

	const isActive = (href: string) =>
		pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

	return (
		<div className="fixed top-[30px] right-8 left-[30px] z-[9999] md:top-[42px] md:right-auto md:left-[42px]">
			<nav className="flex items-center gap-4 rounded-2xl bg-white/60 py-2 pr-2 pl-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-[12px] md:gap-6">
				<Link
					href="/"
					onClick={() => setOpen(false)}
					className="flex items-center gap-2 text-sm md:text-lg font-semibold tracking-[-0.02em] whitespace-nowrap text-black truncate"
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/img/logo.png" alt="Cleaning Paradise logo" className="h-7 w-7 rounded-full" />
					Cleaning Paradise
				</Link>
				<div className="hidden flex-1 items-center justify-center gap-6 md:flex">
					{links.map((l) => {
						const active = isActive(l.href);
						return (
							<Link
								key={l.href}
								href={l.href}
								aria-current={active ? "page" : undefined}
								className={`text-sm whitespace-nowrap text-[#1f2937] transition-opacity duration-150 hover:opacity-60 ${
									active ? "font-bold" : "font-medium"
								}`}
							>
								{l.label}
							</Link>
						);
					})}
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
						className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white"
					>
						<Phone size={16} />
					</a>
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onClick={() => setOpen(!open)}
						className="flex h-11 w-11 items-center justify-center rounded-xl text-black"
					>
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.98 }}
						transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
						style={{ transformOrigin: "top" }}
						className="mt-2 flex origin-top flex-col gap-1 rounded-2xl bg-white/60 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-[12px] md:hidden"
					>
						{links.map((l, i) => {
							const active = isActive(l.href);
							return (
								<motion.div
									key={l.href}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.05 + i * 0.05, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
								>
									<Link
										href={l.href}
										onClick={() => setOpen(false)}
										aria-current={active ? "page" : undefined}
										className={`block rounded-xl px-3 py-2.5 text-sm text-[#1f2937] transition-opacity hover:opacity-60 ${
											active ? "font-bold" : "font-medium"
										}`}
									>
										{l.label}
									</Link>
								</motion.div>
							);
						})}
						<a
							href="tel:+14256100241"
							className="mt-1 rounded-xl bg-black px-5 py-2.5 text-center text-sm font-medium text-white"
						>
							(425) 610-0241
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
