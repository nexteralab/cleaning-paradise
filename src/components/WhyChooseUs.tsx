import Reveal from "@/components/Reveal";
import { Award, BadgeDollarSign, CalendarClock, Leaf, Users, Wrench } from "lucide-react";

const FEATURES: { icon: React.ReactNode; title: string; desc: string }[] = [
	{
		icon: <Wrench size={27} />,
		title: "Professional Equipment",
		desc: "Commercial-grade tools and EPA-approved products. The same used in hotels and hospitals. Your home comes out genuinely spotless, not just tidy-looking",
	},
	{
		icon: <Award size={27} />,
		title: "10+ Years of Experience",
		desc: "A decade of housekeeping in the Seattle area means we understand Pacific Northwest homes: moisture issues, older construction, pet households, and the details that matter.",
	},
	{
		icon: <BadgeDollarSign size={27} />,
		title: "Clear, Fair Pricing",
		desc: "No hidden fees. Standard maid service starts at $55/hr per person. We give you a detailed quote before our housekeeper team ever sets foot in your home.",
	},
	{
		icon: <Users size={27} />,
		title: "Background-Checked Staff",
		desc: "Every cleaner on our team goes through a rigorous hiring process, background check, and hands-on training. You let someone into your home, that person needs to earn that trust.",
	},
	{
		icon: <Leaf size={27} />,
		title: "Eco-Friendly Sanitization",
		desc: "Biodegradable, non-toxic products safe for children, pets, and allergy-prone households. Effective sanitization without the harsh chemical smell.",
	},
	{
		icon: <CalendarClock size={27} />,
		title: "Flexible Housekeeping",
		desc: "Weekly, bi-weekly, or monthly recurring housekeeping, scheduled around your life. Same-week availability often possible for new clients in the Seattle metro.",
	},
];

const PHOTOS = [
	{ src: "/img/why-photo-1.webp", alt: "Seattle" },
	{ src: "/img/why-photo-2.webp", alt: "Sparkling kitchen" },
	{ src: "/img/why-photo-3.webp", alt: "Happy client" },
];

// Shared "Why choose us" section. Used on the home page (city defaults to
// "Seattle") and on each location page, where the city name flows into the
// headline: "Why {city} Families Choose Cleaning Paradise".
export default function WhyChooseUs({
	city = "Seattle",
	intro = "We've spent 10+ years earning the trust of homeowners across King and Snohomish County. Here's what sets us apart from other cleaning companies in Seattle:",
}: {
	city?: string;
	intro?: string;
}) {
	return (
		<section id="why" className="py-24 bg-white border-t border-ink-200">
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				{/* Header: asymmetric split */}
				<Reveal className="grid md:grid-cols-[1.05fr_0.95fr] gap-14 items-end mb-[62px]">
					<div>
						<div className="inline-flex items-center gap-[11px] text-xs font-bold text-pink-500 uppercase tracking-[0.14em] mb-[22px]">
							<span className="w-7 h-[1.5px] bg-pink-500 inline-block" />
							Why choose us
						</div>
						<h2 className="font-serif text-[clamp(40px,4.5vw,64px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.12]">
							Why {city} Families Choose{" "}
							<span className="relative inline">
								Cleaning Paradise
								<svg
									viewBox="0 0 320 18"
									className="absolute bottom-[-6px] left-[-4px] h-[18px] w-[calc(100%+8px)] overflow-visible"
									preserveAspectRatio="none"
									aria-hidden="true"
								>
									<path
										d="M4 13 C 40 7, 100 5, 160 9 C 220 13, 280 8, 316 11"
										stroke="#FF50B5"
										strokeWidth="7"
										fill="none"
										strokeLinecap="round"
										opacity="0.55"
									/>
									<path
										d="M6 16 C 50 11, 110 9, 165 13 C 215 17, 275 12, 314 14"
										stroke="#FF50B5"
										strokeWidth="4.5"
										fill="none"
										strokeLinecap="round"
										opacity="0.35"
									/>
								</svg>
							</span>
						</h2>
					</div>
					<p className="text-[16.5px] text-ink-600 leading-[1.95] pb-2.5">{intro}</p>
				</Reveal>

				{/* Photo strip */}
				<div className="grid grid-cols-2 auto-rows-[160px] md:grid-cols-[1.7fr_1fr_1fr] md:auto-rows-auto md:h-[clamp(240px,29vw,360px)] gap-4 mb-[84px]">
					{PHOTOS.map((photo, i) => (
						<Reveal
							key={photo.src}
							delay={i * 100}
							className={`rounded-[22px] overflow-hidden shadow-[0_26px_60px_rgba(30,62,162,0.10)] md:h-auto ${
								i === 0 ? "col-span-2 md:col-span-1" : ""
							}`}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={photo.src} alt={photo.alt} className="w-full h-full object-cover block" />
						</Reveal>
					))}
				</div>

				{/* Features: 2-col list */}
				<div className="grid md:grid-cols-2 gap-x-20">
					{FEATURES.map((f, i) => (
						<Reveal key={f.title} delay={(i % 2) * 90} className="flex gap-6 py-[42px] border-t border-ink-200">
							<div className="shrink-0 w-[50px] h-[50px] rounded-[15px] bg-pink-50 text-pink-500 flex items-center justify-center">
								{f.icon}
							</div>
							<div>
								<h3 className="font-sans text-xl font-semibold text-ink-900 leading-[1.4] tracking-[-0.01em] mb-3.5">
									{f.title}
								</h3>
								<p className="text-[14.5px] text-ink-600 leading-[1.95]">{f.desc}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
