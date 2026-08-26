import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	AppWindow,
	ArrowRight,
	Bath,
	BedDouble,
	ChevronDown,
	Footprints,
	Grid2x2,
	House,
	HardHat,
	ListChecks,
	Microwave,
	Phone,
	Refrigerator,
	Sofa,
	Sparkles,
	Utensils,
	WashingMachine,
	type LucideIcon,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
	findChecklist,
	type AddonIcon,
	type NotePart,
	type RoomIcon,
} from "./checklists-data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";

const roomIcons: Record<RoomIcon, LucideIcon> = {
	utensils: Utensils,
	sofa: Sofa,
	bath: Bath,
	"bed-double": BedDouble,
	"washing-machine": WashingMachine,
	footprints: Footprints,
	sparkles: Sparkles,
};

const addonIcons: Record<AddonIcon, LucideIcon> = {
	refrigerator: Refrigerator,
	microwave: Microwave,
	"grid-2x2": Grid2x2,
	"app-window": AppWindow,
	sparkles: Sparkles,
	home: House,
};

// No generateStaticParams here on purpose. The parent [slug] segment has one, so
// Next would call this per service and, for the services with no checklist, pass
// the parent params through with `checklist` undefined — which fails the build
// ("A required parameter (checklist) was not provided as a string"). These four
// pages render on demand and cache instead; findChecklist below 404s anything
// that isn't a real service/checklist pair, so no bogus combination is indexable.

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; checklist: string }>;
}): Promise<Metadata> {
	const { slug, checklist } = await params;
	const page = findChecklist(slug, checklist);
	if (!page) return {};
	const url = `${base}/cleaning-services-in-wa/${slug}/${checklist}`;
	return {
		title: page.metaTitle,
		description: page.description,
		alternates: { canonical: `/cleaning-services-in-wa/${slug}/${checklist}` },
		openGraph: {
			type: "article",
			siteName: "Cleaning Paradise",
			title: page.metaTitle,
			description: page.description,
			url,
		},
		// Placeholders stay out of the index until their rooms are written.
		...(page.rooms ? {} : { robots: { index: false, follow: true } }),
	};
}

function Footnote({ parts }: { parts: NotePart[] }) {
	return (
		<p className="mt-4 px-2.5 text-[11.5px] leading-[1.55] text-[#808098] italic">
			{parts.map((part, i) =>
				typeof part === "string" ? (
					part
				) : (
					<Link key={i} href={part.href} className="font-semibold text-ink-900 not-italic hover:text-pink-500">
						{part.label}
					</Link>
				),
			)}
		</p>
	);
}

function SectionPill({ children }: { children: React.ReactNode }) {
	return (
		<p className="relative z-[2] inline-block rounded-full bg-pink-500 px-8 py-2.5 text-sm font-bold tracking-[.12em] text-white shadow-[0_6px_18px_rgba(255,80,181,.32)]">
			{children}
		</p>
	);
}

export default async function ChecklistPage({
	params,
}: {
	params: Promise<{ slug: string; checklist: string }>;
}) {
	const { slug, checklist } = await params;
	const page = findChecklist(slug, checklist);
	if (!page) notFound();

	const url = `${base}/cleaning-services-in-wa/${slug}/${checklist}`;
	const servicePath = `/cleaning-services-in-wa/${slug}`;

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
						{
							"@type": "ListItem",
							position: 3,
							name: "Cleaning Checklists",
							item: `${base}/cleaning-services-in-wa/checklists`,
						},
						{ "@type": "ListItem", position: 4, name: page.name, item: url },
					],
				}}
			/>
			{page.rooms && (
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "ItemList",
						name: page.name,
						description: page.description,
						url,
						itemListElement: page.rooms.map((room, i) => ({
							"@type": "ListItem",
							position: i + 1,
							name: room.title,
							description: (room.items ?? room.groups?.flatMap((g) => g.items) ?? []).join(". "),
						})),
					}}
				/>
			)}

			{/* ═══ HERO ═══ */}
			<section className="border-b border-ink-200 bg-white px-6 pt-[clamp(110px,11vw,150px)] pb-[clamp(56px,7vw,80px)] text-center">
				<div className="mx-auto max-w-[1000px]">
					<nav aria-label="Breadcrumb" className="mb-5">
						<ol className="flex flex-wrap items-center justify-center gap-2 text-[12.5px] font-semibold">
							<li>
								<Link
									href="/cleaning-services-in-wa"
									className="text-[#808098] no-underline transition-colors hover:text-pink-500"
								>
									Services
								</Link>
							</li>
							<li aria-hidden="true" className="text-ink-300">/</li>
							<li>
								<Link
									href="/cleaning-services-in-wa/checklists"
									className="text-[#808098] no-underline transition-colors hover:text-pink-500"
								>
									Checklists
								</Link>
							</li>
							<li aria-hidden="true" className="text-ink-300">/</li>
							<li aria-current="page" className="text-ink-900">{page.name}</li>
						</ol>
					</nav>

					<p className="mb-[22px] inline-flex items-center gap-[7px] rounded-full bg-pink-500/15 px-4 py-2 text-[11.5px] font-semibold tracking-[.06em] text-pink-500 uppercase">
						<ListChecks size={13} />
						{page.badge}
					</p>
					<h1 className="mb-6 font-heading text-[clamp(38px,5.4vw,70px)] leading-[1.06] font-normal tracking-[-0.025em] text-ink-900 text-pretty">
						{page.heading}
					</h1>
					<p className="mx-auto max-w-[760px] text-[18px] leading-[1.7] text-[#606078] text-pretty">
						{page.lead}
					</p>
					<div className="mt-[30px] flex flex-wrap items-center justify-center gap-3">
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-8 py-[15px] text-base font-semibold text-white no-underline shadow-[0_8px_24px_rgba(255,80,181,0.30)] transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:bg-pink-600"
						>
							Contact us
						</Link>
						<Link
							href={servicePath}
							className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink-200 bg-white px-[30px] py-3.5 text-base font-semibold text-ink-900 no-underline transition-colors hover:border-pink-500 hover:text-pink-500"
						>
							{page.serviceLinkLabel}
						</Link>
					</div>
					<p className="mt-[26px] text-[15px] text-[#808098]">
						Same-week availability · Licensed &amp; Insured · 100% satisfaction guarantee
					</p>
				</div>
			</section>

			{!page.rooms ? (
				/* ═══ PLACEHOLDER — checklist not written yet ═══ */
				<section className="bg-white px-6 py-[clamp(56px,7vw,88px)]">
					<div className="mx-auto max-w-[640px] text-center">
						<div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50">
							<HardHat size={24} className="text-pink-500" />
						</div>
						<h2 className="mb-4 font-heading text-[clamp(26px,3vw,38px)] leading-[1.15] font-normal text-ink-900">
							This checklist is on its way
						</h2>
						<p className="mb-8 text-[15.5px] leading-[1.75] text-ink-600 text-pretty">
							We&apos;re writing it out room by room. In the meantime, compare all four services on
							the checklists hub or ask us what&apos;s included.
						</p>
						<Link
							href="/cleaning-services-in-wa/checklists"
							className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3.5 text-[15px] font-bold text-white no-underline transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:bg-pink-600"
						>
							<ListChecks size={16} />
							Compare all checklists
						</Link>
					</div>
				</section>
			) : (
				<main className="bg-white px-6 pb-[clamp(40px,5vw,64px)]">
					<div className="mx-auto flex max-w-[1040px] flex-col gap-5 pt-[clamp(28px,4vw,44px)]">
						{/* ═══ ROOMS ═══ */}
						{page.rooms.map((room, i) => {
							const RoomIconCmp = roomIcons[room.icon];
							return (
								<details
									key={room.title}
									open={i === 0}
									className="group overflow-hidden rounded-[14px] border border-[#EFEFF4] bg-white"
								>
									<summary className="flex cursor-pointer list-none items-center gap-[11px] border-b border-[#F4F4F8] px-[22px] py-4 text-[15px] font-semibold tracking-[.06em] text-ink-900 uppercase transition-colors hover:bg-[#FDF6FA] [&::-webkit-details-marker]:hidden">
										<RoomIconCmp size={18} className="shrink-0 text-pink-500" />
										<h2 className="flex-1 text-[15px] font-semibold tracking-[.06em] uppercase">
											{room.title}
										</h2>
										<ChevronDown
											size={18}
											className="shrink-0 text-pink-500 transition-transform duration-200 group-open:rotate-180"
										/>
									</summary>
									<div className="px-6 pt-[18px] pb-5">
										{(room.groups ?? [{ title: "", items: room.items ?? [] }]).map((group) => (
											<div key={group.title} className="mb-4 last:mb-0">
												{group.title && (
													<h3 className="mb-2 text-[11px] font-bold tracking-[.1em] text-pink-500 uppercase">
														{group.title}
													</h3>
												)}
												<ul className="sm:columns-2 sm:gap-10">
													{group.items.map((item) => (
														<li key={item} className="mb-2 flex gap-[9px] break-inside-avoid">
															<span aria-hidden="true" className="shrink-0 text-[13px] leading-[1.62] font-bold text-pink-500">
																✓
															</span>
															<span className="text-sm leading-[1.52] text-ink-600">{item}</span>
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								</details>
							);
						})}

						{/* ═══ ADD-ONS ═══ */}
						{page.addons && (
							<section className="mt-4 text-center">
								<SectionPill>ADD-ONS (FLAT RATE)</SectionPill>
								<div className="-mt-5 rounded-[20px] border-[1.5px] border-[#FFC2E5] bg-white px-[22px] pt-10 pb-[26px]">
									<div
									className={`grid grid-cols-2 ${page.addons.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4"}`}
								>
										{page.addons.map((addon, i) => {
											const AddonIconCmp = addonIcons[addon.icon];
											return (
												<div
													key={addon.label}
													className={`px-3.5 text-center ${i % 2 === 1 ? "border-l border-[#FFDDF1]" : ""} ${i > 0 ? "md:border-l md:border-[#FFDDF1]" : ""
														} ${i > 1 ? "mt-6 md:mt-0" : ""}`}
												>
													<AddonIconCmp
														size={34}
														strokeWidth={1.5}
														className="mx-auto text-blue-600"
													/>
													<h3 className="mt-3 min-h-[34px] text-[12.5px] font-bold tracking-[.06em] text-ink-900 uppercase">
														{addon.label}
													</h3>
													{addon.price && (
														<p className="mt-1.5 text-2xl leading-[1.1] font-bold text-pink-500">
															{addon.price}
														</p>
													)}
													{addon.note && (
														<p className="mt-[3px] text-[10.5px] font-medium text-[#808098]">
															{addon.note}
														</p>
													)}
													{addon.lines && (
														<p className="mt-2 text-xs leading-[1.8] text-ink-900">
															{addon.lines.map((l) => (
																<span key={l.label} className="block">
																	{l.label} <b className="text-pink-500">{l.value}</b>
																</span>
															))}
														</p>
													)}
												</div>
											);
										})}
									</div>
								</div>
								{page.addonsNote && <Footnote parts={page.addonsNote} />}
							</section>
						)}

						{/* ═══ SPECIALTY SERVICES ═══ */}
						{page.specialty && (
							<section className="mt-4 text-center">
								<SectionPill>SPECIALTY SERVICES (BY REQUEST)</SectionPill>
								<div className="-mt-5 rounded-[20px] border-[1.5px] border-[#FFC2E5] bg-white px-[26px] pt-10 pb-[26px]">
									<dl className="grid grid-cols-1 gap-x-[52px] text-left md:grid-cols-2">
										{page.specialty.map((s) => (
											<div
												key={s.label}
												className="flex items-baseline justify-between border-b border-dashed border-[#FFC2E5] px-0.5 py-3 last:border-b-0"
											>
												<dt className="text-[15px] font-semibold text-ink-900">{s.label}</dt>
												<dd
													className={`pl-4 whitespace-nowrap text-pink-500 ${s.quote
														? "text-[13.5px] font-semibold italic"
														: "text-[16.5px] font-bold"
														}`}
												>
													{s.value}
												</dd>
											</div>
										))}
									</dl>
								</div>
								{page.specialtyNote && <Footnote parts={page.specialtyNote} />}
							</section>
						)}

						{/* ═══ SERVICE NOTES ═══ */}
						{page.notes && (
							<section className="mt-6">
								<h2 className="mb-[22px] border-l-[5px] border-pink-500 pl-3 text-[13px] font-bold tracking-[.14em] text-ink-900 uppercase">
									Service Notes
								</h2>
								<div className="grid grid-cols-1 gap-[clamp(24px,3vw,44px)] md:grid-cols-3">
									{page.notes.map((group) => (
										<div key={group.title}>
											<h3 className="mb-3 text-[11px] font-bold tracking-[.1em] text-pink-500 uppercase">
												{group.title}
											</h3>
											<ul className="flex flex-col gap-[9px]">
												{group.items.map((item) => (
													<li key={item} className="flex gap-2.5">
														<span
															aria-hidden="true"
															className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-pink-500"
														/>
														<span className="text-[12.5px] leading-[1.6] text-ink-600 text-pretty">
															{item}
														</span>
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							</section>
						)}

						{/* ═══ BOOK BAND ═══ */}
						<section className="mt-[34px] border-t-2 border-[#FFC2E5] pt-[26px] text-center">
							<p className="text-[17px] font-bold text-pink-500">
								{page.bookLine ?? "Ready to book? We'd love to help."}
							</p>
							<div className="mt-5 flex flex-wrap items-center justify-center gap-3">
								<Link
									href="/contact"
									className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-[30px] py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_8px_24px_rgba(255,80,181,0.30)] transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:bg-pink-600"
								>
									Contact us <ArrowRight size={16} />
								</Link>
								<a
									href="tel:+14256100241"
									className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink-200 bg-white px-[26px] py-[13px] text-[15px] font-semibold text-ink-900 no-underline transition-colors hover:border-pink-500 hover:text-pink-500"
								>
									<Phone size={15} />
									(425) 610-0241
								</a>
							</div>
						</section>
					</div>
				</main>
			)}
		</div>
	);
}
