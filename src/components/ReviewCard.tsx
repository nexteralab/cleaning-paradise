"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Review } from "@/lib/reviews";

// Texto colapsado: ~4.5 líneas a text-[15px]/leading-[1.65]. Junto con header,
// estrellas, botón y padding da los 300px de tarjeta cerrada (CARD_H).
const COLLAPSED = 116;
// ponytail: alto fijo en cerrado para que el tren no baile; "Show more" lo suelta a auto.
const CARD_H = "h-[300px]";

// Estilo Google: avatar de color sólido con la inicial; el color sale del nombre
// para que cada reviewer quede estable entre renders.
const AVATAR_COLORS = ["#4285F4", "#EA4335", "#34A853", "#FBBC05", "#9334E6", "#E8710A"];
const avatarColor = (name: string) =>
	AVATAR_COLORS[[...name].reduce((h, c) => h + c.charCodeAt(0), 0) % AVATAR_COLORS.length];

export function GoogleG({ size = 20 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 48 48" aria-label="Google" role="img">
			<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
			<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
			<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
			<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
		</svg>
	);
}

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
		<div
			className={`flex flex-col overflow-hidden rounded-[22px] bg-white px-7 py-[30px] shadow-[0_8px_24px_rgba(30,62,162,0.06)] ${expanded ? "h-auto" : CARD_H
				}`}
		>
			<div className="mb-3 flex items-start justify-between gap-2">
				<div className="flex items-center gap-3">
					<div
						className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-[17px] font-medium text-white"
						style={{ backgroundColor: avatarColor(review.name) }}
					>
						{review.name[0]?.toUpperCase()}
					</div>
					<div>
						<div className="text-sm font-semibold text-ink-800">{review.name}</div>
						<div className="text-xs text-[#70757a]">{review.location}</div>
					</div>
				</div>
				<GoogleG />
			</div>
			<div className="mb-3 flex items-center gap-2">
				<span className="text-[17px] leading-none tracking-[1px] text-[#FBBC05]" aria-label="5 out of 5 stars">
					★★★★★
				</span>
				<svg width="14" height="14" viewBox="0 0 24 24" aria-label="Verified" role="img">
					<circle cx="12" cy="12" r="12" fill="#1a73e8" />
					<path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
			<motion.div
				className="relative overflow-hidden"
				initial={false}
				animate={{ height: collapsed ? COLLAPSED : "auto" }}
				transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
			>
				<p ref={textRef} className="text-[15px] leading-[1.65] text-[#3c4043]">
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
					className="mt-2 self-start text-[13px] font-semibold text-[#1a73e8] hover:underline"
				>
					{expanded ? "Less" : "Read more"}
				</button>
			)}
		</div>
	);
}
