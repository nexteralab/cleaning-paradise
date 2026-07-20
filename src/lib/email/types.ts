// Shared email types. `Lead` is the normalized shape every form maps to before
// notification/confirmation emails are rendered.

export type LeadSource = "contact" | "home-hero" | "service-quote" | "chatbot";

export type Lead = {
	firstName: string;
	lastName?: string | null;
	email: string;
	phone?: string | null;
	street?: string | null;
	unit?: string | null;
	city?: string | null;
	zip?: string | null;
	services?: string[];
	service?: string | null;
	date?: string | null;
	time?: string | null;
	frequency?: string | null;
	sqft?: string | null;
	pets?: string | null;
	notes?: string | null;
	promo?: boolean;
	source: LeadSource | string;
};

export type Email = { subject: string; html: string; text: string };

// A template set is the pair of emails a given form produces.
export type Template = {
	/** Internal notification sent to the business inbox. */
	notify: (lead: Lead) => Email;
	/** Confirmation sent to the customer. */
	confirm: (lead: Lead) => Email;
};
