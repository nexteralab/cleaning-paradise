// Content per service slug for /services/[slug].
// standard-cleaning and deep-cleaning content is taken verbatim from the
// design files (Service - Standard Cleaning.dc.html / Service - Deep Cleaning.dc.html).

export type IconName =
	| "house"
	| "sparkles"
	| "building-2"
	| "truck"
	| "brush"
	| "calendar-check"
	| "heart"
	| "file-x"
	| "clock"
	| "circle-check"
	| "box"
	| "tag";

export interface TitlePart {
	text: string;
	italic?: boolean;
	brBefore?: boolean;
}

export type FaqAnswerPart = string | { label: string; href: string };

export interface ServiceFaq {
	q: string;
	a: FaqAnswerPart[];
}

export interface ServiceFeature {
	icon: IconName;
	title: string;
	text: string;
}

export interface ServiceContent {
	slug: string;
	metaTitle: string;
	metaDescription: string;
	badgeIcon: IconName;
	badgeLabel: string;
	heroImage: string;
	heroImageAlt: string;
	heroTitle: TitlePart[];
	heroSubtitle: string;
	introEyebrow: string;
	introTitle?: string;
	introImage: string;
	introImageAlt: string;
	introLead: string;
	introParas: string[];
	frequencyChips: { label: string; active: boolean }[];
	callout: {
		title: string;
		before: string;
		link: { label: string; href: string };
		after: string;
	};
	customEyebrow: string;
	customTitle: string;
	customParas: string[];
	features: ServiceFeature[];
	formDefaultService: string;
	coverageText: string;
	faqHeading: string;
	faqs: ServiceFaq[];
}

const defaultFrequencyChips = [
	{ label: "Weekly", active: true },
	{ label: "Biweekly", active: true },
	{ label: "Monthly", active: true },
	{ label: "One-time", active: false },
];

const defaultFeatures: ServiceFeature[] = [
	{
		icon: "calendar-check",
		title: "Same maid, every visit",
		text: "Recurring clients get priority scheduling with the same trusted housekeeper.",
	},
	{
		icon: "heart",
		title: "Cleaning services for seniors",
		text: "Flexible scheduling and extra attention to safety and comfort.",
	},
	{
		icon: "file-x",
		title: "No contracts, no surprise fees",
		text: "Cancel or reschedule anytime with 24-hour notice.",
	},
];

export const services: Record<string, ServiceContent> = {
	"standard-cleaning": { // CHECK
		slug: "standard-cleaning",
		metaTitle: "Standard Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Local, background-checked maids providing dependable house cleaning services across Seattle, WA on your schedule, your way.",
		badgeIcon: "house",
		badgeLabel: "Standard Maid Service",
		heroImage: "/img/aw1a0685.jpg",
		heroImageAlt: "Professional maid cleaning a kitchen counter in Seattle",
		heroTitle: [
			{ text: "Professional Maid Service for a " },
			{ text: "Spotless", italic: true },
			{ text: " Home, Every Visit" },
		],
		heroSubtitle:
			"Local, background-checked maids providing dependable house cleaning services across Seattle, WA. On your schedule and your way.",
		introEyebrow: "Professional housekeeping",
		introTitle: "What Our Standard Cleaning Service Covers",
		introImage: "/img/cleaning.webp", // Imagen del segundo cuadro
		introImageAlt: "Professional maid service Seattle",
		introLead:
			"Standard Cleaning from Cleaning Paradise is what keeps your home feeling good every day. Our trained housekeepers take care of the essentials: dusting, vacuuming, mopping, kitchen wipe-downs and bathroom sanitization. You come home to a space that is genuinely spotless, not just straightened up.",
		introParas: [
			"Most of our clients choose recurring housekeeping because consistency is what actually keeps a home clean over time. We also offer standard cleaning services for seniors with gentler scheduling and extra care where it matters. No contracts, no surprise fees — just a professional maid service that works around your life.",
		],
		frequencyChips: defaultFrequencyChips,
		callout: {
			title: "First time? Start with a Deep Clean.",
			before: "Many clients start with a ",
			link: { label: "Deep Cleaning & Sanitization", href: "/cleaning-services-in-wa/deep-cleaning" },
			after:
				" to establish a baseline, then move to recurring housekeeping to maintain it — it's more cost-effective long term.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every Home Is a New Project for Us",
		customParas: [
			"No two homes are the same and we do not treat them that way. Before your first visit we take the time to understand your layout, your priorities and any areas that need extra attention like pets, allergies or rooms you use the most.",
			"From there we put together a custom cleaning plan and match you with the right local maid for your home. Every visit feels tailored because it is.",
		],
		features: defaultFeatures,
		formDefaultService: "standard",
		coverageText:
			"Cleaning Paradise offers standard cleaning across Seattle, WA and the greater Puget Sound area. Our local team can usually reach you within 24 to 48 hours of your request.",
		faqHeading: "Questions About Our Standard Cleaning Service",
		faqs: [
			{
				q: "How much does standard cleaning cost in Seattle?",
				a: [
					"Pricing depends on your home size and how often you want service. Recurring housekeeping plans are usually lower per visit than one time cleans. Fill out the form above for a free quote with no strings attached.",
				],
			},
			{
				q: "What is the difference between standard cleaning and deep cleaning?",
				a: [
					"Standard cleaning covers your regular upkeep: floors, kitchens, bathrooms and dusting. ",
					{ label: "Deep Cleaning", href: "/cleaning-services-in-wa/deep-cleaning" },
					" goes further and tackles buildup, grime and high touch surfaces that need disinfection. Many clients start with a deep clean and then move to recurring housekeeping to keep it that way.",
				],
			},
			{
				q: "Can I set up recurring housekeeping visits?",
				a: [
					"Yes. Weekly, biweekly and monthly plans are all available and you can change the frequency whenever you need to. Recurring clients also get priority scheduling with the same maid when possible.",
				],
			},
			{
				q: "Are your maids background checked?",
				a: [
					"Every maid on our team is interviewed, background checked and trained before they ever step into a client's home. Your safety and comfort come first.",
				],
			},
			{
				q: "Do you offer standard cleaning for seniors?",
				a: [
					"Yes. We offer flexible and attentive cleaning services for seniors including light housekeeping and home care support. Just let us know any specific needs when you request your quote.",
				],
			},
		],
	},

	"deep-cleaning": { // CHECK
		slug: "deep-cleaning",
		metaTitle: "Deep Cleaning & Sanitization Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"From kitchen surface sanitization to full bathroom disinfection, our deep clean service removes what everyday cleaning leaves behind.",
		badgeIcon: "sparkles",
		badgeLabel: "Deep Cleaning & Sanitization",
		heroImage: "/img/aw1a0630-mr2eiji3.jpg",
		heroImageAlt: "Deep cleaning and sanitization service in Seattle",
		heroTitle: [{ text: "Deep Cleaning & Sanitization" }],
		heroSubtitle:
			"From full kitchen sanitization to complete bathroom disinfection, our deep clean removes what everyday cleaning leaves behind.",
		introEyebrow: "Deep clean & sanitize",
		introTitle: "What Our Deep Cleaning Service Covers",
		introImage: "/img/pexels-stephanefabricebass-14215010-mr844mvy.jpg",
		introImageAlt: "Deep cleaning service Seattle",
		introLead:
			"When dust, grease and grime build up over time, a quick wipe down is not enough. Our Deep Cleaning service goes well beyond the surface: baseboards, appliances, grout lines, full sanitization of kitchen surfaces and complete bathroom disinfection. It is the house deep clean service Seattle homeowners reach for before hosting guests, after an illness in the home or whenever the place just needs a real reset.",
		introParas: [
			"We use environmentally responsible, hospital grade disinfectants that are effective against germs but safe for kids, pets and seniors. Every deep clean follows a detailed room by room checklist so nothing gets skipped, from light switches and door handles to the inside of your oven and refrigerator.",
		],
		frequencyChips: defaultFrequencyChips,
		callout: {
			title: "Keep it that way with recurring cleaning.",
			before: "After a deep clean, many clients switch to a recurring ",
			link: { label: "Standard Maid Service", href: "/cleaning-services-in-wa/standard-cleaning" },
			after: " to keep their home fresh — it's more cost-effective long term.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every Deep Clean Is a New Project for Us",
		customParas: [
			"A studio apartment and a five bedroom house need very different deep cleans. We never use a one size fits all checklist. We look at your home's size, condition and specific concerns like allergies, pet dander or areas that have not had attention in a while.",
			"Then we build a custom sanitization plan before we start. You tell us what matters most and we prioritize it.",
		],
		features: [
			{
				icon: "calendar-check",
				title: "Reaches every corner",
				text: "Baseboards, grout, vents and inside appliances — not just the surface.",
			},
			{
				icon: "heart",
				title: "Hospital-grade sanitization",
				text: "EPA-registered disinfectants that eliminate bacteria and viruses on contact.",
			},
			{
				icon: "file-x",
				title: "Safe for kids, pets & seniors",
				text: "Tough on germs while remaining gentle on sensitive households.",
			},
		],
		formDefaultService: "deep",
		coverageText:
			"Cleaning Paradise offers deep cleaning and sanitization across Seattle, WA and the greater Puget Sound area. Our local team can usually reach you within 24 to 48 hours of your request.",
		faqHeading: "Questions About Our Deep Cleaning Service",
		faqs: [
			{
				q: "What does a deep cleaning service include?",
				a: [
					"Deep cleaning covers everything a standard clean does plus baseboards, vents, light fixtures, inside appliances, grout scrubbing, full sanitization of kitchen surfaces and complete bathroom disinfection. It is a top to bottom reset for your home.",
				],
			},
			{
				q: "How is deep cleaning different from regular house cleaning?",
				a: [
					"Standard cleaning keeps a tidy home maintained. Deep cleaning tackles the buildup and the areas that do not get touched weekly: behind appliances, inside cabinets, detailed bathroom disinfection and more. Most clients book a deep clean first and then switch to recurring housekeeping.",
				],
			},
			{
				q: "Do you sanitize kitchen surfaces and disinfect bathrooms?",
				a: [
					"Yes. Kitchen surface sanitization and bathroom disinfection are a core part of every deep clean. We use EPA registered disinfectants that eliminate bacteria and viruses on contact.",
				],
			},
			{
				q: "Is your deep cleaning safe for homes with kids, pets or seniors?",
				a: [
					"Yes. We use environmental cleaning products that disinfect effectively while staying safe for sensitive households including families who need cleaning services for seniors.",
				],
			},
			{
				q: "How often should I book a deep clean?",
				a: [
					"Most homes benefit from a deep clean every 3 to 6 months, especially before seasonal changes or after a health event. Many clients then keep results going with recurring housekeeping in between.",
				],
			},
		],
	},

	"commercial-cleaning": { // CHECK
		slug: "commercial-cleaning",
		metaTitle: "Commercial Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Professional office and commercial cleaning for businesses across Seattle, WA — flexible schedules, insured crews, spotless results.",
		badgeIcon: "building-2",
		badgeLabel: "Commercial & Janitorial",
		heroImage: "/img/comercial-cleaning-mr6t64gm.webp",
		heroImageAlt: "Commercial cleaning service in Seattle",
		heroTitle: [
			{ text: "Commercial Cleaning & Janitorial Services Built Around Your " },
			{ text: "Business", italic: true },
		],
		heroSubtitle:
			"Keep your office, retail space or facility spotless with flexible janitorial service scheduled before, during or after business hours.",
		introEyebrow: "Commercial & janitorial",
		introTitle: "What Our Commercial Cleaning Service Covers",
		introImage: "/img/comercial-cleaning-mr.png",
		introImageAlt: "Commercial cleaning service Seattle",
		introLead:
			"Cleaning Paradise provides dependable commercial cleaning services across Seattle, WA. From daily janitorial service for offices to recurring care for retail spaces, medical offices and multi unit facilities, our team shows up on time, follows your protocols and respects your workspace on every visit. Businesses searching for a cleaning office service near them trust us because we deliver consistent results without the back and forth.",
		introParas: [
			"Our commercial and janitorial services cover trash removal, restroom sanitation, floor care, breakroom cleaning and disinfection of high touch surfaces like door handles and shared equipment. We combine maid services and janitorial services under one roof so businesses with mixed needs can manage everything through a single provider.",
		],
		frequencyChips: [
			{ label: "Offices", active: true },
			{ label: "Retail", active: true },
			{ label: "Medical", active: true },
			{ label: "Facilities", active: false },
		],
		callout: {
			title: "Need a reset first? Start with a deep clean.",
			before: "Many businesses start with a one-time ",
			link: { label: "Deep Cleaning & Sanitization", href: "/cleaning-services-in-wa/deep-cleaning" },
			after: ", then move into a recurring janitorial schedule to maintain it.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every Business Is a New Project for Us",
		customParas: [
			"A 10 person office and a large warehouse do not need the same janitorial plan. We start by understanding your foot traffic, hours, compliance needs and the areas that give you the most trouble.",
			"From there we build a custom commercial cleaning scope and schedule around your business. You get a dedicated team that knows your space and a plan that grows with you.",
		],
		features: [
			{
				icon: "calendar-check",
				title: "Before or after hours",
				text: "Scheduled around your operating hours, so your team is never disrupted.",
			},
			{
				icon: "heart",
				title: "Multi-location accounts",
				text: "Consistent standards and a single point of contact across every location.",
			},
			{
				icon: "file-x",
				title: "One-time or recurring",
				text: "Start with a one-time deep clean or set a recurring janitorial schedule.",
			},
		],
		formDefaultService: "commercial",
		coverageText:
			"Cleaning Paradise offers commercial cleaning and janitorial services across Seattle, WA and the greater Puget Sound area. Our local team can usually reach you within 24 to 48 hours of your request.",
		faqHeading: "Questions About Our Commercial Cleaning Service",
		faqs: [
			{
				q: "What does commercial cleaning include?",
				a: [
					"Our commercial and janitorial services typically include trash removal, restroom sanitation, floor care, dusting, disinfection of high touch surfaces and breakroom or kitchen cleaning. The scope is fully customized to your business.",
				],
			},
			{
				q: "Can you clean our office after business hours?",
				a: [
					"Yes. We offer early morning, evening and overnight cleaning so your team is never disrupted. Many of our Seattle clients prefer this setup.",
				],
			},
			{
				q: "Do you work with multiple business locations?",
				a: [
					"Yes. We support multi location accounts across Seattle, WA with consistent standards and a single point of contact for scheduling.",
				],
			},
			{
				q: "How much does commercial cleaning cost in Seattle?",
				a: [
					"Cost depends on square footage, frequency and scope of service. Request a free quote and we will send you a custom proposal for your space.",
				],
			},
			{
				q: "Can I book a one time deep clean for my office?",
				a: [
					"Absolutely. Many clients start with a one time deep clean and then move into a recurring janitorial schedule. We support both options.",
				],
			},
		],
	},

	"move-in-out": { // CHECK
		slug: "move-in-out",
		metaTitle: "Move In / Out Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Top-to-bottom move in / move out cleaning for homes and apartments across Seattle, WA — get your deposit back or move into a truly clean space.",
		badgeIcon: "truck",
		badgeLabel: "Move In/Out Cleaning",
		heroImage: "/img/aw1a0626-scaled.jpg",
		heroImageAlt: "Move in / move out cleaning service in Seattle",
		heroTitle: [{ text: "Move In/Out Cleaning" }],
		heroSubtitle:
			"Leave your old place spotless and step into your new home fresh. Cabinets, appliances, floors and windows all covered.",
		introEyebrow: "Move in / out cleaning",
		introTitle: "What Our Move In/Out Cleaning Service Covers",
		introImage: "/img/movein-2.jpg",
		introImageAlt: "Move in / out cleaning service Seattle",
		introLead:
			"Moving is stressful enough without adding a deep clean to your list. Our Move In Out Cleaning service is a thorough top to bottom clean made for empty or nearly empty homes and apartments across Seattle, WA. We get inside cabinets, drawers, closets and appliances, the spots landlords and buyers check first, so you can hand over the keys with confidence and nothing to worry about.",
		introParas: [
			"Whether you are a renter going for your full deposit, a homeowner getting ready to list, or moving into a new place that needs a fresh start, our team treats every move in and move out clean as a full house deep clean: appliances inside and out, baseboards, light fixtures, window sills and all floors left spotless and ready for the next chapter.",
		],
		frequencyChips: [
			{ label: "Move-out", active: true },
			{ label: "Move-in", active: true },
			{ label: "Apartments", active: true },
			{ label: "Houses", active: false },
		],
		callout: {
			title: "Moving too? Add Packing & Unpacking.",
			before: "Pair your move-out clean with our ",
			link: { label: "Packing & Unpacking", href: "/cleaning-services-in-wa/packing-unpacking" },
			after: " service for a fully coordinated, hands-off moving day.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every Move Is a New Project for Us",
		customParas: [
			"Studio apartments, family homes and everything in between all move differently. We build your cleaning plan around your timeline and property so nothing is rushed or missed.",
			"Tell us your move date, the size of the space and any priority areas like an oven that needs extra work or carpets before the final walkthrough. We coordinate around your schedule, your realtor and your moving truck.",
		],
		features: [
			{
				icon: "calendar-check",
				title: "Landlord-ready checklist",
				text: "Built to meet standard move-out expectations before your deposit is returned.",
			},
			{
				icon: "heart",
				title: "Inside cabinets & appliances",
				text: "Ovens, fridges, drawers and closets — the spots inspectors check first.",
			},
			{
				icon: "file-x",
				title: "Coordinated with your move",
				text: "We work around your moving truck, realtor or property manager.",
			},
		],
		formDefaultService: "movein",
		coverageText:
			"Cleaning Paradise offers move in and move out cleaning across Seattle, WA and the greater Puget Sound area. Our local team can usually reach you within 24 to 48 hours of your request.",
		faqHeading: "Questions About Our Move In/Out Cleaning Service",
		faqs: [
			{
				q: "What is included in a move out cleaning checklist?",
				a: [
					"Our move out clean covers every room: inside cabinets and drawers, appliance interiors and exteriors, baseboards, light fixtures, window sills and all floors. Everything needed for a spotless handoff.",
				],
			},
			{
				q: "Will move out cleaning help me get my security deposit back?",
				a: [
					"A thorough move out clean is one of the first things landlords check before returning a deposit. Our checklist is built to meet standard move out expectations so you have the best shot at a full return.",
				],
			},
			{
				q: "Can you clean an empty apartment in Seattle on short notice?",
				a: [
					"We do our best to accommodate tight timelines. Reach out as early as possible and we will work to fit your move date.",
				],
			},
			{
				q: "Do you clean inside the oven and refrigerator?",
				a: [
					"Yes. Interior appliance cleaning is a standard part of every move in and move out service.",
				],
			},
			{
				q: "How far in advance should I book a move out clean?",
				a: [
					"We recommend booking 1 to 2 weeks ahead when you can, especially during busy moving periods. That said, we accommodate last minute requests when our schedule allows.",
				],
			},
		],
	},

	"carpet-cleaning": { // CHECK
		slug: "carpet-cleaning",
		metaTitle: "Carpet Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Professional carpet and rug cleaning across Seattle, WA — lifting stains, odors and allergens that vacuuming leaves behind.",
		badgeIcon: "brush",
		badgeLabel: "Carpet Cleaning",
		heroImage: "/img/carpet-cleaning.webp",
		heroImageAlt: "Carpet cleaning service in Seattle",
		heroTitle: [
			{ text: "Carpet Cleaning That Restores Spotless, " },
			{ text: "Sparkling", italic: true },
			{ text: " Floors" },
		],
		heroSubtitle:
			"Professional extraction cleaning that lifts deep stains, odors and allergens. Your carpets come out spotless, sparkling and genuinely fresh.",
		introEyebrow: "Professional carpet cleaning",
		introTitle: "What Our Carpet Cleaning Service Covers",
		introImage: "/img/pexels-pixabay-38325.jpg",
		introImageAlt: "Carpet cleaning service Seattle",
		introLead:
			"Vacuuming only gets what is on the surface. Our Carpet Cleaning service uses hot water extraction to pull dirt, allergens, pet dander and odors out from deep inside the fibers. It is the kind of result most carpet cleaning companies in Seattle talk about but rarely deliver consistently. What you get is a spotless, sparkling carpet that looks and smells genuinely clean, not just damp.",
		introParas: [
			"We use environmentally responsible solutions that are tough on stains but completely safe for kids and pets. Our equipment is also calibrated to avoid over wetting so your carpets dry faster and the fibers stay protected longer. Want a full home refresh in one visit? Ask about bundling carpet cleaning with our window cleaning service.",
		],
		frequencyChips: [
			{ label: "Hot-water extraction", active: true },
			{ label: "Pet stains", active: true },
			{ label: "Odor removal", active: true },
			{ label: "Allergen relief", active: false },
		],
		callout: {
			title: "Refresh the whole home.",
			before: "Bundle carpet cleaning with a ",
			link: { label: "Deep Cleaning & Sanitization", href: "/cleaning-services-in-wa/deep-cleaning" },
			after: " for a complete, top-to-bottom refresh in one visit.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every Carpet Is a New Project for Us",
		customParas: [
			"Wool, synthetic blends, light colors, high traffic hallways, pet stains. Every carpet has its own story. Before we start we assess the fiber type, stain history and traffic level so we can choose the right products and the right technique.",
			"No generic passes with a rented machine. We treat your carpet the way it actually needs to be treated to get back to pristine.",
		],
		features: [
			{
				icon: "calendar-check",
				title: "Right method for your fiber",
				text: "We match products and technique to your carpet type, never a generic pass.",
			},
			{
				icon: "heart",
				title: "Pet stains & odors",
				text: "Enzyme-based treatments that break down odor at the source, not just mask it.",
			},
			{
				icon: "file-x",
				title: "Fast drying, safe products",
				text: "Low-moisture extraction with kid- and pet-safe solutions.",
			},
		],
		formDefaultService: "carpet",
		coverageText:
			"Cleaning Paradise offers carpet cleaning across Seattle, WA and the greater Puget Sound area. Our local team can usually reach you within 24 to 48 hours of your request.",
		faqHeading: "Questions About Our Carpet Cleaning Service",
		faqs: [
			{
				q: "How long does it take for carpets to dry after cleaning?",
				a: [
					"Most carpets dry within 4 to 8 hours with proper airflow thanks to our low moisture extraction process. We will share specific drying tips after your appointment.",
				],
			},
			{
				q: "Can you remove pet stains and odors from carpet?",
				a: [
					"Yes. Pet stain and odor treatment is one of our most requested services. We use enzyme based solutions designed to break down the odor at the source, not just cover it up.",
				],
			},
			{
				q: "Do you offer window cleaning in Seattle too?",
				a: [
					"We do. Window cleaning pairs really well with carpet cleaning for clients who want a full refresh in one visit. Ask about bundled pricing when you request your quote.",
				],
			},
			{
				q: "Is your carpet cleaning safe for kids and pets?",
				a: [
					"Yes. As part of our environmental cleaning services we use solutions that clean effectively without leaving harsh residue behind. Safe for everyone in the home.",
				],
			},
			{
				q: "How often should carpets be professionally cleaned?",
				a: [
					"Most homes benefit from professional carpet cleaning every 6 to 12 months. Homes with pets, kids or high foot traffic usually do better with more frequent visits.",
				],
			},
		],
	},
	// content from design: Service - Packing Unpacking.dc.html
	"packing-unpacking": { // CHECK PACKING
		slug: "packing-unpacking",
		metaTitle: "Packing & Unpacking Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Trained local movers pack, label and unpack your home across Seattle, WA — settle in faster with a lot less stress.",
		badgeIcon: "truck",
		badgeLabel: "Packing & Unpacking",
		heroImage: "/img/gemini_generated_image_67heuh67heuh67he.webp",
		heroImageAlt: "Packing and unpacking service in Seattle",
		heroTitle: [{ text: "Packing & Unpacking Services" }],
		heroSubtitle:
			"Skip the late night boxing marathon. Our trained home care team packs, organizes and unpacks so you can settle in faster and with a lot less stress.",
		introEyebrow: "Professional packing & unpacking",
		introTitle: "What Our Packing & Unpacking Service Covers",
		introImage: "/img/carpet.png",
		introImageAlt: "Packing and unpacking service Seattle",
		introLead:
			"Moving day should not mean weeks of boxes piling up in every room. Our Packing and Unpacking service pairs you with a professional local team that carefully wraps, labels and packs your belongings from kitchenware to closets, so nothing gets lost, damaged or left behind. It is the same trusted home care approach our clients already know from our housekeeping and maid services, applied to your move.",
		introParas: [
			"On the other end, our team unpacks and organizes your new home room by room so you are not living out of boxes or eating off paper plates for weeks. Combine Packing and Unpacking with our Move In/Out Cleaning service for a fully hands off moving experience. We will have your old place spotless and your new place set up, all in one coordinated visit.",
		],
		frequencyChips: [
			{ label: "Full pack", active: true },
			{ label: "Partial pack", active: true },
			{ label: "Unpacking", active: true },
			{ label: "Fragile items", active: false },
		],
		callout: {
			title: "Moving out? Add Move In / Out Cleaning.",
			before: "Many clients bundle packing with a ",
			link: { label: "Move In / Out Cleaning", href: "/cleaning-services-in-wa/move-in-out" },
			after:
				" so the home is packed, emptied, and left spotless for inspection — one team, one schedule, one invoice.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every Move Is a New Project for Us",
		customParas: [
			"Some clients need a full pack and unpack from start to finish. Others just want help with the kitchen, a few closets or the tricky fragile stuff. We start by understanding what you are moving, your timeline and how you like things organized.",
			"Then we put together a plan and crew size that makes sense for your move, not a generic package. Your move feels handled, not handed off.",
		],
		features: [
			{
				icon: "box",
				title: "Quality packing materials",
				text: "Sturdy boxes, wrapping, and padding included — your belongings arrive safe.",
			},
			{
				icon: "tag",
				title: "Labeled room by room",
				text: "Every box is labeled so unpacking is fast and nothing gets lost.",
			},
			{
				icon: "file-x",
				title: "No contracts, no surprise fees",
				text: "Reschedule anytime with 24-hour notice.",
			},
		],
		formDefaultService: "packing",
		coverageText:
			"Cleaning Paradise offers packing and unpacking across Seattle, WA and the greater Puget Sound area. Our local team can usually reach you within 24 to 48 hours of your request.",
		faqHeading: "Questions About Our Packing & Unpacking Service",
		faqs: [
			{
				q: "Do you provide boxes and packing materials?",
				a: [
					"Yes. We can supply boxes, bubble wrap, tape and packing paper or work with materials you already have. Whatever fits your budget.",
				],
			},
			{
				q: "Can you unpack and organize my kitchen and closets?",
				a: [
					"Yes. Unpacking includes organizing kitchens, closets, bathrooms and any other rooms you want set up properly, not just emptying boxes onto shelves.",
				],
			},
			{
				q: "Can I combine packing and unpacking with move in out cleaning?",
				a: [
					"Absolutely. Many clients combine both services for a fully coordinated and hands off moving day. It is one of the most popular bundles we offer.",
				],
			},
			{
				q: "How many team members will be at my home?",
				a: [
					"Crew size depends on your home size and your timeline. We will recommend the right number when you request your free quote.",
				],
			},
			{
				q: "Is packing and unpacking available on short notice?",
				a: [
					"We accommodate quick turnaround moves when our schedule allows. Reach out as early as you can to lock in your preferred date.",
				],
			},
		],
	},
};

export const serviceSlugs = Object.keys(services);
