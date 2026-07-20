import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/lib/reviews";
import { ArrowRight, Star } from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";
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
				<Reveal className="text-center mb-[42px]">
					<p className="font-sans text-[30px] max-md:text-[24px] text-ink-800 tracking-[-0.01em] mx-auto">
						Over 450 Seattle-area households trust our maids and housekeepers to keep their homes spotless,
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


/* ============ TESTIMONIALS (Thumbtack) ============ */

export function TestimonialsSection() {
	return (
		<section className="py-24 bg-white border-t border-ink-200">
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				<Reveal className="text-center mb-12">
					<div className="text-xs font-bold text-pink-500 uppercase tracking-[0.1em] mb-[13px]">Testimonials</div>
					<h2 className="font-heading text-[clamp(40px,4.5vw,60px)] font-normal text-ink-900 tracking-[-0.02em] mb-4">
						Rated by real Seattle-area clients
					</h2>
					<div className="inline-flex items-center gap-[9px] bg-white border border-pink-100 rounded-full px-[18px] py-2">
						<Star size={16} className="text-pink-500 fill-pink-500" />
						<span className="text-sm font-semibold text-ink-800">111 verified reviews on Thumbtack</span>
					</div>
				</Reveal>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mb-[34px] items-start">
					{reviews.map((r, i) => (
						<Reveal key={r.name} delay={i * 90} className="h-full">
							<ReviewCard review={r} />
						</Reveal>
					))}
				</div>
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
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				{/* header */}
				<Reveal className="flex items-end justify-between flex-wrap gap-6 mb-10">
					<div>
						<div className="text-xs font-bold text-pink-500 uppercase tracking-[0.1em] mb-3">Our work</div>
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
						<img src="/img/aw1a0547.jpg" alt="Before & after" className="w-full h-full object-cover block" />
					</Reveal>
					{/* top center-left */}
					<Reveal delay={80} className="lg:col-start-2 lg:row-start-1 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0550.jpg" alt="Kitchen clean" className="w-full h-full object-cover block" />
					</Reveal>
					{/* top center-right */}
					<Reveal delay={160} className="lg:col-start-3 lg:row-start-1 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0562.jpg" alt="Bathroom detail" className="w-full h-full object-cover block" />
					</Reveal>
					{/* tall right */}
					<Reveal delay={240} className="row-span-2 lg:col-start-4 lg:row-start-1 lg:row-span-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img
							src="/img/pasted-1782782341097-0.webp"
							alt="Team photo"
							className="w-full h-full object-cover block"
						/>
					</Reveal>
					{/* bottom center-left */}
					<Reveal delay={120} className="lg:col-start-2 lg:row-start-2 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0626-scaled.jpg" alt="Living room" className="w-full h-full object-cover block" />
					</Reveal>
					{/* blog CTA card */}
					<Reveal delay={200} className="lg:col-start-3 lg:row-start-2 rounded-[22px] overflow-hidden bg-[linear-gradient(135deg,#FF50B5_0%,#E0389C_100%)] flex flex-col items-start justify-end p-[26px] shadow-[0_12px_32px_rgba(255,80,181,0.30)]">
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
					</Reveal>
					{/* full-width team strip */}
					<Reveal delay={280} className="col-span-2 lg:col-span-4 lg:row-start-3 rounded-[22px] overflow-hidden shadow-[0_12px_32px_rgba(30,62,162,0.10)]">
						<img src="/img/aw1a0732.jpg" alt="Team at work" className="w-full h-full object-cover block" />
					</Reveal>
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
			<WhyChooseUs />
			<TestimonialsSection />
			<GallerySection />
			<FaqSection />
		</div>
	);
}
