"use client";

// Video de fondo con poster mientras carga. Autoplay con reintentos
// (iOS/Android a veces ignoran el primer play()).
import { useEffect, useRef } from "react";

export default function BgVideo({
	src,
	poster,
	className = "",
}: {
	src: string;
	poster?: string;
	className?: string;
}) {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
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
	}, []);

	return (
		<video
			ref={videoRef}
			src={src}
			poster={poster}
			autoPlay
			muted
			loop
			playsInline
			preload="auto"
			className={className}
		/>
	);
}
