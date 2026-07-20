import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArrowRight,
	Calendar,
	CircleCheck,
	Leaf,
	MapPin,
	Navigation,
	Star,
	Tag,
	Users,
	type LucideIcon,
} from "lucide-react";
import { CitySelector, FaqAccordion, HeroSlider } from "./client-sections";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import WhyChooseUs from "@/components/WhyChooseUs";
import { locations, locationSlugs } from "../locations-data";

export function generateStaticParams() {
	return locationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const loc = locations[slug];
	if (!loc) return {};
	return {
		title: `House Cleaning Services in ${loc.name}, WA | Cleaning Paradise`,
		description: `Your local maids in ${loc.name}, WA. Cleaning Paradise offers licensed, insured residential and commercial cleaning with same-week availability and a 100% satisfaction guarantee.`,
	};
}

type HeroBadge = { label: string; classes: string; dot?: string };

const heroBadges: HeroBadge[] = [
	{ label: "Licensed, insured & bonded", classes: "bg-blue-50 text-blue-600", dot: "bg-blue-600" },
	{ label: "4.9★ on Google", classes: "bg-pink-500/15 text-pink-500", dot: "bg-pink-500" },
	{ label: "Same-week availability", classes: "bg-ink-100 text-ink-600", dot: "bg-ink-500" },
];

type Service = {
	title: string;
	description: string;
	img: string;
	alt: string;
	href: string;
};

const services: Service[] = [
	{
		title: "Standard Cleaning",
		description:
			"Recurring upkeep for kitchens, baths, living areas and bedrooms — week after week.",
		img: "/img/move-in.jpg",
		alt: "Standard cleaning",
		href: "/cleaning-services-in-wa/standard-cleaning",
	},
	{
		title: "Deep Cleaning",
		description:
			"Top-to-bottom reset: baseboards, appliances, grout and every overlooked corner.",
		img: "/img/deep-cleaning.jpg",
		alt: "Deep cleaning",
		href: "/cleaning-services-in-wa/deep-cleaning",
	},
	{
		title: "Commercial Cleaning",
		description:
			"Offices and workspaces across the metro — productive, hygienic and client-ready.",
		img: "/img/comercial-cleaning.webp",
		alt: "Commercial cleaning",
		href: "/cleaning-services-in-wa/commercial-cleaning",
	},
	{
		title: "Move In / Out",
		description:
			"Detailed cleaning before you hand over the keys or settle into your new home.",
		img: "/img/aw1a0626-scaled.jpg",
		alt: "Move in / out",
		href: "/cleaning-services-in-wa/move-in-out",
	},
	{
		title: "Packing & Unpacking",
		description: "Professional packing and unpacking to take the stress out of moving day.",
		img: "/img/gemini_generated_image_67heuh67heuh67he.webp",
		alt: "Packing and unpacking",
		href: "/cleaning-services-in-wa/packing-unpacking",
	},
	{
		title: "Carpet Cleaning",
		description:
			"Deep extraction that lifts allergens, pet dander and embedded dirt — freshness restored.",
		img: "/img/carpet-cleaning.webp",
		alt: "Carpet cleaning",
		href: "/cleaning-services-in-wa/carpet-cleaning",
	},
];

type Stat = { icon: LucideIcon; value: string; label: string };

const stats: Stat[] = [
	{ icon: Users, value: "100+", label: "Customers Served" },
	{ icon: CircleCheck, value: "100%", label: "Satisfaction Rate" },
	{ icon: Star, value: "50+", label: "5-star Reviews" },
];


type BlogPost = {
	img: string;
	tag: string;
	tagClasses: string;
	tagIcon: LucideIcon;
	category: string;
	title: string;
	date: string;
	dateIconColor: string;
};

const blogPosts: BlogPost[] = [
	{
		img: "/img/aw1a0547.jpg",
		tag: "Cleaning Tips",
		tagClasses: "text-pink-500",
		tagIcon: Tag,
		category: "Spring Cleaning Guide",
		title: "How to Deep Clean Your Home This Spring",
		date: "March 15, 2026",
		dateIconColor: "text-pink-500",
	},
	{
		img: "/img/aw1a0550.jpg",
		tag: "Eco-Friendly",
		tagClasses: "text-blue-600",
		tagIcon: Leaf,
		category: "Sustainable Living",
		title: "Green Cleaning Products That Actually Work",
		date: "March 8, 2026",
		dateIconColor: "text-blue-600",
	},
	{
		img: "/img/aw1a0562.jpg",
		tag: "Local Stories",
		tagClasses: "text-pink-500",
		tagIcon: MapPin,
		category: "Community Spotlight",
		title: "Cleaning Seattle's Historic Homes",
		date: "February 28, 2026",
		dateIconColor: "text-pink-500",
	},
];


export default async function LocationPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const loc = locations[slug];
	if (!loc) notFound();

	return (
		<div className="relative w-full overflow-x-clip">
			{/* ===== HERO / BEFORE-AFTER ===== */}
			<section id="top" className="bg-white p-6">
				<div className="px-[clamp(28px,5vw,72px)] pt-[clamp(96px,9vw,116px)] pb-[clamp(44px,6vw,72px)]">
					{/* Mobile DOM order (grid-cols-1): h1 → slider → description/buttons.
					    Desktop: copy stacked left, slider right (col/row placement). */}
					<div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-x-[clamp(32px,5vw,60px)] md:gap-y-0">
						{/* h1 block */}
						<Reveal className="md:col-start-1 md:row-start-1 md:self-end">
							<div className="mb-[22px]">
								<span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-4 py-2 text-[11.5px] font-semibold tracking-[0.06em] text-pink-500 uppercase">
									<MapPin size={13} />
									Local cleaning services
								</span>
							</div>
							<h1 className="text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-normal tracking-[-0.03em] text-ink-900 md:mb-5">
								A spotless home, right here in Greater{" "}
								<span className="underline decoration-pink-500 decoration-[3px] underline-offset-[6px]">
									{loc.name}, WA
								</span>
							</h1>
						</Reveal>

						{/* before/after slider (per-city images) */}
						<Reveal
							delay={150}
							className="w-full max-w-[680px] md:col-start-2 md:row-start-1 md:row-span-2 md:justify-self-end"
						>
							<HeroSlider
								before={loc.before}
								after={loc.after}
								beforeAlt={loc.beforeAlt}
								afterAlt={loc.afterAlt}
							/>
						</Reveal>

						{/* description + buttons + trust badges */}
						<Reveal delay={80} className="md:col-start-1 md:row-start-2 md:self-start">
							<p className="mb-[30px] max-w-[520px] text-[clamp(16px,1.4vw,18px)] leading-[1.75] text-[#5A5A6E]">
								Your home deserves a spotless finish and a team you can actually count on. We are
								Cleaning Paradise, your local maids in {loc.name}.
							</p>
							<div className="mb-[26px] flex flex-wrap gap-[13px]">
								<Link
									href="/contact"
									className="inline-flex items-center rounded-full bg-pink-500 px-8 py-[15px] text-[15px] font-bold text-white no-underline transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,80,181,0.4)]"
								>
									Get my free quote
								</Link>
								<a
									href="tel:+14256100241"
									className="inline-flex items-center rounded-full border-2 border-ink-200 bg-white px-[26px] py-[13px] text-[15px] font-semibold text-ink-900 no-underline transition-all duration-200 hover:border-ink-900"
								>
									Call (425) 610-0241
								</a>
							</div>
							<div className="flex flex-wrap gap-2.5">
								{heroBadges.map((b) => (
									<span
										key={b.label}
										className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold ${b.classes}`}
									>
										<span className={`h-1.5 w-1.5 rounded-full ${b.dot}`} />
										{b.label}
									</span>
								))}
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* ===== STATS ===== */}
			<section className="p-6">
				<div className="relative overflow-hidden rounded-[28px] bg-[#0d1020]">
					{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
					<video
						src="/video/kirkland-bg.mp4"
						muted
						loop
						playsInline
						autoPlay
						preload="metadata"
						className="absolute inset-0 h-full w-full object-cover opacity-[0.52]"
					/>
					<div className="pointer-events-none absolute inset-0 bg-[rgba(12,17,38,0.48)]" />
					<div className="relative z-[2] px-[clamp(28px,5vw,72px)] py-[clamp(52px,6.5vw,88px)] text-center">
						<Reveal>
							<h2 className="mb-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-0.02em] text-white">
								<span className="text-[clamp(30px,3.8vw,54px)] font-bold">Trusted.</span>
								<span className="font-heading text-[clamp(30px,3.8vw,54px)] font-normal italic"> Spotless.</span>
								<span className="text-[clamp(30px,3.8vw,54px)] font-bold"> Proven.</span>
							</h2>
						</Reveal>
						<div className="mx-auto grid max-w-[860px] grid-cols-1 gap-[clamp(12px,2vw,22px)] sm:grid-cols-3">
							{stats.map((stat, i) => {
								const Icon = stat.icon;
								return (
									<Reveal
										key={stat.label}
										delay={i * 90}
										className="flex items-center gap-3.5 rounded-2xl border border-white/[0.18] px-[clamp(14px,1.8vw,24px)] py-[clamp(18px,2.2vw,30px)] text-left"
									>
										<div className="shrink-0">
											<Icon size={22} className="text-pink-500" />
										</div>
										<div>
											<CountUp
												value={stat.value}
												className="block text-[clamp(28px,3.2vw,46px)] leading-none font-bold tracking-[-0.03em] text-white"
											/>
											<div className="mt-1.5 text-[clamp(11px,1.1vw,13px)] font-medium text-white/[0.68]">
												{stat.label}
											</div>
										</div>
									</Reveal>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* ===== SERVICES ===== */}
			<section id="services" className="bg-ink-50 py-[clamp(64px,8vw,104px)]">
				<div className="mx-auto max-w-[1360px] px-10 max-md:px-5">
					<Reveal className="mb-12 text-center">
						<div className="mb-4">
							<span className="inline-flex items-center rounded-full bg-pink-500/15 px-4 py-2 text-[11.5px] font-semibold tracking-[0.06em] text-pink-500 uppercase">
								Our Services
							</span>
						</div>
						<h2 className="mb-3.5 text-[clamp(30px,3.4vw,46px)] leading-[1.12] font-normal tracking-[-0.025em] text-ink-900">
							<span className="font-heading italic">Cleaning </span>for every home
						</h2>
						<p className="mx-auto max-w-[560px] text-[15.5px] leading-[1.7] text-ink-600">
							Whether you need a one-time deep-clean before a home inspection, recurring housekeeping
							that keeps your kitchen and bathrooms sparkling all year, or professional sanitization
							after illness — our local maids show up prepared, trained, and ready.
						</p>
					</Reveal>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{services.map((s, i) => (
							<Reveal
								key={s.title}
								delay={(i % 3) * 90}
								className="overflow-hidden rounded-[18px] border-[1.5px] border-ink-200 bg-white shadow-[var(--shadow-sm)] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,62,162,0.12)]"
							>
								{/* Card body → service detail */}
								<Link href={s.href} className="block text-inherit no-underline">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={s.img} alt={s.alt} className="block h-[206px] w-full object-cover" />
									<div className="px-6 pt-6">
										<h3 className="mb-[9px] text-xl font-semibold tracking-[-0.01em] text-blue-600">
											{s.title}
										</h3>
										<p className="text-sm leading-[1.7] text-blue-600">{s.description}</p>
									</div>
								</Link>
								{/* Book now → contact */}
								<div className="px-6 pt-4 pb-[26px]">
									<Link
										href="/contact"
										className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-pink-500 no-underline transition-[gap] duration-200 hover:gap-2.5"
									>
										Book now <ArrowRight size={14} />
									</Link>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ===== WHY CHOOSE US ===== */}
			<WhyChooseUs
				city={loc.name}
				intro={`We have been cleaning homes in ${loc.name} for over 5 years. Our maids are background checked, trained, and genuinely care about leaving your home sparkling. Here is what makes us different.`}
			/>

			{/* ===== FAQs ===== */}
			<section id="faq" className="bg-ink-50 py-24">
				<div className="mx-auto max-w-[820px] px-10 max-md:px-5">
					<Reveal className="mb-11 text-center">
						<div className="mb-[13px] text-[13px] font-bold tracking-[0.1em] text-pink-500 uppercase">
							FAQ
						</div>
						<h2 className="font-heading text-[clamp(36px,4vw,56px)] leading-[1.15] font-normal tracking-[-0.02em] text-ink-900">
							Questions About Our {loc.name} Cleaning Services
						</h2>
					</Reveal>
					<Reveal delay={80}>
						<FaqAccordion />
					</Reveal>
				</div>
			</section>

			{/* ===== MAP / CITY SELECTOR ===== */}
			<section id="areas" className="bg-white py-[clamp(64px,8vw,104px)]">
				<div className="mx-auto max-w-[1360px] px-10 max-md:px-5">
					<Reveal className="mb-[34px] text-center">
						<div className="mb-4">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-2 text-[11.5px] font-semibold tracking-[0.06em] text-blue-600 uppercase">
								<Navigation size={13} />
								Service areas
							</span>
						</div>
						<h2 className="mb-3.5 text-[clamp(30px,3.4vw,46px)] leading-[1.12] font-medium tracking-[-0.025em] text-ink-900">
							Cleaning in your <span className="font-heading font-normal italic">neighborhood</span>
						</h2>
						<p className="mx-auto max-w-[560px] text-[16.5px] leading-[1.7] text-ink-600">
							Pick your city to see local availability, ratings and the neighborhoods our teams cover
							across Greater Seattle.
						</p>
					</Reveal>

					<Reveal delay={80}>
						<CitySelector initial={slug} />
					</Reveal>
				</div>
			</section>

			{/* ===== BLOG INVITATION ===== */}
			<section id="blog" className="bg-pink-50 py-[clamp(64px,8vw,104px)]">
				<div className="mx-auto max-w-[1360px] px-10 max-md:px-5">
					<Reveal className="mb-[52px] text-center">
						<div className="mb-3.5 text-[13px] font-bold tracking-[0.1em] text-pink-500 uppercase">
							From the blog
						</div>
						<h2 className="mb-4 font-heading text-[clamp(36px,4.5vw,60px)] leading-[1.15] font-normal tracking-[-0.025em] text-ink-900">
							Cleaning Tips &amp; <span className="italic">Local Stories</span>
						</h2>
						<p className="mx-auto max-w-[540px] text-[16.5px] leading-[1.7] text-ink-600">
							Expert advice on maintaining your Seattle-area home — seasonal guides, eco tips, and
							stories from the neighborhoods we serve.
						</p>
					</Reveal>

					<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
						{blogPosts.map((post, i) => {
							const TagIcon = post.tagIcon;
							return (
								<Reveal key={post.title} delay={(i % 3) * 90}>
									<Link
										href="/blog"
										className="block text-inherit no-underline transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5"
									>
										<div className="relative mb-[22px] h-[280px] w-full overflow-hidden rounded-[20px] bg-[#f0f0f5]">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={post.img}
												alt={post.title}
												className="block h-full w-full object-cover"
											/>
											<div
												className={`absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-[11px] py-[5px] text-[11px] font-bold tracking-[0.06em] uppercase ${post.tagClasses}`}
											>
												<TagIcon size={11} />
												{post.tag}
											</div>
										</div>
										<div className="mb-2 text-[11.5px] font-bold tracking-[0.06em] text-[#A0A0AE] uppercase">
											{post.category}
										</div>
										<h3 className="mb-2.5 font-heading text-2xl leading-[1.3] font-normal tracking-[-0.01em] text-ink-900">
											{post.title}
										</h3>
										<div className="flex items-center gap-[7px] text-[13px] text-[#808098]">
											<Calendar size={13} className={post.dateIconColor} />
											{post.date}
										</div>
									</Link>
								</Reveal>
							);
						})}
					</div>

					<div className="text-center">
						<Link
							href="/blog"
							className="inline-flex items-center gap-[9px] rounded-full bg-ink-900 px-[30px] py-3.5 text-[15px] font-semibold text-white no-underline transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:bg-pink-500 hover:shadow-[0_10px_28px_rgba(255,80,181,0.30)]"
						>
							Read all articles <ArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
