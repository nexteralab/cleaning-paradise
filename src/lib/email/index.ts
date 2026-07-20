// Public entry point: given a lead, send the business notification and the
// customer confirmation using the template that matches the lead's source.
// Both sends are independent — one failing never blocks the other, and neither
// throws (lead capture already succeeded before this runs).
import { templateFor } from "./templates";
import { sendEmail } from "./send";
import type { Lead } from "./types";

export type { Lead, LeadSource } from "./types";

export async function sendLeadEmails(env: CloudflareEnv, lead: Lead): Promise<void> {
	const template = templateFor(lead.source);
	const notifyTo = env.LEAD_NOTIFY_TO;

	const jobs: Promise<boolean>[] = [];

	// Business notification — reply-to the customer so a reply reaches them.
	if (notifyTo) {
		const notify = template.notify(lead);
		jobs.push(sendEmail(env, { to: notifyTo, replyTo: lead.email, ...notify }));
	} else {
		console.warn("[email] LEAD_NOTIFY_TO not set — skipping business notification");
	}

	// Customer confirmation.
	if (lead.email) {
		const confirm = template.confirm(lead);
		jobs.push(sendEmail(env, { to: lead.email, ...confirm }));
	}

	await Promise.allSettled(jobs);
}
