"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";

const COOKIE = "cp_music";

function setCookie(v: "1" | "0") {
	document.cookie = `${COOKIE}=${v}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}
function getCookie() {
	return document.cookie
		.split("; ")
		.find((c) => c.startsWith(`${COOKIE}=`))
		?.split("=")[1];
}

// Floating, unobtrusive music toggle. Lives in the root layout so playback
// survives client-side navigation. State (playing/paused) persists in a cookie.
export default function MusicPlayer() {
	const pathname = usePathname();
	const ref = useRef<HTMLAudioElement>(null);
	const [playing, setPlaying] = useState(false);

	// Resume if the user had it playing. Browsers block autoplay with sound
	// until a user gesture, so this may no-op until the first click.
	useEffect(() => {
		if (getCookie() === "1") {
			ref.current
				?.play()
				.then(() => setPlaying(true))
				.catch(() => setPlaying(false));
		}
	}, []);

	if (pathname?.startsWith("/admin")) return null;

	const toggle = async () => {
		const a = ref.current;
		if (!a) return;
		if (a.paused) {
			try {
				await a.play();
				setPlaying(true);
				setCookie("1");
			} catch {
				/* autoplay/hardware blocked — leave paused */
			}
		} else {
			a.pause();
			setPlaying(false);
			setCookie("0");
		}
	};

	return (
		<>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
			<audio ref={ref} src="/music/music_cleanign.mp3" loop preload="none" />
			<button
				type="button"
				onClick={toggle}
				aria-label={playing ? "Pause background music" : "Play background music"}
				aria-pressed={playing}
				title={playing ? "Pause music" : "Play music"}
				className="fixed right-5 bottom-5 z-[9998] flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white shadow-[0_8px_24px_rgba(19,19,32,0.3)] transition-transform duration-200 ease-(--ease-out) hover:scale-105"
			>
				{playing && (
					<span className="absolute inset-0 animate-ping rounded-full bg-pink-500/40" />
				)}
				<span className="relative">{playing ? <Pause size={18} /> : <Play size={18} />}</span>
			</button>
		</>
	);
}
