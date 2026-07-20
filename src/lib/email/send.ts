// Global transactional email sender. Talks to the Resend REST API directly via
// fetch — no SDK dependency needed, and it runs cleanly on Cloudflare Workers.
// ponytail: thin fetch wrapper. Swap for the `resend` SDK only if you need
// attachments, batching, or their React email rendering.

export type SendInput = {
	to: string | string[];
	subject: string;
	html: string;
	text: string;
	replyTo?: string;
};

const ENDPOINT = "https://api.resend.com/emails";

export async function sendEmail(env: CloudflareEnv, input: SendInput): Promise<boolean> {
	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		// Email is optional — a missing key must never break lead capture.
		console.warn("[email] RESEND_API_KEY not set — skipping send");
		return false;
	}
	const from = env.EMAIL_FROM ?? "Cleaning Paradise <onboarding@resend.dev>";

	const res = await fetch(ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from,
			to: input.to,
			subject: input.subject,
			html: input.html,
			text: input.text,
			...(input.replyTo ? { reply_to: input.replyTo } : {}),
		}),
	});

	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		console.error(`[email] Resend ${res.status}: ${detail}`);
		return false;
	}
	return true;
}
