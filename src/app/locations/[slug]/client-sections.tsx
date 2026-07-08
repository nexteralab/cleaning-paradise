"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
	ArrowRight,
	ChevronsLeftRight,
	Clock,
	Map as MapIcon,
	MapPin,
	MoveHorizontal,
	Navigation,
	Plus,
	Star,
	Home,
} from "lucide-react";
import { locations, locationSlugs } from "../locations-data";

/* ─── Hero before / after slider (per-city images) ─── */

export function HeroSlider({
	before,
	after,
	beforeAlt,
	afterAlt,
}: {
	before: string;
	after: string;
	beforeAlt: string;
	afterAlt: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);
	const [pct, setPct] = useState(50);

	const update = (clientX: number) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		setPct(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
	};

	return (
		<div className="min-w-[300px] max-w-[680px] flex-[1_1_480px]">
			<div
				ref={ref}
				onPointerDown={(e) => {
					dragging.current = true;
					e.currentTarget.setPointerCapture(e.pointerId);
					update(e.clientX);
				}}
				onPointerMove={(e) => {
					if (dragging.current) update(e.clientX);
				}}
				onPointerUp={() => {
					dragging.current = false;
				}}
				onPointerCancel={() => {
					dragging.current = false;
				}}
				className="relative w-full cursor-ew-resize touch-none overflow-hidden rounded-3xl bg-[#222] shadow-[0_28px_60px_rgba(30,62,162,0.22)] select-none"
				style={{ aspectRatio: "760 / 620" }}
			>
				{/* After image (base) */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={after}
					alt={afterAlt}
					draggable={false}
					className="pointer-events-none absolute inset-0 h-full w-full object-cover"
				/>
				<div className="pointer-events-none absolute top-4 right-[18px] z-[4] rounded-full bg-blue-600/55 px-3 py-[5px] text-sm font-bold tracking-[0.08em] text-white backdrop-blur-[4px]">
					AFTER
				</div>
				{/* Before image (clipped from right) */}
				<div
					className="pointer-events-none absolute inset-0 overflow-hidden"
					style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={before}
						alt={beforeAlt}
						draggable={false}
						className="pointer-events-none absolute inset-0 h-full w-full object-cover"
					/>
					<div className="absolute top-4 left-[18px] rounded-full bg-ink-900/50 px-3 py-[5px] text-sm font-bold tracking-[0.08em] text-white backdrop-blur-[4px]">
						BEFORE
					</div>
				</div>
				{/* Divider + handle */}
				<div
					className="pointer-events-none absolute top-0 bottom-0 z-[5] w-[3px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
					style={{ left: `${pct}%` }}
				>
					<div className="absolute top-1/2 left-1/2 flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-pink-500 shadow-[0_6px_18px_rgba(255,80,181,0.5)]">
						<ChevronsLeftRight size={20} className="text-white" />
					</div>
				</div>
				{/* Stats card overlaid at bottom */}
				<div className="pointer-events-none absolute right-[18px] bottom-[18px] left-[18px] z-[6] flex items-center justify-around gap-2 rounded-[18px] bg-white/95 px-[22px] py-4 shadow-[0_8px_28px_rgba(0,0,0,0.15)] backdrop-blur-[10px]">
					<div className="text-center">
						<div className="text-[23px] leading-none font-bold text-pink-500">450+</div>
						<div className="mt-1 text-[11px] font-semibold text-[#808098]">Homes Cleaned</div>
					</div>
					<div className="h-[34px] w-px bg-ink-200" />
					<div className="text-center">
						<div className="text-[23px] leading-none font-bold text-pink-500">4+</div>
						<div className="mt-1 text-[11px] font-semibold text-[#808098]">Years Experience</div>
					</div>
					<div className="h-[34px] w-px bg-ink-200" />
					<div className="flex flex-col items-center gap-1">
						<div className="flex items-center gap-[5px]">
							<svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							<span className="text-[21px] leading-none font-bold text-ink-900">4.9</span>
						</div>
						<div className="text-[10px] leading-none tracking-[-0.5px] text-[#FBBC05]">★★★★★</div>
						<div className="text-[10px] font-semibold text-[#808098]">(51) Google Reviews</div>
					</div>
				</div>
			</div>
			<div className="mt-3.5 flex items-center justify-center gap-2 text-[13px] font-medium text-[#8A8A9E]">
				<MoveHorizontal size={15} />
				Drag to reveal the transformation
			</div>
		</div>
	);
}

/* ─── FAQ accordion ─── */

const faqs: { q: string; a: string }[] = [
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

export function FaqAccordion() {
	const [open, setOpen] = useState<number | null>(null);

	return (
		<div className="flex flex-col gap-3.5">
			{faqs.map((item, i) => {
				const isOpen = open === i;
				return (
					<div
						key={i}
						className={`overflow-hidden rounded-[18px] border bg-[#FBFBFE] transition-colors ${
							isOpen ? "border-pink-500" : "border-ink-200"
						}`}
					>
						<button
							type="button"
							onClick={() => setOpen(isOpen ? null : i)}
							className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-[26px] py-[22px] text-left"
						>
							<span className="text-[16.5px] font-semibold text-ink-800">{item.q}</span>
							<Plus
								size={20}
								className={`shrink-0 text-pink-500 transition-transform duration-250 ease-[cubic-bezier(.16,1,.3,1)] ${
									isOpen ? "rotate-45" : ""
								}`}
							/>
						</button>
						<div
							className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(.16,1,.3,1)] ${
								isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
							}`}
						>
							<div className="overflow-hidden">
								<p className="px-[26px] pb-6 text-[14.5px] leading-[1.7] text-ink-600">{item.a}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

/* ─── Map / city selector ─── */

const hq = locationSlugs.find((s) => locations[s].hq)!;
const num = (v: string) => parseFloat(v);

/** Curved route path (viewBox 0-100) from the HQ pin to a target city pin. */
function routePath(targetSlug: string): string | null {
	const t = locations[targetSlug];
	if (!t || t.hq) return null;
	const h = locations[hq].pin;
	const hx = num(h.left);
	const hy = num(h.top);
	const tx = num(t.pin.left);
	const ty = num(t.pin.top);
	const cx = (hx + tx) / 2;
	const cy = (hy + ty) / 2 - 12;
	return `M ${hx} ${hy} Q ${cx} ${cy} ${tx} ${ty}`;
}

export function CitySelector({ initial }: { initial: string }) {
	const [current, setCurrent] = useState(
		locations[initial] ? initial : "seattle",
	);
	const d = locations[current];
	const path = routePath(current);

	return (
		<div className="flex flex-col gap-[42px]">
			{/* city pills */}
			<div className="flex flex-wrap justify-center gap-2.5">
				{locationSlugs.map((slug) => {
					const on = slug === current;
					return (
						<button
							key={slug}
							type="button"
							onClick={() => setCurrent(slug)}
							className={`cursor-pointer rounded-full border-[1.5px] px-[22px] py-[11px] text-sm font-semibold transition-all duration-250 ease-[cubic-bezier(.16,1,.3,1)] ${
								on
									? "border-pink-500 bg-pink-500 text-white shadow-[0_10px_24px_rgba(255,80,181,0.30)]"
									: "border-ink-200 bg-white text-ink-600"
							}`}
						>
							{locations[slug].name}
						</button>
					);
				})}
			</div>

			{/* spotlight + map */}
			<div className="flex flex-wrap items-stretch gap-6">
				{/* spotlight */}
				<div className="flex flex-[1_1_320px] flex-col rounded-3xl border border-[#FCD9EE] bg-pink-50 p-[clamp(26px,3vw,38px)]">
					<div className="mb-2 flex items-center gap-2">
						<MapPin size={17} className="text-pink-500" />
						<span className="text-[11.5px] font-bold tracking-[0.13em] text-pink-500 uppercase">
							Now serving
						</span>
					</div>
					<AnimatePresence mode="wait">
						<motion.div
							key={current}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -12 }}
							transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
							className="flex flex-1 flex-col"
						>
							<div className="mb-4 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-semibold tracking-[-0.02em] text-ink-900">
								{d.name}
							</div>
							<div className="mb-[18px] flex flex-wrap gap-[9px]">
								<span className="inline-flex items-center gap-1.5 rounded-full border border-[#FCD9EE] bg-white px-[13px] py-[7px] text-[13px] font-semibold text-ink-800">
									<Star size={14} className="text-pink-500" />
									{d.rating} rating
								</span>
								<span className="inline-flex items-center gap-1.5 rounded-full border border-[#FCD9EE] bg-white px-[13px] py-[7px] text-[13px] font-semibold text-ink-800">
									<Clock size={14} className="text-blue-600" />
									Responds in {d.resp}
								</span>
							</div>
							<p className="mb-5 text-[15.5px] leading-[1.8] text-[#5A5A6E]">{d.blurb}</p>
							<div className="mb-5 flex items-start gap-[9px] border-y border-[#FCD9EE] py-[15px]">
								<MapIcon size={17} className="mt-0.5 shrink-0 text-pink-500" />
								<span className="text-[13.5px] leading-[1.55] text-ink-600">{d.hoods}</span>
							</div>
							<div className="mt-auto flex flex-wrap items-center justify-between gap-4">
								<div className="flex items-baseline gap-[7px]">
									<span className="text-[30px] font-bold tracking-[-0.02em] text-pink-500">
										{d.homes}+
									</span>
									<span className="text-[13px] text-[#808098]">homes cleaned</span>
								</div>
								<Link
									href={`/locations/${current}`}
									className="inline-flex items-center gap-[7px] rounded-full bg-pink-500 px-[22px] py-3 text-sm font-semibold text-white no-underline transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:bg-pink-600 hover:shadow-[0_10px_26px_rgba(255,80,181,0.36)]"
								>
									View {d.name} <ArrowRight size={15} />
								</Link>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* decorative map */}
				<div className="relative min-w-[300px] flex-[2_1_460px] overflow-hidden rounded-3xl border border-[#E7E7F1] bg-[linear-gradient(135deg,#EEF3FD_0%,#FBF1F8_100%)] shadow-[0_18px_44px_rgba(30,62,162,0.10)] h-[clamp(380px,42vw,520px)]">
					<div
						className="pointer-events-none absolute inset-0 opacity-70"
						style={{
							backgroundImage:
								"radial-gradient(rgba(30,62,162,0.10) 1.3px, transparent 1.3px)",
							backgroundSize: "26px 26px",
						}}
					/>
					{/* radius rings */}
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute left-[40%] top-[30%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-pink-500/[0.28] pb-[66%]" />
						<div className="absolute left-[40%] top-[30%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-pink-500/[0.34] pb-[42%]" />
						<div className="absolute left-[40%] top-[30%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-pink-500/[0.42] pb-[20%]" />
					</div>
					<div className="absolute top-4 left-4 z-[4] flex items-center gap-[7px] rounded-full bg-white/90 px-[13px] py-[7px] text-xs font-semibold text-blue-600 shadow-[0_4px_14px_rgba(30,62,162,0.12)] backdrop-blur-[6px]">
						<Navigation size={13} />
						Greater Seattle service area
					</div>
					{/* animated route from HQ to selected city */}
					<svg
						className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						aria-hidden
					>
						{path && (
							<motion.path
								key={current}
								d={path}
								fill="none"
								stroke="#FF50B5"
								strokeWidth={2.5}
								strokeLinecap="round"
								vectorEffect="non-scaling-stroke"
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 1 }}
								transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
							/>
						)}
					</svg>
					{/* pins */}
					{locationSlugs.map((slug) => {
						const loc = locations[slug];
						const on = slug === current;
						return (
							<button
								key={slug}
								type="button"
								aria-label={loc.name}
								onClick={() => setCurrent(slug)}
								className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-[5px] border-none bg-transparent p-0"
								style={{ left: loc.pin.left, top: loc.pin.top, zIndex: on ? 6 : 3 }}
							>
								<span
									className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-250 ease-[cubic-bezier(.16,1,.3,1)] ${
										loc.hq ? "h-9 w-9" : "h-8 w-8"
									} ${
										on
											? "scale-110 border-pink-500 bg-pink-500 text-white shadow-[0_12px_26px_rgba(255,80,181,0.42)]"
											: "border-[#D8D8E4] bg-white text-[#9A9AB0] shadow-[0_4px_12px_rgba(30,62,162,0.18)]"
									}`}
								>
									{on && (
										<motion.span
											className="absolute inset-0 rounded-full border-2 border-pink-500"
											initial={{ scale: 1, opacity: 0.55 }}
											animate={{ scale: 2.3, opacity: 0 }}
											transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
										/>
									)}
									{loc.hq ? <Home size={17} /> : <MapPin size={16} />}
								</span>
								<span
									className={`rounded-full bg-white/90 px-[9px] py-0.5 text-xs font-bold whitespace-nowrap shadow-[0_2px_8px_rgba(30,62,162,0.10)] ${
										on ? "text-pink-500" : "text-[#808098]"
									}`}
								>
									{loc.hq ? `${loc.name} · HQ` : loc.name}
								</span>
							</button>
						);
					})}
					{/* legend */}
					<div className="absolute right-4 bottom-3.5 z-[4] flex gap-3.5 rounded-xl bg-white/90 px-[13px] py-2 text-[11px] text-[#808098] shadow-[0_4px_14px_rgba(30,62,162,0.12)] backdrop-blur-[6px]">
						<span className="flex items-center gap-[5px]">
							<span className="inline-block h-[9px] w-[9px] rounded-full bg-pink-500" />
							Selected
						</span>
						<span className="flex items-center gap-[5px]">
							<span className="inline-block h-[11px] w-[11px] rounded-full border-[1.5px] border-dashed border-pink-500" />
							Radius
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
