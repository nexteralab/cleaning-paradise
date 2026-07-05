import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRight,
	Award,
	BadgeDollarSign,
	CalendarClock,
	Leaf,
	Star,
	Users,
	Wrench,
} from "lucide-react";
import { FaqSection, HeroSection, ServicesSection } from "./home-client";

export const metadata: Metadata = {
	title: "House Cleaning Services in Seattle, WA | Cleaning Paradise",
	description:
		"Spotless homes, reliable maids, and a housekeeping experience that makes coming home the best part of your day. Serving Seattle, Lynnwood, Bellevue, Kirkland, and surrounding communities.",
};

/* ============ TRUST INDICATORS ============ */

const STATS: { value: string; label: string; color: string }[] = [
	{ value: "450+", label: "Homes Cleaned", color: "text-pink-500" },
	{ value: "100%", label: "Satisfaction Rate", color: "text-blue-600" },
	{ value: "50+", label: "5-Star Reviews", color: "text-pink-500" },
];

function TrustSection() {
	return (
		<section className="pt-[70px] pb-16 bg-white">
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				<div className="text-center mb-[42px]">
					<p className="font-sans text-[30px] max-md:text-[24px] text-ink-800 tracking-[-0.01em] max-w-[620px] mx-auto">
						Over 450 Seattle-area households trust our maids and housekeepers to keep their homes spotless,
						sanitized, and sparkling clean <i>week after week.</i>
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
					{STATS.map((s) => (
						<div key={s.label} className="text-center bg-white border border-ink-200 rounded-[22px] px-6 py-[34px]">
							<div className={`font-sans text-[58px] leading-none ${s.color}`}>{s.value}</div>
							<div className="text-sm font-semibold text-ink-600 mt-2.5">{s.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/* ============ WHY CHOOSE US ============ */

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

function WhySection() {
	return (
		<section id="why" className="py-24 bg-white border-t border-ink-200">
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				{/* Header: asymmetric split */}
				<div className="grid md:grid-cols-[1.05fr_0.95fr] gap-14 items-end mb-[62px]">
					<div>
						<div className="inline-flex items-center gap-[11px] text-xs font-bold text-pink-500 uppercase tracking-[0.14em] mb-[22px]">
							<span className="w-7 h-[1.5px] bg-pink-500 inline-block" />
							Why choose us
						</div>
						<h2 className="font-serif text-[clamp(40px,4.5vw,64px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.12]">
							Why Seattle Families Choose{" "}
							<span className="bg-[linear-gradient(104deg,rgba(255,80,181,0)_0.9%,rgba(255,80,181,0.35)_2.4%,rgba(255,80,181,0.35)_97.6%,rgba(255,80,181,0)_99.1%)] px-[5px] pb-[3px] rounded-[3px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
								Cleaning Paradise
							</span>
						</h2>
					</div>
					<p className="text-[16.5px] text-ink-600 leading-[1.95] pb-2.5">
						We&apos;ve spent 10+ years earning the trust of homeowners across King and Snohomish County.
						Here&apos;s what sets us apart from other cleaning companies in Seattle:
					</p>
				</div>

				{/* Photo strip */}
				<div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-4 md:h-[clamp(240px,29vw,360px)] mb-[84px]">
					{[
						{ src: "/img/pasted-1782782341097-0.png", alt: "Seattle" },
						{ src: "/img/aw1a0619.jpg", alt: "Sparkling kitchen" },
						{ src: "/img/aw1a0659.jpg", alt: "Happy client" },
					].map((photo) => (
						<div
							key={photo.src}
							className="rounded-[22px] overflow-hidden shadow-[0_26px_60px_rgba(30,62,162,0.10)] h-[220px] md:h-auto"
						>
							<img src={photo.src} alt={photo.alt} className="w-full h-full object-cover block" />
						</div>
					))}
				</div>

				{/* Features: 2-col list */}
				<div className="grid md:grid-cols-2 gap-x-20">
					{FEATURES.map((f) => (
						<div key={f.title} className="flex gap-6 py-[42px] border-t border-ink-200">
							<div className="shrink-0 w-[50px] h-[50px] rounded-[15px] bg-pink-50 text-pink-500 flex items-center justify-center">
								{f.icon}
							</div>
							<div>
								<h3 className="font-sans text-xl font-semibold text-ink-900 leading-[1.4] tracking-[-0.01em] mb-3.5">
									{f.title}
								</h3>
								<p className="text-[14.5px] text-ink-600 leading-[1.95]">{f.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/* ============ TESTIMONIALS (Thumbtack) ============ */

function ReviewPhoto({ src }: { src: string }) {
	return <img src={src} alt="Review photo" className="w-[76px] h-[76px] shrink-0 rounded-[10px] object-cover" />;
}

function ReviewerRow({ initials, name, city }: { initials: string; name: string; city: string }) {
	return (
		<div className="flex items-center gap-3">
			<div className="w-[42px] h-[42px] rounded-full bg-pink-100 text-pink-700 font-bold text-[13px] flex items-center justify-center">
				{initials}
			</div>
			<div>
				<div className="font-semibold text-sm text-ink-800">{name}</div>
				<div className="text-xs text-[#808098]">{city}</div>
			</div>
		</div>
	);
}

function TestimonialsSection() {
	return (
		<section className="py-24 bg-white border-t border-ink-200">
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				<div className="text-center mb-12">
					<div className="text-xs font-bold text-pink-500 uppercase tracking-[0.1em] mb-[13px]">Testimonials</div>
					<h2 className="font-serif text-[clamp(40px,4.5vw,60px)] font-normal text-ink-900 tracking-[-0.02em] mb-4">
						Rated by real Seattle-area clients
					</h2>
					<div className="inline-flex items-center gap-[9px] bg-white border border-pink-100 rounded-full px-[18px] py-2">
						<Star size={16} className="text-pink-500 fill-pink-500" />
						<span className="text-sm font-semibold text-ink-800">39 verified reviews on Thumbtack</span>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mb-[34px]">
					{/* Review 1 */}
					<div className="bg-white rounded-[22px] px-7 py-[30px] shadow-[0_8px_24px_rgba(30,62,162,0.06)]">
						<div className="text-pink-500 text-[15px] tracking-[2px] mb-3.5">★★★★★</div>
						<p className="text-[15px] text-ink-800 leading-[1.65] italic mb-4">
							Cleaning Paradise has been amazing to work with. Their communication is always prompt,
							professional, and friendly. The quality of their cleaning service is outstanding, and they
							consistently pay attention to the details. Their pricing is also very reasonable for the level of
							service they provide. It&rsquo;s hard to find a company that combines reliability, quality, and
							affordability so well. I highly recommend Cleaning Paradise to anyone in the Seattle area looking
							for a trustworthy cleaning service.
						</p>
						<div className="flex gap-2 mb-[18px]">
							<ReviewPhoto src="/img/aw1a0591.jpg" />
						</div>
						<ReviewerRow initials="MG" name="Camilo P." city="Bellevue, WA" />
					</div>
					{/* Review 2 */}
					<div className="bg-white rounded-[22px] px-7 py-[30px] shadow-[0_8px_24px_rgba(30,62,162,0.06)]">
						<div className="text-pink-500 text-[15px] tracking-[2px] mb-3.5">★★★★★</div>
						<div className="text-[15px] text-ink-800 leading-[1.65] italic mb-[22px]">
							<div>
								Allizon was a true lifesaver during a family crisis. We all live out of state. She moved her
								schedule around to assist with a cleaning for a terminally ill family member and a disabled
								child.
							</div>
							<div>
								She came in with no judgement, we talked priorities and the team went to town. The house looked
								so nice and smelled so fresh,&nbsp; I would never have been able to pull that off without her
								help.
							</div>
							<div>
								This wasn&apos;t a normal clean as I needed help moving furniture around to accommodate a large
								group of people in the middle of trying to get the house ready for sale.
							</div>
							<div>
								We will be working with her again in the future and highly recommend Cleaning Paradise LLC for
								all your cleaning needs.
							</div>
							<div>
								<br />
							</div>
							<div>They are amazing and the house shined when the whole family showed up for the funeral.</div>
						</div>
						<div className="flex gap-2 mb-[18px]">
							<ReviewPhoto src="/img/before.png" />
							<ReviewPhoto src="/img/after.png" />
						</div>
						<ReviewerRow initials="JC" name="Brenda G." city="Kirkland, WA" />
					</div>
					{/* Review 3 */}
					<div className="bg-white rounded-[22px] px-7 py-[30px] shadow-[0_8px_24px_rgba(30,62,162,0.06)]">
						<div className="text-pink-500 text-[15px] tracking-[2px] mb-3.5">★★★★★</div>
						<p className="text-[15px] text-ink-800 leading-[1.65] italic mb-[22px]">
							We&apos;ve been using Cleaning Paradise&apos;s services for about 6 months, almost monthly. Allizon
							and her team are excellent, always communicating well, working with our schedules and very kind. We
							always love how spotless they make our home, especially with us having a pet dog that sheds a lot!
							Happy to keep their services for many more months to come!
						</p>
						<div className="flex gap-2 mb-[18px]">
							<ReviewPhoto src="/img/aw1a0630-mr2eiji3.jpg" />
							<ReviewPhoto src="/img/aw1a0562-mr2ei5id.jpg" />
						</div>
						<ReviewerRow initials="AL" name="Roynerah B" city="Seattle, WA" />
					</div>
				</div>
				<div className="text-center">
					<a
						href="#book"
						className="inline-flex items-center gap-2 bg-pink-500 text-white font-sans font-semibold text-base px-[34px] py-4 rounded-full no-underline shadow-[0_10px_28px_rgba(255,80,181,0.32)] transition-all duration-200 ease-[var(--ease-out)] hover:bg-pink-600 hover:shadow-[0_14px_36px_rgba(255,80,181,0.42)] mb-[18px]"
					>
						Get my free quote <ArrowRight size={17} />
					</a>
					<br />
					<a
						href="https://www.thumbtack.com/wa/lynnwood/house-cleaning/cleaning-paradise-llc/service/454839254774677504"
						target="_blank"
						rel="noopener"
						className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 no-underline hover:underline"
					>
						Read all 113 reviews on Thumbtack{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M7 7h10v10" />
							<path d="M7 17 17 7" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}

/* ============ PHOTO GALLERY + BLOG CTA ============ */

function GallerySection() {
	return (
		<section id="gallery" className="py-24 bg-pink-50">
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				{/* header */}
				<div className="flex items-end justify-between flex-wrap gap-6 mb-10">
					<div>
						<div className="text-xs font-bold text-pink-500 uppercase tracking-[0.1em] mb-3">Our work</div>
						<h2 className="font-serif text-[clamp(36px,4vw,56px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.12]">
							Real homes. Real results.
						</h2>
					</div>
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 bg-ink-900 text-white font-sans font-semibold text-sm px-[26px] py-[13px] rounded-full no-underline whitespace-nowrap transition-all duration-200 ease-[var(--ease-out)] hover:bg-pink-500 hover:shadow-[0_10px_28px_rgba(255,80,181,0.30)]"
					>
						Read our blog <ArrowRight size={15} />
					</Link>
				</div>

				{/* masonry grid */}
				<div className="grid grid-cols-2 auto-rows-[180px] lg:grid-cols-4 lg:grid-rows-[220px_220px_300px] gap-3.5">
					{/* tall left */}
					<div className="row-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0547.jpg" alt="Before & after" className="w-full h-full object-cover block" />
					</div>
					{/* top center-left */}
					<div className="lg:col-start-2 lg:row-start-1 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0550.jpg" alt="Kitchen clean" className="w-full h-full object-cover block" />
					</div>
					{/* top center-right */}
					<div className="lg:col-start-3 lg:row-start-1 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0562.jpg" alt="Bathroom detail" className="w-full h-full object-cover block" />
					</div>
					{/* tall right */}
					<div className="row-span-2 lg:col-start-4 lg:row-start-1 lg:row-span-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img
							src="/img/pasted-1782782341097-0.png"
							alt="Team photo"
							className="w-full h-full object-cover block"
						/>
					</div>
					{/* bottom center-left */}
					<div className="lg:col-start-2 lg:row-start-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0626-scaled.jpg" alt="Living room" className="w-full h-full object-cover block" />
					</div>
					{/* blog CTA card */}
					<div className="lg:col-start-3 lg:row-start-2 rounded-[22px] overflow-hidden bg-[linear-gradient(135deg,#FF50B5_0%,#E0389C_100%)] flex flex-col items-start justify-end p-[26px] shadow-[0_12px_32px_rgba(255,80,181,0.30)]">
						<div className="text-[11px] font-bold text-white/75 uppercase tracking-[0.1em] mb-2">
							From our blog
						</div>
						<p className="font-serif text-xl font-normal text-white leading-[1.3] mb-4">
							Tips, guides &amp; local cleaning stories
						</p>
						<Link
							href="/blog"
							className="inline-flex items-center gap-1.5 bg-white text-pink-500 font-sans font-bold text-[13px] px-[18px] py-2.5 rounded-full no-underline transition-all duration-200 hover:bg-ink-900 hover:text-white"
						>
							Read articles <ArrowRight size={13} />
						</Link>
					</div>
					{/* full-width team strip */}
					<div className="col-span-2 lg:col-span-4 lg:row-start-3 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0732.jpg" alt="Team at work" className="w-full h-full object-cover block" />
					</div>
				</div>
			</div>
		</section>
	);
}

export default function Home() {
	return (
		<div className="relative w-full overflow-x-clip bg-white text-ink-800">
			<HeroSection />
			<TrustSection />
			<ServicesSection />
			<WhySection />
			<TestimonialsSection />
			<GallerySection />
			<FaqSection />
		</div>
	);
}
