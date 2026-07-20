// Chatbot assistant lead: name, email, phone, service, city, sqft, pets, date,
// frequency, notes — whatever the conversation collected.
import type { Lead, Template } from "../types";
import { detailsHtml, detailsText, fullName, shell, type Field } from "./layout";

function fields(lead: Lead): Field[] {
	return [
		{ label: "Name", value: fullName(lead) },
		{ label: "Email", value: lead.email },
		{ label: "Phone", value: lead.phone },
		{ label: "Service", value: lead.service },
		{ label: "City", value: lead.city },
		{ label: "Home size", value: lead.sqft ? `${lead.sqft} sq ft` : null },
		{ label: "Pets", value: lead.pets },
		{ label: "Preferred date", value: lead.date },
		{ label: "Frequency", value: lead.frequency },
		{ label: "Notes", value: lead.notes },
	];
}

export const chatbot: Template = {
	notify: (lead) => {
		const f = fields(lead);
		return {
			subject: `New chatbot lead — ${fullName(lead)}`,
			html: shell({
				heading: "New chatbot lead",
				intro: "A visitor completed the booking flow in the <strong>chat assistant</strong>.",
				bodyHtml: detailsHtml(f),
			}),
			text: `New chatbot lead\n\n${detailsText(f)}`,
		};
	},
	confirm: (lead) => {
		const recap: Field[] = [
			{ label: "Service", value: lead.service },
			{ label: "Preferred date", value: lead.date },
			{ label: "Frequency", value: lead.frequency },
		];
		return {
			subject: "Thanks for chatting with us — Cleaning Paradise",
			html: shell({
				heading: `Thanks, ${lead.firstName}!`,
				intro:
					"Thanks for booking through our chat assistant. A team member will follow up within <strong>one business day</strong> to confirm the details.",
				bodyHtml: detailsHtml(recap),
			}),
			text: `Thanks, ${lead.firstName}!\n\nThanks for booking through our chat assistant. We'll follow up within one business day.\n\n${detailsText(recap)}`,
		};
	},
};
