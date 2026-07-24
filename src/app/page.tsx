import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/lib/reviews";
import { ArrowRight, Star } from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";
import JsonLd from "@/components/JsonLd";
import { FaqSection, HeroSection, ServicesSection } from "./home-client";

export const metadata: Metadata = {
	title: "House Cleaning Services in Seattle, WA | Cleaning Paradise",
	description:
		"Spotless homes, reliable maids, and a housekeeping experience that makes coming home the best part of your day. Serving Seattle, Lynnwood, Bellevue, Kirkland, and surrounding communities.",
};

/* ============ TRUST INDICATORS ============ */

const STATS: { value: string; label: string; color: string }[] = [
	{ value: "100+", label: "Homes Cleaned", color: "text-pink-500" },
	{ value: "100%", label: "Satisfaction Rate", color: "text-blue-600" },
	{ value: "50+", label: "5-Star Reviews", color: "text-pink-500" },
];

const THUMBTACK_URL =
	"https://www.thumbtack.com/wa/lynnwood/house-cleaning/cleaning-paradise-llc/service/454839254774677504";

/* Short 5-star pull-quotes for the marquee — excerpts from the full reviews in src/lib/reviews.ts */
const QUOTES: { quote: string; name: string; city: string }[] = [
	{
		quote: "The quality of their cleaning is outstanding — they consistently pay attention to the details.",
		name: "Camilo P.",
		city: "Bellevue, WA",
	},
	{
		quote: "The house looked so nice and smelled so fresh. They are amazing.",
		name: "Brenda G.",
		city: "Kirkland, WA",
	},
	{
		quote: "We always love how spotless they make our home — even with a dog that sheds a lot!",
		name: "Roynerah B.",
		city: "Seattle, WA",
	},
	{
		quote: "They always just find something to tackle and exceed our expectations. Love them!!",
		name: "Melissa H.",
		city: "Greater Seattle, WA",
	},
	{
		quote: "The quality was as good as I've seen after trying several different local options.",
		name: "Jay K.",
		city: "Greater Seattle, WA",
	},
	{
		quote: "They went way above and beyond my expectations. I was blown away.",
		name: "Connie A.",
		city: "Greater Seattle, WA",
	},
];

function ReviewsMarquee() {
	// ponytail: pure-CSS marquee — track duplicated ×2, keyframe slides -50%.
	// QUOTES repeated so each half is wider than the container. Hover pauses,
	// motion-safe honors prefers-reduced-motion (falls back to a swipeable strip).
	const half = [...QUOTES, ...QUOTES];
	const items = [...half, ...half];
	return (
		<div
			className="group mt-9 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			aria-label="Five-star customer reviews"
		>
			<div className="flex w-max gap-3.5 motion-safe:animate-[galleryScrollH_50s_linear_infinite] group-hover:[animation-play-state:paused]">
				{items.map((r, i) => {
					const clone = i >= half.length;
					return (
						<a
							key={i}
							href={THUMBTACK_URL}
							target="_blank"
							rel="noopener"
							aria-hidden={clone}
							tabIndex={clone ? -1 : undefined}
							className="flex w-[360px] shrink-0 flex-col gap-2.5 rounded-2xl border border-ink-200 bg-white px-6 py-5 no-underline transition-colors duration-200 hover:border-pink-500"
						>
							<div className="flex gap-1">
								{Array.from({ length: 5 }, (_, s) => (
									<Star key={s} size={13} className="text-pink-500 fill-pink-500" />
								))}
							</div>
							<p className="text-[14.5px] leading-[1.6] text-ink-700">&ldquo;{r.quote}&rdquo;</p>
							<div className="text-[13px] font-semibold text-ink-600">
								{r.name} <span className="font-normal text-ink-400">· {r.city}</span>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
}

function TrustSection() {
	return (
		<section className="pt-[70px] pb-16 bg-white">
			<div className="max-w-[1360px] mx-auto px-10 max-md:px-6">
				<Reveal className="text-center mb-[42px]">
					<p className="font-sans text-[30px] max-md:text-[24px] text-ink-800 tracking-[-0.01em] mx-auto">
						Over 100 Seattle-area households trust our maids and housekeepers to keep their homes spotless,
						sanitized, and sparkling clean <i>week after week.</i>
					</p>
				</Reveal>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
					{STATS.map((s, i) => (
						<Reveal key={s.label} delay={i * 90} className="text-center bg-white border border-ink-200 rounded-[22px] px-6 py-[34px]">
							<CountUp value={s.value} className={`block font-sans text-[58px] leading-none ${s.color}`} />
							<div className="text-sm font-semibold text-ink-600 mt-2.5">{s.label}</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}


/* ============ HOW IT WORKS ============ */

// Copiado 1:1 del HTML de referencia (cleaningparadisellc.com.dc.html):
// asterisco "dibujado a mano" distinto por paso, con su rotación propia.
const STEPS: { step: string; title: string; desc: string; rotate: number; paths: string[] }[] = [
	{
		step: "Step 01",
		title: "Get your quote",
		desc: "Tell us your home's size and the service you need. We send a clear quote in minutes, no obligation.",
		rotate: -4,
		paths: [
			"M29 3 C32 13 27 21 31 29 C28 20 32 13 29 3",
			"M32 57 C28 47 33 39 29 31 C33 40 28 47 32 57",
			"M7 10 C16 18 19 22 30 30 C20 23 16 19 7 10",
			"M53 50 C44 42 41 38 30 30 C40 37 44 41 53 50",
			"M52 9 C42 18 39 21 30 30 C40 22 43 18 52 9",
			"M8 51 C17 42 22 39 30 30 C21 38 17 43 8 51",
			"M2 28 C13 30 19 29 30 30 C18 29 13 31 2 28",
			"M58 32 C47 29 41 31 30 30 C42 31 47 28 58 32",
		],
	},
	{
		step: "Step 02",
		title: "We clean",
		desc: "Our team arrives on time with professional equipment and eco-friendly products. You relax, we handle everything.",
		rotate: 6,
		paths: [
			"M31 2 C28 12 33 20 30 29 C34 21 27 13 31 2",
			"M28 58 C31 48 26 40 30 31 C25 39 32 47 28 58",
			"M9 8 C18 17 20 21 30 30 C19 22 17 17 9 8",
			"M52 52 C42 44 40 40 30 30 C41 39 43 43 52 52",
			"M50 7 C41 17 38 20 30 30 C39 20 42 18 50 7",
			"M10 53 C19 43 23 40 30 30 C22 39 18 44 10 53",
			"M3 32 C14 28 20 31 30 30 C19 32 13 29 3 32",
			"M57 27 C46 32 40 28 30 30 C41 27 47 31 57 27",
		],
	},
	{
		step: "Step 03",
		title: "Walkthrough & sign-off",
		desc: "We walk through every room together. If anything's not perfect, we fix it at no cost. 100% guaranteed.",
		rotate: 2,
		paths: [
			"M30 4 C33 15 28 19 31 30 C29 20 32 14 30 4",
			"M30 56 C27 45 32 41 29 30 C31 40 28 46 30 56",
			"M8 13 C17 20 22 24 30 30 C21 24 16 19 8 13",
			"M50 47 C41 40 38 36 30 30 C40 37 43 41 50 47",
			"M53 13 C43 20 40 24 30 30 C41 23 44 19 53 13",
			"M7 46 C16 39 21 37 30 30 C20 36 17 41 7 46",
			"M5 29 C15 31 20 28 30 30 C19 29 14 32 5 29",
			"M55 31 C45 28 41 32 30 30 C41 31 46 27 55 31",
		],
	},
];

function HowItWorksSection() {
	return (
		<section
			id="process"
			className="relative overflow-hidden bg-[#EEF2FF] py-[130px] [clip-path:polygon(0_9%,100%_0%,100%_91%,0%_100%)]"
		>
			<div className="relative z-[1] mx-auto max-w-[1400px] px-[clamp(20px,4vw,64px)]">
				<Reveal>
					<h2 className="font-heading text-[clamp(40px,4.5vw,60px)] font-normal leading-[1.12] tracking-[-0.025em] text-[#131320] mb-16">
						How It Works
					</h2>
				</Reveal>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] max-md:grid-cols-1 gap-11">
					{STEPS.map((s, i) => (
						<Reveal key={s.step} delay={i * 120}>
							<div className="group max-md:text-center">
								<div className="mb-[18px] inline-flex transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.06]">
									<svg viewBox="0 0 60 60" width="40" height="40" style={{ transform: `rotate(${s.rotate}deg)` }} aria-hidden>
										{s.paths.map((d) => (
											<path key={d} d={d} fill="none" stroke="#1E3EA2" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
										))}
									</svg>
								</div>
								<div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#606078]">{s.step}</div>
								<h3 className="mb-3.5 font-sans text-[22px] font-semibold leading-[1.35] text-[#131320]">{s.title}</h3>
								<p className="max-w-[320px] max-md:mx-auto text-[17px] leading-[1.85] text-[#606078]">{s.desc}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}


/* ============ TESTIMONIALS (Thumbtack) ============ */

export function TestimonialsSection() {
	return (
		<section className="py-24 bg-white border-t border-ink-200">
			<div className="max-w-[1360px] mx-auto px-10 max-md:px-6">
				<Reveal className="text-center mb-12">
					<div className="text-[13px] font-bold text-pink-500 uppercase tracking-[0.1em] mb-[13px]">Testimonials</div>
					<h2 className="font-heading text-[clamp(40px,4.5vw,60px)] font-normal text-ink-900 tracking-[-0.02em] mb-4">
						Rated by real Seattle-area clients
					</h2>
					<div className="inline-flex items-center gap-[9px] bg-white border border-pink-100 rounded-full px-[18px] py-2">
						<Star size={16} className="text-pink-500 fill-pink-500" />
						<span className="text-sm font-semibold text-ink-800">111 verified reviews on Thumbtack</span>
					</div>
				</Reveal>
			</div>
			{/* ponytail: mismo marquee CSS que ReviewsMarquee — track ×2, hover pausa.
			    Full-bleed: fuera del max-w para que el tren cruce toda la pantalla. */}
			<Reveal>
				<div className="group mb-[34px] w-full overflow-hidden pt-2 pb-6">
					{/* pr en cada card (no gap/px en el track): así -50% calza exacto y el loop es invisible */}
					<div className="flex w-max items-start animate-[galleryScrollH_70s_linear_infinite] group-hover:[animation-play-state:paused]">
						{[...reviews, ...reviews].map((r, i) => (
							<div
								key={i}
								aria-hidden={i >= reviews.length}
								className="w-[min(410px,85vw)] shrink-0 pr-[22px]"
							>
								<ReviewCard review={r} />
							</div>
						))}
					</div>
				</div>
			</Reveal>
			<div className="max-w-[1360px] mx-auto px-10 max-md:px-6">
				<div className="text-center">
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 bg-pink-500 text-white font-sans font-semibold text-base px-[34px] py-4 rounded-full no-underline shadow-[0_10px_28px_rgba(255,80,181,0.32)] transition-all duration-200 ease-[var(--ease-out)] hover:bg-pink-600 hover:shadow-[0_14px_36px_rgba(255,80,181,0.42)] mb-[18px]"
					>
						Get my free quote <ArrowRight size={17} />
					</Link>
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
			<div className="max-w-[1360px] mx-auto px-10 max-md:px-6">
				{/* header */}
				<Reveal className="flex items-end justify-between flex-wrap gap-6 mb-10">
					<div>
						<div className="text-[13px] font-bold text-pink-500 uppercase tracking-[0.1em] mb-3">Our work</div>
						<h2 className="font-heading text-[clamp(36px,4vw,56px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.12]">
							Real homes. Real results.
						</h2>
					</div>
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 bg-ink-900 text-white font-sans font-semibold text-sm px-[26px] py-[13px] rounded-full no-underline whitespace-nowrap transition-all duration-200 ease-[var(--ease-out)] hover:bg-pink-500 hover:shadow-[0_10px_28px_rgba(255,80,181,0.30)]"
					>
						Read our blog <ArrowRight size={15} />
					</Link>
				</Reveal>

				{/* masonry grid */}
				<div className="grid grid-cols-2 auto-rows-[180px] lg:grid-cols-4 lg:grid-rows-[220px_220px_300px] gap-3.5">
					{/* tall left */}
					<Reveal delay={0} className="row-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0547.jpg" alt="Cleaning Paradise team arriving with supplies at a home in Lynnwood, WA" className="w-full h-full object-cover block" />
					</Reveal>
					{/* top center-left */}
					<Reveal delay={80} className="lg:col-start-2 lg:row-start-1 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0550.jpg" alt="Maid detailing a bathroom vanity during a house cleaning in Seattle, WA" className="w-full h-full object-cover block" />
					</Reveal>
					{/* top center-right */}
					<Reveal delay={160} className="lg:col-start-3 lg:row-start-1 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0562.jpg" alt="Maid deep cleaning a glass shower door in Bellevue, WA" className="w-full h-full object-cover block" />
					</Reveal>
					{/* tall right */}
					<Reveal delay={240} className="row-span-2 lg:col-start-4 lg:row-start-1 lg:row-span-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img
							src="/img/pasted-1782782341097-0.webp"
							alt="Aerial view of the Space Needle and downtown Seattle, WA skyline"
							className="w-full h-full object-cover block"
						/>
					</Reveal>
					{/* bottom center-left */}
					<Reveal delay={120} className="lg:col-start-2 lg:row-start-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0626-scaled.jpg" alt="Cleaning team tidying a kids playroom during a deep clean in Bellevue, WA" className="w-full h-full object-cover block" />
					</Reveal>
					{/* blog CTA card */}
					<Reveal delay={200} className="lg:col-start-3 lg:row-start-2 rounded-[22px] overflow-hidden bg-[linear-gradient(135deg,#FF50B5_0%,#E0389C_100%)] flex flex-col items-start justify-end p-[26px] shadow-[0_12px_32px_rgba(255,80,181,0.30)]">
						<div className="text-[13px] font-bold text-white/75 uppercase tracking-[0.1em] mb-2">
							From our blog
						</div>
						<p className="font-heading text-xl font-normal text-white leading-[1.3] mb-4">
							Tips, guides &amp; local cleaning stories
						</p>
						<Link
							href="/blog"
							className="inline-flex items-center gap-1.5 bg-white text-pink-500 font-sans font-bold text-[13px] px-[18px] py-2.5 rounded-full no-underline transition-all duration-200 hover:bg-ink-900 hover:text-white"
						>
							Read articles <ArrowRight size={13} />
						</Link>
					</Reveal>
					{/* full-width team strip */}
					<Reveal delay={280} className="col-span-2 lg:col-span-4 lg:row-start-3 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0732.jpg" alt="Housekeepers folding blankets and tidying a living room in Kirkland, WA" className="w-full h-full object-cover block" />
					</Reveal>
				</div>
			</div>
		</section>
	);
}

// Texto plano de las FAQs del home (los componentes en home-client.tsx llevan
// links JSX, no serializables). Mantener en sync con FAQS de home-client.tsx.
const FAQ_JSONLD = [
	["What areas do you serve?", "Looking for maid service or cleaning near me? We provide maid and housekeeping services across Lynnwood, Seattle, Bellevue, Kirkland, Edmonds, Bothell, Shoreline, and Mercer Island. Visit our locations page to see details for your city."],
	["How is the price for maid service calculated?", "Every home is different, so we don't use a one size fits all price. We look at your home's size, its condition, and how often you'd like our maids to come, then put together a custom quote just for you. Getting that quote is fast and free, no guessing, no surprises when the invoice arrives."],
	["Do you bring your own cleaning supplies and equipment?", "Yes. Every maid arrives with all the supplies, tools, and equipment needed to get your home spotless, including vacuums, mops, and eco friendly products. You don't need to provide anything. If you prefer we use a specific product you already own, just mention it when booking and we'll gladly use it."],
	["What if I have pets at home during the cleaning?", "No problem at all. Our housekeepers are comfortable working around cats, dogs, and other pets. Just let us know when booking if your pet needs extra space or has any sensitivities, and we'll plan the visit around them. All our products are pet safe, so your furry family members stay protected too."],
	["What payment methods do you accept?", "We accept all major credit and debit cards, along with payments through Jobber, our online booking and invoicing platform. You'll get a clear quote before the cleaning starts, and payment is processed securely once the job is done. No cash needed, no surprises on the invoice."],
	["Do you offer same day cleaning service?", "We do our best to accommodate same day requests whenever our schedule allows, especially for standard cleaning visits. For deep cleaning, move in or move out cleaning, or larger jobs, we recommend booking a day or two ahead to guarantee availability. Get in touch and we'll let you know the soonest opening."],
	["Do I need to be home during the cleaning?", "Not at all. Many of our clients give us a key, a code, or arrange access another way so we can clean while they're at work or running errands. Your home and belongings are always treated with care and respect, whether you're there or not."],
	["What's the difference between regular maid service and deep cleaning?", "Standard cleaning covers your home's recurring maintenance: vacuuming, mopping, wiping surfaces, sanitizing bathrooms and kitchens, and taking out trash. Deep cleaning goes further, including inside appliances, behind furniture, grout lines, baseboards, and every surface you'd normally skip."],
] as const;

export default function Home() {
	return (
		<div className="relative w-full overflow-x-clip bg-white text-ink-800">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: FAQ_JSONLD.map(([q, a]) => ({
						"@type": "Question",
						name: q,
						acceptedAnswer: { "@type": "Answer", text: a },
					})),
				}}
			/>
			<HeroSection />
			<TrustSection />
			<ServicesSection />
			<HowItWorksSection />
			<WhyChooseUs />
			<TestimonialsSection />
			{/* <GallerySection /> */}
			<FaqSection />
		</div>
	);
}
