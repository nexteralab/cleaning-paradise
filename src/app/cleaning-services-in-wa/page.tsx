import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
	ArrowDown,
	ArrowRight,
	Clock,
	Leaf,
	ShieldCheck,
	Sparkles,
	Star,
	type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
	title: "Cleaning Services in WA | Cleaning Paradise — The clean you deserve, every single time",
	description:
		"From weekly home maintenance to move-out deep cleans and commercial spaces — Cleaning Paradise has the right service for you, with 100% satisfaction guaranteed.",
};

type ServiceCard = {
	img: string;
	title: string;
	description: string;
	href: string;
};

const serviceCards: ServiceCard[] = [
	{
		img: "/img/aw1a0696-mr6t4de0.jpg",
		title: "Standard Cleaning",
		description: "Recurring upkeep for kitchens, baths, living areas and bedrooms — week after week.",
		href: "/cleaning-services-in-wa/standard-cleaning",
	},
	{
		img: "/img/aw1a0734-mr6t5kd1.jpg",
		title: "Deep Cleaning",
		description: "Top-to-bottom reset: baseboards, appliances, grout and every overlooked corner.",
		href: "/cleaning-services-in-wa/deep-cleaning",
	},
	{
		img: "/img/comercial-cleaning-mr6t64gm.webp",
		title: "Commercial Cleaning",
		description: "Offices and workspaces across the metro — productive, hygienic and client-ready.",
		href: "/cleaning-services-in-wa/commercial-cleaning",
	},
	{
		img: "/img/aw1a0626-scaled-mr6t6wy8.jpg",
		title: "Move In / Out",
		description: "Detailed cleaning before you hand over the keys or settle into your new home.",
		href: "/cleaning-services-in-wa/move-in-out",
	},
	{
		img: "/img/svc-packing-new.webp",
		title: "Packing & Unpacking",
		description: "Professional packing and unpacking to take the stress out of moving day.",
		href: "/cleaning-services-in-wa/packing-unpacking",
	},
	{
		img: "/img/carpet-cleaning-mr81cvnx.webp",
		title: "Carpet Cleaning",
		description: "Deep extraction that lifts allergens, pet dander and embedded dirt — freshness restored.",
		href: "/cleaning-services-in-wa/carpet-cleaning",
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

export default function CleaningServicesInWaPage() {
	return (
		<div className="relative w-full overflow-x-clip">
			{/* HERO */}
			<section className="bg-white p-6">
				<div className="relative min-h-[580px] w-full overflow-hidden rounded-[30px] bg-[linear-gradient(140deg,#1E3EA2_0%,#16307E_100%)]">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/img/logo-watermark-white.png"
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute top-1/2 -right-[90px] h-[560px] w-[560px] -translate-y-1/2 object-contain opacity-[0.08] select-none"
					/>

					<div className="relative z-[2] flex flex-wrap items-center gap-[60px] px-[max(48px,calc(50%-560px))] pt-[110px] pb-20">
						<Reveal className="min-w-[300px] flex-[1_1_420px]">
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
									className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-blue-600 transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.15)]"
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
						</Reveal>
					</div>
				</div>
			</section>

			{/* SERVICES GRID */}
			<section id="services" className="bg-white pt-[88px] pb-24">
				<div className="mx-auto max-w-[1240px] px-10">
					<Reveal className="mb-[60px] text-center">
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
					</Reveal>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{serviceCards.map((card, i) => (
							<Reveal key={card.title} delay={(i % 3) * 90} className="h-full">
								<Link
									href={card.href}
									className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_rgba(30,62,162,0.08)] transition-all duration-[250ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(30,62,162,0.16)]"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={card.img} alt={card.title} className="block h-[250px] w-full object-cover" />
									<div className="flex flex-1 flex-col px-8 pt-7 pb-[34px]">
										<h3 className="mb-3.5 text-2xl font-bold tracking-[-0.01em] text-blue-600">
											{card.title}
										</h3>
										<p className="mb-[26px] flex-1 text-[15px] leading-[1.6] text-[#3f4f8f]">
											{card.description}
										</p>
										<span className="inline-flex items-center gap-2 text-[15px] font-semibold text-pink-500">
											Book now <ArrowRight size={16} />
										</span>
									</div>
								</Link>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* WHY CLEANING PARADISE */}
			<section className="bg-blue-600 py-[88px]">
				<div className="mx-auto max-w-[1240px] px-10">
					<Reveal className="mb-14 text-center">
						<div className="mb-3.5 text-xs font-bold tracking-[0.1em] text-white/60 uppercase">
							Why choose us
						</div>
						<h2 className="font-serif text-[clamp(34px,4vw,52px)] leading-[1.1] font-normal tracking-[-0.02em] text-white">
							The Cleaning Paradise difference
						</h2>
					</Reveal>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{whyItems.map((item, i) => {
							const Icon = item.icon;
							return (
								<Reveal
									key={item.title}
									delay={(i % 4) * 80}
									className="rounded-[22px] border border-white/10 bg-white/[0.08] px-6 py-7"
								>
									<div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-[14px] bg-pink-500">
										<Icon size={22} className="text-white" />
									</div>
									<h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
									<p className="text-[13.5px] leading-[1.6] text-white/65">{item.description}</p>
								</Reveal>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-white px-[max(40px,calc(50%-580px))] py-[88px]">
				<Reveal className="text-center">
					<h2 className="mb-4 font-serif text-[clamp(36px,5vw,62px)] leading-[1.1] font-normal text-ink-900 italic">
						Ready for a spotless home?
					</h2>
					<p className="mx-auto mb-9 max-w-[460px] text-[17px] leading-[1.65] text-ink-600">
						Same-week availability in most Greater Seattle zip codes. Free quote in minutes.
					</p>
					<div className="flex flex-wrap justify-center gap-3.5">
						<Link
							href="/#book"
							className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-[34px] py-[15px] text-base font-bold text-white transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,80,181,0.35)]"
						>
							Book now <ArrowRight size={16} />
						</Link>
						<a
							href="tel:+14256100241"
							className="rounded-full border-2 border-pink-500 bg-transparent px-[30px] py-[13px] text-base font-semibold text-pink-500 transition-all duration-200 hover:bg-pink-500/[0.08]"
						>
							Call (425) 610-0241
						</a>
					</div>
				</Reveal>
			</section>
		</div>
	);
}
