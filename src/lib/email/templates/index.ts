// Maps a lead source to its template set. Unknown sources fall back to the
// full contact template (renders every field it finds).
import type { Template } from "../types";
import { contact } from "./contact";
import { homeHero } from "./homeHero";
import { serviceQuote } from "./serviceQuote";
import { chatbot } from "./chatbot";

const templates: Record<string, Template> = {
	contact,
	"home-hero": homeHero,
	"service-quote": serviceQuote,
	chatbot,
};

export function templateFor(source: string): Template {
	return templates[source] ?? contact;
}
