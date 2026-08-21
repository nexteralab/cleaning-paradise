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
	metaTitle: string; // <title>, unique per city, max 60 chars
	metaDescription: string; // meta description, 120-158 chars
	ogTitle: string; // og:title, must NOT be shared across cities
	ogDescription: string; // og:description, must NOT be shared across cities
};

export const locations: Record<string, Location> = {
	seattle: {
		slug: "seattle",
		name: "Seattle",
		img: "/img/locations/seattle.png",
		before: "/img/locations/playroom-before-house-cleaning.webp",
		after: "/img/locations/playroom-after-house-cleaning.webp",
		beforeAlt: "Cluttered playroom before house cleaning in Seattle, WA",
		afterAlt: "Spotless playroom after house cleaning in Seattle, WA",
		blurb:
			"Premium residential and commercial cleaning across Seattle — from downtown high-rises to Craftsman homes in Ballard and Queen Anne.",
		hoods: "Capitol Hill · Ballard · Queen Anne · Fremont",
		rating: "4.9",
		resp: "Same day",
		homes: 180,
		pin: { left: "41%", top: "66%" },
		metaTitle: "Top-Rated House Cleaning in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Maids who know Seattle, from Capitol Hill walk-ups to Ballard bungalows. Licensed, insured, same-week openings. Get your free quote today.",
		ogTitle: "House Cleaning in Seattle, WA | Cleaning Paradise",
		ogDescription:
			"Capitol Hill, Ballard, Queen Anne and Fremont homes cleaned by insured local maids. Standard, deep and move-out cleaning from $55/hr.",
	},
	bellevue: {
		slug: "bellevue",
		name: "Bellevue",
		img: "/img/locations/bellevue.png",
		before: "/img/locations/nursery-before-house-cleaning.webp",
		after: "/img/locations/nursery-after-house-cleaning.webp",
		beforeAlt: "Toys scattered across a nursery before house cleaning in Bellevue, WA",
		afterAlt: "Tidy nursery after house cleaning in Bellevue, WA",
		blurb:
			"Luxury homes and Eastside high-rises. Deep cleans, recurring upkeep and detailed move-in / move-out service.",
		hoods: "Downtown · Somerset · Bridle Trails · Newport",
		rating: "5.0",
		resp: "2 hrs",
		homes: 120,
		pin: { left: "67%", top: "62%" },
		metaTitle: "Bellevue Maid Service & House Cleaning | Cleaning Paradise",
		metaDescription:
			"Downtown Bellevue, Somerset, Bridle Trails and Newport homes cleaned by background-checked teams. Transparent $55/hr pricing, no surprises.",
		ogTitle: "Maid Service in Bellevue, WA | Cleaning Paradise",
		ogDescription:
			"Detail-driven Eastside house cleaning for Downtown, Somerset, Bridle Trails and Newport. Licensed, insured and eco-friendly.",
	},
	kirkland: {
		slug: "kirkland",
		name: "Kirkland",
		img: "/img/locations/kirkland.png",
		before: "/img/locations/fridge-before-deep-cleaning.webp",
		after: "/img/locations/fridge-after-deep-cleaning.webp",
		beforeAlt: "Refrigerator interior before deep cleaning in Kirkland, WA",
		afterAlt: "Sparkling clean refrigerator after deep cleaning in Kirkland, WA",
		blurb:
			"Waterfront living and established neighborhoods — flexible bi-weekly and monthly plans for busy professionals.",
		hoods: "Moss Bay · Juanita · Houghton · Totem Lake",
		rating: "4.9",
		resp: "3 hrs",
		homes: 95,
		pin: { left: "64%", top: "44%" },
		metaTitle: "Kirkland Maid Service & Deep Cleaning | Cleaning Paradise",
		metaDescription:
			"Lakeside living, spotless home. Our Kirkland maids cover Moss Bay, Juanita, Houghton and Totem Lake with deep, standard and move-out cleans.",
		ogTitle: "House Cleaners in Kirkland, WA | Cleaning Paradise",
		ogDescription:
			"Moss Bay, Juanita, Houghton and Totem Lake cleaning by a 4.9-star local team. Weekly, biweekly or one-time visits.",
	},
	lynnwood: {
		slug: "lynnwood",
		name: "Lynnwood",
		img: "/img/pasted-1782782394450-0.webp",
		before: "/img/locations/living-room-before-house-cleaning.webp",
		after: "/img/locations/living-room-after-house-cleaning.webp",
		beforeAlt: "Toys and clutter in a living room before house cleaning in Lynnwood, WA",
		afterAlt: "Clean and tidy living room after house cleaning in Lynnwood, WA",
		blurb:
			"Our home base. Reliable weekly and bi-weekly cleaning for Lynnwood, Mill Creek and the north corridor.",
		hoods: "Alderwood · Martha Lake · Mill Creek",
		rating: "4.9",
		resp: "Same day",
		homes: 160,
		hq: true,
		pin: { left: "40%", top: "28%" },
		metaTitle: "Lynnwood, WA House Cleaning | Local Team | Cleaning Paradise",
		metaDescription:
			"Lynnwood is home base for our crews, so Alderwood, Martha Lake and Mill Creek get the fastest scheduling. Same-week cleanings from $55/hr.",
		ogTitle: "House Cleaning in Lynnwood, WA | Cleaning Paradise",
		ogDescription:
			"Our home base. Alderwood, Martha Lake and Mill Creek homes cleaned fast by insured, background-checked housekeepers.",
	},
	"mercer-island": {
		slug: "mercer-island",
		name: "Mercer Island",
		img: "/img/mercer-island.jpg",
		before: "/img/locations/playroom-before-house-cleaning.webp",
		after: "/img/locations/playroom-after-house-cleaning.webp",
		beforeAlt: "Cluttered playroom before house cleaning in Mercer Island, WA",
		afterAlt: "Spotless playroom after house cleaning in Mercer Island, WA",
		blurb:
			"Premier island community with spacious homes. Specialized cleaning for large properties and eco-conscious households.",
		hoods: "North End · East Seattle · Mercerwood",
		rating: "5.0",
		resp: "3 hrs",
		homes: 60,
		pin: { left: "56%", top: "73%" },
		metaTitle: "Mercer Island Home & Deep Cleaning | Cleaning Paradise",
		metaDescription:
			"Spacious Island homes deserve careful hands. EPA-approved products and vetted housekeepers serving North End, East Seattle and Mercerwood.",
		ogTitle: "Home Cleaning on Mercer Island, WA | Cleaning Paradise",
		ogDescription:
			"Eco-conscious cleaning for North End, East Seattle and Mercerwood homes. Licensed, insured, 100% satisfaction guaranteed.",
	},
	shoreline: {
		slug: "shoreline",
		name: "Shoreline",
		img: "/img/locations/shoreline.png",
		before: "/img/locations/nursery-before-house-cleaning.webp",
		after: "/img/locations/nursery-after-house-cleaning.webp",
		beforeAlt: "Toys scattered across a nursery before house cleaning in Shoreline, WA",
		afterAlt: "Tidy nursery after house cleaning in Shoreline, WA",
		blurb:
			"Family-friendly neighborhoods north of Seattle — affordable, dependable cleaning that works around your schedule.",
		hoods: "Richmond Beach · Echo Lake · Ridgecrest",
		rating: "4.8",
		resp: "4 hrs",
		homes: 70,
		pin: { left: "45%", top: "50%" },
		metaTitle: "Shoreline House Cleaning | Same-Week | Cleaning Paradise",
		metaDescription:
			"We clean where we are based: Richmond Beach, Echo Lake and Ridgecrest. Recurring, deep and move-in/out cleaning by insured local housekeepers.",
		ogTitle: "House Cleaning in Shoreline, WA | Cleaning Paradise",
		ogDescription:
			"Richmond Beach, Echo Lake and Ridgecrest homes cleaned by your neighbors. Same-week openings, flat hourly pricing.",
	},
	edmonds: {
		slug: "edmonds",
		name: "Edmonds",
		img: "/img/locations/edmonds.png",
		before: "/img/locations/fridge-before-deep-cleaning.webp",
		after: "/img/locations/fridge-after-deep-cleaning.webp",
		beforeAlt: "Refrigerator interior before deep cleaning in Edmonds, WA",
		afterAlt: "Sparkling clean refrigerator after deep cleaning in Edmonds, WA",
		blurb:
			"Coastal charm minutes from our HQ — meticulous home cleaning with a personal, local touch.",
		hoods: "Downtown · Seaview · Perrinville",
		rating: "5.0",
		resp: "2 hrs",
		homes: 65,
		pin: { left: "23%", top: "37%" },
		metaTitle: "Edmonds Maid Service | Coastal Homes | Cleaning Paradise",
		metaDescription:
			"Coastal homes near Downtown Edmonds, Seaview and Perrinville, cleaned top to bottom. Weekly, biweekly or one-time visits, satisfaction guaranteed.",
		ogTitle: "Maid Service in Edmonds, WA | Cleaning Paradise",
		ogDescription:
			"Downtown, Seaview and Perrinville homes cleaned minutes from our Lynnwood HQ. Standard, deep, move-in/out and carpet cleaning.",
	},
	bothell: {
		slug: "bothell",
		// ponytail: reusa mill-creek.png (sin foto propia aún) — cambiar cuando llegue bothell.png
		name: "Bothell",
		img: "/img/locations/mill-creek.png",
		before: "/img/locations/living-room-before-house-cleaning.webp",
		after: "/img/locations/living-room-after-house-cleaning.webp",
		beforeAlt: "Toys and clutter in a living room before house cleaning in Bothell, WA",
		afterAlt: "Clean and tidy living room after house cleaning in Bothell, WA",
		blurb:
			"Growing north-end community between Seattle and Everett — recurring and deep cleaning for family homes and new construction.",
		hoods: "Canyon Park · North Creek · Downtown · Queensgate",
		rating: "4.9",
		resp: "3 hrs",
		homes: 85,
		pin: { left: "56%", top: "30%" },
		metaTitle: "Bothell House Cleaning | 85+ Homes | Cleaning Paradise",
		metaDescription:
			"Over 85 Bothell homes cleaned and counting, from Canyon Park and North Creek to Queensgate and Downtown. Flexible weekday and weekend slots.",
		ogTitle: "House Cleaning in Bothell, WA | Cleaning Paradise",
		ogDescription:
			"Canyon Park, North Creek, Queensgate and Downtown Bothell cleaning from $55/hr. Insured, background-checked, 4.9 stars.",
	},
	mukilteo: {
		slug: "mukilteo",
		// ponytail: reusa edmonds.png (ciudad costera vecina) — cambiar cuando llegue mukilteo.png
		name: "Mukilteo",
		img: "/img/locations/edmonds.png",
		before: "/img/locations/nursery-before-house-cleaning.webp",
		after: "/img/locations/nursery-after-house-cleaning.webp",
		beforeAlt: "Toys scattered across a nursery before house cleaning in Mukilteo, WA",
		afterAlt: "Tidy nursery after house cleaning in Mukilteo, WA",
		blurb:
			"Waterfront homes and quiet bluff neighborhoods north of Edmonds — detailed cleaning with easy ferry-side scheduling.",
		hoods: "Old Town · Harbour Pointe · Japanese Gulch",
		rating: "4.9",
		resp: "3 hrs",
		homes: 55,
		pin: { left: "21%", top: "16%" },
		metaTitle: "Mukilteo Cleaning Service & Maids | Cleaning Paradise",
		metaDescription:
			"Waterfront and bluff homes in Old Town, Harbour Pointe and Japanese Gulch, cleaned around the ferry schedule. Licensed, insured and guaranteed.",
		ogTitle: "Cleaning Service in Mukilteo, WA | Cleaning Paradise",
		ogDescription:
			"Old Town, Harbour Pointe and Japanese Gulch homes cleaned by a trusted Snohomish County team. Book a free quote in minutes.",
	},
};

export const locationSlugs = Object.keys(locations);
