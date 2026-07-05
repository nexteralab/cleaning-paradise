import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowDown,
	ArrowRight,
	Building2,
	Clock,
	Home,
	Layers,
	Leaf,
	Package,
	ShieldCheck,
	Sparkles,
	Star,
	Truck,
	type LucideIcon,
} from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

export const metadata: Metadata = {
	title: "Services | Cleaning Paradise — The clean you deserve, every single time",
	description:
		"From weekly home maintenance to move-out deep cleans and commercial spaces — Cleaning Paradise has the right service for you, with 100% satisfaction guaranteed.",
};

type ServiceCard = {
	number: string;
	icon: LucideIcon;
	title: string;
	description: string;
	tags: string[];
	href: string;
	color: "pink" | "blue";
	hasSlider?: boolean;
};

const serviceCards: ServiceCard[] = [
	{
		number: "01",
		icon: Home,
		title: "Standard Cleaning",
		description: "Your home's weekly reset — surfaces, floors, bathrooms, and kitchen, all handled.",
		tags: ["Weekly", "Biweekly", "Monthly"],
		href: "/services/standard-cleaning",
		color: "pink",
		hasSlider: true,
	},
	{
		number: "02",
		icon: Sparkles,
		title: "Deep Cleaning",
		description: "Top-to-bottom sanitization — inside appliances, grout, baseboards, and every corner.",
		tags: ["Monthly", "One-time"],
		href: "/services/deep-cleaning",
		color: "blue",
	},
	{
		number: "03",
		icon: Building2,
		title: "Commercial Cleaning",
		description: "Professional janitorial for offices and commercial spaces — spotless, every day.",
		tags: ["Daily", "Weekly", "Monthly"],
		href: "/services/commercial-cleaning",
		color: "blue",
	},
	{
		number: "04",
		icon: Truck,
		title: "Move In / Out Cleaning",
		description: "Detailed clean for lease turnovers — every cabinet, appliance, and surface.",
		tags: ["One-time"],
		href: "/services/move-in-out",
		color: "pink",
	},
	{
		number: "05",
		icon: Package,
		title: "Packing & Unpacking",
		description: "Your team packs, labels, and settles in — move day without the chaos.",
		tags: ["One-time"],
		href: "/services",
		color: "blue",
	},
	{
		number: "06",
		icon: Layers,
		title: "Carpet Cleaning",
		description: "Hot water extraction that removes allergens, pet dander, and embedded grime.",
		tags: ["Monthly", "One-time"],
		href: "/services/carpet-cleaning",
		color: "pink",
	},
];

const whyItems: { icon: LucideIcon; title: string; description: string }[] = [
	{
		icon: ShieldCheck,
		title: "Licensed & Insured",
		description: "Fully licensed in WA State and insured for your complete peace of mind.",
	},
	{
		icon: Star,
		title: "100% Satisfaction",
		description: "Not happy? We come back at no charge. Zero exceptions.",
	},
	{
		icon: Leaf,
		title: "Eco-Friendly Products",
		description: "Non-toxic, biodegradable products safe for kids, pets, and allergy sufferers.",
	},
	{
		icon: Clock,
		title: "Always On Time",
		description: "We respect your schedule. No last-minute cancellations, ever.",
	},
];

function ServiceCardItem({ card }: { card: ServiceCard }) {
	const Icon = card.icon;
	const accentText = card.color === "pink" ? "text-pink-500" : "text-blue-600";
	const accentBg = card.color === "pink" ? "bg-pink-50" : "bg-blue-50";

	return (
		<div
			className={`flex h-full flex-col overflow-hidden rounded-3xl border-[1.5px] border-[#EFEFF4] bg-white transition-all duration-[250ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_50px_rgba(30,62,162,0.11)] ${
				card.hasSlider ? "" : "p-8"
			}`}
		>
			{card.hasSlider && (
				<BeforeAfterSlider
					beforeSrc="/img/before.png"
					afterSrc="/img/after.png"
					beforeAlt="Before standard cleaning"
					afterAlt="After standard cleaning"
				/>
			)}
			<div className={`flex flex-1 flex-col ${card.hasSlider ? "px-8 pt-[26px] pb-8" : ""}`}>
				<div className={`flex items-center justify-between ${card.hasSlider ? "mb-[18px]" : "mb-[22px]"}`}>
					<span className={`text-[11px] font-bold tracking-[0.08em] ${accentText}`}>{card.number}</span>
					<div className={`flex h-[46px] w-[46px] items-center justify-center rounded-[14px] ${accentBg}`}>
						<Icon size={22} className={accentText} />
					</div>
				</div>
				<h3 className="mb-2.5 text-xl font-semibold text-ink-900">{card.title}</h3>
				<p className="mb-5 flex-1 text-sm leading-[1.65] text-ink-600">{card.description}</p>
				<div className="mb-6 flex flex-wrap gap-1.5">
					{card.tags.map((tag) => (
						<span key={tag} className={`rounded-full px-3 py-1 text-[11px] font-semibold ${accentText} ${accentBg}`}>
							{tag}
						</span>
					))}
				</div>
				<Link
					href={card.href}
					className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-[gap] duration-200 hover:gap-2.5 ${accentText}`}
				>
					See details <ArrowRight size={14} />
				</Link>
			</div>
		</div>
	);
}

export default function ServicesPage() {
	return (
		<div className="relative w-full overflow-x-clip">
			{/* HERO */}
			<section className="bg-white p-6">
				<div className="relative min-h-[580px] w-full overflow-hidden rounded-[30px] bg-[linear-gradient(140deg,#FF50B5_0%,#D93A9E_100%)]">
					<div className="pointer-events-none absolute -top-[100px] -right-20 h-[520px] w-[520px] rounded-full bg-white/[0.07]" />
					<div className="pointer-events-none absolute -bottom-[60px] -left-[50px] h-80 w-80 rounded-full bg-white/[0.05]" />
					<div className="pointer-events-none absolute top-[38%] left-[55%] h-[110px] w-[110px] rounded-full bg-white/[0.05]" />

					<div className="relative z-[2] flex flex-wrap items-center gap-[60px] px-[max(48px,calc(50%-560px))] pt-[110px] pb-20">
						<div className="min-w-[300px] flex-[1_1_420px]">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/[0.18] px-4 py-[7px] text-[11.5px] font-bold tracking-[0.08em] text-white uppercase backdrop-blur-[6px]">
								<Sparkles size={13} />6 Professional Services
							</div>
							<h1 className="mb-3 text-[clamp(38px,5.2vw,70px)] leading-[1.0] font-semibold tracking-[-0.025em] text-white">
								The clean you deserve,
							</h1>
							<h1 className="mb-[22px] font-serif text-[clamp(38px,5.2vw,70px)] leading-[1.1] font-normal tracking-[-0.015em] text-white italic">
								every single time.
							</h1>
							<p className="mb-[34px] max-w-[520px] text-[clamp(15px,1.4vw,18px)] leading-[1.72] text-white/[0.88]">
								From weekly home maintenance to move-out deep cleans and commercial spaces — Cleaning
								Paradise has the right service for you, with 100% satisfaction guaranteed.
							</p>
							<div className="flex flex-wrap gap-3.5">
								<a
									href="#services"
									className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-pink-500 transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.15)]"
								>
									See all services <ArrowDown size={16} />
								</a>
								<Link
									href="/#book"
									className="rounded-full border-2 border-white/50 bg-transparent px-[26px] py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/15"
								>
									Get a free quote
								</Link>
							</div>
						</div>

						<div className="flex shrink-0 flex-col gap-3.5">
							{[
								{ value: "450+", label: "Homes Cleaned" },
								{ value: "100%", label: "Satisfaction Guarantee" },
								{ value: "10+", label: "Years of Experience" },
							].map((stat) => (
								<div
									key={stat.label}
									className="rounded-[22px] border border-white/[0.18] bg-white/[0.14] px-[30px] py-[22px] text-center backdrop-blur-[8px]"
								>
									<div className="text-[46px] leading-none font-bold text-white">{stat.value}</div>
									<div className="mt-[5px] text-xs font-semibold tracking-[0.02em] text-white/80">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* SERVICES GRID */}
			<section id="services" className="bg-white pt-[88px] pb-24">
				<div className="mx-auto max-w-[1240px] px-10">
					<div className="mb-[60px] text-center">
						<div className="mb-3.5 text-xs font-bold tracking-[0.1em] text-pink-500 uppercase">
							What we offer
						</div>
						<h2 className="mb-3.5 font-serif text-[clamp(36px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.02em] text-ink-900">
							Choose your service
						</h2>
						<p className="mx-auto max-w-[480px] text-[17px] leading-[1.65] text-ink-600">
							Every service is handled by trained, background-checked professionals. Licensed, insured,
							and satisfaction-guaranteed.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{serviceCards.map((card) => (
							<ServiceCardItem key={card.number} card={card} />
						))}
					</div>
				</div>
			</section>

			{/* WHY CLEANING PARADISE */}
			<section className="bg-blue-600 py-[88px]">
				<div className="mx-auto max-w-[1240px] px-10">
					<div className="mb-14 text-center">
						<div className="mb-3.5 text-xs font-bold tracking-[0.1em] text-white/60 uppercase">
							Why choose us
						</div>
						<h2 className="font-serif text-[clamp(34px,4vw,52px)] leading-[1.1] font-normal tracking-[-0.02em] text-white">
							The Cleaning Paradise difference
						</h2>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{whyItems.map((item) => {
							const Icon = item.icon;
							return (
								<div
									key={item.title}
									className="rounded-[22px] border border-white/10 bg-white/[0.08] px-6 py-7"
								>
									<div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-[14px] bg-pink-500">
										<Icon size={22} className="text-white" />
									</div>
									<h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
									<p className="text-[13.5px] leading-[1.6] text-white/65">{item.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-pink-500 px-[max(40px,calc(50%-580px))] py-[88px]">
				<div className="text-center">
					<h2 className="mb-4 font-serif text-[clamp(36px,5vw,62px)] leading-[1.1] font-normal text-white italic">
						Ready for a spotless home?
					</h2>
					<p className="mx-auto mb-9 max-w-[460px] text-[17px] leading-[1.65] text-white/[0.88]">
						Same-week availability in most Greater Seattle zip codes. Free quote in minutes.
					</p>
					<div className="flex flex-wrap justify-center gap-3.5">
						<Link
							href="/#book"
							className="inline-flex items-center gap-2 rounded-full bg-white px-[34px] py-[15px] text-base font-bold text-pink-500 transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
						>
							Book now <ArrowRight size={16} />
						</Link>
						<a
							href="tel:+14256100241"
							className="rounded-full border-2 border-white/50 bg-transparent px-[30px] py-[13px] text-base font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/15"
						>
							Call (425) 610-0241
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
