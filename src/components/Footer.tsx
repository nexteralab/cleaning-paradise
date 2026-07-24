"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Star, Phone, Mail, MapPin, Clock } from "lucide-react";

const services = [
	{ label: "Standard Cleaning", href: "/cleaning-services-in-wa/standard-cleaning" },
	{ label: "Deep Cleaning", href: "/cleaning-services-in-wa/deep-cleaning" },
	{ label: "Commercial Cleaning", href: "/cleaning-services-in-wa/commercial-cleaning" },
	{ label: "Move In / Out", href: "/cleaning-services-in-wa/move-in-out" },
	{ label: "Packing & Unpacking", href: "/cleaning-services-in-wa/packing-unpacking" },
	{ label: "Carpet Cleaning", href: "/cleaning-services-in-wa/carpet-cleaning" },
];

const locations = [
	{ label: "Seattle", href: "/locations/seattle" },
	{ label: "Bellevue", href: "/locations/bellevue" },
	{ label: "Kirkland", href: "/locations/kirkland" },
	{ label: "Lynnwood", href: "/locations/lynnwood" },
	{ label: "Mercer Island", href: "/locations/mercer-island" },
	{ label: "Shoreline", href: "/locations/shoreline" },
	{ label: "Edmonds", href: "/locations/edmonds" },
	{ label: "Mill Creek", href: "/locations/mill-creek" },
];

const socialClass =
	"flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-white/[0.07] text-ink-400 transition-all duration-200 hover:bg-pink-500 hover:text-white";

export default function Footer() {
	const pathname = usePathname();
	if (pathname?.startsWith("/admin")) return null;

	return (
		<footer className="bg-ink-900 pt-[66px] pb-[30px]">
			<div className="mx-auto max-w-[1360px] px-10">
				<div className="mb-[26px] grid grid-cols-1 gap-11 border-b border-white/[0.08] pb-[46px] md:grid-cols-[1.7fr_1fr_1fr_1.2fr]">
					<div>
						<div className="mb-4 flex items-center gap-[11px]">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/img/logo.png" alt="Cleaning Paradise" className="h-[42px] w-[42px] rounded-full" />
							<span className="text-[21px] text-white">Cleaning Paradise</span>
						</div>
						<p className="mb-[18px] max-w-[300px] text-sm leading-[1.7] text-ink-400">
							Professional residential and commercial cleaning based in Lynnwood, WA — serving
							Seattle and King &amp; Snohomish County. Your home, perfectly clean.
						</p>
						<div className="flex gap-2.5">
							<a href="https://www.facebook.com/cleaningparadisellc" target="_blank" rel="noopener" aria-label="Facebook" className={socialClass}>
								<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
									<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
								</svg>
							</a>
							<a href="https://www.instagram.com/cleaningparadisellc" target="_blank" rel="noopener" aria-label="Instagram" className={socialClass}>
								<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
								</svg>
							</a>
							<a href="https://www.youtube.com/@cleaningparadisellc" target="_blank" rel="noopener" aria-label="YouTube" className={socialClass}>
								<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
									<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
								</svg>
							</a>
							<a href="https://www.tiktok.com/@cleaningparadisellc" target="_blank" rel="noopener" aria-label="TikTok" className={socialClass}>
								<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 1024 1024" fill="currentColor" fillRule="evenodd"><path d="M365.014.667C408.68 0 452.011.333 495.342 0c2.667 51 21 102.999 58.33 138.998 37.332 37 89.997 54 141.328 59.666v134.332c-47.998-1.667-96.33-11.667-139.994-32.333-19-8.667-36.665-19.667-53.998-31-.333 97.332.334 194.665-.666 291.663-2.667 46.666-18 93-44.998 131.332-43.665 64-119.328 105.665-196.992 106.999-47.664 2.666-95.329-10.334-135.994-34.333C55.028 725.658 7.696 652.992.697 574.993c-.667-16.667-1-33.333-.334-49.666 6-63.333 37.332-123.999 85.997-165.332 55.33-47.999 132.66-70.999 204.99-57.332.667 49.333-1.332 98.665-1.332 147.998-33-10.667-71.664-7.667-100.663 12.333-20.999 13.667-36.998 34.666-45.331 58.333-7 17-5 35.666-4.667 53.666 8 54.666 60.664 100.665 116.662 95.665 37.332-.333 72.997-22 92.33-53.666 6.332-11 13.332-22.333 13.665-35.333 3.334-59.666 2-118.998 2.334-178.664.333-134.332-.334-268.33.666-402.328" transform="translate(165 112)" /></svg>
							</a>
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-[11px] font-bold tracking-[0.1em] text-white uppercase">Services</h4>
						<div className="flex flex-col gap-2.5">
							{services.map((s) => (
								<Link key={s.label} href={s.href} className="text-sm text-ink-400 transition-colors duration-150 hover:text-pink-500">
									{s.label}
								</Link>
							))}
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-[11px] font-bold tracking-[0.1em] text-white uppercase">Locations</h4>
						<div className="flex flex-col gap-2.5">
							{locations.map((l) => (
								<Link key={l.href} href={l.href} className="text-sm text-ink-400 transition-colors duration-150 hover:text-pink-500">
									{l.label}
								</Link>
							))}
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-[11px] font-bold tracking-[0.1em] text-white uppercase">Get in touch</h4>
						<a href="tel:+14256100241" className="mb-[11px] flex items-center gap-[9px] text-sm text-ink-400 hover:text-pink-500">
							<Phone size={15} className="text-pink-500" />
							(425) 610-0241
						</a>
						<a href="mailto:cleaning.paradise.llc@gmail.com" className="mb-[11px] flex items-center gap-[9px] text-sm break-all text-ink-400 hover:text-pink-500">
							<Mail size={15} className="shrink-0 text-pink-500" />
							cleaning.paradise.llc@gmail.com
						</a>
						<div className="mb-[11px] flex items-center gap-[9px] text-sm text-ink-400">
							<MapPin size={15} className="text-pink-500" />
							Lynnwood, WA
						</div>
						<div className="flex items-center gap-[9px] text-sm text-ink-400">
							<Clock size={15} className="text-pink-500" />
							Mon–Sat, 7am–7pm
						</div>
					</div>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="text-xs text-ink-500">
						© 2026 Cleaning Paradise LLC. All rights reserved. · Licensed, Insured &amp; Bonded{/* TODO: agregar UBI/license # cuando el cliente lo pase (item 18) */}
					</div>
					<div className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
						<Link href="/privacy" className="hover:text-pink-500">Privacy</Link>
						<span aria-hidden>·</span>
						<Link href="/terms" className="hover:text-pink-500">Terms</Link>
						<span aria-hidden>·</span>
						<a href="/sitemap.xml" className="hover:text-pink-500">Sitemap</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
