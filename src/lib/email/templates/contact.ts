// Full /contact form: contact info, address, multiple services, schedule, pets.
import type { Lead, Template } from "../types";
import { detailsHtml, detailsText, fullName, highlightHtml, shell, type Field } from "./layout";

function fields(lead: Lead): Field[] {
	const address = [lead.street, lead.unit, lead.city, lead.zip].filter(Boolean).join(", ");
	return [
		{ label: "Name", value: fullName(lead) },
		{ label: "Email", value: lead.email },
		{ label: "Phone", value: lead.phone },
		{ label: "Address", value: address },
		{ label: "Services", value: lead.services?.join(", ") },
		{ label: "Preferred date", value: lead.date },
		{ label: "Time of day", value: lead.time },
		{ label: "Frequency", value: lead.frequency },
		{ label: "Pets", value: lead.pets },
		{ label: "Notes", value: lead.notes },
	];
}

export const contact: Template = {
	notify: (lead) => {
		const f = fields(lead);
		return {
			subject: `New contact request — ${fullName(lead)}`,
			html: shell({
				heading: "New contact request",
				intro: "A new quote request came in through the <strong>Contact</strong> page.",
				bodyHtml: detailsHtml(f),
				footerHtml: lead.promo ? highlightHtml("Customer opted into the 10% first-clean discount.") : "",
			}),
			text: `New contact request\n\n${detailsText(f)}${lead.promo ? "\n\nOpted into 10% first-clean discount." : ""}`,
		};
	},
	confirm: (lead) => {
		const recap: Field[] = [
			{ label: "Services", value: lead.services?.join(", ") },
			{ label: "Preferred date", value: lead.date },
			{ label: "Frequency", value: lead.frequency },
		];
		return {
			subject: "We got your request — Cleaning Paradise",
			html: shell({
				heading: `Thanks, ${lead.firstName}!`,
				intro:
					"We received your request and a member of our team will reach out within <strong>one business day</strong> with a quote and available times.",
				bodyHtml: detailsHtml(recap),
				footerHtml: lead.promo
					? highlightHtml("Your 10% first-clean discount is noted — we'll apply it to your quote.")
					: "",
			}),
			text: `Thanks, ${lead.firstName}!\n\nWe received your request and will reach out within one business day.\n\n${detailsText(recap)}`,
		};
	},
};
