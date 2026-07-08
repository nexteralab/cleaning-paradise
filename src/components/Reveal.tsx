"use client";

import { motion } from "motion/react";

// Scroll-reveal using `motion`: fades, slides up and un-blurs children as they
// enter the viewport. Fires once. Ports the design's data-reveal behavior.
export default function Reveal({
	children,
	delay = 0,
	className,
}: {
	children: React.ReactNode;
	delay?: number; // milliseconds
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "0px 0px -12% 0px" }}
			transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
		>
			{children}
		</motion.div>
	);
}
