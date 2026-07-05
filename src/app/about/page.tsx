import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRight,
	ArrowUpRight,
	BadgeCheck,
	CheckCircle,
	Clock,
	Leaf,
	Phone,
	ShieldCheck,
	Sparkles,
	Users,
} from "lucide-react";

export const metadata: Metadata = {
	title: "About Us — Cleaning Paradise",
	description:
		"We clean so you can live freely. Cleaning Paradise was born from a simple belief: every family deserves a spotless home without the stress of doing it themselves. Based in Lynnwood, WA — serving Greater Seattle since 2014.",
};

const stats = [
	{ value: "450+", label: "Homes Cleaned" },
	{ value: "10+", label: "Years of Experience" },
	{ value: "39", label: "5-Star Reviews" },
	{ value: "100%", label: "Satisfaction Guarantee" },
];

const storyParagraphs = [
	"Cleaning Paradise started with one person, a handful of supplies, and a promise: to leave every home better than we found it. What began as a small family operation in Lynnwood quickly grew into a full team through word of mouth alone.",
	"Over a decade later, we serve hundreds of families and businesses across King and Snohomish County. We still operate with that same first-day mentality — attention to detail, respect for your space, and care for the people who live in it.",
	"We're bilingual, locally owned, and deeply proud of the community we serve. When you invite us in, we treat your home like it's our own.",
];

const values: {
	icon: React.ElementType;
	color: "pink" | "blue";
	title: string;
	text: string;
	className: string;
}[] = [
	{
		icon: ShieldCheck,
		color: "pink",
		title: "Trust above all",
		text: "Every team member is background-checked, trained, and held to our standards. You let us into your home — that's something we take seriously.",
		className: "py-10 border-b border-ink-200 md:pr-10 md:border-r",
	},
	{
		icon: Sparkles,
		color: "pink",
		title: "Detail-obsessed",
		text: "We don't cut corners — literally. Baseboards, grout lines, behind appliances. The spots others skip are exactly where we focus.",
		className: "py-10 border-b border-ink-200 md:px-10 md:border-r",
	},
	{
		icon: Leaf,
		color: "pink",
		title: "Eco-conscious",
		text: "Biodegradable, non-toxic products safe for kids, pets, and the planet. Clean shouldn't come with a chemical smell or a guilty conscience.",
		className: "py-10 border-b border-ink-200 md:pl-10",
	},
	{
		icon: Clock,
		color: "blue",
		title: "Always on time",
		text: "We respect your schedule. We show up when we say we will, work efficiently, and never leave your day hanging.",
		className: "py-10 border-b border-ink-200 md:border-b-0 md:pb-0 md:pr-10 md:border-r",
	},
	{
		icon: Users,
		color: "blue",
		title: "Community first",
		text: "Our team lives in the same neighborhoods we clean. We're invested in making Greater Seattle a better place to call home.",
		className: "py-10 border-b border-ink-200 md:border-b-0 md:pb-0 md:px-10 md:border-r",
	},
	{
		icon: BadgeCheck,
		color: "blue",
		title: "Guaranteed results",
		text: "Not satisfied? We come back and fix it at no extra cost. 100% guarantee — no fine print.",
		className: "pt-10 md:pl-10",
	},
];

const teamChecklist = [
	"Background-checked & fully insured",
	"Hands-on training with senior cleaners",
	"Bilingual: English & Spanish",
	"Long-tenured, low-turnover team",
];

const teamPhotos = [
	{ src: "/img/aw1a0547.jpg", className: "" },
	{ src: "/img/aw1a0550.jpg", className: "mt-8" },
	{ src: "/img/aw1a0619.jpg", className: "md:-mt-8" },
	{ src: "/img/aw1a0659.jpg", className: "" },
];

const reviews = [
	{
		quote:
			"“I've had many cleaning companies and Cleaning Paradise is by far the best. Reliable, thorough, and they actually care.”",
		initials: "SR",
		name: "Sarah R.",
		location: "Seattle, WA",
	},
	{
		quote:
			"“Booking was easy, the team was friendly and professional. My house has never been this clean. Will absolutely rebook.”",
		initials: "DM",
		name: "David M.",
		location: "Kirkland, WA",
	},
	{
		quote:
			"“Hablan español, son puntuales y dejan todo impecable. Los recomiendo al 100% a toda la comunidad latina de Seattle.”",
		initials: "LV",
		name: "Lucía V.",
		location: "Lynnwood, WA",
	},
];

function Kicker({ children }: { children: React.ReactNode }) {
	return (
		<div className="text-[12px] font-bold text-pink-500 uppercase tracking-[.12em] mb-5">
			{children}
		</div>
	);
}

export default function AboutPage() {
	return (
		<div className="relative w-full overflow-x-clip bg-white text-ink-800">
			{/* ============ HERO ============ */}
			<section className="px-10 pt-[120px] pb-20 bg-white">
				<div className="max-w-[1240px] mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-14">
						{/* Left: text */}
						<div>
							<div className="text-[12px] font-bold text-pink-500 uppercase tracking-[.12em] mb-[22px]">
								About Us
							</div>
							<h1 className="font-serif text-[clamp(48px,6vw,84px)] font-normal leading-[1.08] text-ink-900 tracking-[-0.025em] mb-7">
								We clean so
								<br />
								you can <span className="italic">live freely</span>
							</h1>
							<p className="text-[18px] text-ink-600 leading-[1.8]">
								Cleaning Paradise was born from a simple belief: every family
								deserves a spotless home without the stress of doing it
								themselves. Based in Lynnwood, WA — serving Greater Seattle
								since 2014.
							</p>
						</div>
						{/* Right: team photo */}
						<div className="rounded-3xl overflow-hidden h-[520px]">
							<img
								src="/img/aw1a0562.jpg"
								alt="The Cleaning Paradise team"
								className="w-full h-full object-cover block"
							/>
						</div>
					</div>

					{/* Divider + quick stats */}
					<div className="border-t border-ink-200 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((s) => (
							<div key={s.label}>
								<div className="font-serif text-[52px] font-normal text-ink-900 leading-none tracking-[-0.02em]">
									{s.value}
								</div>
								<div className="text-[13px] font-semibold text-[#808098] mt-1.5">
									{s.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ============ OUR STORY ============ */}
			<section id="story" className="px-10 py-24 bg-white border-t border-ink-200">
				<div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
					{/* Left: image */}
					<div className="relative">
						<div className="rounded-[20px] overflow-hidden aspect-[4/5]">
							<img
								src="/img/aw1a0626-scaled.jpg"
								alt="Cleaning Paradise team at work"
								className="w-full h-full object-cover block"
							/>
						</div>
						{/* year badge */}
						<div className="absolute -bottom-5 -right-5 bg-ink-900 rounded-2xl px-6 py-[18px]">
							<div className="font-serif text-4xl font-normal text-white leading-none">
								2014
							</div>
							<div className="text-[11px] font-semibold text-ink-400 mt-[3px] uppercase tracking-[.07em]">
								Founded
							</div>
						</div>
					</div>

					{/* Right: text */}
					<div>
						<Kicker>Our story</Kicker>
						<h2 className="font-serif text-[clamp(36px,4vw,56px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.15] mb-8">
							From a single mop to Seattle&apos;s most trusted cleaning crew
						</h2>
						<div className="flex flex-col gap-5">
							{storyParagraphs.map((p, i) => (
								<p key={i} className="text-base text-[#5A5A6E] leading-[1.85]">
									{p}
								</p>
							))}
						</div>
						<div className="mt-9 flex items-center gap-4">
							<img
								src="/img/logo.png"
								alt="Cleaning Paradise"
								className="w-[46px] h-[46px] rounded-full"
							/>
							<div>
								<div className="font-bold text-[15px] text-ink-900">
									Cleaning Paradise LLC
								</div>
								<div className="text-[13px] text-[#909098]">
									Lynnwood, WA · Serving Greater Seattle
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ============ VALUES ============ */}
			<section className="px-10 py-24 bg-white border-t border-ink-200">
				<div className="max-w-[1240px] mx-auto">
					<div className="mb-16">
						<Kicker>What drives us</Kicker>
						<h2 className="font-serif text-[clamp(40px,5vw,68px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.08] max-w-[700px]">
							Our mission is a cleaner, happier home for every Seattle family
						</h2>
					</div>

					{/* Values: editorial list */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
						{values.map((v) => {
							const Icon = v.icon;
							return (
								<div key={v.title} className={v.className}>
									<div
										className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
											v.color === "pink" ? "bg-pink-50" : "bg-blue-50"
										}`}
									>
										<Icon
											size={22}
											className={v.color === "pink" ? "text-pink-500" : "text-blue-600"}
										/>
									</div>
									<h3 className="font-serif text-[26px] font-normal text-ink-900 mb-3 leading-[1.2]">
										{v.title}
									</h3>
									<p className="text-[14.5px] text-ink-600 leading-[1.8]">
										{v.text}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ============ TEAM ============ */}
			<section className="px-10 py-24 bg-white border-t border-ink-200">
				<div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
					{/* Left: text */}
					<div>
						<Kicker>The team</Kicker>
						<h2 className="font-serif text-[clamp(36px,4vw,54px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.12] mb-7">
							Real people who genuinely care about your home
						</h2>
						<p className="text-base text-[#5A5A6E] leading-[1.85] mb-4">
							Our team is the heart of Cleaning Paradise. Every cleaner goes
							through a thorough hiring process — background check, hands-on
							training, and a probationary period with senior cleaners.
						</p>
						<p className="text-base text-[#5A5A6E] leading-[1.85] mb-9">
							We&apos;re a bilingual team (English and Spanish). Many of our
							team members have been with us for years — this is a career, not
							just a job.
						</p>

						<div className="flex flex-col gap-3.5 pt-8 border-t border-ink-200">
							{teamChecklist.map((item) => (
								<div key={item} className="flex items-center gap-3.5">
									<CheckCircle size={20} className="text-pink-500 shrink-0" />
									<span className="text-[15px] text-ink-800">{item}</span>
								</div>
							))}
						</div>
					</div>

					{/* Right: staggered photo grid */}
					<div className="grid grid-cols-2 gap-4">
						{teamPhotos.map((p) => (
							<div
								key={p.src}
								className={`rounded-[20px] overflow-hidden aspect-[3/4] ${p.className}`}
							>
								<img
									src={p.src}
									alt="Team member"
									className="w-full h-full object-cover block"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ============ REVIEWS ============ */}
			<section className="px-10 py-24 bg-white border-t border-ink-200">
				<div className="max-w-[1240px] mx-auto">
					<div className="mb-14 flex items-end justify-between gap-8 flex-wrap">
						<div>
							<Kicker>What clients say</Kicker>
							<h2 className="font-serif text-[clamp(36px,4.5vw,60px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.08]">
								Rated by real
								<br />
								Seattle families
							</h2>
						</div>
						<a
							href="https://www.thumbtack.com/wa/lynnwood/house-cleaning/cleaning-paradise-llc/service/454839254774677504"
							target="_blank"
							rel="noopener"
							className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 no-underline whitespace-nowrap mb-2 hover:underline"
						>
							All 39 reviews on Thumbtack <ArrowUpRight size={15} />
						</a>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{reviews.map((r) => (
							<div
								key={r.name}
								className="border border-ink-200 rounded-[20px] py-8 px-7"
							>
								<div className="text-pink-500 text-[15px] tracking-[2px] mb-4">
									★★★★★
								</div>
								<p className="font-serif text-xl font-normal leading-[1.55] text-ink-900 mb-6 italic">
									{r.quote}
								</p>
								<div className="flex items-center gap-3 pt-5 border-t border-ink-200">
									<div className="w-10 h-10 rounded-full bg-[#F4F4F8] text-ink-600 font-bold text-[12px] flex items-center justify-center shrink-0">
										{r.initials}
									</div>
									<div>
										<div className="font-semibold text-sm text-ink-800">
											{r.name}
										</div>
										<div className="text-[12px] text-[#808098]">
											{r.location}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ============ CTA ============ */}
			<section className="px-10 py-24 bg-white border-t border-ink-200">
				<div className="max-w-[1240px] mx-auto flex items-center justify-between gap-12 flex-wrap">
					<div>
						<h2 className="font-serif text-[clamp(40px,5vw,66px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.08] mb-4">
							Ready for a spotless home?
						</h2>
						<p className="text-[17px] text-ink-600 leading-[1.7] max-w-[480px]">
							Get a free quote in minutes. No obligation, no surprises — just a
							clean home you&apos;ll love coming back to.
						</p>
					</div>
					<div className="flex gap-3.5 flex-wrap shrink-0">
						<Link
							href="/#book"
							className="bg-pink-500 text-white font-bold text-base px-[34px] py-4 rounded-full no-underline inline-flex items-center gap-[9px] transition-all duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(255,80,181,0.34)]"
						>
							Book a clean <ArrowRight size={17} />
						</Link>
						<a
							href="tel:+14256100241"
							className="bg-white text-ink-900 border-2 border-ink-200 font-semibold text-base px-8 py-3.5 rounded-full no-underline inline-flex items-center gap-[9px] transition-all duration-200 hover:border-ink-900"
						>
							<Phone size={17} />
							(425) 610-0241
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
