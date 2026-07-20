"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, ShieldCheck } from "lucide-react";
import type { ServiceFaq } from "./services-data";
import SuccessModal from "@/components/SuccessModal";

/* ─── Before / After slider (hero) ─── */

export function BeforeAfterSlider() {
	const ref = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);
	const [pct, setPct] = useState(50);

	const update = (clientX: number) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		setPct(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
	};

	return (
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
			className="relative h-[clamp(400px,52vh,580px)] cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl"
		>
			{/* After image (base) */}
			<img
				src="/img/after.webp"
				alt="After cleaning"
				className="pointer-events-none absolute inset-0 h-full w-full object-cover"
			/>
			{/* Before image (clipped from right) */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
			>
				<img
					src="/img/before.webp"
					alt="Before cleaning"
					className="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
			{/* Divider + handle */}
			<div
				className="pointer-events-none absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.25)]"
				style={{ left: `${pct}%` }}
			>
				<div className="absolute top-1/2 left-1/2 flex h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_18px_rgba(0,0,0,0.22)]">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#FF50B5"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="9 18 3 12 9 6" />
						<polyline points="15 6 21 12 15 18" />
					</svg>
				</div>
			</div>
			{/* Labels */}
			<span className="pointer-events-none absolute top-3.5 left-3.5 rounded-[100px] bg-black/52 px-3 py-1 text-[10px] font-bold tracking-[.06em] text-white">
				BEFORE
			</span>
			<span className="pointer-events-none absolute top-3.5 right-3.5 rounded-[100px] bg-pink-500/85 px-3 py-1 text-[10px] font-bold tracking-[.06em] text-white">
				AFTER
			</span>
			{/* Stats overlay */}
			<div className="absolute right-5 bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)] backdrop-blur-[10px]">
				<div className="flex items-center justify-around gap-2">
					<div className="text-center">
						<div className="text-[22px] leading-none font-bold text-pink-500">450+</div>
						<div className="mt-[3px] text-[11px] font-semibold text-[#808098]">Homes Cleaned</div>
					</div>
					<div className="h-8 w-px bg-ink-200" />
					<div className="text-center">
						<div className="text-[22px] leading-none font-bold text-pink-500">4+</div>
						<div className="mt-[3px] text-[11px] font-semibold text-[#808098]">Years Experience</div>
					</div>
					<div className="h-8 w-px bg-ink-200" />
					{/* Google rating */}
					<div className="flex flex-col items-center gap-[3px]">
						<div className="flex items-center gap-[5px]">
							<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
							<span className="text-[22px] leading-none font-bold text-ink-900">4.9</span>
						</div>
						<span className="text-[11px] tracking-[-1px] text-[#FBBC05]">★★★★★</span>
						<div className="text-[10px] font-semibold text-[#808098]">(51) Google Reviews</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* ─── Quote form (sticky card) ─── */

const inputClass =
	"w-full rounded-xl border-[1.5px] border-ink-200 bg-ink-50 px-3.5 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-pink-500 focus:bg-white";

const frequencies = ["Weekly", "Biweekly", "Monthly", "One-time"];

export function QuoteForm({ defaultService }: { defaultService: string }) {
	const [freq, setFreq] = useState("Weekly");
	const [sent, setSent] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	return (
		<div className="rounded-3xl border border-[#EFEFF4] bg-white p-8 shadow-[0_20px_60px_rgba(30,62,162,0.11)] lg:sticky lg:top-[100px]">
			<h3 className="mb-1 text-[22px] font-semibold text-ink-900">Get a free quote</h3>
			<p className="mb-6 text-[13px] text-[#808098]">No obligation — we respond within 2 hours.</p>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setError("");
					setSubmitting(true);
					const form = e.currentTarget;
					const fd = new FormData(form);
					const service = fd.get("service");
					const payload = {
						firstName: fd.get("name"),
						email: fd.get("email"),
						phone: fd.get("phone"),
						service,
						services: service ? [service] : [],
						frequency: freq,
						sqft: fd.get("sqft"),
						notes: fd.get("notes"),
						promo: true,
						source: "service-quote",
					};
					try {
						const res = await fetch("/api/contact", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(payload),
						});
						if (!res.ok) throw new Error();
						form.reset();
						setFreq("Weekly");
						setSent(true);
					} catch {
						setError("Something went wrong. Please call (425) 610-0241.");
					} finally {
						setSubmitting(false);
					}
				}}
				className="flex flex-col gap-[13px]"
			>
				<div className="flex gap-2.5">
					<input name="name" required autoComplete="name" placeholder="Your name" className={`${inputClass} min-w-0 flex-1`} />
					<input
						name="phone"
						type="tel"
						autoComplete="tel"
						placeholder="Phone"
						className={`${inputClass} min-w-0 flex-1`}
					/>
				</div>
				<input name="email" type="email" required autoComplete="email" placeholder="Email address" className={inputClass} />
				<select
					name="service"
					defaultValue={defaultService}
					className={`${inputClass} cursor-pointer appearance-none`}
				>
					<option value="standard">🧹 Standard Maid Service</option>
					<option value="deep">✨ Deep Cleaning</option>
					<option value="commercial">🏢 Commercial Cleaning</option>
					<option value="movein">🚚 Move In / Out</option>
					<option value="packing">📦 Packing &amp; Unpacking</option>
					<option value="carpet">🪣 Carpet Cleaning</option>
				</select>
				<div>
					<label className="mb-[9px] block text-xs font-semibold text-ink-600">
						Preferred frequency
					</label>
					<div className="flex flex-wrap gap-[7px]">
						{frequencies.map((f) => (
							<button
								key={f}
								type="button"
								onClick={() => setFreq(f)}
								className={`cursor-pointer rounded-full border-[1.5px] px-[15px] py-[7px] text-xs font-semibold transition-all ${
									freq === f
										? "border-pink-500 bg-pink-500 text-white"
										: "border-ink-200 bg-[#F4F4F8] text-ink-600"
								}`}
							>
								{f}
							</button>
						))}
					</div>
				</div>
				<input
					name="sqft"
					type="number"
					placeholder="Home size (sq ft) — e.g. 1,200"
					className={inputClass}
				/>
				<textarea
					name="notes"
					rows={3}
					placeholder="Special requests — pets, allergies, areas to focus on…"
					className={`${inputClass} resize-y`}
				/>
				{error && <p className="text-center text-[13px] text-pink-600">{error}</p>}
				<button
					type="submit"
					disabled={submitting}
					className="flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border-none bg-pink-500 p-[15px] text-[15px] font-bold text-white transition-all duration-200 ease-(--ease-out) hover:bg-pink-600 hover:shadow-[0_8px_28px_rgba(255,80,181,.36)] disabled:opacity-60"
				>
					{submitting ? "Sending…" : "Get my free quote"} <ArrowRight size={16} />
				</button>
				<p className="flex items-center justify-center gap-[5px] text-center text-[11.5px] text-[#A0A0AE]">
					<ShieldCheck size={13} />
					Licensed, Insured &amp; Bonded · 100% satisfaction guarantee
				</p>
			</form>
			<SuccessModal open={sent} onClose={() => setSent(false)} />
		</div>
	);
}

/* ─── FAQ accordion ─── */

export function FaqAccordion({ items }: { items: ServiceFaq[] }) {
	const [open, setOpen] = useState<Record<number, boolean>>({});

	return (
		<div className="flex flex-col gap-2.5">
			{items.map((item, i) => {
				const isOpen = !!open[i];
				return (
					<div
						key={i}
						className={`overflow-hidden rounded-[18px] border transition-colors ${
							isOpen ? "border-pink-500 bg-[#FFF8FC]" : "border-[#F0D0E8] bg-white"
						}`}
					>
						<button
							type="button"
							onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
							className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-[26px] py-[22px] text-left"
						>
							<span className="text-[15.5px] font-semibold text-ink-800">{item.q}</span>
							<Plus
								size={20}
								className={`shrink-0 text-pink-500 transition-transform duration-250 ease-(--ease-out) ${
									isOpen ? "rotate-45" : ""
								}`}
							/>
						</button>
						<div
							className={`grid transition-[grid-template-rows,opacity] duration-350 ease-(--ease-out) ${
								isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
							}`}
						>
							<div className="overflow-hidden">
								<p className="px-[26px] pb-6 text-[14.5px] leading-[1.75] text-ink-600">
									{item.a.map((part, j) =>
										typeof part === "string" ? (
											part
										) : (
											<Link
												key={j}
												href={part.href}
												className="font-semibold text-pink-500 no-underline hover:underline"
											>
												{part.label}
											</Link>
										),
									)}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
