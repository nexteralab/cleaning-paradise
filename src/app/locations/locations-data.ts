// City data for /locations/[slug]. Single source for the dynamic location
// pages AND the map/city selector. Add a city here and its page + map pin
// appear automatically.

// FAQs de las páginas de ciudad — módulo plano (sin "use client") para poder
// usarlas también en el JSON-LD del server component.
export const locationFaqs: { q: string; a: string }[] = [
	{
		q: "How is the cost calculated?",
		a: "Pricing is based on the size of your home and how often you'd like us to clean. We provide a detailed quote before any work begins — no surprises, no guesswork. Most standard cleans start at $55/hr per person.",
	},
	{
		q: "What's the difference between standard and deep cleaning?",
		a: "Standard cleaning covers recurring maintenance: vacuuming, mopping, wiping surfaces, sanitizing bathrooms and kitchens, and taking out trash. Deep cleaning goes further — inside appliances, behind furniture, grout lines, and baseboards. Our team can help you decide which fits your current situation.",
	},
	{
		q: "What should I expect on the first visit?",
		a: "First visits typically take a bit longer as our team gets familiar with your home's layout and specific needs. We'll walk through expectations with you beforehand, bring all equipment and products, and leave you with a spotless space — guaranteed.",
	},
	{
		q: "Are you licensed, insured and bonded?",
		a: "Yes — Cleaning Paradise LLC is fully licensed, insured and bonded in the state of Washington. Every member of our team is background-checked and trained before their first visit. Your home and belongings are protected.",
	},
	{
		q: "Can I set up recurring service?",
		a: "Absolutely. We offer weekly, biweekly, and monthly plans — with discounts for recurring bookings. Our most popular option is biweekly, which keeps your home consistently clean without the cost of weekly visits. Get a free quote and we'll recommend the right frequency for your home.",
	},
];

export type Location = {
	slug: string;
	name: string; // display name, e.g. "Mercer Island"
	img: string; // card thumbnail for the /locations listing
	video?: string; // per-city bg video (D8) — fallback compartido si falta
	before: string;
	after: string;
	beforeAlt: string;
	afterAlt: string;
	blurb: string;
	hoods: string;
	rating: string;
	resp: string;
	homes: number;
	hq?: boolean;
	pin: { left: string; top: string }; // position on the decorative map (0-100%)
};

export const locations: Record<string, Location> = {
	seattle: {
		slug: "seattle",
		name: "Seattle",
		img: "/img/locations/seattle.png",
		before: "/img/locations/before.webp",
		after: "/img/locations/after.webp",
		beforeAlt: "Seattle home before cleaning",
		afterAlt: "Seattle home after cleaning",
		blurb:
			"Premium residential and commercial cleaning across Seattle — from downtown high-rises to Craftsman homes in Ballard and Queen Anne.",
		hoods: "Capitol Hill · Ballard · Queen Anne · Fremont",
		rating: "4.9",
		resp: "Same day",
		homes: 180,
		pin: { left: "41%", top: "66%" },
	},
	bellevue: {
		slug: "bellevue",
		name: "Bellevue",
		img: "/img/locations/bellevue.png",
		before: "/img/locations/Antes1.webp",
		after: "/img/locations/despues1.webp",
		beforeAlt: "Bellevue home before cleaning",
		afterAlt: "Bellevue home after cleaning",
		blurb:
			"Luxury homes and Eastside high-rises. Deep cleans, recurring upkeep and detailed move-in / move-out service.",
		hoods: "Downtown · Somerset · Bridle Trails · Newport",
		rating: "5.0",
		resp: "2 hrs",
		homes: 120,
		pin: { left: "67%", top: "62%" },
	},
	kirkland: {
		slug: "kirkland",
		name: "Kirkland",
		img: "/img/locations/kirkland.png",
		before: "/img/locations/Antes3.webp",
		after: "/img/locations/despues3.webp",
		beforeAlt: "Kirkland home before cleaning",
		afterAlt: "Kirkland home after cleaning",
		blurb:
			"Waterfront living and established neighborhoods — flexible bi-weekly and monthly plans for busy professionals.",
		hoods: "Moss Bay · Juanita · Houghton · Totem Lake",
		rating: "4.9",
		resp: "3 hrs",
		homes: 95,
		pin: { left: "64%", top: "44%" },
	},
	lynnwood: {
		slug: "lynnwood",
		name: "Lynnwood",
		img: "/img/pasted-1782782394450-0.webp",
		before: "/img/locations/before4.webp",
		after: "/img/locations/after4.webp",
		beforeAlt: "Lynnwood home before cleaning",
		afterAlt: "Lynnwood home after cleaning",
		blurb:
			"Our home base. Reliable weekly and bi-weekly cleaning for Lynnwood, Mill Creek and the north corridor.",
		hoods: "Alderwood · Martha Lake · Mill Creek",
		rating: "4.9",
		resp: "Same day",
		homes: 160,
		hq: true,
		pin: { left: "40%", top: "28%" },
	},
	"mercer-island": {
		slug: "mercer-island",
		name: "Mercer Island",
		img: "/img/mercer-island.jpg",
		before: "/img/locations/before.webp",
		after: "/img/locations/after.webp",
		beforeAlt: "Mercer Island home before cleaning",
		afterAlt: "Mercer Island home after cleaning",
		blurb:
			"Premier island community with spacious homes. Specialized cleaning for large properties and eco-conscious households.",
		hoods: "North End · East Seattle · Mercerwood",
		rating: "5.0",
		resp: "3 hrs",
		homes: 60,
		pin: { left: "56%", top: "73%" },
	},
	shoreline: {
		slug: "shoreline",
		name: "Shoreline",
		img: "/img/locations/shoreline.png",
		before: "/img/locations/Antes1.webp",
		after: "/img/locations/despues1.webp",
		beforeAlt: "Shoreline home before cleaning",
		afterAlt: "Shoreline home after cleaning",
		blurb:
			"Family-friendly neighborhoods north of Seattle — affordable, dependable cleaning that works around your schedule.",
		hoods: "Richmond Beach · Echo Lake · Ridgecrest",
		rating: "4.8",
		resp: "4 hrs",
		homes: 70,
		pin: { left: "45%", top: "50%" },
	},
	edmonds: {
		slug: "edmonds",
		name: "Edmonds",
		img: "/img/locations/edmons.png",
		before: "/img/locations/Antes3.webp",
		after: "/img/locations/despues3.webp",
		beforeAlt: "Edmonds home before cleaning",
		afterAlt: "Edmonds home after cleaning",
		blurb:
			"Coastal charm minutes from our HQ — meticulous home cleaning with a personal, local touch.",
		hoods: "Downtown · Seaview · Perrinville",
		rating: "5.0",
		resp: "2 hrs",
		homes: 65,
		pin: { left: "23%", top: "37%" },
	},
	"mill-creek": {
		slug: "mill-creek",
		name: "Mill Creek",
		img: "/img/locations/millcreek.png",
		before: "/img/locations/before4.webp",
		after: "/img/locations/after4.webp",
		beforeAlt: "Mill Creek home before cleaning",
		afterAlt: "Mill Creek home after cleaning",
		blurb:
			"Quiet, well-kept neighborhoods just north of HQ — dependable recurring cleaning for growing families.",
		hoods: "Mill Creek Town Center · Silver Firs · North Creek",
		rating: "4.9",
		resp: "Same day",
		homes: 55,
		pin: { left: "52%", top: "16%" },
	},
};

export const locationSlugs = Object.keys(locations);
