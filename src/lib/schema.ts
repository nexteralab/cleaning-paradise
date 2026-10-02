// JSON-LD compartido. El nodo del negocio se define UNA vez en el layout raíz;
// las páginas solo lo referencian con { "@id": BUSINESS_ID }, nunca lo duplican.
export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";
export const BUSINESS_ID = `${SITE}/#business`;
export const WEBSITE_ID = `${SITE}/#website`;
export const FOUNDER_ID = `${SITE}/#founder`;

type Crumb = { name: string; path: string };

export const graph = (nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function webPageNode(
	url: string,
	o: { type?: string; title: string; description: string; image?: string; mainEntity?: string },
) {
	return {
		"@type": o.type ?? "WebPage",
		"@id": `${url}#webpage`,
		url,
		name: o.title,
		description: o.description,
		isPartOf: { "@id": WEBSITE_ID },
		about: { "@id": BUSINESS_ID },
		inLanguage: "en-US",
		breadcrumb: { "@id": `${url}#breadcrumb` },
		...(o.image && { primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}${o.image}` } }),
		...(o.mainEntity && { mainEntity: { "@id": o.mainEntity } }),
	};
}

export function breadcrumbNode(url: string, crumbs: Crumb[]) {
	return {
		"@type": "BreadcrumbList",
		"@id": `${url}#breadcrumb`,
		itemListElement: [{ name: "Home", path: "" }, ...crumbs].map((c, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: c.name,
			item: `${SITE}${c.path}`,
		})),
	};
}

// El texto DEBE coincidir palabra por palabra con el acordeón visible.
export function faqNode(url: string, faqs: { q: string; a: string }[]) {
	return {
		"@type": "FAQPage",
		"@id": `${url}#faq`,
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	};
}

export function itemListNode(url: string, items: { name: string; path: string }[]) {
	return {
		"@type": "ItemList",
		"@id": `${url}#list`,
		itemListElement: items.map((it, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: it.name,
			url: `${SITE}${it.path}`,
		})),
	};
}
