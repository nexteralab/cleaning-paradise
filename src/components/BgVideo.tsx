"use client";

// Video de fondo con poster y fallback móvil: en pantallas < md renderiza solo
// la imagen (evita descargar MB de video en celular); en desktop monta el video
// con la lógica de autoplay-con-reintentos que vivía en el hero del home.
import { useEffect, useRef, useState } from "react";

export default function BgVideo({
	src,
	poster,
	className = "",
}: {
	src: string;
	poster: string;
	className?: string;
}) {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [desktop, setDesktop] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		setDesktop(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setDesktop(e.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	useEffect(() => {
		if (!desktop) return;
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
	}, [desktop]);

	if (!desktop) {
		return <img src={poster} alt="" aria-hidden className={className} />;
	}
	return (
		<video
			ref={videoRef}
			src={src}
			poster={poster}
			autoPlay
			muted
			loop
			playsInline
			preload="metadata"
			className={className}
		/>
	);
}
