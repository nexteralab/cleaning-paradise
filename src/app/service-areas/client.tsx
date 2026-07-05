"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
	ChevronsLeftRight,
	CircleCheck,
	Clock,
	Home,
	Map,
	MapPin,
	MoveHorizontal,
	Navigation,
	Plus,
	Star,
	Users,
	ArrowRight,
} from "lucide-react";

/* ================= BEFORE / AFTER SLIDER ================= */

export function BeforeAfterSlider() {
	const [pos, setPos] = useState(50);
	const ref = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);

	const setFromX = (x: number) => {
		const r = ref.current?.getBoundingClientRect();
		if (!r) return;
		setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
	};

	return (
		<div className="flex-[1_1_380px] min-w-[300px] max-w-[560px]">
			<style>{`@keyframes cp-nudge{0%,100%{transform:translateX(0);}50%{transform:translateX(5px);}}`}</style>
			<div
				ref={ref}
				onPointerDown={(e) => {
					dragging.current = true;
					e.currentTarget.setPointerCapture?.(e.pointerId);
					setFromX(e.clientX);
				}}
				onPointerMove={(e) => {
					if (dragging.current) setFromX(e.clientX);
				}}
				onPointerUp={() => {
					dragging.current = false;
				}}
				onPointerCancel={() => {
					dragging.current = false;
				}}
				className="relative w-full aspect-[760/620] rounded-3xl overflow-hidden shadow-[0_28px_60px_rgba(30,62,162,0.22)] select-none cursor-ew-resize touch-none bg-[#222]"
			>
				<img
					src="/img/after.png"
					alt="After cleaning"
					draggable={false}
					className="absolute inset-0 w-full h-full object-cover pointer-events-none"
				/>
				<div className="absolute top-4 right-[18px] z-[4] font-bold text-sm tracking-[0.08em] text-white bg-[rgba(30,62,162,0.55)] px-3 py-[5px] rounded-full backdrop-blur-[4px] pointer-events-none">
					AFTER
				</div>
				<div
					className="absolute inset-0 overflow-hidden will-change-[clip-path]"
					style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
				>
					<img
						src="/img/before.png"
						alt="Before cleaning"
						draggable={false}
						className="absolute inset-0 w-full h-full object-cover pointer-events-none"
					/>
					<div className="absolute top-4 left-[18px] font-bold text-sm tracking-[0.08em] text-white bg-[rgba(19,19,32,0.5)] px-3 py-[5px] rounded-full backdrop-blur-[4px] pointer-events-none">
						BEFORE
					</div>
				</div>
				<div
					className="absolute top-0 bottom-0 w-[3px] bg-white -translate-x-1/2 shadow-[0_0_12px_rgba(0,0,0,0.35)] z-[5] will-change-[left] pointer-events-none"
					style={{ left: `${pos}%` }}
				>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-pink-500 border-[3px] border-white flex items-center justify-center shadow-[0_6px_18px_rgba(255,80,181,0.5)]">
						<ChevronsLeftRight size={20} className="text-white" />
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center gap-2 mt-[14px] text-[#8A8A9E] text-[13px] font-medium">
				<MoveHorizontal size={15} style={{ animation: "cp-nudge 1.8s ease-in-out infinite" }} />
				Drag to reveal the transformation
			</div>
		</div>
	);
}

/* ================= STATS VIDEO ================= */

function Counter({ target, suffix }: { target: number; suffix: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const [started, setStarted] = useState(false);
	const [val, setVal] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setStarted(true);
					io.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		if (!started) return;
		const dur = 1400;
		const start = performance.now();
		const ease = (t: number) => 1 - Math.pow(1 - t, 3);
		let raf = 0;
		const step = (now: number) => {
			const p = Math.min(1, (now - start) / dur);
			setVal(Math.round(target * ease(p)));
			if (p < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [started, target]);

	return (
		<div
			ref={ref}
			className="text-[clamp(28px,3.2vw,46px)] font-bold text-white leading-none tracking-[-0.03em]"
		>
			{val}
			{suffix}
		</div>
	);
}

const STATS = [
	{ icon: Users, target: 450, suffix: "+", label: "Customers Served" },
	{ icon: CircleCheck, target: 100, suffix: "%", label: "Satisfaction Rate" },
	{ icon: Star, target: 50, suffix: "+", label: "5-star Reviews" },
];

export function StatsVideoSection() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		el.muted = true;
		const tryPlay = () => {
			el.play().catch(() => {});
		};
		const events = ["loadeddata", "canplay", "canplaythrough"];
		events.forEach((ev) => el.addEventListener(ev, tryPlay));
		tryPlay();
		return () => events.forEach((ev) => el.removeEventListener(ev, tryPlay));
	}, []);

	return (
		<section className="p-6">
			<div className="relative rounded-[28px] overflow-hidden bg-[#0d1020]">
				<video
					ref={videoRef}
					src="https://github.com/nexteralab/cleaning-paradise/raw/refs/heads/main/kirkland-bg.mp4"
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					className="absolute inset-0 w-full h-full object-cover opacity-[0.52]"
				/>
				<div className="absolute inset-0 bg-[rgba(12,17,38,0.48)] pointer-events-none" />
				<div className="relative z-[2] px-[clamp(28px,5vw,72px)] py-[clamp(52px,6.5vw,88px)] text-center">
					<h2 className="leading-[1.1] text-white mb-[clamp(36px,5vw,60px)] tracking-[-0.02em]">
						<span className="font-bold text-[clamp(30px,3.8vw,54px)]">Trusted.</span>
						<span className="font-serif italic font-normal text-[clamp(30px,3.8vw,54px)]"> Spotless.</span>
						<span className="font-bold text-[clamp(30px,3.8vw,54px)]"> Proven.</span>
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(12px,2vw,22px)] max-w-[860px] mx-auto">
						{STATS.map(({ icon: Icon, target, suffix, label }) => (
							<div
								key={label}
								className="border border-white/[0.18] rounded-2xl px-[clamp(14px,1.8vw,24px)] py-[clamp(18px,2.2vw,30px)] flex items-center gap-[14px] text-left"
							>
								<div className="shrink-0">
									<Icon size={22} className="text-pink-500" />
								</div>
								<div>
									<Counter target={target} suffix={suffix} />
									<div className="text-[clamp(11px,1.1vw,13px)] font-medium text-white/[0.68] mt-1.5">
										{label}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

/* ================= FAQ ================= */

const FAQS = [
	{
		q: "How is the cost calculated?",
		a: "Pricing is based on the size of your home and how often you'd like us to clean. We provide a detailed quote before any work begins — no surprises, no guesswork. Most standard cleans start at $55/hr per person.",
	},
	{
		q: "What's the difference between standard and deep cleaning?",
		a: "Standard cleaning covers recurring maintenance: vacuuming, mopping, wiping surfaces, sanitizing bathrooms and kitchens, and taking out trash. Deep cleaning goes further — inside appliances, behind furniture, grout lines, and baseboards. Our team can help you decide which fits your current situation.",
	},
	{
		q: "What should I expect on the first visit?",
		a: "First visits typically take a bit longer as our team gets familiar with your home's layout and specific needs. We'll walk through expectations with you beforehand, bring all equipment and products, and leave you with a spotless space — guaranteed.",
	},
	{
		q: "Are you licensed and insured?",
		a: "Yes — Cleaning Paradise LLC is fully licensed and insured in the state of Washington. Every member of our team is background-checked and trained before their first visit. Your home and belongings are protected.",
	},
	{
		q: "Can I set up recurring service?",
		a: "Absolutely. We offer weekly, biweekly, and monthly plans — with discounts for recurring bookings. Our most popular option is biweekly, which keeps your home consistently clean without the cost of weekly visits. Get a free quote and we'll recommend the right frequency for your home.",
	},
];

export function FaqSection() {
	const [open, setOpen] = useState<number | null>(null);

	return (
		<section id="faq" className="py-24 bg-ink-50">
			<div className="max-w-[820px] mx-auto px-10 max-md:px-6">
				<div className="text-center mb-11">
					<div className="text-xs font-bold text-pink-500 uppercase tracking-[.1em] mb-[13px]">FAQ</div>
					<h2 className="font-serif text-[clamp(36px,4vw,56px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.15]">
						Questions About Our Seattle Cleaning Services
					</h2>
				</div>
				<div className="flex flex-col gap-[14px]">
					{FAQS.map((item, i) => {
						const isOpen = open === i;
						return (
							<div
								key={item.q}
								className="border rounded-[18px] bg-[#FBFBFE] overflow-hidden transition-colors"
								style={{ borderColor: isOpen ? "#FF50B5" : "#E4E4EF" }}
							>
								<button
									type="button"
									onClick={() => setOpen(isOpen ? null : i)}
									className="w-full flex items-center justify-between gap-4 text-left bg-transparent border-none cursor-pointer px-[26px] py-[22px]"
								>
									<span className="text-[16.5px] font-semibold text-ink-800">{item.q}</span>
									<Plus
										size={20}
										className="text-pink-500 shrink-0 transition-transform duration-[250ms]"
										style={{
											transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
											transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
										}}
									/>
								</button>
								<div
									className="grid transition-[grid-template-rows,opacity] duration-[350ms]"
									style={{
										gridTemplateRows: isOpen ? "1fr" : "0fr",
										opacity: isOpen ? 1 : 0,
										transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
									}}
								>
									<div className="overflow-hidden">
										<p className="px-[26px] pb-6 text-[14.5px] text-ink-600 leading-[1.7]">{item.a}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

/* ================= MAP / CITY SELECTOR ================= */

type CityName = "Seattle" | "Bellevue" | "Kirkland" | "Lynnwood" | "Shoreline" | "Edmonds";

const CITY_ORDER: CityName[] = ["Seattle", "Bellevue", "Kirkland", "Lynnwood", "Shoreline", "Edmonds"];

const CITIES: Record<CityName, { blurb: string; hoods: string; rating: string; resp: string; homes: number }> = {
	Seattle: {
		blurb:
			"Premium residential and commercial cleaning across Seattle — from downtown high-rises to Craftsman homes in Ballard and Queen Anne.",
		hoods: "Capitol Hill · Ballard · Queen Anne · Fremont",
		rating: "4.9",
		resp: "Same day",
		homes: 180,
	},
	Bellevue: {
		blurb:
			"Luxury homes and Eastside high-rises. Deep cleans, recurring upkeep and detailed move-in / move-out service.",
		hoods: "Downtown · Somerset · Bridle Trails · Newport",
		rating: "5.0",
		resp: "2 hrs",
		homes: 120,
	},
	Kirkland: {
		blurb:
			"Waterfront living and established neighborhoods — flexible bi-weekly and monthly plans for busy professionals.",
		hoods: "Moss Bay · Juanita · Houghton · Totem Lake",
		rating: "4.9",
		resp: "3 hrs",
		homes: 95,
	},
	Lynnwood: {
		blurb: "Our home base. Reliable weekly and bi-weekly cleaning for Lynnwood, Mill Creek and the north corridor.",
		hoods: "Alderwood · Martha Lake · Mill Creek",
		rating: "4.9",
		resp: "Same day",
		homes: 160,
	},
	Shoreline: {
		blurb:
			"Family-friendly neighborhoods north of Seattle — affordable, dependable cleaning that works around your schedule.",
		hoods: "Richmond Beach · Echo Lake · Ridgecrest",
		rating: "4.8",
		resp: "4 hrs",
		homes: 70,
	},
	Edmonds: {
		blurb: "Coastal charm minutes from our HQ — meticulous home cleaning with a personal, local touch.",
		hoods: "Downtown · Seaview · Perrinville",
		rating: "5.0",
		resp: "2 hrs",
		homes: 65,
	},
};

const PINS: { city: CityName; left: string; top: string; hq?: boolean }[] = [
	{ city: "Lynnwood", left: "40%", top: "28%", hq: true },
	{ city: "Edmonds", left: "23%", top: "37%" },
	{ city: "Shoreline", left: "45%", top: "50%" },
	{ city: "Kirkland", left: "64%", top: "44%" },
	{ city: "Seattle", left: "41%", top: "66%" },
	{ city: "Bellevue", left: "67%", top: "62%" },
];

export function CityMapSection() {
	const [city, setCity] = useState<CityName>("Seattle");
	const data = CITIES[city];

	return (
		<section id="areas" className="py-[clamp(64px,8vw,104px)] bg-white">
			<div className="max-w-[1240px] mx-auto px-10 max-md:px-6">
				<div className="text-center mb-[34px]">
					<div className="mb-4">
						<span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full">
							<Navigation size={13} />
							Service areas
						</span>
					</div>
					<h2 className="text-[clamp(30px,3.4vw,46px)] font-medium text-ink-900 tracking-[-0.025em] leading-[1.12] mb-[14px]">
						Cleaning in your <span className="font-serif italic font-normal">neighborhood</span>
					</h2>
					<p className="text-[16.5px] text-ink-600 leading-[1.7] max-w-[560px] mx-auto">
						Pick your city to see local availability, ratings and the neighborhoods our teams cover across
						Greater Seattle.
					</p>
				</div>

				{/* city pills */}
				<div className="flex flex-wrap gap-2.5 justify-center mb-[42px]">
					{CITY_ORDER.map((c) => {
						const on = c === city;
						return (
							<button
								key={c}
								type="button"
								onClick={() => setCity(c)}
								className="text-sm font-semibold px-[22px] py-[11px] rounded-full border-[1.5px] cursor-pointer transition-all duration-[250ms]"
								style={{
									background: on ? "#FF50B5" : "#fff",
									color: on ? "#fff" : "#606078",
									borderColor: on ? "#FF50B5" : "#E4E4EF",
									boxShadow: on ? "0 10px 24px rgba(255,80,181,0.30)" : "none",
									transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
								}}
							>
								{c}
							</button>
						);
					})}
				</div>

				{/* spotlight + map */}
				<div className="flex flex-wrap gap-6 items-stretch">
					{/* spotlight */}
					<div className="flex-[1_1_320px] flex flex-col bg-pink-50 border border-[#FCD9EE] rounded-3xl p-[clamp(26px,3vw,38px)]">
						<div className="flex items-center gap-2 mb-2">
							<MapPin size={17} className="text-pink-500" />
							<span className="text-[11.5px] font-bold text-pink-500 uppercase tracking-[.13em]">
								Now serving
							</span>
						</div>
						<div className="text-[clamp(30px,3.4vw,44px)] font-semibold text-ink-900 tracking-[-0.02em] leading-[1.08] mb-4">
							{city}
						</div>
						<div className="flex flex-wrap gap-[9px] mb-[18px]">
							<span className="inline-flex items-center gap-1.5 bg-white border border-[#FCD9EE] rounded-full px-[13px] py-[7px] text-[13px] font-semibold text-ink-800">
								<Star size={14} className="text-pink-500" />
								{data.rating} rating
							</span>
							<span className="inline-flex items-center gap-1.5 bg-white border border-[#FCD9EE] rounded-full px-[13px] py-[7px] text-[13px] font-semibold text-ink-800">
								<Clock size={14} className="text-blue-600" />
								Responds in {data.resp}
							</span>
						</div>
						<p className="text-[15.5px] text-[#5A5A6E] leading-[1.8] mb-5">{data.blurb}</p>
						<div className="flex items-start gap-[9px] py-[15px] border-t border-b border-[#FCD9EE] mb-5">
							<Map size={17} className="text-pink-500 shrink-0 mt-0.5" />
							<span className="text-[13.5px] text-ink-600 leading-[1.55]">{data.hoods}</span>
						</div>
						<div className="flex items-center justify-between gap-4 flex-wrap mt-auto">
							<div className="flex items-baseline gap-[7px]">
								<span className="text-[30px] font-bold text-pink-500 tracking-[-0.02em]">
									{data.homes}+
								</span>
								<span className="text-[13px] text-[#808098]">homes cleaned</span>
							</div>
							<Link
								href="/#book"
								className="inline-flex items-center gap-[7px] bg-pink-500 text-white font-semibold text-sm px-[22px] py-3 rounded-full no-underline transition-all duration-200 hover:bg-pink-600 hover:shadow-[0_10px_26px_rgba(255,80,181,0.36)]"
							>
								Book a free quote <ArrowRight size={15} />
							</Link>
						</div>
					</div>

					{/* decorative map */}
					<div className="flex-[2_1_460px] min-w-[300px] relative rounded-3xl overflow-hidden h-[clamp(380px,42vw,520px)] bg-[linear-gradient(135deg,#EEF3FD_0%,#FBF1F8_100%)] border border-[#E7E7F1] shadow-[0_18px_44px_rgba(30,62,162,0.10)]">
						<div className="absolute inset-0 bg-[radial-gradient(rgba(30,62,162,0.10)_1.3px,transparent_1.3px)] bg-[size:26px_26px] opacity-70 pointer-events-none" />
						<div className="absolute inset-0 pointer-events-none">
							<div className="absolute left-[40%] top-[30%] w-[66%] pb-[66%] -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-dashed border-[rgba(255,80,181,0.28)] rounded-full" />
							<div className="absolute left-[40%] top-[30%] w-[42%] pb-[42%] -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-dashed border-[rgba(255,80,181,0.34)] rounded-full" />
							<div className="absolute left-[40%] top-[30%] w-[20%] pb-[20%] -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-dashed border-[rgba(255,80,181,0.42)] rounded-full" />
						</div>
						<div className="absolute top-4 left-4 z-[4] flex items-center gap-[7px] bg-white/[0.92] backdrop-blur-[6px] px-[13px] py-[7px] rounded-full text-xs font-semibold text-blue-600 shadow-[0_4px_14px_rgba(30,62,162,0.12)]">
							<Navigation size={13} />
							Greater Seattle service area
						</div>
						{PINS.map((pin) => {
							const on = pin.city === city;
							const size = pin.hq ? 36 : 32;
							return (
								<button
									key={pin.city}
									type="button"
									aria-label={pin.city}
									onClick={() => setCity(pin.city)}
									className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px] bg-transparent border-none p-0 cursor-pointer"
									style={{ left: pin.left, top: pin.top, zIndex: on ? 6 : 3 }}
								>
									<span
										className="rounded-full border-2 flex items-center justify-center transition-all duration-[250ms]"
										style={{
											width: size,
											height: size,
											background: on ? "#FF50B5" : "#fff",
											color: on ? "#fff" : "#9A9AB0",
											borderColor: on ? "#FF50B5" : "#D8D8E4",
											transform: on ? "scale(1.2)" : "scale(1)",
											boxShadow: on
												? "0 12px 26px rgba(255,80,181,0.42)"
												: "0 4px 12px rgba(30,62,162,0.18)",
											transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
										}}
									>
										{pin.hq ? <Home size={17} /> : <MapPin size={16} />}
									</span>
									<span
										className={`text-xs bg-white/[0.92] px-[9px] py-0.5 rounded-full whitespace-nowrap shadow-[0_2px_8px_rgba(30,62,162,0.10)] ${pin.hq ? "font-bold" : "font-semibold"}`}
										style={{ color: on ? "#FF50B5" : "#808098" }}
									>
										{pin.city}
										{pin.hq ? " · HQ" : ""}
									</span>
								</button>
							);
						})}
						<div className="absolute bottom-[14px] right-4 z-[4] flex gap-[14px] bg-white/[0.92] backdrop-blur-[6px] px-[13px] py-2 rounded-xl text-[11px] text-[#808098] shadow-[0_4px_14px_rgba(30,62,162,0.12)]">
							<span className="flex items-center gap-[5px]">
								<span className="w-[9px] h-[9px] rounded-full bg-pink-500 inline-block" />
								Selected
							</span>
							<span className="flex items-center gap-[5px]">
								<span className="w-[11px] h-[11px] rounded-full border-[1.5px] border-dashed border-pink-500 inline-block" />
								Radius
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
