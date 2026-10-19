// City data for /locations/[slug]. Single source for the dynamic location
// pages AND the map/city selector. Add a city here and its page + map pin
// appear automatically.

// Slugs de /cleaning-services-in-wa/<slug>; cada ciudad describe los 6 con contexto local.
export type ServiceSlug =
	| "standard-cleaning"
	| "deep-cleaning"
	| "commercial-cleaning"
	| "move-in-out"
	| "packing-unpacking"
	| "carpet-cleaning";

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
	localHeading: string; // H2 de la sección local (vivienda, clima, zona)
	local: string[]; // párrafos de la sección local, únicos por ciudad
	serviceNotes: Record<ServiceSlug, string>; // descripción de cada tarjeta de servicio
	faqs: { q: string; a: string }[]; // FAQs propias de la ciudad (sin FAQs compartidas)
};

export const locations: Record<string, Location> = {
	seattle: {
		slug: "seattle",
		name: "Seattle",
		img: "/img/locations/seattle.webp",
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
		metaTitle: "House Cleaning & Maid Service in Seattle | Cleaning Paradise",
		metaDescription:
			"Seattle house cleaning and maid service from a local team, from Capitol Hill walk-ups to Ballard bungalows. Licensed, insured, same-week openings.",
		ogTitle: "House Cleaning in Seattle, WA | Cleaning Paradise",
		ogDescription:
			"Capitol Hill, Ballard, Queen Anne and Fremont homes cleaned by insured local maids. Standard, deep and move-out cleaning from $55/hr.",
		heroLead: "House Cleaning & Maid Service in",
		intro:
			"Seattle house cleaning from a local team that knows the city, from Capitol Hill walk-ups and downtown condos to Craftsman homes in Ballard and Queen Anne. Recurring maid service, deep cleans and move-out cleaning, all by insured, background-checked housekeepers.",
		servicesIntro:
			"Residential cleaning across Seattle for apartments, condos and family homes. Pick a one-time deep clean, recurring maid service or a move-out clean before you hand over the keys.",
		whyIntro:
			"Seattle homes come in every shape, from compact walk-ups to multi-level Craftsmans. Our maids are background checked, trained and genuinely care about leaving your home spotless. Here is what makes us different.",
		localHeading: "House cleaning for Seattle homes, old and new",
		local: [
			"Seattle housing runs from 1910s Craftsman bungalows in Ballard and Fremont to brand-new townhomes and Capitol Hill condos with shared hallways and tight parking. Older homes mean original hardwood, built-ins and window tracks that collect grit, so our maids work those surfaces by hand instead of rushing them with a wet mop.",
			"Eight months of drizzle shapes the job too. Muddy entryways, damp bathrooms and windows that fog up all winter make mildew in grout and caulk a regular fight here. For apartments and condos we plan around elevator reservations, loading zones and building access, and for renters we time move-out cleans to your lease end and inspection.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Weekly or biweekly upkeep for Seattle apartments, condos and Craftsman homes, entryways and floors included.",
			"deep-cleaning":
				"A full reset for older Seattle homes: built-ins, window tracks, baseboards and mildew-prone grout.",
			"commercial-cleaning":
				"After-hours cleaning for Seattle offices, studios and storefronts, from SoDo to South Lake Union.",
			"move-in-out":
				"Lease-end cleaning for Seattle renters, timed to your landlord's walkthrough and building rules.",
			"packing-unpacking":
				"Packing help for Seattle moves where elevators, stairs and loading zones need careful planning.",
			"carpet-cleaning":
				"Hot water extraction for the mud and damp that Seattle winters track into carpets and rugs.",
		},
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
			{
				q: "Can you clean my Seattle condo if the building has elevator or parking rules?",
				a: "Yes. Tell us about elevator reservations, loading zones, parking permits or concierge check-in when you book, and we plan the visit around them so your building manager has no surprises.",
			},
			{
				q: "How do you handle mildew in Seattle bathrooms?",
				a: "Damp winters make mildew common in grout, caulk and shower corners. We scrub those areas by hand during deep cleans and keep them in check on recurring visits, using products that are safe for kids and pets.",
			},
		],
	},
	bellevue: {
		slug: "bellevue",
		name: "Bellevue",
		img: "/img/locations/bellevue.webp",
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
		localHeading: "Cleaning Bellevue condos and Eastside family homes",
		local: [
			"Bellevue homes split into two very different jobs. Downtown high-rises bring floor-to-ceiling glass, stone counters and stainless appliances that show every streak, while Somerset, Newport and Bridle Trails have larger family homes on big lots with more bathrooms, more stairs and more square feet to cover in one visit.",
			"We match products to the surface, with stone-safe cleaners on quartz and marble and streak-free work on glass and stainless, and we size the team to the home so a five-bedroom house gets the same detail as a one-bedroom condo. Many Bellevue clients are relocating for work, so we also handle move-in cleans timed to closing or a corporate move date.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Recurring maid service for Bellevue condos and family homes, with stone-safe products on counters.",
			"deep-cleaning":
				"Top-to-bottom detail for larger Eastside homes: baseboards, stair rails, appliances and every bathroom.",
			"commercial-cleaning":
				"Office cleaning for Bellevue workspaces, from small suites to busy downtown floors.",
			"move-in-out":
				"Move-in cleans timed to closing day or a work relocation, so your new Bellevue home is ready.",
			"packing-unpacking":
				"Packing and unpacking for relocations to and from Bellevue, room by room.",
			"carpet-cleaning":
				"Carpet and rug extraction for family rooms, bedrooms and stairs in larger Eastside homes.",
		},
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
			{
				q: "Do you use safe products on stone counters and glass?",
				a: "Yes. We use stone-safe cleaners on quartz, granite and marble and streak-free methods on glass and stainless steel, so high-end finishes in Bellevue homes and condos stay protected.",
			},
			{
				q: "Can you clean my new Bellevue home before a work relocation move-in?",
				a: "Yes. We schedule move-in cleaning around your closing or move date and cover inside cabinets, closets, appliances and floors so the home is ready when your belongings arrive.",
			},
		],
	},
	kirkland: {
		slug: "kirkland",
		name: "Kirkland",
		img: "/img/locations/kirkland.webp",
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
		localHeading: "Kirkland house cleaning from the lake to Totem Lake",
		local: [
			"Kirkland mixes waterfront condos around Moss Bay, established single-family streets in Houghton and Juanita, and the newer apartments and townhomes that went up around Totem Lake. Lakeside living means big windows, decks and sliding doors, and the fingerprints, pollen and tracked-in sand that come with them.",
			"A lot of our Kirkland clients are busy professionals who want the house handled without thinking about it, so biweekly and monthly plans with the same team each visit are the most common setup here. We keep notes on your home, from pet routines to which rooms come first, so every visit picks up where the last one left off.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Biweekly or monthly plans for Kirkland homes and condos, with the same team each visit.",
			"deep-cleaning":
				"A deep reset before guests or a listing: sliders, window tracks, baseboards and appliances.",
			"commercial-cleaning":
				"Cleaning for Kirkland offices and studios around downtown and Totem Lake.",
			"move-in-out":
				"Move-out cleaning for Kirkland condos and homes, inside cabinets, closets and appliances.",
			"packing-unpacking":
				"Packing and unpacking for Kirkland moves, from waterfront condos to family homes.",
			"carpet-cleaning":
				"Extraction for carpets that collect sand, pollen and pet hair near the lake.",
		},
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
			{
				q: "Will I get the same cleaners on every visit in Kirkland?",
				a: "We aim to send the same team to recurring Kirkland clients, and we keep notes on your home, priorities and any pets so each visit is consistent.",
			},
			{
				q: "Do you clean newer apartments and townhomes around Totem Lake?",
				a: "Yes. We clean apartments, condos and townhomes around Totem Lake as well as single-family homes across Kirkland, for one-time or recurring visits.",
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
		localHeading: "Lynnwood is our home base",
		local: [
			"Cleaning Paradise is based in Lynnwood, so homes here get our shortest travel times and the most flexible scheduling. We clean everything from apartments near Alderwood and the new buildings around the Lynnwood City Center light rail station to family homes around Martha Lake and the larger houses in nearby Mill Creek.",
			"Being close also means it is easy to fit in a same-week deep clean, a last-minute move-out before an inspection, or carpet cleaning added to a regular visit. Snohomish County winters bring wet shoes and muddy pets, so floors, entryways and carpets get extra attention in our Lynnwood homes from fall to spring.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Weekly or biweekly maid service from a team based right here in Lynnwood.",
			"deep-cleaning":
				"Same-week deep cleans are easiest to book in Lynnwood, our home base.",
			"commercial-cleaning":
				"Office and retail cleaning across Lynnwood and the Alderwood area.",
			"move-in-out":
				"Move-out cleans for Lynnwood apartments and homes, even on short notice before an inspection.",
			"packing-unpacking":
				"Packing and unpacking for moves in and around Lynnwood, Mill Creek and Martha Lake.",
			"carpet-cleaning":
				"Carpet cleaning for muddy-season floors, booked alone or added to a regular visit.",
		},
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
			{
				q: "Can I add carpet cleaning to my regular Lynnwood cleaning?",
				a: "Yes. Many Lynnwood clients add carpet cleaning to a standard or deep clean, especially in fall and winter when wet shoes and pets are hard on carpets.",
			},
			{
				q: "Do you clean apartments near the Lynnwood light rail station?",
				a: "Yes. We clean apartments and condos around Lynnwood City Center and Alderwood, including move-in and move-out cleans for renters.",
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
		localHeading: "Planning the clean for larger Mercer Island homes",
		local: [
			"Many Mercer Island homes are larger than average, from mid-century houses with walls of windows to lakefront properties with multiple levels, guest suites and outdoor living spaces. A home like that needs a plan: the right team size, a set order for the rooms, and enough time on site so nothing gets rushed at the end of the visit.",
			"Households here often ask for non-toxic products because of kids, pets or allergies, and that is our standard. Around the Town Center and the North End we also clean condos and townhomes, and we work with gated entries, lockboxes or house managers when you will not be home.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Recurring housekeeping for larger Island homes, with a set room order and team sized to the house.",
			"deep-cleaning":
				"Deep cleaning for multi-level homes: windows, stairs, guest suites and every bathroom.",
			"commercial-cleaning":
				"Cleaning for small offices and practices around the Mercer Island Town Center.",
			"move-in-out":
				"Move-in and move-out cleans for Island homes and condos, planned around closing dates.",
			"packing-unpacking":
				"Careful packing and unpacking for larger homes with lots of rooms to organize.",
			"carpet-cleaning":
				"Non-toxic carpet and rug extraction, safe for kids, pets and allergy-prone homes.",
		},
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
			{
				q: "Can you clean while I am away from my Mercer Island home?",
				a: "Yes. Many clients give us a lockbox code, gate access or coordinate through a house manager. We confirm the access details before the first visit.",
			},
			{
				q: "How long does a cleaning take for a large Mercer Island home?",
				a: "It depends on the size, number of bathrooms and service type. We size the team to your home so the visit fits a reasonable time window, and we give you a detailed quote before any work begins.",
			},
		],
	},
	shoreline: {
		slug: "shoreline",
		name: "Shoreline",
		img: "/img/locations/shoreline.webp",
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
		localHeading: "House cleaning for Shoreline families",
		local: [
			"Shoreline is mostly family neighborhoods: mid-century ramblers and split-levels around Ridgecrest and Echo Lake, view homes toward the water in Richmond Beach, and a growing number of townhomes near the new light rail stations. Homes with kids, pets and busy calendars need a cleaning plan that is reliable more than anything else.",
			"We work around school runs and work-from-home days, and our products are non-toxic and pet safe, so nobody has to leave the house while we clean. Older split-levels have plenty of stairs, trim and baseboards, which is where we spend extra time on a first deep clean before moving you to a regular schedule.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Dependable weekly or biweekly visits for Shoreline family homes, scheduled around school and work.",
			"deep-cleaning":
				"A first deep clean for split-levels and ramblers: stairs, trim, baseboards and kitchens.",
			"commercial-cleaning":
				"Cleaning for small offices and shops along Aurora and around Shoreline.",
			"move-in-out":
				"Move-in and move-out cleans for Shoreline homes and the new townhomes near light rail.",
			"packing-unpacking":
				"Packing and unpacking for family moves in and out of Shoreline.",
			"carpet-cleaning":
				"Pet-safe carpet extraction for family rooms, bedrooms and stairs.",
		},
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
			{
				q: "Can you clean while I work from home in Shoreline?",
				a: "Yes. Many Shoreline clients work from home. Our team works quietly, starts with the rooms you choose and keeps your office space for last or skips it on request.",
			},
			{
				q: "Do you clean townhomes near the Shoreline light rail stations?",
				a: "Yes. We clean townhomes, condos and single-family homes across Shoreline, including the newer buildings near the light rail stations.",
			},
		],
	},
	edmonds: {
		slug: "edmonds",
		name: "Edmonds",
		img: "/img/locations/edmonds.webp",
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
		localHeading: "Cleaning coastal Edmonds homes",
		local: [
			"Edmonds sits right on Puget Sound, and that shows up in the cleaning. Salt air and sea spray leave a film on windows, sliders and outdoor furniture, view homes on the hills above Downtown have a lot of glass to keep clear, and older homes near the Bowl come with original woodwork and floors that need a gentle hand.",
			"Edmonds is minutes from our Lynnwood home base, so scheduling is easy whether you live near the ferry terminal, up in Seaview or out by Perrinville. Many clients here pair recurring maid service with a seasonal deep clean, and carpet cleaning is a popular add-on through the wet months.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Recurring maid service for Edmonds homes, minutes from our Lynnwood home base.",
			"deep-cleaning":
				"Seasonal deep cleans for coastal homes: glass, sliders, woodwork and kitchens.",
			"commercial-cleaning":
				"Cleaning for Downtown Edmonds offices, studios and small shops.",
			"move-in-out":
				"Move-out cleans for Edmonds homes and condos, inside cabinets, closets and appliances.",
			"packing-unpacking":
				"Packing and unpacking for moves in and around Edmonds.",
			"carpet-cleaning":
				"Carpet extraction through the wet months, booked alone or with a regular visit.",
		},
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
			{
				q: "Do you clean windows in Edmonds view homes?",
				a: "We clean interior glass, sliders and window tracks as part of our deep cleans, which helps a lot with the salt film near the water. Let us know about large or hard-to-reach windows when you request a quote.",
			},
			{
				q: "Can I combine recurring service with a seasonal deep clean in Edmonds?",
				a: "Yes. Many Edmonds clients keep a biweekly or monthly visit and add a deep clean in spring or fall. We adjust the quote for those visits ahead of time.",
			},
		],
	},
	bothell: {
		slug: "bothell",
		// ponytail: reusa mill-creek.png (sin foto propia aún) — cambiar cuando llegue bothell.png
		name: "Bothell",
		img: "/img/locations/mill-creek.webp",
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
		localHeading: "Cleaning new construction and family homes in Bothell",
		local: [
			"Bothell has grown fast, with new subdivisions and townhomes around North Creek and Canyon Park, established neighborhoods in Queensgate, and new apartments near the revitalized downtown and UW Bothell. The city also straddles King and Snohomish counties, and we serve both sides.",
			"New construction needs a different first clean. Builder dust settles inside cabinets, on window tracks, light fixtures and vents, and sticker residue and drywall dust stay on surfaces long after the final walkthrough. We start new homes with a post-construction style deep clean, then keep things simple with weekday or weekend recurring visits that fit family schedules.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Recurring weekday or weekend visits for Bothell family homes and townhomes.",
			"deep-cleaning":
				"First cleans for new construction: builder dust, cabinet interiors, fixtures and vents.",
			"commercial-cleaning":
				"Office cleaning for workspaces around Canyon Park and North Creek.",
			"move-in-out":
				"Move-in cleans for new Bothell homes, timed to your closing or move date.",
			"packing-unpacking":
				"Packing and unpacking for families moving into new Bothell neighborhoods.",
			"carpet-cleaning":
				"Carpet extraction for new and established homes, great after move-in.",
		},
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
			{
				q: "Do you serve both the King County and Snohomish County sides of Bothell?",
				a: "Yes. We clean homes on both sides of Bothell, from Downtown and Queensgate to Canyon Park and North Creek.",
			},
			{
				q: "What does a first clean for a new construction home include?",
				a: "We remove builder dust from cabinets, drawers, fixtures, vents and window tracks, clean off sticker and drywall residue, and wash floors and bathrooms so the home is ready to live in.",
			},
		],
	},
	mukilteo: {
		slug: "mukilteo",
		// ponytail: reusa edmonds.png (ciudad costera vecina) — cambiar cuando llegue mukilteo.png
		name: "Mukilteo",
		img: "/img/locations/edmonds.webp",
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
		localHeading: "Waterfront and bluff homes in Mukilteo",
		local: [
			"Mukilteo homes range from waterfront and bluff houses in Old Town near the ferry landing and lighthouse to the planned neighborhoods of Harbour Pointe and the homes along Japanese Gulch. Bluff homes tend to have big view windows and decks, and salt air from the Sound leaves a film on glass and sliders that builds up fast.",
			"Mukilteo is a short drive from our Lynnwood home base, so we can schedule recurring visits without long travel windows. Many Harbour Pointe homes date from the 1980s and 1990s, with carpeted stairs, vaulted ceilings and plenty of trim, so we plan the first visit as a deep clean and then move to a regular routine.",
		],
		serviceNotes: {
			"standard-cleaning":
				"Recurring maid service for Mukilteo homes, a short drive from our Lynnwood home base.",
			"deep-cleaning":
				"First deep cleans for Harbour Pointe homes: carpeted stairs, high trim and vaulted rooms.",
			"commercial-cleaning":
				"Cleaning for offices and small businesses around Harbour Pointe and Old Town.",
			"move-in-out":
				"Move-in and move-out cleans for Mukilteo homes, inside cabinets, closets and appliances.",
			"packing-unpacking":
				"Packing and unpacking for moves in and around Mukilteo.",
			"carpet-cleaning":
				"Carpet extraction for stairs and family rooms in Mukilteo homes.",
		},
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
			{
				q: "Do you clean homes in Harbour Pointe?",
				a: "Yes. Harbour Pointe is one of the areas we serve most in Mukilteo, along with Old Town and the neighborhoods near Japanese Gulch.",
			},
			{
				q: "Can you help with the salt film on windows near the water?",
				a: "Yes. We clean interior glass, sliders and window tracks during deep cleans, which keeps salt film from building up in waterfront and bluff homes.",
			},
		],
	},
};

export const locationSlugs = Object.keys(locations);
