import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArrowRight,
	Award,
	BadgeDollarSign,
	Calendar,
	CalendarClock,
	CircleCheck,
	Leaf,
	MapPin,
	Navigation,
	Star,
	Tag,
	Users,
	Wrench,
	type LucideIcon,
} from "lucide-react";
import { CitySelector, FaqAccordion, HeroSlider } from "./client-sections";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
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
	{ label: "Licensed & insured", classes: "bg-blue-50 text-blue-600", dot: "bg-blue-600" },
	{ label: "4.9★ on Google", classes: "bg-pink-500/15 text-pink-500", dot: "bg-pink-500" },
	{ label: "Same-week availability", classes: "bg-ink-100 text-ink-600", dot: "bg-ink-500" },
];

type Service = {
	title: string;
	description: string;
	img: string;
	alt: string;
};

const services: Service[] = [
	{
		title: "Standard Cleaning",
		description:
			"Recurring upkeep for kitchens, baths, living areas and bedrooms — week after week.",
		img: "/img/move-in.jpg",
		alt: "Standard cleaning",
	},
	{
		title: "Deep Cleaning",
		description:
			"Top-to-bottom reset: baseboards, appliances, grout and every overlooked corner.",
		img: "/img/deep-cleaning.jpg",
		alt: "Deep cleaning",
	},
	{
		title: "Commercial Cleaning",
		description:
			"Offices and workspaces across the metro — productive, hygienic and client-ready.",
		img: "/img/comercial-cleaning.webp",
		alt: "Commercial cleaning",
	},
	{
		title: "Move In / Out",
		description:
			"Detailed cleaning before you hand over the keys or settle into your new home.",
		img: "/img/aw1a0626-scaled.jpg",
		alt: "Move in / out",
	},
	{
		title: "Packing & Unpacking",
		description: "Professional packing and unpacking to take the stress out of moving day.",
		img: "/img/gemini_generated_image_67heuh67heuh67he.webp",
		alt: "Packing and unpacking",
	},
	{
		title: "Carpet Cleaning",
		description:
			"Deep extraction that lifts allergens, pet dander and embedded dirt — freshness restored.",
		img: "/img/carpet-cleaning.webp",
		alt: "Carpet cleaning",
	},
];

type Stat = { icon: LucideIcon; value: string; label: string };

const stats: Stat[] = [
	{ icon: Users, value: "450+", label: "Customers Served" },
	{ icon: CircleCheck, value: "100%", label: "Satisfaction Rate" },
	{ icon: Star, value: "50+", label: "5-star Reviews" },
];

type Feature = { icon: LucideIcon; title: string; description: string };

const features: Feature[] = [
	{
		icon: Wrench,
		title: "Professional Equipment",
		description:
			"We use commercial-grade tools and EPA-approved products — the same ones used in hospitals and hotels — so results go beyond what a standard mop and bucket can achieve.",
	},
	{
		icon: Award,
		title: "10+ Years of Experience",
		description:
			"A decade of cleaning Seattle-area homes means we know what local homeowners actually need: how to handle Pacific Northwest moisture, older home layouts, and pet households.",
	},
	{
		icon: BadgeDollarSign,
		title: "Transparent Pricing",
		description:
			"No hidden fees, no surprise charges. Standard cleaning starts at $55/hr per person. You get a clear quote before we ever step through your door.",
	},
	{
		icon: Users,
		title: "Vetted, Trained Staff",
		description:
			"Every cleaner on our team goes through a rigorous hiring process, background check, and hands-on training. You let someone into your home — that person needs to earn that trust.",
	},
	{
		icon: Leaf,
		title: "Eco-Friendly Products",
		description:
			"We use biodegradable, non-toxic cleaning solutions safe for kids, pets, and sensitive surfaces. Your home will be clean — without the chemical smell.",
	},
	{
		icon: CalendarClock,
		title: "Flexible Scheduling",
		description:
			"Mornings, evenings, Saturdays — we work around your schedule, not the other way around. Same-week availability often possible.",
	},
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

const whyPhotos = [
	{ src: "/img/pasted-1782782341097-0.webp", alt: "Local neighborhood" },
	{ src: "/img/aw1a0591.jpg", alt: "Sparkling kitchen" },
	{ src: "/img/aw1a0619.jpg", alt: "Happy client" },
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
					<div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-[clamp(32px,5vw,60px)]">
						{/* LEFT: copy */}
						<Reveal className="min-w-[300px] flex-[1_1_430px]">
							<div className="mb-[22px]">
								<span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-4 py-2 text-[11.5px] font-semibold tracking-[0.06em] text-pink-500 uppercase">
									<MapPin size={13} />
									Local cleaning services
								</span>
							</div>
							<h1 className="mb-5 text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-normal tracking-[-0.03em] text-ink-900">
								A spotless home, right here in Greater{" "}
								<span className="underline decoration-pink-500 decoration-[3px] underline-offset-[6px]">
									{loc.name}, WA
								</span>
							</h1>
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

						{/* RIGHT: before/after slider (per-city images) */}
						<Reveal delay={150} className="min-w-[300px] max-w-[680px] flex-[1_1_480px]">
							<HeroSlider
								before={loc.before}
								after={loc.after}
								beforeAlt={loc.beforeAlt}
								afterAlt={loc.afterAlt}
							/>
						</Reveal>
					</div>
				</div>
			</section>

			{/* ===== STATS ===== */}
			<section className="p-6">
				<div className="relative overflow-hidden rounded-[28px] bg-[#0d1020]">
					{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
					<video
						src="https://github.com/nexteralab/cleaning-paradise/raw/refs/heads/main/kirkland-bg.mp4"
						muted
						loop
						playsInline
						autoPlay
						preload="auto"
						className="absolute inset-0 h-full w-full object-cover opacity-[0.52]"
					/>
					<div className="pointer-events-none absolute inset-0 bg-[rgba(12,17,38,0.48)]" />
					<div className="relative z-[2] px-[clamp(28px,5vw,72px)] py-[clamp(52px,6.5vw,88px)] text-center">
						<Reveal>
							<h2 className="mb-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-0.02em] text-white">
								<span className="text-[clamp(30px,3.8vw,54px)] font-bold">Trusted.</span>
								<span className="font-serif text-[clamp(30px,3.8vw,54px)] font-normal italic"> Spotless.</span>
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
				<div className="mx-auto max-w-[1240px] px-10 max-md:px-5">
					<Reveal className="mb-12 text-center">
						<div className="mb-4">
							<span className="inline-flex items-center rounded-full bg-pink-500/15 px-4 py-2 text-[11.5px] font-semibold tracking-[0.06em] text-pink-500 uppercase">
								Nuestros Servicios
							</span>
						</div>
						<h2 className="mb-3.5 text-[clamp(30px,3.4vw,46px)] leading-[1.12] font-normal tracking-[-0.025em] text-ink-900">
							<span className="font-serif italic">Limpieza </span>para cada hogar
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
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={s.img} alt={s.alt} className="block h-[206px] w-full object-cover" />
								<div className="px-6 pt-6 pb-[26px]">
									<h3 className="mb-[9px] text-xl font-semibold tracking-[-0.01em] text-blue-600">
										{s.title}
									</h3>
									<p className="mb-4 text-sm leading-[1.7] text-blue-600">{s.description}</p>
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
			<section id="why" className="border-t border-ink-200 bg-white py-24">
				<div className="mx-auto max-w-[1240px] px-10 max-md:px-5">
					{/* header asymmetric */}
					<Reveal className="mb-[62px] grid grid-cols-1 items-end gap-14 md:grid-cols-[1.05fr_0.95fr]">
						<div>
							<div className="mb-[22px] inline-flex items-center gap-[11px] text-xs font-bold tracking-[0.14em] text-pink-500 uppercase">
								<span className="inline-block h-[1.5px] w-7 bg-pink-500" />
								Why choose us
							</div>
							<h2 className="font-serif text-[clamp(40px,4.5vw,64px)] leading-[1.12] font-normal tracking-[-0.025em] text-ink-900">
								Why {loc.name} Families Choose{" "}
								<span className="rounded-[3px] bg-pink-500/[0.35] px-[5px] pb-[3px]">
									Cleaning Paradise
								</span>
							</h2>
						</div>
						<p className="pb-2.5 text-[16.5px] leading-[1.95] text-ink-600">
							We have been cleaning homes in {loc.name} for over 5 years. Our maids are background
							checked, trained, and genuinely care about leaving your home sparkling. Here is what
							makes us different.
						</p>
					</Reveal>

					{/* photo strip */}
					<div className="mb-[84px] grid h-[clamp(240px,29vw,360px)] grid-cols-1 gap-4 sm:grid-cols-[1.7fr_1fr_1fr]">
						{whyPhotos.map((photo, i) => (
							<Reveal
								key={photo.src}
								delay={i * 100}
								className="overflow-hidden rounded-[22px] shadow-[0_26px_60px_rgba(30,62,162,0.10)] max-sm:h-[240px]"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={photo.src} alt={photo.alt} className="block h-full w-full object-cover" />
							</Reveal>
						))}
					</div>

					{/* features 2-col */}
					<div className="grid grid-cols-1 gap-x-20 md:grid-cols-2">
						{features.map((f, i) => {
							const Icon = f.icon;
							return (
								<Reveal
									key={f.title}
									delay={(i % 2) * 90}
									className="flex gap-6 border-t border-ink-200 py-[42px]"
								>
									<div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-pink-50 text-pink-500">
										<Icon size={27} />
									</div>
									<div>
										<h3 className="mb-3.5 text-xl leading-[1.4] font-semibold tracking-[-0.01em] text-ink-900">
											{f.title}
										</h3>
										<p className="text-[14.5px] leading-[1.95] text-ink-600">{f.description}</p>
									</div>
								</Reveal>
							);
						})}
					</div>
				</div>
			</section>

			{/* ===== FAQs ===== */}
			<section id="faq" className="bg-ink-50 py-24">
				<div className="mx-auto max-w-[820px] px-10 max-md:px-5">
					<Reveal className="mb-11 text-center">
						<div className="mb-[13px] text-xs font-bold tracking-[0.1em] text-pink-500 uppercase">
							FAQ
						</div>
						<h2 className="font-serif text-[clamp(36px,4vw,56px)] leading-[1.15] font-normal tracking-[-0.02em] text-ink-900">
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
				<div className="mx-auto max-w-[1240px] px-10 max-md:px-5">
					<Reveal className="mb-[34px] text-center">
						<div className="mb-4">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-2 text-[11.5px] font-semibold tracking-[0.06em] text-blue-600 uppercase">
								<Navigation size={13} />
								Service areas
							</span>
						</div>
						<h2 className="mb-3.5 text-[clamp(30px,3.4vw,46px)] leading-[1.12] font-medium tracking-[-0.025em] text-ink-900">
							Cleaning in your <span className="font-serif font-normal italic">neighborhood</span>
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
				<div className="mx-auto max-w-[1240px] px-10 max-md:px-5">
					<Reveal className="mb-[52px] text-center">
						<div className="mb-3.5 text-xs font-bold tracking-[0.1em] text-pink-500 uppercase">
							From the blog
						</div>
						<h2 className="mb-4 font-serif text-[clamp(36px,4.5vw,60px)] leading-[1.15] font-normal tracking-[-0.025em] text-ink-900">
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
										<h3 className="mb-2.5 font-serif text-2xl leading-[1.3] font-normal tracking-[-0.01em] text-ink-900">
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
