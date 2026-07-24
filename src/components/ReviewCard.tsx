"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Review } from "@/lib/reviews";

// ~6 lines at text-[15px]/leading-[1.65] ≈ 149px — the length of our shortest
// featured review. Longer quotes collapse to this and reveal on "Ver más".
const COLLAPSED = 150;

// "Camilo P." -> "CP". First letter of first two words.
const initials = (name: string) =>
	name
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.join("");

export default function ReviewCard({ review }: { review: Review }) {
	const textRef = useRef<HTMLParagraphElement>(null);
	const [expanded, setExpanded] = useState(false);
	const [overflowing, setOverflowing] = useState(false);

	useEffect(() => {
		const el = textRef.current;
		if (!el) return;
		const check = () => setOverflowing(el.scrollHeight > COLLAPSED + 4);
		check();
		window.addEventListener("resize", check, { passive: true });
		return () => window.removeEventListener("resize", check);
	}, []);

	const collapsed = overflowing && !expanded;

	return (
		<div className="flex flex-col rounded-[22px] bg-white px-7 py-[30px] shadow-[0_8px_24px_rgba(30,62,162,0.06)]">
			<div className="flex items-center justify-between gap-2 mb-4">
				<div className="flex items-center gap-3">
					<div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-pink-100 text-[13px] font-bold text-pink-700">
						{initials(review.name)}
					</div>
					<div>
						<div className="text-sm font-semibold text-ink-800">{review.name}</div>
						<div className="text-xs text-[#808098]">{review.location}</div>
					</div>
				</div>
				<div className="mb-3.5 text-[15px] tracking-[2px] text-pink-500">★★★★★</div>
			</div>
			<motion.div
				className="relative overflow-hidden"
				initial={false}
				animate={{ height: collapsed ? COLLAPSED : "auto" }}
				transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
			>
				<p ref={textRef} className="text-[15px] leading-[1.65] text-ink-800 italic">
					{review.text}
				</p>
				{/* fade hint at the bottom while collapsed */}
				<div
					className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white transition-opacity duration-300 ${collapsed ? "opacity-100" : "opacity-0"
						}`}
				/>
			</motion.div>
			{(overflowing || expanded) && (
				<button
					type="button"
					onClick={() => setExpanded((v) => !v)}
					className="mt-2 self-start text-[13px] font-semibold text-pink-500 hover:underline"
				>
					{expanded ? "Show less" : "Show more"}
				</button>
			)}
			{review.photos && review.photos.length > 0 && (
				<div className="mt-[18px] flex gap-2">
					{review.photos.map((src) => (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							key={src}
							src={src}
							alt="Review photo"
							className="h-[76px] w-[76px] shrink-0 rounded-[10px] object-cover"
						/>
					))}
				</div>
			)}
		</div>
	);
}
