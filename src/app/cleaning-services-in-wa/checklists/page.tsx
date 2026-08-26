import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ListChecks, Phone } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { locations } from "@/app/locations/locations-data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";
const url = `${base}/cleaning-services-in-wa/checklists`;

const TITLE = "Cleaning Checklists: What's Included in Every Service | Cleaning Paradise";
const DESCRIPTION =
	"Compare the standard, deep, move-in and move-out cleaning checklists from Cleaning Paradise side by side — plus add-on pricing and limits — before you request a quote in Seattle, WA.";

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: { canonical: "/cleaning-services-in-wa/checklists" },
	openGraph: {
		type: "article",
		siteName: "Cleaning Paradise",
		title: TITLE,
		description: DESCRIPTION,
		url,
		images: [{ url: "/img/aw1a0547.jpg", width: 1200, height: 800, alt: "Cleaning Paradise team cleaning a home in Seattle, WA" }],
	},
	twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/img/aw1a0547.jpg"] },
};

type ChecklistCard = {
	name: string;
	subtitle: string;
	blurb: string;
	highlights: string[];
	href: string;
};

const checklists: ChecklistCard[] = [
	{
		name: "Standard",
		subtitle: "Routine Maintenance Clean",
		blurb: "Weekly, biweekly or monthly upkeep.",
		highlights: ["Surface cleaning throughout", "Beds made on request", "Light decluttering"],
		href: "/cleaning-services-in-wa/standard-cleaning/standard-checklist",
	},
	{
		name: "Deep",
		subtitle: "Top-to-Bottom Deep Clean",
		blurb: "First visits and seasonal resets.",
		highlights: ["Grout, blinds and fans", "Under and behind furniture", "Upholstery vacuuming"],
		href: "/cleaning-services-in-wa/deep-cleaning/deep-checklist",
	},
	{
		name: "Move-In",
		subtitle: "Move-In Ready Deep Clean",
		blurb: "Before your furniture arrives.",
		highlights: ["Garbage disposal detail", "Stairs and hallways", "Dryer lint trap"],
		href: "/cleaning-services-in-wa/move-in-out/move-in-checklist",
	},
	{
		name: "Move-Out",
		subtitle: "Move-Out Ready Deep Clean",
		blurb: "Once the property is empty.",
		highlights: ["Inside pantry and closets", "Detailed edge vacuuming", "Trash removal included"],
		href: "/cleaning-services-in-wa/move-in-out/move-out-checklist",
	},
];

const addons: { label: string; price: string; quote?: boolean }[] = [
	{ label: "Inside Fridge", price: "+$50" },
	{ label: "Inside Oven", price: "+$40" },
	{ label: "Inside Cabinets", price: "+$50" },
	{ label: "Inside Dishwasher", price: "+$20" },
	{ label: "Inside Washer / Dryer", price: "+$20" },
	{ label: "Interior Windows", price: "+$5 / +$8" },
	{ label: "Carpet Cleaning", price: "Quote", quote: true },
	{ label: "Wall Cleaning", price: "By request", quote: true },
	{ label: "Garage or Patio", price: "Quote", quote: true },
];

const gallery: { src: string; alt: string; className: string }[] = [
	{
		src: "/img/aw1a0547.jpg",
		alt: "Cleaning Paradise housekeeper detailing a kitchen counter in Seattle, WA",
		className: "md:col-start-1 md:row-span-2",
	},
	{
		src: "/img/aw1a0550.jpg",
		alt: "Kitchen left spotless after a deep cleaning in King County, WA",
		className: "md:col-start-2 md:row-start-1",
	},
	{
		src: "/img/aw1a0562.jpg",
		alt: "Bathroom detail work during a move-out cleaning in Snohomish County, WA",
		className: "md:col-start-3 md:row-start-1",
	},
	{
		src: "/img/pasted-1782782341097-0.webp",
		alt: "The Cleaning Paradise team before a scheduled house cleaning",
		className: "md:col-start-4 md:row-span-2",
	},
	{
		src: "/img/aw1a0626-scaled.jpg",
		alt: "Living room vacuumed and dusted during a standard cleaning visit",
		className: "md:col-start-2 md:row-start-2",
	},
];

export default function ChecklistsPage() {
	return (
		<div className="relative w-full overflow-x-clip">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{ "@type": "ListItem", position: 1, name: "Home", item: base },
						{
							"@type": "ListItem",
							position: 2,
							name: "Cleaning Services",
							item: `${base}/cleaning-services-in-wa`,
						},
						{ "@type": "ListItem", position: 3, name: "Cleaning Checklists", item: url },
					],
				}}
			/>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "ItemList",
					name: "Cleaning checklists by service",
					description: DESCRIPTION,
					url,
					itemListElement: checklists.map((c, i) => ({
						"@type": "ListItem",
						position: i + 1,
						name: `${c.name} Cleaning Checklist`,
						url: `${base}${c.href}`,
					})),
				}}
			/>

			{/* ═══ HERO ═══ */}
			<section className="bg-white px-6 pt-[clamp(110px,11vw,150px)] pb-[clamp(56px,7vw,74px)] text-center">
				<div className="mx-auto max-w-[940px]">
					<nav aria-label="Breadcrumb" className="mb-[22px]">
						<ol className="flex flex-wrap items-center justify-center gap-2 text-[12.5px] font-semibold">
							<li>
								<Link href="/" className="text-[#808098] no-underline transition-colors hover:text-pink-500">
									Home
								</Link>
							</li>
							<li aria-hidden="true" className="text-ink-300">/</li>
							<li>
								<Link
									href="/cleaning-services-in-wa"
									className="text-[#808098] no-underline transition-colors hover:text-pink-500"
								>
									Cleaning Services
								</Link>
							</li>
							<li aria-hidden="true" className="text-ink-300">/</li>
							<li aria-current="page" className="text-ink-900">Checklists</li>
						</ol>
					</nav>

					<p className="mb-6 inline-flex items-center gap-[7px] rounded-full bg-pink-500/15 px-4 py-2 text-[11.5px] font-semibold tracking-[.06em] text-pink-500 uppercase">
						<ListChecks size={13} />
						Four services, side by side
					</p>
					<h1 className="mb-[22px] font-heading text-[clamp(38px,5.2vw,66px)] leading-[1.06] font-normal tracking-[-0.025em] text-ink-900 text-pretty">
						Cleaning Checklists: What&apos;s Included in Every Service
					</h1>
					<p className="mx-auto max-w-[660px] text-[18px] leading-[1.72] text-[#606078] text-pretty">
						Compare our four cleaning services side by side and see exactly what each one covers before
						you request a quote. <b className="font-semibold text-ink-900">Licensed, bonded and insured</b>,
						serving King and Snohomish Counties.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<a
							href="#checklists"
							className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-8 py-[15px] text-base font-semibold text-white no-underline shadow-[0_8px_24px_rgba(255,80,181,0.30)] transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:bg-pink-600"
						>
							Compare services <ArrowDown size={16} />
						</a>
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink-200 bg-white px-[30px] py-3.5 text-base font-semibold text-ink-900 no-underline transition-colors hover:border-pink-500 hover:text-pink-500"
						>
							Request a free quote
						</Link>
					</div>
				</div>
			</section>

			{/* ═══ THE FOUR CHECKLISTS ═══ */}
			<section id="checklists" className="scroll-mt-24 bg-white px-6 py-[clamp(56px,7vw,88px)]">
				<div className="mx-auto max-w-[1160px]">
					<div className="mb-[38px] max-w-[620px]">
						<h2 className="mb-3 text-xs font-bold tracking-[.1em] text-pink-500 uppercase">
							The four checklists
						</h2>
						<p className="font-heading text-[clamp(30px,3.6vw,44px)] leading-[1.12] font-normal tracking-[-0.02em] text-ink-900">
							See the full list for each service
						</p>
					</div>

					<ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{checklists.map((c) => (
							<li
								key={c.name}
								className="flex flex-col overflow-hidden rounded-[20px] border border-[#EFEFF4] bg-white transition-all duration-200 ease-(--ease-out) hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,62,162,0.12)]"
							>
								<div className="border-b-[3px] border-pink-500 px-6 py-5">
									<h3 className="font-heading text-[26px] leading-[1.1] text-ink-900">{c.name}</h3>
									<p className="mt-1 text-[11.5px] font-medium tracking-[.03em] text-[#808098]">
										{c.subtitle}
									</p>
								</div>
								<div className="flex flex-1 flex-col px-6 pt-[22px] pb-6">
									<p className="mb-4 border-b border-[#F4F4F8] pb-4 text-[13.5px] text-[#808098]">
										{c.blurb}
									</p>
									<ul className="mb-[22px] flex flex-col gap-[9px]">
										{c.highlights.map((item) => (
											<li key={item} className="flex gap-[9px]">
												<span aria-hidden="true" className="shrink-0 text-[13px] leading-[1.55] font-bold text-pink-500">
													✓
												</span>
												<span className="text-[13.5px] leading-[1.5] text-ink-600">{item}</span>
											</li>
										))}
									</ul>
									<Link
										href={c.href}
										className="mt-auto inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-pink-500 no-underline hover:underline"
									>
										View checklist
										<span className="sr-only"> for {c.name} cleaning</span>
										<ArrowRight size={14} />
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* ═══ ADD-ONS & LIMITS ═══ */}
			<section className="bg-white px-6 pb-[clamp(56px,7vw,88px)]">
				<div className="mx-auto max-w-[1160px]">
					<div className="mb-8 max-w-[620px]">
						<h2 className="mb-3 text-xs font-bold tracking-[.1em] text-pink-500 uppercase">
							Same for every service
						</h2>
						<p className="mb-2.5 font-heading text-[clamp(30px,3.6vw,44px)] leading-[1.12] font-normal tracking-[-0.02em] text-ink-900">
							Add-ons and limits
						</p>
						<p className="text-base leading-[1.65] text-[#606078]">
							These prices are identical across all four cleanings. Let us know in advance.
						</p>
					</div>

					<div className="rounded-[20px] border-[1.5px] border-[#FFC2E5] bg-[#FFF7FC] px-8 pt-[30px] pb-[26px]">
						<dl className="grid grid-cols-1 gap-x-11 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3">
							{addons.map((a, i) => (
								<div
									key={a.label}
									className={`flex items-baseline justify-between px-0.5 py-3 ${i < addons.length - 3 ? "border-b border-dashed border-[#FFC2E5]" : ""
										}`}
								>
									<dt className="text-sm font-semibold text-ink-900">{a.label}</dt>
									<dd
										className={`pl-3.5 whitespace-nowrap text-pink-500 ${a.quote
											? "text-[13px] font-semibold italic"
											: "text-[15px] font-bold"
											}`}
									>
										{a.price}
									</dd>
								</div>
							))}
						</dl>
						<p className="mt-5 text-[12.5px] leading-[1.6] text-[#808098] italic text-pretty">
							Interior windows are priced per pane, small inside +$5 and large inside +$8. Inside
							fridge, oven and cabinets are cleaned only when empty and accessible.
						</p>
					</div>

					<div className="mt-[34px] border-l-[5px] border-pink-500 py-0.5 pl-[18px]">
						<h2 className="mb-2.5 text-[13px] font-bold tracking-[.14em] text-ink-900 uppercase">
							What no service includes
						</h2>
						<p className="max-w-[820px] text-[14.5px] leading-[1.72] text-[#606078] text-pretty">
							Service covers accessible surfaces only. We do not move heavy furniture or appliances,
							wall cleaning is performed only on washable paint, and we are not responsible for
							pre-existing damage. Some stains or buildup may be permanent and not fully removable.
							Water and electricity must be available at the time of service.
						</p>
					</div>
				</div>
			</section>

			{/* ═══ GALLERY + BLOG CTA ═══ */}
			<section className="bg-pink-50 py-[clamp(64px,8vw,96px)]">
				<div className="mx-auto max-w-[1400px] px-[clamp(20px,4vw,64px)]">
					<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
						<div>
							<h2 className="mb-3 text-xs font-bold tracking-[.1em] text-pink-500 uppercase">Our work</h2>
							<p className="font-heading text-[clamp(36px,4vw,56px)] leading-[1.12] font-normal tracking-[-0.02em] text-ink-900">
								Real homes. Real results.
							</p>
						</div>
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-[26px] py-[13px] text-sm font-semibold whitespace-nowrap text-white no-underline transition-all duration-200 ease-(--ease-out) hover:bg-pink-500"
						>
							Read our blog <ArrowRight size={15} />
						</Link>
					</div>

					<div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-[220px_220px_300px]">
						{gallery.map((img) => (
							<div
								key={img.src}
								className={`overflow-hidden rounded-[22px] shadow-[0_12px_32px_rgba(30,62,162,0.10)] max-md:h-[220px] ${img.className}`}
							>
								<img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
							</div>
						))}

						<div className="flex flex-col items-start justify-end rounded-[22px] bg-gradient-to-br from-pink-500 to-pink-600 p-[26px] shadow-[0_12px_32px_rgba(255,80,181,0.30)] md:col-start-3 md:row-start-2">
							<p className="mb-2 text-[11px] font-bold tracking-[.1em] text-white/75 uppercase">
								From our blog
							</p>
							<p className="mb-4 font-heading text-xl leading-[1.3] font-normal text-white">
								Tips, guides &amp; local cleaning stories
							</p>
							<Link
								href="/blog"
								className="inline-flex items-center gap-1.5 rounded-full bg-white px-[18px] py-2.5 text-[13px] font-bold text-pink-500 no-underline transition-colors hover:bg-ink-900 hover:text-white"
							>
								Read articles <ArrowRight size={13} />
							</Link>
						</div>

						<div className="overflow-hidden rounded-[22px] shadow-[0_12px_32px_rgba(30,62,162,0.10)] max-md:h-[220px] md:col-span-4 md:row-start-3">
							<img
								src="/img/aw1a0732.jpg"
								alt="Cleaning Paradise team at work in a home in Lynnwood, WA"
								loading="lazy"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* ═══ CTA BAND ═══ */}
			<section className="bg-white px-6 py-[clamp(56px,7vw,88px)]">
				<div className="mx-auto max-w-[1160px]">
					<div className="relative overflow-hidden rounded-[30px] bg-blue-600 px-10 pt-16 pb-14 text-center">
						<img
							src="/img/logo-watermark-white.png"
							alt=""
							aria-hidden="true"
							className="pointer-events-none absolute top-1/2 -right-20 h-[420px] w-[420px] -translate-y-1/2 object-contain opacity-[0.08] select-none"
						/>
						<div className="relative z-[2]">
							<h2 className="mb-3.5 font-heading text-[clamp(32px,4.2vw,52px)] leading-[1.1] font-normal italic text-white">
								Not sure which one fits?
							</h2>
							<p className="mx-auto mb-[30px] max-w-[520px] text-[16.5px] leading-[1.7] text-white/82 text-pretty">
								Send us a few details about your place and we will tell you which cleaning you
								actually need.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-3">
								<Link
									href="/contact"
									className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-[34px] py-[15px] text-base font-bold text-white no-underline shadow-[0_8px_24px_rgba(255,80,181,0.32)] transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:bg-pink-600"
								>
									Request a free quote <ArrowRight size={16} />
								</Link>
								<a
									href="tel:+14256100241"
									className="inline-flex items-center gap-2 rounded-full border border-white/25 px-[30px] py-3.5 text-base font-semibold text-white no-underline transition-colors hover:border-white/50 hover:bg-white/10"
								>
									<Phone size={16} />
									(425) 610-0241
								</a>
							</div>
							<p className="mx-auto mt-[30px] max-w-[640px] text-[13px] leading-[1.9] text-white/60">
								Serving{" "}
								{Object.values(locations).map((city, i, all) => (
									<span key={city.slug}>
										<Link
											href={`/locations/${city.slug}`}
											className="text-[#E3E6F3] no-underline hover:text-pink-500"
										>
											{city.name}
										</Link>
										{i < all.length - 2 ? ", " : i === all.length - 2 ? " and " : "."}
									</span>
								))}
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
