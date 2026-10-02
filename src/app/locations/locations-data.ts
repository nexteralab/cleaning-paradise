// City data for /locations/[slug]. Single source for the dynamic location
// pages AND the map/city selector. Add a city here and its page + map pin
// appear automatically.

// FAQs compartidas por todas las ciudades (van después de las propias de cada una,
// `loc.faqs`). Módulo plano (sin "use client") para usarlas también en el JSON-LD.
export const locationFaqs: { q: string; a: string }[] = [
	{
		q: "How is the cost calculated?",
		a: "Pricing is based on the size of your home and how often you'd like us to clean. We provide a detailed quote before any work begins — no surprises, no guesswork. Most standard cleans start at $55/hr per person.",
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
	heroLead: string; // H1 antes de "{name}, WA"; lleva la keyword principal del Excel
	intro: string; // párrafo del hero, con keywords secundarias
	servicesIntro: string; // texto de la sección de servicios
	whyIntro: string; // intro de WhyChooseUs
	faqs: { q: string; a: string }[]; // FAQs propias; se suman a locationFaqs (compartidas)
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
		heroLead: "Trusted House Cleaning in",
		intro:
			"Seattle house cleaning from a local team that knows the city, from Capitol Hill walk-ups and downtown condos to Craftsman homes in Ballard and Queen Anne. Recurring maid service, deep cleans and move-out cleaning, all by insured, background-checked housekeepers.",
		servicesIntro:
			"Residential cleaning across Seattle for apartments, condos and family homes. Pick a one-time deep clean, recurring maid service or a move-out clean before you hand over the keys.",
		whyIntro:
			"Seattle homes come in every shape, from compact walk-ups to multi-level Craftsmans. Our maids are background checked, trained and genuinely care about leaving your home spotless. Here is what makes us different.",
		faqs: [
			{
				q: "Which Seattle neighborhoods do you serve?",
				a: "We clean homes all over Seattle, including Capitol Hill, Ballard, Queen Anne and Fremont, plus downtown and the surrounding neighborhoods. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "Do you clean apartments and condos in Seattle?",
				a: "Yes. A big share of our Seattle clients live in apartments, condos and downtown high-rises. We bring all the equipment and products, and we can work with your building's access or parking rules.",
			},
			{
				q: "Do you offer move-out cleaning in Seattle?",
				a: "Yes. Our move in / move out cleaning covers inside cabinets, drawers, appliances and closets, the spots landlords and buyers check first. It is one of our most requested services in Seattle.",
			},
		],
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
		heroLead: "House Cleaning & Maid Service in",
		intro:
			"House cleaning in Bellevue for luxury homes, Eastside high-rises and busy family households. Our maid service covers Downtown, Somerset, Bridle Trails and Newport with detail-driven recurring visits, deep cleans and move-in / move-out cleaning.",
		servicesIntro:
			"Home cleaning service in Bellevue built around your schedule: weekly or biweekly maid service, top-to-bottom deep cleaning, and move-in / move-out cleans for homes and condos.",
		whyIntro:
			"Bellevue homeowners expect attention to detail, and so do we. Our maids are background checked, trained and use eco-friendly products in every room. Here is what makes us different.",
		faqs: [
			{
				q: "Which Bellevue neighborhoods do you serve?",
				a: "We serve all of Bellevue, including Downtown, Somerset, Bridle Trails and Newport. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "Do you clean high-rise condos in Downtown Bellevue?",
				a: "Yes. We regularly clean Eastside condos and high-rise apartments. We bring everything we need and can work with your building's access and parking rules.",
			},
			{
				q: "Do you offer move-in / move-out cleaning in Bellevue?",
				a: "Yes. Our move in / move out cleaning covers inside cabinets, drawers, appliances and closets for Bellevue homes and condos, so you can hand over the keys or settle in with confidence.",
			},
		],
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
		metaTitle: "Kirkland House Cleaning & Maid Service | Cleaning Paradise",
		metaDescription:
			"Lakeside living, spotless home. Our Kirkland maids cover Moss Bay, Juanita, Houghton and Totem Lake with deep, standard and move-out cleans.",
		ogTitle: "House Cleaners in Kirkland, WA | Cleaning Paradise",
		ogDescription:
			"Moss Bay, Juanita, Houghton and Totem Lake cleaning by a 4.9-star local team. Weekly, biweekly or one-time visits.",
		heroLead: "House Cleaning & Maid Service in",
		intro:
			"House cleaning in Kirkland for lakeside homes and established neighborhoods. Our maid service covers Moss Bay, Juanita, Houghton and Totem Lake with flexible biweekly and monthly plans made for busy professionals.",
		servicesIntro:
			"Cleaning service in Kirkland for every kind of home: recurring maid service, deep cleaning for a full reset, and move-in / move-out cleaning when it is time to hand over the keys.",
		whyIntro:
			"Kirkland clients count on us to show up on time and leave every room spotless. Our maids are background checked, trained and genuinely care about your home. Here is what makes us different.",
		faqs: [
			{
				q: "Which Kirkland neighborhoods do you serve?",
				a: "We clean homes across Kirkland, including Moss Bay, Juanita, Houghton and Totem Lake. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "Do you offer move-out cleaning in Kirkland?",
				a: "Yes. Our move in / move out cleaning goes top to bottom, including inside cabinets, appliances and closets, the spots landlords and buyers check first.",
			},
			{
				q: "Can you deep clean my Kirkland home before guests or a sale?",
				a: "Yes. Our deep cleaning covers baseboards, appliances, grout lines and every overlooked corner, so your home is ready to host or show. Many clients start with a deep clean and then move to recurring visits.",
			},
		],
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
		metaTitle: "House Cleaning Services Lynnwood, WA | Cleaning Paradise",
		metaDescription:
			"Alderwood, Martha Lake and Mill Creek homes get fast, same-week scheduling from our nearby crews. Insured housekeepers, cleanings from $55/hr.",
		ogTitle: "House Cleaning in Lynnwood, WA | Cleaning Paradise",
		ogDescription:
			"Alderwood, Martha Lake and Mill Creek homes cleaned fast by insured, background-checked housekeepers.",
		heroLead: "House Cleaning Services in",
		intro:
			"Lynnwood is our home base, so house cleaning here gets our fastest scheduling. Our local cleaners serve Alderwood, Martha Lake and nearby Mill Creek with recurring maid service, deep cleaning, carpet cleaning and move-in / move-out cleans.",
		servicesIntro:
			"Maid services in Lynnwood, WA for every need: weekly or biweekly upkeep, deep cleaning, carpet cleaning and move-out cleaning, all from a team based right here in town.",
		whyIntro:
			"Lynnwood is where Cleaning Paradise started, and our neighbors keep us accountable. Our maids are background checked, trained and genuinely care about your home. Here is what makes us different.",
		faqs: [
			{
				q: "Is Cleaning Paradise based in Lynnwood?",
				a: "Yes. Lynnwood is our home base, which means quick scheduling and short travel times for homes in Alderwood, Martha Lake and the surrounding area.",
			},
			{
				q: "Do you offer carpet cleaning in Lynnwood?",
				a: "Yes. Our carpet cleaning uses hot water extraction to lift stains, pet dander and odors from deep in the fibers. You can book it on its own or add it to a deep clean or move-out clean.",
			},
			{
				q: "Which areas near Lynnwood do you serve?",
				a: "Besides Lynnwood, Alderwood and Martha Lake, we serve nearby Mill Creek, Edmonds, Mukilteo, Bothell and Shoreline. Share your address when you request a quote and we will confirm availability.",
			},
		],
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
		metaTitle: "House Cleaning on Mercer Island, WA | Cleaning Paradise",
		metaDescription:
			"Spacious Island homes deserve careful hands. EPA-approved products and vetted housekeepers serving North End, East Seattle and Mercerwood.",
		ogTitle: "Home Cleaning on Mercer Island, WA | Cleaning Paradise",
		ogDescription:
			"Eco-conscious cleaning for North End, East Seattle and Mercerwood homes. Licensed, insured, 100% satisfaction guaranteed.",
		heroLead: "House Cleaning on",
		intro:
			"House cleaning on Mercer Island for spacious homes and eco-conscious households. Our vetted housekeepers serve North End, East Seattle and Mercerwood with careful recurring visits, deep cleans and move-in / move-out cleaning.",
		servicesIntro:
			"Cleaning services on Mercer Island tailored to larger properties: recurring housekeeping, detailed deep cleaning and move-in / move-out cleans, using eco-friendly products throughout.",
		whyIntro:
			"Larger Mercer Island homes need a team that plans ahead and pays attention. Our maids are background checked, trained and genuinely care about your home. Here is what makes us different.",
		faqs: [
			{
				q: "Which Mercer Island neighborhoods do you serve?",
				a: "We serve homes across Mercer Island, including North End, East Seattle and Mercerwood. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "Do you clean large homes on Mercer Island?",
				a: "Yes. Spacious homes are a big part of our work on the island. We size the team and the visit to your home so every room gets the same attention, and we give you a detailed quote before any work begins.",
			},
			{
				q: "Do you use eco-friendly cleaning products?",
				a: "Yes. We use non-toxic, biodegradable products that are safe for kids, pets and allergy sufferers, which many Mercer Island households ask for.",
			},
		],
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
			"Family-friendly neighborhoods north of Seattle — dependable cleaning that works around your schedule.",
		hoods: "Richmond Beach · Echo Lake · Ridgecrest",
		rating: "4.8",
		resp: "4 hrs",
		homes: 70,
		pin: { left: "45%", top: "50%" },
		metaTitle: "House Cleaning in Shoreline, WA | Cleaning Paradise",
		metaDescription:
			"House cleaning in Shoreline for Richmond Beach, Echo Lake and Ridgecrest. Recurring, deep and move-in/out cleaning by insured local housekeepers.",
		ogTitle: "House Cleaning in Shoreline, WA | Cleaning Paradise",
		ogDescription:
			"Richmond Beach, Echo Lake and Ridgecrest homes cleaned by your neighbors. Same-week openings, flat hourly pricing.",
		heroLead: "House Cleaning & Maid Service in",
		intro:
			"House cleaning in Shoreline, WA for family-friendly neighborhoods just north of Seattle. Our maid service covers Richmond Beach, Echo Lake and Ridgecrest with dependable visits that work around your schedule.",
		servicesIntro:
			"Maid service in Shoreline, WA for busy families: recurring housekeeping, deep cleaning for a full reset and move-in / move-out cleaning when you change homes.",
		whyIntro:
			"Shoreline families trust us with their homes week after week. Our maids are background checked, trained and genuinely care about leaving your home spotless. Here is what makes us different.",
		faqs: [
			{
				q: "Which Shoreline neighborhoods do you serve?",
				a: "We clean homes across Shoreline, including Richmond Beach, Echo Lake and Ridgecrest. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "Do you clean homes with kids and pets in Shoreline?",
				a: "Yes. Our products are non-toxic and pet safe, and our housekeepers are comfortable working around kids and pets. Let us know about any special needs when you book.",
			},
			{
				q: "Can I book a one-time cleaning in Shoreline?",
				a: "Yes. You can book a one-time standard or deep clean, or set up weekly, biweekly or monthly visits. You get a clear quote before the cleaning starts.",
			},
		],
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
		metaTitle: "Edmonds House Cleaning & Maid Service | Cleaning Paradise",
		metaDescription:
			"Coastal homes near Downtown Edmonds, Seaview and Perrinville, cleaned top to bottom. Weekly, biweekly or one-time visits, satisfaction guaranteed.",
		ogTitle: "Maid Service in Edmonds, WA | Cleaning Paradise",
		ogDescription:
			"Downtown, Seaview and Perrinville homes cleaned minutes from our Lynnwood HQ. Standard, deep, move-in/out and carpet cleaning.",
		heroLead: "House Cleaning & Maid Service in",
		intro:
			"House cleaning in Edmonds with a personal, local touch, just minutes from our Lynnwood home base. Our maid service covers Downtown Edmonds, Seaview and Perrinville with meticulous recurring, deep and move-in / move-out cleaning.",
		servicesIntro:
			"Edmonds house cleaning services for coastal homes and family households: weekly or biweekly maid service, deep cleaning, carpet cleaning and move-out cleans.",
		whyIntro:
			"Edmonds is right next door to our Lynnwood home base, so we treat every visit like a neighbor's home. Our maids are background checked and trained. Here is what makes us different.",
		faqs: [
			{
				q: "Which Edmonds neighborhoods do you serve?",
				a: "We serve homes across Edmonds, including Downtown, Seaview and Perrinville. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "How close is your team to Edmonds?",
				a: "Our home base is in Lynnwood, just minutes from Edmonds, which makes scheduling easier and keeps travel times short for your visits.",
			},
			{
				q: "Do you offer move-out cleaning in Edmonds?",
				a: "Yes. Our move in / move out cleaning covers inside cabinets, appliances, closets and floors, so you can hand over the keys or settle into your new Edmonds home with confidence.",
			},
		],
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
		metaTitle: "House Cleaning Services in Bothell, WA | Cleaning Paradise",
		metaDescription:
			"Over 85 Bothell homes cleaned and counting, from Canyon Park and North Creek to Queensgate and Downtown. Flexible weekday and weekend slots.",
		ogTitle: "House Cleaning in Bothell, WA | Cleaning Paradise",
		ogDescription:
			"Canyon Park, North Creek, Queensgate and Downtown Bothell cleaning from $55/hr. Insured, background-checked, 4.9 stars.",
		heroLead: "House Cleaning Services in",
		intro:
			"House cleaning services in Bothell for family homes and new construction between Seattle and Everett. Our maid service covers Canyon Park, North Creek, Queensgate and Downtown Bothell with recurring and deep cleaning.",
		servicesIntro:
			"Cleaning service in Bothell for growing families: weekly or biweekly maid service, deep cleaning and move-in / move-out cleaning for newly built and established homes.",
		whyIntro:
			"Bothell families count on us for consistent, flexible cleaning. Our maids are background checked, trained and genuinely care about leaving your home spotless. Here is what makes us different.",
		faqs: [
			{
				q: "Which Bothell neighborhoods do you serve?",
				a: "We serve homes across Bothell, including Canyon Park, North Creek, Queensgate and Downtown. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "Do you clean newly built homes in Bothell?",
				a: "Yes. Our deep cleaning is a good fit for new construction, removing dust and residue from cabinets, floors, fixtures and windows before you move in.",
			},
			{
				q: "Do you have weekday and weekend openings in Bothell?",
				a: "We offer flexible scheduling to fit busy family calendars. Tell us your preferred days when you request a quote and we will find the best slot.",
			},
		],
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
		metaTitle: "House Cleaning in Mukilteo, WA | Cleaning Paradise",
		metaDescription:
			"Waterfront and bluff homes in Old Town, Harbour Pointe and Japanese Gulch, cleaned around the ferry schedule. Licensed, insured and guaranteed.",
		ogTitle: "Cleaning Service in Mukilteo, WA | Cleaning Paradise",
		ogDescription:
			"Old Town, Harbour Pointe and Japanese Gulch homes cleaned by a trusted Snohomish County team. Book a free quote in minutes.",
		heroLead: "House Cleaning in",
		intro:
			"House cleaning in Mukilteo for waterfront homes and quiet bluff neighborhoods north of Edmonds. Our local team serves Old Town, Harbour Pointe and Japanese Gulch with detailed recurring, deep and move-in / move-out cleaning.",
		servicesIntro:
			"Mukilteo cleaning services from a Snohomish County team: recurring maid service, deep cleaning and move-in / move-out cleans for homes of every size.",
		whyIntro:
			"Mukilteo is close to our Lynnwood home base, and we treat every home here with the same care. Our maids are background checked and trained. Here is what makes us different.",
		faqs: [
			{
				q: "Which Mukilteo neighborhoods do you serve?",
				a: "We serve homes across Mukilteo, including Old Town, Harbour Pointe and Japanese Gulch. Share your address when you request a quote and we will confirm availability.",
			},
			{
				q: "Do you clean waterfront homes in Mukilteo?",
				a: "Yes. Waterfront and bluff homes are a big part of our work in Mukilteo. We plan each visit around your home's size and layout and give you a detailed quote before any work begins.",
			},
			{
				q: "Do you offer deep cleaning in Mukilteo?",
				a: "Yes. Our deep cleaning covers baseboards, appliances, grout lines and every overlooked corner. It is a great first visit before moving to recurring housekeeping.",
			},
		],
	},
};

export const locationSlugs = Object.keys(locations);
