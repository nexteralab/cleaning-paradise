// Service page sticky quote form: name, phone, email, service code, frequency,
// sqft, notes. Promises a 2-hour response.
import type { Lead, Template } from "../types";
import { detailsHtml, detailsText, escape, fullName, shell, type Field } from "./layout";

// The service <select> submits short codes — map them to readable labels.
const SERVICE_LABELS: Record<string, string> = {
	standard: "Standard Maid Service",
	deep: "Deep Cleaning",
	commercial: "Commercial Cleaning",
	movein: "Move In / Out",
	packing: "Packing & Unpacking",
	carpet: "Carpet Cleaning",
};

function serviceLabel(lead: Lead): string {
	const s = lead.service ?? "";
	return SERVICE_LABELS[s] ?? s;
}

function fields(lead: Lead): Field[] {
	return [
		{ label: "Name", value: fullName(lead) },
		{ label: "Email", value: lead.email },
		{ label: "Phone", value: lead.phone },
		{ label: "Service", value: serviceLabel(lead) },
		{ label: "Frequency", value: lead.frequency },
		{ label: "Home size", value: lead.sqft ? `${lead.sqft} sq ft` : null },
		{ label: "Notes", value: lead.notes },
	];
}

export const serviceQuote: Template = {
	notify: (lead) => {
		const f = fields(lead);
		const label = serviceLabel(lead) || "a service";
		return {
			subject: `New ${label} quote — ${fullName(lead)}`,
			html: shell({
				heading: "New service quote",
				intro: `A quote request came in from a <strong>service page</strong>${
					serviceLabel(lead) ? ` (${escape(serviceLabel(lead))})` : ""
				}.`,
				bodyHtml: detailsHtml(f),
			}),
			text: `New service quote\n\n${detailsText(f)}`,
		};
	},
	confirm: (lead) => {
		const label = serviceLabel(lead);
		const recap: Field[] = [
			{ label: "Service", value: label },
			{ label: "Frequency", value: lead.frequency },
			{ label: "Home size", value: lead.sqft ? `${lead.sqft} sq ft` : null },
		];
		return {
			subject: label
				? `Your ${label} quote — Cleaning Paradise`
				: "Your free quote — Cleaning Paradise",
			html: shell({
				heading: `Thanks, ${lead.firstName}!`,
				intro: `Thanks for your interest in ${
					label ? `<strong>${escape(label)}</strong>` : "our cleaning services"
				}. We aim to respond within <strong>2 hours</strong> during business hours.`,
				bodyHtml: detailsHtml(recap),
			}),
			text: `Thanks, ${lead.firstName}!\n\nThanks for your interest in ${
				label || "our cleaning services"
			}. We aim to respond within 2 hours during business hours.\n\n${detailsText(recap)}`,
		};
	},
};
