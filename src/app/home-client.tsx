"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Plus, ShieldCheck } from "lucide-react";
import SuccessModal from "@/components/SuccessModal";
import Reveal from "@/components/Reveal";
import BgVideo from "@/components/BgVideo";

/* ============ HERO: full-screen video card + booking form ============ */

const inputClasses =
	"font-sans text-[14px] text-ink-900 bg-white border-[1.5px] border-ink-200 rounded-[12px] px-3.5 py-3 outline-none transition-[border-color] duration-200 focus:border-pink-500";

export function HeroSection() {
	return (
		<section id="top" className="bg-white p-4 md:p-6">
			<div className="relative w-full h-full min-h-[85vh] rounded-[30px] overflow-hidden shadow-[0_30px_70px_rgba(30,62,162,0.18)]">
				{/* background video (imagen estática en móvil) */}
				<BgVideo
					src="/video/cleaning-paradise-bg.mp4"
					poster="/img/aw1a0732.jpg"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				{/* legibility overlay */}
				<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(19,19,32,0.22)_0%,rgba(19,19,32,0.04)_32%,rgba(19,19,32,0.10)_60%,rgba(19,19,32,0.50)_100%)]" />

				{/* content layer */}
				<div className="relative z-10 flex flex-col p-4 md:p-6 gap-6 min-h-[85vh] max-md:pb-10">
					{/* spacer */}
					<div className="flex-1 min-h-8" />

					{/* bottom row: headline + form */}
					<div className="flex items-end justify-between gap-8 flex-wrap">
						{/* headline */}
						<div className="flex-[1_1_360px] min-w-[300px]">
							<div className="inline-flex items-center gap-[7px] bg-white/[0.18] backdrop-blur-[6px] text-white text-[11.5px] font-semibold tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full mb-5">
								<MapPin size={13} />
								Serving Greater Seattle
							</div>
							<h1 className="font-heading italic text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.1] text-white tracking-[-0.025em] [text-shadow:0_4px_24px_rgba(0,0,0,0.35)] max-w-[620px] mb-4">
								House Cleaning Services in Seattle, WA
							</h1>
							<p className="text-[clamp(17px,1.35vw,18px)] text-white md:text-white/[0.88] leading-[1.72] max-w-[560px] [text-shadow:0_4px_40px_rgba(0,0,0,0.28)]">
								Spotless homes, reliable maids, and a housekeeping experience that makes coming home the best
								part of your day. Serving Seattle, Lynnwood, Bellevue, Kirkland, and surrounding communities.
							</p>
						</div>

						{/* contact / booking form — desktop only (inside hero) */}
						<BookingForm className="max-md:hidden" />
					</div>
				</div>
			</div>
			{/* mobile only: booking form below the hero */}
			<BookingForm className="md:hidden mt-4" />
		</section>
	);
}

/* ============ HERO BOOKING FORM (extracted so it can be toggled) ============ */

export function BookingForm({ className = "" }: { className?: string }) {
	const [sent, setSent] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	return (
		<div className={`w-[min(460px,44%)] min-w-[230px] shrink-0 max-md:w-full ${className}`}>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setError("");
					setSubmitting(true);
					const form = e.currentTarget;
					const fd = new FormData(form);
					const service = fd.get("service");
					const payload = {
						firstName: fd.get("firstName"),
						lastName: fd.get("lastName"),
						email: fd.get("email"),
						phone: fd.get("phone"),
						service,
						services: service ? [service] : [],
						sqft: fd.get("sqft"),
						notes: fd.get("notes"),
						promo: true,
						source: "home-hero",
					};
					try {
						const res = await fetch("/api/contact", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(payload),
						});
						if (!res.ok) throw new Error();
						setSent(true);
						form.reset();
					} catch {
						setError("Something went wrong. Please call (425) 610-0241.");
					} finally {
						setSubmitting(false);
					}
				}}
				className="bg-white rounded-[26px] shadow-[0_26px_60px_rgba(19,19,32,0.28)] p-6 flex flex-col gap-[15px] max-h-[calc(100vh-150px)] overflow-y-auto"
			>
				<div>
					<h3 className="font-sans text-[27px] text-ink-900 tracking-[-0.01em] mb-[3px]">Get your free quote</h3>
					<p className="text-[13px] text-[#808098]">
						Reply within one business day — plus <strong className="font-semibold text-pink-500">30% off</strong> your first clean.
					</p>
				</div>

				{/* name */}
				<div className="flex flex-col gap-2.5 sm:flex-row">
					<input name="firstName" required autoComplete="given-name" placeholder="First name" className={`flex-1 min-w-0 ${inputClasses}`} />
					<input name="lastName" autoComplete="family-name" placeholder="Last name" className={`flex-1 min-w-0 ${inputClasses}`} />
				</div>

				{/* email + phone */}
				<div className="flex flex-col gap-2.5 sm:flex-row">
					<input
						name="email"
						type="email"
						required
						autoComplete="email"
						placeholder="Email"
						className={`flex-1 min-w-0 ${inputClasses}`}
					/>
					<input
						name="phone"
						type="tel"
						required
						autoComplete="tel"
						placeholder="Phone"
						className={`flex-1 min-w-0 ${inputClasses}`}
					/>
				</div>

				{/* service select */}
				<select name="service" defaultValue="" className={`${inputClasses} cursor-pointer appearance-none`}>
					<option value="">Which service?</option>
					<option>Standard Cleaning</option>
					<option>Deep Cleaning</option>
					<option>Commercial Cleaning</option>
					<option>Move In / Out Cleaning</option>
					<option>Packing &amp; Unpacking</option>
					<option>Carpet Cleaning</option>
				</select>

				{/* sqft */}
				<div>
					<label className="block text-xs font-semibold text-ink-600 mb-2">Home size (sq ft)</label>
					<input
						name="sqft"
						type="number"
						min={100}
						max={20000}
						placeholder="e.g. 1,200"
						className={`w-full ${inputClasses}`}
					/>
				</div>

				{/* notes */}
				<div>
					<label className="block text-xs font-semibold text-ink-600 mb-2">Additional notes</label>
					<textarea
						name="notes"
						rows={3}
						placeholder="Pets, special areas to focus on, access instructions…"
						className={`w-full resize-y ${inputClasses}`}
					/>
				</div>

				{error && <p className="text-center text-[13px] text-pink-600">{error}</p>}

				{/* submit */}
				<button
					type="submit"
					disabled={submitting}
					className="mt-0.5 bg-pink-500 text-white font-sans font-semibold text-[15px] border-none cursor-pointer p-[15px] rounded-[14px] flex items-center justify-center gap-2 transition-all duration-200 ease-[var(--ease-out)] hover:bg-pink-600 hover:shadow-[0_8px_28px_rgba(255,80,181,0.36)] disabled:opacity-60"
				>
					{submitting ? "Sending…" : "Get my free quote"} <ArrowRight size={16} />
				</button>
				<div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#A0A0AE]">
					<ShieldCheck size={13} />
					Licensed, Insured &amp; Bonded · 100% satisfaction guarantee
				</div>
			</form>
			<SuccessModal open={sent} onClose={() => setSent(false)} />
		</div>
	);
}

/* ============ SERVICES — editorial sticky scroll ============ */

type Service = {
	num: string;
	slug: string;
	name: string;
	title: string;
	desc: string;
	tags: string[];
	accent: "pink" | "blue";
	img: string;
	alt: string;
};

const SERVICES: Service[] = [
	{
		num: "01",
		slug: "standard-cleaning",
		name: "Standard Cleaning",
		title: "Standard Cleaning",
		desc: "Regular housekeeping maintenance, surfaces wiped, floors mopped, bathrooms sanitized, kitchen scrubbed down. Your home stays pristine between deep cleans.",
		tags: ["Weekly", "Biweekly", "Monthly", "One-time"],
		accent: "pink",
		img: "/img/move-in.jpg",
		alt: "Standard Cleaning",
	},
	{
		num: "02",
		slug: "deep-cleaning",
		name: "Deep Cleaning",
		title: "Deep Cleaning",
		desc: "A full top-to-bottom sanitization: inside appliances, grout lines, baseboards, bathroom disinfection, and every corner your regular maid service doesn't reach.",
		tags: ["Biweekly", "Monthly", "One-time"],
		accent: "pink",
		img: "/img/deep-cleaning.jpg",
		alt: "Deep Cleaning",
	},
	{
		num: "03",
		slug: "commercial-cleaning",
		name: "Commercial Cleaning",
		title: "Commercial Cleaning",
		desc: "Professional janitorial services for offices and commercial spaces in Seattle WA. We keep your workspace spotless, hygienic, and ready for business every day",
		tags: ["Weekly", "Biweekly", "Monthly"],
		accent: "pink",
		img: "/img/comercial-cleaning.webp",
		alt: "Commercial Cleaning",
	},
	{
		num: "04",
		slug: "move-in-out",
		name: "Move In / Out",
		title: "Move In / Out",
		desc: "Detailed maid service for lease turnovers and new move-ins. Every cabinet, appliance, and surface cleaned to a sparkling finish your landlord or buyer will notice.",
		tags: ["One-time"],
		accent: "pink",
		img: "/img/aw1a0626-scaled.jpg",
		alt: "Move In/Out",
	},
	{
		num: "05",
		slug: "packing-unpacking",
		name: "Packing & Unpacking",
		title: "Packing & Unpacking",
		desc: "Your local housekeeper team helps you pack, move, and settle in reducing move-day chaos without adding a thing to your to-do list.",
		tags: ["One-time"],
		accent: "pink",
		img: "/img/gemini_generated_image_67heuh67heuh67he.webp",
		alt: "Packing & Unpacking",
	},
	{
		num: "06",
		slug: "carpet-cleaning",
		name: "Carpet Cleaning",
		title: "Carpet Cleaning",
		desc: "Deep extraction that removes allergens, pet dander, and embedded grime. One of the most requested add-ons for our recurring housekeeping clients.",
		tags: ["Monthly", "One-time"],
		accent: "pink",
		img: "/img/carpet-cleaning.webp",
		alt: "Carpet Cleaning",
	},
];

export function ServicesSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [active, setActive] = useState(0);
	const [progress, setProgress] = useState(0);
	const N = SERVICES.length;

	useEffect(() => {
		let ticking = false;
		const compute = () => {
			ticking = false;
			const section = sectionRef.current;
			if (!section || window.innerWidth < 1024) return;
			const vh = window.innerHeight || document.documentElement.clientHeight;
			const rect = section.getBoundingClientRect();
			const scrollable = section.offsetHeight - vh;
			let raw = scrollable > 0 ? -rect.top / scrollable : 0;
			raw = Math.max(0, Math.min(1, raw));
			setProgress(raw * 100);
			// +0.5 so the active row switches mid-band, not at the hard edge.
			const idx = Math.min(N - 1, Math.max(0, Math.round(raw * N - 0.5)));
			setActive((prev) => (prev === idx ? prev : idx));
		};
		// rAF-throttle so we update at most once per frame (no per-event jitter).
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(compute);
		};
		// On resize the 440vh section collapses (lg: drops) and the doc shrinks,
		// but the browser keeps scrollY → user lands in white void. Clamp it.
		const onResize = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			if (window.scrollY > max) window.scrollTo(0, Math.max(0, max));
			onScroll();
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize, { passive: true });
		compute();
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
		};
	}, [N]);

	const scrollToRow = (idx: number) => {
		const section = sectionRef.current;
		if (!section || window.innerWidth < 1024) return;
		const vh = window.innerHeight || document.documentElement.clientHeight;
		const scrollable = section.offsetHeight - vh;
		const secTop = section.getBoundingClientRect().top + window.scrollY;
		window.scrollTo({ top: secTop + scrollable * ((idx + 0.5) / N), behavior: "smooth" });
	};

	return (
		<section id="services" ref={sectionRef} className="relative bg-white lg:h-[440vh]">
			<div className="bg-white lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
				{/* progress bar */}
				<div className="hidden lg:block absolute top-0 left-0 right-0 h-0.5 bg-[#F0F0F4] z-10">
					<div
						className="absolute top-0 left-0 h-full bg-[linear-gradient(90deg,#FF50B5,#1E3EA2)] transition-[width] duration-[220ms] ease-linear"
						style={{ width: `${progress.toFixed(2)}%` }}
					/>
				</div>

				{/* meta bar */}
				<div className="hidden lg:flex absolute top-9 left-[max(40px,calc(50%_-_680px))] right-[max(40px,calc(50%_-_680px))] justify-between items-center z-10">
					<span className="font-sans text-[13px] font-bold text-pink-500 uppercase tracking-[0.13em]">
						Our Services
					</span>
					<span className="font-sans text-sm text-[#C0C0D0]">
						<span className="font-heading italic text-[22px] text-pink-500">
							{String(active + 1).padStart(2, "0")}
						</span>{" "}
						/ 06
					</span>
				</div>

				{/* two-column grid */}
				<div className="flex flex-col px-6 pt-[60px] pb-10 lg:absolute lg:inset-0 lg:flex-row lg:items-center lg:px-[max(40px,calc(50%_-_680px))] lg:pt-20 lg:pb-11">
					{/* LEFT: nav + expanded content */}
					<div className="lg:flex-[1.15] min-w-0 flex flex-col justify-center lg:pr-[6vw]">
						{SERVICES.map((svc, i) => {
							const on = i === active;
							const pink = svc.accent === "pink";
							return (
								<div
									key={svc.num}
									role="button"
									tabIndex={0}
									aria-expanded={on}
									aria-label={`View ${svc.title}`}
									onClick={(e) => {
										if ((e.target as HTMLElement).closest("a")) return;
										if (window.innerWidth < 1024) {
											window.location.href = `/cleaning-services-in-wa/${svc.slug}`;
											return;
										}
										scrollToRow(i);
									}}
									onKeyDown={(e) => {
										if (e.key !== "Enter" && e.key !== " ") return;
										if ((e.target as HTMLElement).closest("a")) return;
										e.preventDefault();
										if (window.innerWidth < 1024) {
											window.location.href = `/cleaning-services-in-wa/${svc.slug}`;
											return;
										}
										scrollToRow(i);
									}}
									className={`cursor-pointer py-[15px] ${i < N - 1 ? "border-b border-[#F0F0F4]" : ""}`}
								>
									<div className="flex items-center justify-between gap-3">
										<div className="flex items-center gap-3.5 flex-1 min-w-0">
											<span
												className={`font-sans text-[10px] font-bold min-w-[18px] shrink-0 ${pink ? "text-pink-500" : "text-blue-600"}`}
											>
												{svc.num}
											</span>
											<a
												href={`/cleaning-services-in-wa/${svc.slug}`}
												className={`font-sans text-base leading-[1.2] transition-colors duration-[400ms] ease-[var(--ease-out)] text-ink-900 font-medium no-underline hover:underline ${
													on
														? `${pink ? "lg:text-pink-500" : "lg:text-blue-600"} lg:font-semibold`
														: "lg:text-[#C8C8DA] lg:font-medium"
												}`}
											>
												{svc.name}
											</a>
										</div>
										<ChevronRight size={14} className="text-[#E0E0EE] shrink-0" />
									</div>
									<div
										className={`grid transition-[grid-template-rows,opacity,margin-top] duration-[600ms] ease-[var(--ease-out)] max-lg:grid-rows-[1fr] max-lg:opacity-100 max-lg:mt-2 ${
											on ? "lg:grid-rows-[1fr] lg:opacity-100 lg:mt-2.5" : "lg:grid-rows-[0fr] lg:opacity-0 lg:mt-0"
										}`}
									>
										<div className="overflow-hidden">
										<div className="pt-5 pb-2 pl-8">
											<img
												src={svc.img}
												alt={svc.alt}
												className="lg:hidden w-full h-[200px] object-cover rounded-[20px] mb-4"
											/>
											<h3 className="font-heading text-[clamp(28px,2.8vw,46px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.1] mb-3">
												{svc.title}
											</h3>
											<p className="font-sans text-[15.5px] text-ink-600 leading-[1.78] mb-4 max-w-[440px]">
												{svc.desc}
											</p>
											<span
												className={`lg:hidden inline-flex items-center gap-1 font-sans text-[12px] font-semibold mb-4 ${pink ? "text-pink-500" : "text-blue-600"}`}
											>
												Tap to view details <ArrowRight size={12} />
											</span>
											<div className="flex flex-wrap gap-1.5 mb-5">
												{svc.tags.map((tag) => (
													<span
														key={tag}
														className={`font-sans text-[10.5px] font-semibold rounded-full px-3 py-1 ${
															pink ? "text-pink-500 bg-pink-50" : "text-blue-600 bg-blue-50"
														}`}
													>
														{tag}
													</span>
												))}
											</div>
											<a
												href="/contact"
												className={`inline-flex items-center gap-2 font-sans text-[13px] font-bold text-white rounded-full px-[22px] py-2.5 no-underline ${
													pink
														? "bg-pink-500 shadow-[0_4px_20px_rgba(255,80,181,0.30)]"
														: "bg-blue-600 shadow-[0_4px_20px_rgba(30,62,162,0.30)]"
												}`}
											>
												Get a quote <ArrowRight size={12} />
											</a>
										</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* RIGHT: clean full-height photos */}
					<div className="hidden lg:block relative lg:w-[clamp(260px,40%,520px)] lg:h-[clamp(320px,72vh,640px)] lg:shrink-0 lg:self-center">
						{SERVICES.map((svc, i) => (
							<div
								key={svc.num}
								className={`absolute inset-0 transition-opacity duration-[600ms] ease-[var(--ease-out)] ${
									i === active ? "opacity-100" : "opacity-0 pointer-events-none"
								}`}
							>
								<div className="absolute inset-0 rounded-[26px] overflow-hidden shadow-[0_32px_80px_rgba(30,62,162,0.13)]">
									<img src={svc.img} alt={svc.alt} className="w-full h-full object-cover block" />
									<div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[linear-gradient(transparent,rgba(19,19,32,0.18))] pointer-events-none" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

/* ============ FAQ accordion ============ */

const faqLink = "font-semibold text-pink-500 no-underline hover:underline";

const FAQS: { q: string; a: React.ReactNode }[] = [
	{
		q: "What areas do you serve?",
		a: (
			<>
				Looking for maid service or cleaning near me? We provide maid and housekeeping services across
				Lynnwood, Seattle, Bellevue, Kirkland, Edmonds, Bothell, Shoreline, and Mercer Island. Visit our{" "}
				<Link href="/locations" className={faqLink}>locations page here</Link> to see details for your city.
			</>
		),
	},
	{
		q: "How is the price for maid service calculated?",
		a: (
			<>
				Every home is different, so we don&apos;t use a one size fits all price. We look at your home&apos;s
				size, its condition, and how often you&apos;d like our maids to come, then put together a custom
				quote just for you. Getting that quote is fast and free, no guessing, no surprises when the invoice
				arrives. <Link href="/contact" className={faqLink}>Request your free quote here</Link> and we&apos;ll
				get back to you right away.
			</>
		),
	},
	{
		q: "Do you bring your own cleaning supplies and equipment?",
		a: "Yes. Every maid arrives with all the supplies, tools, and equipment needed to get your home spotless, including vacuums, mops, and eco friendly products. You don't need to provide anything. If you prefer we use a specific product you already own, just mention it when booking and we'll gladly use it.",
	},
	{
		q: "What if I have pets at home during the cleaning?",
		a: "No problem at all. Our housekeepers are comfortable working around cats, dogs, and other pets. Just let us know when booking if your pet needs extra space or has any sensitivities, and we'll plan the visit around them. All our products are pet safe, so your furry family members stay protected too.",
	},
	{
		q: "What payment methods do you accept?",
		a: (
			<>
				We accept all major credit and debit cards, along with payments through Jobber, our online booking
				and invoicing platform. You&apos;ll get a clear quote before the cleaning starts, and payment is
				processed securely once the job is done. No cash needed, no surprises on the invoice. Ready to get a
				quote? <Link href="/contact" className={faqLink}>Contact us here</Link>.
			</>
		),
	},
	{
		q: "Do you offer same day cleaning service?",
		a: "We do our best to accommodate same day requests whenever our schedule allows, especially for standard cleaning visits. For deep cleaning, move in or move out cleaning, or larger jobs, we recommend booking a day or two ahead to guarantee availability. Get in touch and we'll let you know the soonest opening.",
	},
	{
		q: "Do I need to be home during the cleaning?",
		a: "Not at all. Many of our clients give us a key, a code, or arrange access another way so we can clean while they're at work or running errands. Your home and belongings are always treated with care and respect, whether you're there or not.",
	},
	{
		q: "What's the difference between regular maid service and deep cleaning?",
		a: (
			<>
				Standard cleaning covers your home&apos;s recurring maintenance: vacuuming, mopping, wiping surfaces,
				sanitizing bathrooms and kitchens, and taking out trash. Deep cleaning goes further, including inside
				appliances, behind furniture, grout lines, baseboards, and every surface you&apos;d normally skip.{" "}
				<Link href="/cleaning-services-in-wa" className={faqLink}>See all the services we offer</Link> and
				our team can help you decide which fits your current situation.
			</>
		),
	},
];

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	return (
		<div
			className={`border rounded-[18px] overflow-hidden transition-colors duration-200 ${
				open ? "border-pink-500 bg-white" : "border-ink-200 bg-[#FBFBFE]"
			}`}
		>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="w-full flex items-center justify-between gap-4 text-left bg-transparent border-none cursor-pointer px-[26px] py-[22px] font-sans"
			>
				<span className="text-[16.5px] font-semibold text-ink-800">{q}</span>
				<Plus
					size={20}
					className={`text-pink-500 shrink-0 transition-transform duration-[250ms] ease-[var(--ease-out)] ${open ? "rotate-45" : ""}`}
				/>
			</button>
			<div
				className="overflow-hidden transition-[max-height,opacity] duration-[350ms] ease-[var(--ease-out)]"
				style={{ maxHeight: open ? 600 : 0, opacity: open ? 1 : 0 }}
			>
				<p className="px-[26px] pb-6 text-[15.5px] text-ink-600 leading-[1.7]">{a}</p>
			</div>
		</div>
	);
}

export function FaqSection() {
	return (
		<section id="faq" className="py-24 bg-white">
			<div className="max-w-[1360px] mx-auto px-10 max-md:px-6 grid grid-cols-1 lg:grid-cols-[0.85fr_1.5fr] gap-[clamp(36px,4vw,64px)] items-start">
				{/* left: photo + CTA card */}
				<div className="flex flex-col gap-6 lg:sticky lg:top-[100px]">
					<Reveal>
						<img
							src="/img/group.webp"
							alt="The Cleaning Paradise team"
							className="w-full rounded-[26px] object-cover shadow-[0_16px_44px_rgba(30,62,162,0.12)]"
						/>
					</Reveal>
					<Reveal delay={90}>
						<div className="rounded-[26px] border border-pink-100 px-7 py-7 shadow-[0_10px_32px_rgba(30,62,162,0.06)]">
							<p className="text-[17px] text-ink-600 leading-[1.7] mb-5">
								Ready for a total refresh? Contact Cleaning Paradise for a customized cleaning quote.
							</p>
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 bg-pink-500 text-white font-sans font-semibold text-[15px] px-7 py-3.5 rounded-full no-underline transition-all duration-200 ease-[var(--ease-out)] hover:bg-pink-600 hover:shadow-[0_10px_28px_rgba(255,80,181,0.36)]"
							>
								Get my free quote <ArrowRight size={16} />
							</Link>
						</div>
					</Reveal>
				</div>
				{/* right: heading + accordion */}
				<div>
					<div className="text-[13px] font-bold text-pink-500 uppercase tracking-[0.1em] mb-[13px]">
						Frequently asked
					</div>
					<h2 className="font-heading text-[clamp(40px,4.5vw,60px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.1] mb-10">
						Questions About Our Seattle Cleaning Services
					</h2>
					<div className="flex flex-col gap-3.5">
						{FAQS.map((f, i) => (
							<Reveal key={f.q} delay={i * 70}>
								<FaqItem q={f.q} a={f.a} />
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
