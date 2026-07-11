"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";

// Reusable "message sent" confirmation modal. Controlled via `open`/`onClose`.
// Used by every contact/quote form to confirm a (currently simulated) submit.
export default function SuccessModal({
	open,
	onClose,
	title = "Message sent!",
	message = "Thanks for reaching out — we'll get back to you within the next 24 hours.",
}: {
	open: boolean;
	onClose: () => void;
	title?: string;
	message?: string;
}) {
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label={title}
			onClick={onClose}
			className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink-900/50 p-5 backdrop-blur-[2px]"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative w-full max-w-[420px] rounded-3xl bg-white p-[clamp(28px,4vw,44px)] text-center shadow-[0_30px_80px_rgba(19,19,32,0.28)]"
			>
				<button
					type="button"
					onClick={onClose}
					aria-label="Close"
					className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
				>
					<X size={18} />
				</button>
				<div className="mx-auto mb-[22px] flex h-[68px] w-[68px] items-center justify-center rounded-full bg-pink-50">
					<Check size={32} className="text-pink-500" />
				</div>
				<h2 className="mb-2.5 font-serif text-[clamp(26px,3vw,34px)] font-normal text-ink-900">
					{title}
				</h2>
				<p className="mx-auto mb-7 max-w-[340px] text-[15px] leading-[1.7] text-ink-600">{message}</p>
				<button
					type="button"
					onClick={onClose}
					className="inline-flex items-center justify-center rounded-full bg-pink-500 px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-pink-600"
				>
					Got it
				</button>
			</div>
		</div>
	);
}
