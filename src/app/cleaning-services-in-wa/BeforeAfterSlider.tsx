"use client";

import { useCallback, useRef, useState } from "react";

export default function BeforeAfterSlider({
	beforeSrc,
	afterSrc,
	beforeAlt,
	afterAlt,
}: {
	beforeSrc: string;
	afterSrc: string;
	beforeAlt: string;
	afterAlt: string;
}) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const draggingRef = useRef(false);
	const [percent, setPercent] = useState(50);

	const updateFromClientX = useCallback((clientX: number) => {
		const el = sliderRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const pct = ((clientX - rect.left) / rect.width) * 100;
		setPercent(Math.max(5, Math.min(95, pct)));
	}, []);

	const onPointerDown = useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			draggingRef.current = true;
			e.currentTarget.setPointerCapture(e.pointerId);
			updateFromClientX(e.clientX);
		},
		[updateFromClientX],
	);

	const onPointerMove = useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			if (draggingRef.current) updateFromClientX(e.clientX);
		},
		[updateFromClientX],
	);

	const endDrag = useCallback(() => {
		draggingRef.current = false;
	}, []);

	return (
		<div
			ref={sliderRef}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={endDrag}
			onPointerCancel={endDrag}
			className="relative h-[210px] w-full shrink-0 cursor-ew-resize touch-none select-none"
		>
			{/* After image (base) */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={afterSrc} alt={afterAlt} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
			{/* Before image (clipped from right) */}
			<div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={beforeSrc} alt={beforeAlt} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
			</div>
			{/* Divider + handle */}
			<div
				className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)]"
				style={{ left: `${percent}%` }}
			>
				<div className="absolute top-1/2 left-1/2 flex h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.22)]">
					<svg
						width="18"
						height="18"
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
			<span className="pointer-events-none absolute top-2.5 left-2.5 rounded-full bg-black/[0.52] px-2.5 py-[3px] text-[10px] font-bold tracking-[0.05em] text-white">
				BEFORE
			</span>
			<span className="pointer-events-none absolute top-2.5 right-2.5 rounded-full bg-pink-500/85 px-2.5 py-[3px] text-[10px] font-bold tracking-[0.05em] text-white">
				AFTER
			</span>
		</div>
	);
}
