"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

// Counts up from 0 to a number when scrolled into view. Preserves any
// non-numeric suffix/prefix in `value` (e.g. "450+", "100%", "4.9").
export default function CountUp({
	value,
	className,
	duration = 1.4,
}: {
	value: string;
	className?: string;
	duration?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

	const match = value.match(/^([\d.,]+)(.*)$/);
	const numeric = match ? match[1].replace(/,/g, "") : "";
	const target = numeric ? parseFloat(numeric) : 0;
	const suffix = match ? match[2] : "";
	const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;

	// Start at the final value so SSR / no-JS / crawlers see the real number
	// (never "0+"). The count-up animation is progressive enhancement only.
	const [n, setN] = useState(target);

	useEffect(() => {
		if (!inView) return;
		const reduce =
			typeof window !== "undefined" &&
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		if (reduce) {
			setN(target);
			return;
		}
		const controls = animate(0, target, {
			duration,
			ease: [0.16, 1, 0.3, 1],
			onUpdate: (v) => setN(v),
		});
		return () => controls.stop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, target, duration]);

	// Non-numeric value (shouldn't happen for stats) — render as-is.
	if (!match) return <span className={className}>{value}</span>;

	return (
		<span ref={ref} className={className}>
			{n.toFixed(decimals)}
			{suffix}
		</span>
	);
}
