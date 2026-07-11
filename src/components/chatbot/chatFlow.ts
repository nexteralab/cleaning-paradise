import type { Lead } from "./leadStore";

// One conversational step per lead field. Each step carries MANY phrasings so
// the bot never sounds scripted, a typed validator that normalizes + accepts
// the answer, and a pile of error/clarification variations for bad input.

export type StepKey = keyof Omit<Lead, "completedAt">;

export type Validated =
	| { ok: true; value: string }
	| { ok: false; error?: string };

export type Step = {
	key: StepKey;
	/** Randomly-picked question phrasings. */
	prompts: string[];
	/** Randomly-picked messages when the input fails validation. */
	errors: string[];
	/** Quick-reply chips (user can still type free text). */
	options?: string[];
	/** Optional steps accept "skip"/"none"/empty. */
	optional?: boolean;
	validate: (raw: string) => Validated;
};

// ── helpers ───────────────────────────────────────────────────────────────
const SKIP = /^(skip|none|no thanks|n\/a|na|nope|pass|later|nothing)$/i;
const isSkip = (s: string) => SKIP.test(s.trim());

const matchOption = (raw: string, options: string[]): string | null => {
	const v = raw.trim().toLowerCase();
	if (!v) return null;
	// exact, then startsWith, then substring either direction
	return (
		options.find((o) => o.toLowerCase() === v) ??
		options.find((o) => o.toLowerCase().startsWith(v)) ??
		options.find((o) => o.toLowerCase().includes(v) || v.includes(o.toLowerCase())) ??
		null
	);
};

// ── steps ───────────────────────────────────────────────────────────────
export const steps: Step[] = [
	{
		key: "name",
		prompts: [
			"First things first — what's your name?",
			"Let's start easy. Who am I chatting with?",
			"May I get your name, please?",
			"What should I call you?",
			"Before we book anything — what's your full name?",
		],
		errors: [
			"Hmm, that doesn't look like a name. Could you type your first and last name?",
			"I didn't quite catch a name there — mind trying again?",
			"That seems a little off. Just your name is perfect (e.g. Jane Doe).",
			"Names don't usually have numbers or symbols — what's your name?",
		],
		validate: (raw) => {
			const v = raw.trim().replace(/\s+/g, " ");
			if (v.length < 2) return { ok: false };
			if (/\d/.test(v) || /@/.test(v)) return { ok: false };
			if (!/[a-zA-Z]/.test(v)) return { ok: false };
			return { ok: true, value: v };
		},
	},
	{
		key: "email",
		prompts: [
			"Nice to meet you, {name}! What's the best email to reach you?",
			"Thanks {name}. Where should we send your quote — your email?",
			"Got it. What email should we use for your quote?",
			"And your email address? We'll send confirmation there.",
		],
		errors: [
			"That email looks incomplete — something like name@example.com works.",
			"Hmm, I couldn't read that as an email. Mind double-checking?",
			"I think there's a typo in there. Could you re-enter your email?",
			"Almost! An email needs an @ and a domain, e.g. you@gmail.com.",
		],
		validate: (raw) => {
			const v = raw.trim();
			if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return { ok: true, value: v };
			return { ok: false };
		},
	},
	{
		key: "phone",
		prompts: [
			"Perfect. What phone number can our team call or text?",
			"What's a good phone number for you?",
			"And a contact number? We'll only use it about your cleaning.",
			"Last contact detail — your phone number, please.",
		],
		errors: [
			"That doesn't look like a full phone number — 10 digits please, e.g. (425) 610-0241.",
			"Hmm, I need a valid number. Try something like 4256100241.",
			"I couldn't read that number. Could you include the area code?",
			"A US phone number has 10 digits — mind re-entering it?",
		],
		validate: (raw) => {
			const digits = raw.replace(/\D/g, "");
			if (digits.length === 11 && digits.startsWith("1")) {
				const d = digits.slice(1);
				return { ok: true, value: `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` };
			}
			if (digits.length === 10) {
				return {
					ok: true,
					value: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
				};
			}
			return { ok: false };
		},
	},
	{
		key: "service",
		prompts: [
			"Which service are you interested in?",
			"What can we help you with?",
			"Pick the service that fits — or tell me in your own words.",
			"What kind of cleaning are you after?",
		],
		errors: [
			"I didn't recognize that service. Tap one of the options below?",
			"Hmm, not sure which service you mean. Here are the ones we offer:",
			"Let's make sure I book the right thing — choose one of these:",
		],
		options: [
			"House Cleaning (Standard)",
			"Deep Cleaning",
			"Commercial Cleaning",
			"Move-In / Move-Out",
			"Packing & Unpacking",
			"Carpet Cleaning",
		],
		validate: (raw) => {
			const opts = [
				"House Cleaning (Standard)",
				"Deep Cleaning",
				"Commercial Cleaning",
				"Move-In / Move-Out",
				"Packing & Unpacking",
				"Carpet Cleaning",
			];
			// friendly synonyms
			const v = raw.trim().toLowerCase();
			if (/standard|regular|house|maid|recurring/.test(v)) return { ok: true, value: opts[0] };
			if (/deep|sanitiz/.test(v)) return { ok: true, value: opts[1] };
			if (/commercial|office|janitor/.test(v)) return { ok: true, value: opts[2] };
			if (/move/.test(v)) return { ok: true, value: opts[3] };
			if (/pack/.test(v)) return { ok: true, value: opts[4] };
			if (/carpet|rug/.test(v)) return { ok: true, value: opts[5] };
			const m = matchOption(raw, opts);
			return m ? { ok: true, value: m } : { ok: false };
		},
	},
	{
		key: "city",
		prompts: [
			"Which city is the home in?",
			"Where are we cleaning? Pick your city.",
			"What city should we head to?",
			"Which part of Greater Seattle are you in?",
		],
		errors: [
			"I didn't catch that city — choose one below, or type the closest one.",
			"Hmm, is that in the Greater Seattle area? Pick the nearest city:",
			"Let me make sure we cover your area — select a city:",
		],
		options: [
			"Seattle",
			"Bellevue",
			"Kirkland",
			"Lynnwood",
			"Mercer Island",
			"Shoreline",
			"Edmonds",
			"Bothell",
			"Other",
		],
		validate: (raw) => {
			const opts = [
				"Seattle",
				"Bellevue",
				"Kirkland",
				"Lynnwood",
				"Mercer Island",
				"Shoreline",
				"Edmonds",
				"Bothell",
			];
			const m = matchOption(raw, opts);
			if (m) return { ok: true, value: m };
			// anything else non-empty → "Other (typed)"
			const v = raw.trim();
			if (v.length >= 2 && /[a-z]/i.test(v)) return { ok: true, value: v };
			return { ok: false };
		},
	},
	{
		key: "sqft",
		optional: true,
		prompts: [
			"Roughly how big is the home, in square feet? (You can skip this.)",
			"Any idea of the size in sq ft? A rough number is fine — or tap skip.",
			"About how many square feet? Ballpark is great, or skip it.",
		],
		errors: [
			"That size seems off — enter a number between 100 and 20,000, or skip.",
			"Hmm, I need a plain number like 1200 (or just skip this one).",
			"Let's keep it a number of square feet, e.g. 950 — or skip.",
		],
		validate: (raw) => {
			if (isSkip(raw) || !raw.trim()) return { ok: true, value: "" };
			const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
			if (Number.isFinite(n) && n >= 100 && n <= 20000) return { ok: true, value: String(n) };
			return { ok: false };
		},
	},
	{
		key: "pets",
		prompts: [
			"Do you have any pets at home?",
			"Any furry friends we should know about?",
			"Pets in the home? (Helps us bring the right products.)",
			"Quick one — any pets?",
		],
		errors: [
			"A simple Yes or No works here 🙂",
			"I didn't get that — is that a yes or a no?",
			"Just tap Yes or No, please.",
		],
		options: ["Yes", "No"],
		validate: (raw) => {
			const v = raw.trim().toLowerCase();
			if (/^(y|yes|yeah|yep|yup|sure|i do|we do|of course)/.test(v)) return { ok: true, value: "Yes" };
			if (/^(n|no|nope|nah|none|no pets)/.test(v)) return { ok: true, value: "No" };
			return { ok: false };
		},
	},
	{
		key: "date",
		optional: true,
		prompts: [
			"When would you like us to come? (A date, 'next Friday', or skip.)",
			"Any preferred day? You can type a date or skip for now.",
			"Do you have a date in mind? Or tap skip and we'll coordinate.",
		],
		errors: [
			"I didn't quite get that date — try something like 'July 20' or skip.",
			"Hmm, could you rephrase the date? Or skip and we'll sort it out.",
		],
		validate: (raw) => {
			if (isSkip(raw) || !raw.trim()) return { ok: true, value: "" };
			const v = raw.trim();
			if (v.length >= 3) return { ok: true, value: v };
			return { ok: false };
		},
	},
	{
		key: "frequency",
		prompts: [
			"How often would you like service?",
			"What frequency works best for you?",
			"Should this be a one-time clean or recurring?",
		],
		errors: [
			"Pick one of these so I book it right:",
			"I didn't catch the frequency — choose an option below:",
		],
		options: ["One-time", "Weekly", "Biweekly", "Monthly"],
		validate: (raw) => {
			const opts = ["One-time", "Weekly", "Biweekly", "Monthly"];
			const v = raw.trim().toLowerCase();
			if (/one|once|single|1/.test(v)) return { ok: true, value: "One-time" };
			if (/week(ly)?$|every week/.test(v)) return { ok: true, value: "Weekly" };
			if (/bi|every other|fortnight|2 week/.test(v)) return { ok: true, value: "Biweekly" };
			if (/month/.test(v)) return { ok: true, value: "Monthly" };
			const m = matchOption(raw, opts);
			return m ? { ok: true, value: m } : { ok: false };
		},
	},
	{
		key: "notes",
		optional: true,
		prompts: [
			"Anything else we should know? (Focus areas, access, allergies — or skip.)",
			"Last one! Any special requests? You can skip if not.",
			"Anything special for our team? Or tap skip to finish up.",
		],
		errors: [],
		validate: (raw) => {
			if (isSkip(raw) || !raw.trim()) return { ok: true, value: "" };
			return { ok: true, value: raw.trim() };
		},
	},
];

// ── conversation copy (randomized) ──────────────────────────────────────
export const greetings = [
	"Hi there! 👋 I'm Robo, your cleaning assistant. I can grab a few quick details and get a free quote started for you.",
	"Hey! 🫧 I'm Robo. Want a fast, no-obligation cleaning quote? I'll just ask a few things.",
	"Hello! I'm Robo, the Cleaning Paradise assistant. Let's set up your quote in under a minute.",
];

export const acks = [
	"Got it!",
	"Perfect, thanks.",
	"Awesome.",
	"Noted 👍",
	"Great.",
	"Love it.",
	"Thanks!",
	"Sweet.",
];

export const confused = [
	"Sorry, I didn't quite understand that.",
	"Hmm, I'm not sure I follow.",
	"That one went over my circuits — let me ask again.",
	"My bad, I didn't get that.",
];

export function finalMessage(lead: Lead): string {
	const first = (lead.name || "there").split(" ")[0];
	return `You're all set, ${first}! 🎉 I've saved your request for ${lead.service}${
		lead.city ? ` in ${lead.city}` : ""
	}. Our team will reach out within the next 24 hours to confirm. Thanks for choosing Cleaning Paradise! ✨`;
}

export const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** Fill {name}-style placeholders in a prompt from the lead so far. */
export function fillPrompt(prompt: string, lead: Lead): string {
	const first = (lead.name || "").split(" ")[0];
	return prompt.replace(/\{name\}/g, first || "there");
}
