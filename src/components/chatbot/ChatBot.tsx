"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, RotateCcw, Send, Sparkles, X } from "lucide-react";
import {
	acks,
	confused,
	fillPrompt,
	finalMessage,
	greetings,
	pick,
	steps,
} from "./chatFlow";
import { getLead, resetLead, setLead, type Lead } from "./leadStore";

type Msg = { id: number; from: "bot" | "user"; text: string };

// Simulated AI booking assistant. Walks the visitor through the /contact form
// fields conversationally, validates each answer, and persists to the lead
// store. Floats bottom-right (opposite the MusicPlayer).
export default function ChatBot() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<Msg[]>([]);
	const [stepIndex, setStepIndex] = useState(-1); // -1 = intro not run yet
	const [typing, setTyping] = useState(false);
	const [done, setDone] = useState(false);
	const [input, setInput] = useState("");

	const idRef = useRef(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	const startedRef = useRef(false);

	const nextId = () => ++idRef.current;
	const pushUser = (text: string) =>
		setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
	const pushBot = (text: string) =>
		setMessages((m) => [...m, { id: nextId(), from: "bot", text }]);

	// bot "types" then speaks — delay scales with message length
	const botSay = (text: string) =>
		new Promise<void>((resolve) => {
			setTyping(true);
			const delay = 450 + Math.min(text.length * 14, 1300);
			window.setTimeout(() => {
				setTyping(false);
				pushBot(text);
				resolve();
			}, delay);
		});

	// auto-scroll on new messages / typing
	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
	}, [messages, typing]);

	// intro sequence, runs once when first opened
	useEffect(() => {
		if (!open || startedRef.current) return;
		startedRef.current = true;
		(async () => {
			await botSay(pick(greetings));
			setStepIndex(0);
			await botSay(fillPrompt(pick(steps[0].prompts), getLead()));
		})();
	}, [open]);

	const restart = () => {
		resetLead();
		setMessages([]);
		setStepIndex(-1);
		setDone(false);
		setInput("");
		startedRef.current = false;
		// re-trigger intro
		setTimeout(() => {
			startedRef.current = true;
			(async () => {
				await botSay(pick(greetings));
				setStepIndex(0);
				await botSay(fillPrompt(pick(steps[0].prompts), getLead()));
			})();
		}, 50);
	};

	async function answer(raw: string) {
		const text = raw.trim();
		if (typing || done || stepIndex < 0 || !text) return;
		const step = steps[stepIndex];
		pushUser(text);
		setInput("");

		const res = step.validate(text);
		if (!res.ok) {
			const msg = step.errors.length ? pick(step.errors) : pick(confused);
			await botSay(msg);
			return;
		}

		setLead({ [step.key]: res.value } as Partial<Lead>);

		const next = stepIndex + 1;
		if (next < steps.length) {
			await botSay(pick(acks));
			setStepIndex(next);
			await botSay(fillPrompt(pick(steps[next].prompts), getLead()));
		} else {
			setStepIndex(next);
			setLead({ completedAt: new Date().toISOString() });
			await botSay(finalMessage(getLead()));
			setDone(true);
		}
	}

	if (pathname?.startsWith("/admin")) return null;

	const current = stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null;
	const showChips = !!current && !typing && !done;

	return (
		<>
			{/* launcher */}
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-label={open ? "Close assistant" : "Open cleaning assistant"}
				className="fixed right-5 bottom-5 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-white shadow-[0_8px_28px_rgba(255,80,181,0.45)] transition-transform duration-200 ease-(--ease-out) hover:scale-105"
			>
				{!open && (
					<span className="absolute inset-0 animate-ping rounded-full bg-pink-500/40" />
				)}
				<span className="relative">{open ? <X size={22} /> : <Bot size={24} />}</span>
			</button>

			{/* panel */}
			{open && (
				<div className="fixed right-5 bottom-24 z-[9998] flex h-[min(560px,calc(100vh-140px))] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-[0_30px_80px_rgba(19,19,32,0.28)]">
					{/* header */}
					<div className="flex items-center gap-3 bg-[linear-gradient(135deg,#FF50B5_0%,#E0389C_100%)] px-5 py-4 text-white">
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
							<Sparkles size={18} />
						</div>
						<div className="flex-1">
							<div className="text-[15px] font-bold leading-tight">Cleaning Assistant</div>
							<div className="text-[11px] text-white/80">Typically replies instantly</div>
						</div>
						<button
							type="button"
							onClick={restart}
							aria-label="Restart conversation"
							className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/20"
						>
							<RotateCcw size={15} />
						</button>
					</div>

					{/* messages */}
					<div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-ink-50 px-4 py-4">
						{messages.map((m) => (
							<div
								key={m.id}
								className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-[1.5] ${
										m.from === "user"
											? "rounded-br-md bg-pink-500 text-white"
											: "rounded-bl-md bg-white text-ink-800 shadow-[0_2px_10px_rgba(30,62,162,0.08)]"
									}`}
								>
									{m.text}
								</div>
							</div>
						))}
						{typing && (
							<div className="flex justify-start">
								<div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-[0_2px_10px_rgba(30,62,162,0.08)]">
									{[0, 1, 2].map((i) => (
										<span
											key={i}
											className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300"
											style={{ animationDelay: `${i * 0.15}s` }}
										/>
									))}
								</div>
							</div>
						)}
					</div>

					{/* quick-reply chips */}
					{showChips && (current.options || current.optional) && (
						<div className="flex flex-wrap gap-2 border-t border-ink-200 bg-white px-4 pt-3">
							{current.options?.map((o) => (
								<button
									key={o}
									type="button"
									onClick={() => answer(o)}
									className="cursor-pointer rounded-full border-[1.5px] border-ink-200 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-700 transition-colors hover:border-pink-500 hover:text-pink-500"
								>
									{o}
								</button>
							))}
							{current.optional && (
								<button
									type="button"
									onClick={() => answer("skip")}
									className="cursor-pointer rounded-full bg-ink-100 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-500 transition-colors hover:bg-ink-200"
								>
									Skip
								</button>
							)}
						</div>
					)}

					{/* input */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							answer(input);
						}}
						className="flex items-center gap-2 border-t border-ink-200 bg-white px-3 py-3"
					>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							disabled={done || typing || stepIndex < 0}
							placeholder={done ? "Chat ended — restart to book again" : "Type your answer…"}
							className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink-200 bg-ink-50 px-4 py-2.5 text-[13.5px] text-ink-900 outline-none transition-colors focus:border-pink-500 focus:bg-white disabled:opacity-60"
						/>
						<button
							type="submit"
							disabled={done || typing || !input.trim()}
							aria-label="Send"
							className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white transition-all hover:bg-pink-600 disabled:opacity-40"
						>
							<Send size={16} />
						</button>
					</form>
				</div>
			)}
		</>
	);
}
