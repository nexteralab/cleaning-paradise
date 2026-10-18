"use client";

// Video de fondo sobre un poster <img>. El poster es lo que pinta primero (LCP);
// el video solo se descarga en escritorio, sin reduced-motion ni ahorro de datos,
// y cuando la sección entra en pantalla. Autoplay con reintentos
// (iOS/Android a veces ignoran el primer play()).
import { useEffect, useRef, useState } from "react";

export default function BgVideo({
	src,
	poster,
	priority = false,
	className = "",
}: {
	src: string;
	poster: string;
	priority?: boolean; // true solo en el hero (above the fold)
	className?: string;
}) {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [load, setLoad] = useState(false);
	const [playing, setPlaying] = useState(false);

	// ¿Cargar el video? Se decide en cliente; el HTML del server solo trae el poster.
	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
		const ok =
			window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches && !saveData;
		if (!ok) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setLoad(true);
				io.disconnect();
			},
			{ rootMargin: "200px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		const el = videoRef.current;
		if (!el || !load) return;
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
	}, [load]);

	return (
		<>
			<img
				src={poster}
				alt=""
				aria-hidden
				fetchPriority={priority ? "high" : undefined}
				loading={priority ? undefined : "lazy"}
				decoding="async"
				className={className}
			/>
			<video
				ref={videoRef}
				src={load ? src : undefined}
				autoPlay
				muted
				loop
				playsInline
				preload="none"
				aria-hidden
				onPlaying={() => setPlaying(true)}
				className={`${className} transition-opacity duration-700 ${playing ? "" : "!opacity-0"}`}
			/>
		</>
	);
}
