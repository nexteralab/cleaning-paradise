import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRight,
	Award,
	BadgeDollarSign,
	Calendar,
	CalendarClock,
	Leaf,
	MapPin,
	Tag,
	Users,
	Wrench,
	type LucideIcon,
} from "lucide-react";
import { BeforeAfterSlider, StatsVideoSection, FaqSection, CityMapSection } from "./client";

export const metadata: Metadata = {
	title: "Service Areas | Cleaning Paradise — A Spotless Home in Greater Seattle",
	description:
		"Trusted, local cleaning teams in 8 cities across King & Snohomish County. Licensed, insured and same-week available — pick your city and book a free quote in minutes.",
};

/* ---------- Services ---------- */

const SERVICES = [
	{
		img: "/img/move-in.jpg",
		alt: "Standard cleaning",
		title: "Standard Cleaning",
		desc: "Recurring upkeep for kitchens, baths, living areas and bedrooms — week after week.",
	},
	{
		img: "/img/deep-cleaning.jpg",
		alt: "Deep cleaning",
		title: "Deep Cleaning",
		desc: "Top-to-bottom reset: baseboards, appliances, grout and every overlooked corner.",
	},
	{
		img: "/img/comercial-cleaning.webp",
		alt: "Commercial cleaning",
		title: "Commercial Cleaning",
		desc: "Offices and workspaces across the metro — productive, hygienic and client-ready.",
	},
	{
		img: "/img/aw1a0626-scaled.jpg",
		alt: "Move in / out",
		title: "Move In / Out",
		desc: "Detailed cleaning before you hand over the keys or settle into your new home.",
	},
	{
		img: "/img/gemini_generated_image_67heuh67heuh67he.webp",
		alt: "Packing and unpacking",
		title: "Packing & Unpacking",
		desc: "Professional packing and unpacking to take the stress out of moving day.",
	},
	{
		img: "/img/carpet-cleaning.webp",
		alt: "Carpet cleaning",
		title: "Carpet Cleaning",
		desc: "Deep extraction that lifts allergens, pet dander and embedded dirt — freshness restored.",
	},
];

/* ---------- Why choose us features ---------- */

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
	{
		icon: Wrench,
		title: "Professional Equipment",
		desc: "We use commercial-grade tools and EPA-approved products — the same ones used in hospitals and hotels — so results go beyond what a standard mop and bucket can achieve.",
	},
	{
		icon: Award,
		title: "10+ Years of Experience",
		desc: "A decade of cleaning Seattle-area homes means we know what local homeowners actually need: how to handle Pacific Northwest moisture, older home layouts, and pet households.",
	},
	{
		icon: BadgeDollarSign,
		title: "Transparent Pricing",
		desc: "No hidden fees, no surprise charges. Standard cleaning starts at $55/hr per person. You get a clear quote before we ever step through your door.",
	},
	{
		icon: Users,
		title: "Vetted, Trained Staff",
		desc: "Every cleaner on our team goes through a rigorous hiring process, background check, and hands-on training. You let someone into your home — that person needs to earn that trust.",
	},
	{
		icon: Leaf,
		title: "Eco-Friendly Products",
		desc: "We use biodegradable, non-toxic cleaning solutions safe for kids, pets, and sensitive surfaces. Your home will be clean — without the chemical smell.",
	},
	{
		icon: CalendarClock,
		title: "Flexible Scheduling",
		desc: "Mornings, evenings, Saturdays — we work around your schedule, not the other way around. Same-week availability often possible.",
	},
];

/* ---------- Blog posts ---------- */

const POSTS = [
	{
		href: "/blog/how-to-deep-clean-your-home-this-spring",
		img: "/img/aw1a0547.jpg",
		tagIcon: Tag,
		tag: "Cleaning Tips",
		tagClass: "text-pink-500",
		kicker: "Spring Cleaning Guide",
		title: "How to Deep Clean Your Home This Spring",
		date: "March 15, 2026",
		dateIconClass: "text-pink-500",
	},
	{
		href: "/blog/green-cleaning-products-that-actually-work",
		img: "/img/aw1a0550.jpg",
		tagIcon: Leaf,
		tag: "Eco-Friendly",
		tagClass: "text-blue-600",
		kicker: "Sustainable Living",
		title: "Green Cleaning Products That Actually Work",
		date: "March 8, 2026",
		dateIconClass: "text-blue-600",
	},
	{
		href: "/blog/cleaning-seattles-historic-homes",
		img: "/img/aw1a0562.jpg",
		tagIcon: MapPin,
		tag: "Local Stories",
		tagClass: "text-pink-500",
		kicker: "Community Spotlight",
		title: "Cleaning Seattle's Historic Homes",
		date: "February 28, 2026",
		dateIconClass: "text-pink-500",
	},
];

export default function ServiceAreasPage() {
	return (
		<div className="relative w-full overflow-x-clip bg-white text-ink-800">
			{/* ========== HERO / BEFORE-AFTER ========== */}
			<section id="top" className="bg-white p-6">
				<div className="relative rounded-[30px] overflow-hidden bg-[radial-gradient(120%_130%_at_0%_0%,#FFF0F9_0%,#EEF2FF_55%,#F6F7FB_100%)] pt-[clamp(96px,9vw,116px)] px-[clamp(28px,5vw,72px)] pb-[clamp(44px,6vw,72px)]">
					<div className="absolute -top-[70px] right-[7%] w-[200px] h-[200px] rounded-full bg-[rgba(255,80,181,0.10)] pointer-events-none" />
					<div className="absolute -bottom-[50px] -left-10 w-[170px] h-[170px] rounded-full bg-[rgba(30,62,162,0.08)] pointer-events-none" />
					<div className="relative flex flex-wrap gap-[clamp(32px,5vw,60px)] items-center max-w-[1240px] mx-auto">
						{/* LEFT: copy */}
						<div className="flex-[1_1_430px] min-w-[300px]">
							<div className="mb-[22px]">
								<span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-600 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full">
									<MapPin size={13} />
									Local cleaning services
								</span>
							</div>
							<h1 className="text-[clamp(36px,4.6vw,60px)] font-normal leading-[1.08] text-ink-900 tracking-[-0.03em] mb-5">
								A spotless home, right here in Greater{" "}
								<span className="underline decoration-pink-500 underline-offset-[6px] decoration-[3px]">
									Seattle
								</span>
							</h1>
							<p className="text-[clamp(16px,1.4vw,18px)] text-[#5A5A6E] leading-[1.75] max-w-[520px] mb-[30px]">
								Trusted, local cleaning teams in 8 cities across King &amp; Snohomish County. Licensed,
								insured and same-week available — pick your city and book a free quote in minutes.
							</p>
							<div className="flex gap-[13px] flex-wrap mb-[26px]">
								<Link
									href="/#book"
									className="inline-flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white font-semibold text-[15px] px-8 h-[54px] rounded-full shadow-pink transition-all duration-200"
								>
									Get my free quote
								</Link>
								<a
									href="tel:+14256100241"
									className="inline-flex items-center justify-center bg-white border-[1.5px] border-ink-200 hover:border-pink-500 text-ink-800 font-semibold text-[15px] px-8 h-[54px] rounded-full transition-all duration-200"
								>
									Call (425) 610-0241
								</a>
							</div>
							<div className="flex flex-wrap gap-2.5">
								<span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full">
									<span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
									Licensed &amp; insured
								</span>
								<span className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full">
									<span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
									4.9★ on Google
								</span>
								<span className="inline-flex items-center gap-2 bg-ink-50 text-ink-600 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full">
									<span className="w-1.5 h-1.5 rounded-full bg-ink-600" />
									Same-week availability
								</span>
							</div>
						</div>

						{/* RIGHT: before/after slider */}
						<BeforeAfterSlider />
					</div>
				</div>
			</section>

			{/* ========== STATS VIDEO ========== */}
			<StatsVideoSection />

			{/* ========== NUESTROS SERVICIOS ========== */}
			<section id="services" className="py-[clamp(64px,8vw,104px)] bg-ink-50">
				<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
					<div className="text-center mb-12">
						<div className="mb-4">
							<span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-600 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full">
								Nuestros Servicios
							</span>
						</div>
						<h2 className="text-[clamp(30px,3.4vw,46px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.12] mb-[14px]">
							<span className="font-serif italic font-normal">Limpieza </span>para cada hogar
						</h2>
						<p className="text-[16.5px] text-ink-600 leading-[1.7] max-w-[560px] mx-auto">
							Desde mantenimiento semanal hasta una limpieza profunda post-mudanza — el mismo equipo local
							de confianza, para lo que necesites.
						</p>
						<p className="text-[15.5px] text-ink-600 leading-[1.85] max-w-[720px] mx-auto mt-5">
							Whether you need a one-time deep-clean before a home inspection, recurring housekeeping that
							keeps your kitchen and bathrooms sparkling all year, or professional sanitization after
							illness — our local maids show up prepared, trained, and ready.
						</p>
					</div>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
						{SERVICES.map((svc) => (
							<div
								key={svc.title}
								className="bg-white rounded-[20px] overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg"
							>
								<img src={svc.img} alt={svc.alt} className="w-full h-[206px] object-cover block" />
								<div className="px-6 pt-6 pb-[26px]">
									<h3 className="text-xl font-semibold text-blue-600 tracking-[-0.01em] mb-[9px]">
										{svc.title}
									</h3>
									<p className="text-sm text-blue-600 leading-[1.7] mb-4">{svc.desc}</p>
									<Link
										href="/#book"
										className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-pink-500 no-underline"
									>
										Book now <ArrowRight size={14} />
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ========== WHY CHOOSE US ========== */}
			<section id="why" className="py-24 bg-white border-t border-ink-200">
				<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
					{/* Header asymmetric */}
					<div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-14 items-end mb-[62px]">
						<div>
							<div className="inline-flex items-center gap-[11px] text-xs font-bold text-pink-500 uppercase tracking-[.14em] mb-[22px]">
								<span className="w-7 h-[1.5px] bg-pink-500 inline-block" />
								Why choose us
							</div>
							<h2 className="font-serif text-[clamp(40px,4.5vw,64px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.12]">
								Why Seattle Families Choose{" "}
								<span className="bg-[linear-gradient(104deg,rgba(255,80,181,0)_0.9%,rgba(255,80,181,0.35)_2.4%,rgba(255,80,181,0.35)_97.6%,rgba(255,80,181,0)_99.1%)] px-[5px] pb-[3px] rounded-[3px]">
									Cleaning Paradise
								</span>
							</h2>
						</div>
						<p className="text-[16.5px] text-ink-600 leading-[1.95] pb-2.5">
							We've spent 10+ years earning the trust of homeowners across King and Snohomish County.
							Here's what sets us apart from other cleaning companies in Seattle:
						</p>
					</div>

					{/* Photo strip */}
					<div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-4 md:h-[clamp(240px,29vw,360px)] mb-[84px]">
						<div className="rounded-[22px] overflow-hidden shadow-[0_26px_60px_rgba(30,62,162,0.10)] h-[240px] md:h-full">
							<img
								src="/img/pasted-1782782341097-0.webp"
								alt="Seattle neighborhood"
								className="w-full h-full object-cover block"
							/>
						</div>
						<div className="rounded-[22px] overflow-hidden shadow-[0_26px_60px_rgba(30,62,162,0.10)] h-[240px] md:h-full">
							<img
								src="/img/aw1a0619.jpg"
								alt="Sparkling kitchen"
								className="w-full h-full object-cover block"
							/>
						</div>
						<div className="rounded-[22px] overflow-hidden shadow-[0_26px_60px_rgba(30,62,162,0.10)] h-[240px] md:h-full">
							<img
								src="/img/aw1a0659.jpg"
								alt="Happy client"
								className="w-full h-full object-cover block"
							/>
						</div>
					</div>

					{/* Features 2-col */}
					<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20">
						{FEATURES.map(({ icon: Icon, title, desc }) => (
							<div key={title} className="flex gap-6 py-[42px] border-t border-ink-200">
								<div className="shrink-0 w-[50px] h-[50px] rounded-[15px] bg-pink-50 text-pink-500 flex items-center justify-center">
									<Icon size={27} />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-ink-900 leading-[1.4] tracking-[-0.01em] mb-[14px]">
										{title}
									</h3>
									<p className="text-[14.5px] text-ink-600 leading-[1.95]">{desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ========== FAQs ========== */}
			<FaqSection />

			{/* ========== MAP / CITY SELECTOR ========== */}
			<CityMapSection />

			{/* ========== BLOG INVITATION ========== */}
			<section id="blog" className="py-[clamp(64px,8vw,104px)] bg-pink-50">
				<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
					<div className="text-center mb-[52px]">
						<div className="text-xs font-bold text-pink-500 uppercase tracking-[.1em] mb-[14px]">
							From the blog
						</div>
						<h2 className="font-serif text-[clamp(36px,4.5vw,60px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.15] mb-4">
							Cleaning Tips &amp; <span className="italic">Local Stories</span>
						</h2>
						<p className="text-[16.5px] text-ink-600 leading-[1.7] max-w-[540px] mx-auto">
							Expert advice on maintaining your Seattle-area home — seasonal guides, eco tips, and stories
							from the neighborhoods we serve.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						{POSTS.map((post) => {
							const TagIcon = post.tagIcon;
							return (
								<Link
									key={post.title}
									href={post.href}
									className="block no-underline text-inherit transition-transform duration-300 hover:-translate-y-1.5"
								>
									<div className="relative w-full h-[280px] rounded-[20px] overflow-hidden mb-[22px] bg-[#f0f0f5]">
										<img
											src={post.img}
											alt={post.title}
											className="w-full h-full object-cover block"
										/>
										<div
											className={`absolute top-[14px] left-[14px] inline-flex items-center gap-[5px] bg-white/95 text-[11px] font-bold tracking-[.06em] uppercase px-[11px] py-[5px] rounded-full ${post.tagClass}`}
										>
											<TagIcon size={11} />
											{post.tag}
										</div>
									</div>
									<div className="text-[11.5px] font-bold text-[#A0A0AE] uppercase tracking-[.06em] mb-2">
										{post.kicker}
									</div>
									<h3 className="font-serif text-2xl font-normal leading-[1.3] text-ink-900 tracking-[-0.01em] mb-2.5">
										{post.title}
									</h3>
									<div className="flex items-center gap-[7px] text-[13px] text-[#808098]">
										<Calendar size={13} className={post.dateIconClass} />
										{post.date}
									</div>
								</Link>
							);
						})}
					</div>

					<div className="text-center">
						<Link
							href="/blog"
							className="inline-flex items-center gap-[9px] bg-ink-900 text-white font-semibold text-[15px] px-[30px] py-[14px] rounded-full no-underline transition-all duration-200 hover:bg-pink-500 hover:shadow-[0_10px_28px_rgba(255,80,181,0.30)]"
						>
							Read all articles <ArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
