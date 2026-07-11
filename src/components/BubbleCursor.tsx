"use client";

import { useEffect } from "react";

// Soap-bubble cursor trail. Ported from the design files
// (Service - Standard Cleaning.dc.html). The custom cursor shape itself lives
// in globals.css; this only draws the popping bubble trail on mouse move.
// No-ops on touch devices (no hovering pointer).
export default function BubbleCursor() {
	useEffect(() => {
		if (!window.matchMedia("(pointer: fine)").matches) return;

		const container = document.createElement("div");
		container.style.cssText =
			"position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
		document.body.appendChild(container);

		let lastX = 0,
			lastY = 0;
		const onMove = (e: MouseEvent) => {
			const dx = e.clientX - lastX;
			const dy = e.clientY - lastY;
			if (Math.sqrt(dx * dx + dy * dy) <= 8) return;

			const size = Math.random() * 12 + 8;
			const bubble = document.createElement("div");
			bubble.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);animation:bubblePop 0.6s ease-out forwards;background:radial-gradient(circle at 30% 30%, rgba(173,216,230,0.8), rgba(100,180,220,0.6));border:1.5px solid rgba(150,200,240,0.4);box-shadow:inset -1px -1px 3px rgba(0,0,0,0.1),0 2px 4px rgba(30,62,162,0.15);`;
			container.appendChild(bubble);
			setTimeout(() => bubble.remove(), 600);
			lastX = e.clientX;
			lastY = e.clientY;
		};

		document.addEventListener("mousemove", onMove);
		return () => {
			document.removeEventListener("mousemove", onMove);
			container.remove();
		};
	}, []);

	return null;
}
