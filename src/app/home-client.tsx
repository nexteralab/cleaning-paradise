"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight, MapPin, Plus, ShieldCheck } from "lucide-react";
import SuccessModal from "@/components/SuccessModal";

/* ============ HERO: full-screen video card + booking form ============ */

const inputClasses =
	"font-sans text-[14px] text-ink-900 bg-white border-[1.5px] border-ink-200 rounded-[12px] px-3.5 py-3 outline-none transition-[border-color] duration-200 focus:border-pink-500";

export function HeroSection() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [sent, setSent] = useState(false);

	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		el.muted = true;
		el.defaultMuted = true;
		const tryPlay = () => {
			if (!el.isConnected) return;
			el.play()?.catch(() => {});
		};
		const events = ["loadeddata", "canplay", "canplaythrough"];
		events.forEach((ev) => el.addEventListener(ev, tryPlay));
		let tries = 0;
		const t = setInterval(() => {
			tries++;
			if (!el.paused || tries > 25) {
				clearInterval(t);
				return;
			}
			tryPlay();
		}, 200);
		tryPlay();
		return () => {
			clearInterval(t);
			events.forEach((ev) => el.removeEventListener(ev, tryPlay));
		};
	}, []);

	return (
		<section id="top" className="bg-white p-4 md:p-6">
			<div className="relative w-full h-full min-h-[660px] rounded-[30px] overflow-hidden shadow-[0_30px_70px_rgba(30,62,162,0.18)]">
				{/* background video */}
				<video
					ref={videoRef}
					src="https://github.com/nexteralab/cleaning-paradise/raw/refs/heads/main/cleaning-paradise-bg.mp4"
					autoPlay
					muted
					loop
					playsInline
					className="absolute inset-0 w-full h-full object-cover"
				/>
				{/* legibility overlay */}
				<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(19,19,32,0.22)_0%,rgba(19,19,32,0.04)_32%,rgba(19,19,32,0.10)_60%,rgba(19,19,32,0.50)_100%)]" />

				{/* content layer */}
				<div className="relative z-10 flex flex-col h-full p-4 md:p-6 gap-6 h-full">
					{/* spacer */}
					<div className="flex-1 min-h-8" />

					{/* bottom row: headline + form */}
					<div className="flex items-end justify-between gap-8 flex-wrap mt-45">
						{/* headline */}
						<div className="flex-[1_1_360px] min-w-[300px]">
							<div className="inline-flex items-center gap-[7px] bg-white/[0.18] backdrop-blur-[6px] text-white text-[11.5px] font-semibold tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full mb-5">
								<MapPin size={13} />
								Serving Greater Seattle
							</div>
							<h1 className="font-sans text-[clamp(28px,3.8vw,52px)] font-semibold leading-[1.1] text-white tracking-[-0.025em] [text-shadow:0_4px_24px_rgba(0,0,0,0.35)] max-w-[620px] mb-4">
								House Cleaning Services in Seattle, WA
							</h1>
							<p className="text-[clamp(14px,1.3vw,17px)] text-white md:text-white/[0.88] leading-[1.72] max-w-[560px] [text-shadow:0_4px_40px_rgba(0,0,0,0.28)]">
								Spotless homes, reliable maids, and a housekeeping experience that makes coming home the best
								part of your day. Serving Seattle, Lynnwood, Bellevue, Kirkland, and surrounding communities.
							</p>
						</div>

						{/* contact / booking form */}
						<div id="book" className="w-[min(460px,44%)] min-w-[230px] shrink-0 max-md:w-full">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.currentTarget.reset();
									setSent(true);
								}}
								className="bg-white rounded-[26px] shadow-[0_26px_60px_rgba(19,19,32,0.28)] p-6 flex flex-col gap-[15px] max-h-[calc(100vh-150px)] overflow-y-auto"
							>
								<div>
									<h3 className="font-sans text-[27px] text-ink-900 tracking-[-0.01em] mb-[3px]">Say hello!</h3>
									<p className="text-[13px] text-[#808098]">Free quote in minutes — no obligation.</p>
								</div>

								{/* name + email */}
								<div className="flex flex-col gap-2.5 sm:flex-row">
									<input name="name" placeholder="Your name" className={`flex-1 min-w-0 ${inputClasses}`} />
									<input
										name="email"
										type="email"
										placeholder="Email"
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

								{/* pets */}
								<div>
									<label className="block text-xs font-semibold text-ink-600 mb-2">Do you have any pets?</label>
									<select name="pets" defaultValue="" className={`w-full ${inputClasses} cursor-pointer appearance-none`}>
										<option value="" disabled>Select an option</option>
										<option value="yes">Yes</option>
										<option value="no">No</option>
									</select>
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

								{/* submit */}
								<button
									type="submit"
									className="mt-0.5 bg-pink-500 text-white font-sans font-semibold text-[15px] border-none cursor-pointer p-[15px] rounded-[14px] flex items-center justify-center gap-2 transition-all duration-200 ease-[var(--ease-out)] hover:bg-pink-600 hover:shadow-[0_8px_28px_rgba(255,80,181,0.36)]"
								>
									Get my free quote <ArrowRight size={16} />
								</button>
								<div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#A0A0AE]">
									<ShieldCheck size={13} />
									Licensed &amp; insured · 100% satisfaction guarantee
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<SuccessModal open={sent} onClose={() => setSent(false)} />
		</section>
	);
}

/* ============ SERVICES — editorial sticky scroll ============ */

type Service = {
	num: string;
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
		name: "Commercial Cleaning",
		title: "Commercial Cleaning",
		desc: "Professional janitorial services for offices and commercial spaces in Seattle WA. We keep your workspace spotless, hygienic, and ready for business every day",
		tags: ["Weekly", "Biweekly", "Monthly"],
		accent: "blue",
		img: "/img/comercial-cleaning.webp",
		alt: "Commercial Cleaning",
	},
	{
		num: "04",
		name: "Move In / Out",
		title: "Move In / Out",
		desc: "Detailed maid service for lease turnovers and new move-ins. Every cabinet, appliance, and surface cleaned to a sparkling finish your landlord or buyer will notice.",
		tags: ["One-time"],
		accent: "blue",
		img: "/img/aw1a0626-scaled.jpg",
		alt: "Move In/Out",
	},
	{
		num: "05",
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
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		compute();
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
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
				<div className="hidden lg:flex absolute top-9 left-[max(40px,calc(50%_-_580px))] right-[max(40px,calc(50%_-_580px))] justify-between items-center z-10">
					<span className="font-sans text-[11px] font-bold text-pink-500 uppercase tracking-[0.13em]">
						Our Services
					</span>
					<span className="font-sans text-sm text-[#C0C0D0]">
						<span className="font-serif italic text-[22px] text-pink-500">
							{String(active + 1).padStart(2, "0")}
						</span>{" "}
						/ 06
					</span>
				</div>

				{/* two-column grid */}
				<div className="flex flex-col px-6 pt-[60px] pb-10 lg:absolute lg:inset-0 lg:flex-row lg:items-center lg:px-[max(40px,calc(50%_-_580px))] lg:pt-20 lg:pb-11">
					{/* LEFT: nav + expanded content */}
					<div className="lg:flex-[1.15] min-w-0 flex flex-col justify-center lg:pr-[6vw]">
						{SERVICES.map((svc, i) => {
							const on = i === active;
							const pink = svc.accent === "pink";
							return (
								<div
									key={svc.num}
									onClick={(e) => {
										if ((e.target as HTMLElement).closest("a")) return;
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
											<div
												className={`font-sans text-base leading-[1.2] transition-colors duration-[400ms] ease-[var(--ease-out)] text-ink-900 font-medium ${
													on
														? `${pink ? "lg:text-pink-500" : "lg:text-blue-600"} lg:font-semibold`
														: "lg:text-[#C8C8DA] lg:font-medium"
												}`}
											>
												{svc.name}
											</div>
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
											<h3 className="font-serif text-[clamp(28px,2.8vw,46px)] font-normal text-ink-900 tracking-[-0.025em] leading-[1.1] mb-3">
												{svc.title}
											</h3>
											<p className="font-sans text-[14.5px] text-ink-600 leading-[1.78] mb-4 max-w-[440px]">
												{svc.desc}
											</p>
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
					<div className="relative w-full h-[260px] mt-6 lg:w-[clamp(260px,40%,520px)] lg:h-[clamp(320px,72vh,640px)] lg:mt-0 lg:shrink-0 lg:self-center">
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

const FAQS: { q: string; a: string }[] = [
	{
		q: "How is the price for maid service calculated?",
		a: "Pricing is based on your home's size and how often you'd like our maids to come. Most standard housekeeping visits start at $55/hr per person. We provide a full quote before any work begins, no guessing, no surprises when the invoice arrives.",
	},
	{
		q: "What's the difference between regular maid service and deep cleaning?",
		a: "Standard cleaning covers your home's recurring maintenance: vacuuming, mopping, wiping surfaces, sanitizing bathrooms and kitchens, and taking out trash. Deep cleaning goes further — inside appliances, behind furniture, grout lines, baseboards, and every surface you'd normally skip. We offer both; our team can help you decide which fits your current situation.",
	},
	{
		q: "Can I cancel or reschedule my maid service appointment?",
		a: "Yes. Give us at least 24 hours' notice and we'll reschedule at no charge. Late cancellations (within 24 hours) may incur a 20% fee to account for the housekeeper's reserved time.",
	},
	{
		q: "What if I'm not satisfied with the results?",
		a: "Contact us within 24 hours and describe the specific issue. We'll send your maid back to fix it at no extra cost. We don't consider a housekeeping job done until your home is genuinely spotless.",
	},
	{
		q: "Are your products safe for kids, pets, and seniors?",
		a: "Yes. We use professional-grade, non-toxic, biodegradable products safe for children, pets, and clients with allergies or sensitivities. Including cleaning services for seniors who may have respiratory concerns. If you have a specific product preference, just let us know when booking.",
	},
];

function FaqItem({ q, a }: { q: string; a: string }) {
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
				<p className="px-[26px] pb-6 text-[14.5px] text-ink-600 leading-[1.7]">{a}</p>
			</div>
		</div>
	);
}

export function FaqSection() {
	return (
		<section id="faq" className="py-24 bg-white">
			<div className="max-w-[820px] mx-auto px-10 max-md:px-6">
				<div className="text-center mb-11">
					<div className="text-xs font-bold text-pink-500 uppercase tracking-[0.1em] mb-[13px]">FAQ</div>
					<h2 className="font-serif text-[clamp(40px,4.5vw,60px)] font-normal text-ink-900 tracking-[-0.02em]">
						Questions About Our Seattle Cleaning Services
					</h2>
				</div>
				<div className="flex flex-col gap-3.5">
					{FAQS.map((f) => (
						<FaqItem key={f.q} q={f.q} a={f.a} />
					))}
				</div>
			</div>
		</section>
	);
}
