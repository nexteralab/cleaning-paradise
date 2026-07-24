// Home hero quick form: name, email, phone, one service, sqft, notes.
import type { Lead, Template } from "../types";
import { detailsHtml, detailsText, fullName, highlightHtml, shell, type Field } from "./layout";

function fields(lead: Lead): Field[] {
	return [
		{ label: "Name", value: fullName(lead) },
		{ label: "Email", value: lead.email },
		{ label: "Phone", value: lead.phone },
		{ label: "Service", value: lead.service },
		{ label: "Home size", value: lead.sqft ? `${lead.sqft} sq ft` : null },
		{ label: "Notes", value: lead.notes },
	];
}

export const homeHero: Template = {
	notify: (lead) => {
		const f = fields(lead);
		return {
			subject: `New homepage quote — ${fullName(lead)}`,
			html: shell({
				heading: "New homepage lead",
				intro: "A quick quote request came in through the <strong>homepage hero</strong> form.",
				bodyHtml: detailsHtml(f),
				footerHtml: highlightHtml("Homepage leads include the 30% first-clean offer."),
			}),
			text: `New homepage lead\n\n${detailsText(f)}`,
		};
	},
	confirm: (lead) => {
		const recap: Field[] = [
			{ label: "Service", value: lead.service },
			{ label: "Home size", value: lead.sqft ? `${lead.sqft} sq ft` : null },
		];
		return {
			subject: "Your free quote is on its way — Cleaning Paradise",
			html: shell({
				heading: `Thanks, ${lead.firstName}!`,
				intro:
					"We got your request and we'll get back to you within <strong>one business day</strong> with your free, no-obligation quote.",
				bodyHtml: detailsHtml(recap),
				footerHtml: highlightHtml("Your 10% off first-clean discount is reserved."),
			}),
			text: `Thanks, ${lead.firstName}!\n\nWe got your request and will reply within one business day with your free quote. Your 30% first-clean discount is reserved.`,
		};
	},
};
