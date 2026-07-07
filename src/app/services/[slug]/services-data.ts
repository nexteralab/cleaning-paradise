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
	| "circle-check";

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
	heroTitle: TitlePart[];
	heroSubtitle: string;
	introEyebrow: string;
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
	"standard-cleaning": {
		slug: "standard-cleaning",
		metaTitle: "Standard Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Local, background-checked maids providing dependable house cleaning services across Seattle, WA on your schedule, your way.",
		badgeIcon: "house",
		badgeLabel: "Standard Maid Service",
		heroTitle: [
			{ text: "Standard Cleaning Services in " },
			{ text: "Seattle", italic: true },
		],
		heroSubtitle:
			"Local, background-checked maids providing dependable house cleaning services across Seattle, WA on your schedule, your way.",
		introEyebrow: "Professional housekeeping",
		introImage: "/img/aw1a0630-mr2eiji3.jpg",
		introImageAlt: "Professional maid service Seattle",
		introLead:
			"Cleaning Paradise's Standard Maid Service brings dependable, professional housekeeping to homes across Seattle, WA. Our trained housekeepers handle the essentials — dusting, vacuuming, mopping, kitchen wipe-downs and bathroom cleaning, so you come home to a sparkling space every time.",
		introParas: [
			"Whether you need a one-time visit or a long-term housekeeper, every member of our team is a local, vetted professional maid you can trust inside your home.",
			"Most of our clients choose recurring housekeeping (weekly, biweekly or monthly visits) because consistency is what keeps a home truly clean. No contracts, no surprise fees, just a professional maid service built around your routine.",
		],
		frequencyChips: defaultFrequencyChips,
		callout: {
			title: "First time? Start with a Deep Clean.",
			before: "Many clients start with a ",
			link: { label: "Deep Cleaning & Sanitization", href: "/services/deep-cleaning" },
			after:
				" to establish a baseline, then move to recurring housekeeping to maintain it — it's more cost-effective long term.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every home is a new project for us",
		customParas: [
			"No two households are the same, and we don't treat them that way. Before your first clean, we walk through your home — in person or with a quick questionnaire — to understand your layout, your priorities, pets, allergies and any areas that need extra care.",
			"From there, we build a custom cleaning checklist and match you with the right local maid for your home — so every visit feels tailored, not templated.",
		],
		features: defaultFeatures,
		formDefaultService: "standard",
		coverageText:
			"Cleaning Paradise provides standard maid service across Seattle and the greater Puget Sound area. Our local, professional team can reach you — usually within 24–48 hours of your request.",
		faqHeading: "Common questions about our maid service in Seattle",
		faqs: [
			{
				q: "How much does maid service cost in Seattle?",
				a: [
					"Pricing depends on your home's size, condition and how often you'd like service. Recurring housekeeping plans typically cost less per visit than one-time cleans. Fill out the form above for a free, no-obligation quote based on your home.",
				],
			},
			{
				q: "What's the difference between standard cleaning and deep cleaning?",
				a: [
					"Standard maid service covers regular upkeep — floors, kitchens, bathrooms and dusting. ",
					{ label: "Deep Cleaning & Sanitization", href: "/services/deep-cleaning" },
					" goes further, tackling buildup, grime and disinfecting high-touch surfaces. Many clients start with a deep clean, then move to recurring housekeeping to maintain it.",
				],
			},
			{
				q: "Can I set up recurring housekeeping visits?",
				a: [
					"Yes. Weekly, biweekly and monthly plans are available, and you can adjust frequency anytime. Recurring clients also get priority scheduling with the same trusted maid whenever possible.",
				],
			},
			{
				q: "Are your maids background-checked?",
				a: [
					"Every professional maid on our team is interviewed, background-checked and trained before stepping into a client's home. Your safety and trust come first — always.",
				],
			},
			{
				q: "Do you offer cleaning services for seniors?",
				a: [
					"Yes. We offer flexible, attentive cleaning services for seniors, including light housekeeping and home care support. Just let us know any special requirements when you request your quote.",
				],
			},
		],
	},

	"deep-cleaning": {
		slug: "deep-cleaning",
		metaTitle: "Deep Cleaning & Sanitization Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"From kitchen surface sanitization to full bathroom disinfection, our deep clean service removes what everyday cleaning leaves behind.",
		badgeIcon: "sparkles",
		badgeLabel: "Deep Cleaning & Sanitization",
		heroTitle: [
			{ text: "Deep Cleaning & " },
			{ text: "Sanitization Services", brBefore: true },
		],
		heroSubtitle:
			"From kitchen surface sanitization to full bathroom disinfection, our deep clean service removes what everyday cleaning leaves behind.",
		introEyebrow: "Professional housekeeping",
		introImage: "/img/aw1a0630-mr2eiji3.jpg",
		introImageAlt: "Deep cleaning service Seattle",
		introLead:
			"When dust, grease and grime build up over time, a quick wipe-down isn't enough. Cleaning Paradise's Deep Cleaning & Sanitization service goes beyond the surface — scrubbing baseboards, appliances and grout, plus thorough sanitization of kitchen surfaces and complete bathroom disinfection. It's the house deep clean service Seattle homeowners turn to before hosting guests, after an illness in the household, or simply to reset a home that hasn't had attention in a while.",
		introParas: [
			"We use environmentally responsible, hospital-grade disinfectants that are tough on germs but safe for kids, pets and seniors. Every deep clean is performed by a trained team using a detailed, room-by-room checklist, so nothing gets missed — from light switches and door handles to the inside of your oven and refrigerator.",
		],
		frequencyChips: defaultFrequencyChips,
		callout: {
			title: "First time? Start with a Deep Clean.",
			before: "Many clients start with a ",
			link: { label: "Deep Cleaning & Sanitization", href: "/services/deep-cleaning" },
			after:
				" to establish a baseline, then move to recurring housekeeping to maintain it — it's more cost-effective long term.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every home is a new project for us",
		customParas: [
			"A studio apartment and a five-bedroom house need very different deep cleans so we never use a one-size-fits-all checklist. We assess your home's size, condition and specific concerns (allergies, pet dander, recent illness, neglected areas) and build a custom sanitization plan before we start. Tell us what matters most to you, and we'll prioritize it.",
		],
		features: defaultFeatures,
		formDefaultService: "deep",
		coverageText:
			"Cleaning Paradise provides deep cleaning & sanitization services across Seattle and the greater Puget Sound area. Our local, professional team can reach you — usually within 24–48 hours of your request.",
		faqHeading: "Common questions about our deep cleaning in Seattle",
		faqs: [
			{
				q: "What's included in a deep cleaning service?",
				a: [
					"Deep cleaning covers everything a standard clean does, plus baseboards, vents, light fixtures, interior appliances, grout, and full sanitization of kitchen surfaces and bathrooms. It's a top-to-bottom reset for your home.",
				],
			},
			{
				q: "How is deep cleaning different from a regular house cleaning service?",
				a: [
					"Standard cleaning maintains an already-clean home. Deep cleaning addresses buildup and areas that don't get touched weekly — think behind appliances, inside cabinets, and detailed bathroom disinfection. Most clients book a deep clean first, then switch to recurring housekeeping.",
				],
			},
			{
				q: "Do you sanitize kitchen surfaces and disinfect bathrooms?",
				a: [
					"Yes, kitchen surface sanitization and bathroom disinfection are core parts of every deep clean, using EPA-registered disinfectants that eliminate bacteria and viruses on contact.",
				],
			},
			{
				q: "Is your deep cleaning safe for homes with kids, pets or seniors?",
				a: [
					"Yes. We prioritize environmental cleaning services and use products that disinfect effectively while remaining safe for sensitive households, including homes that need cleaning services for seniors.",
				],
			},
			{
				q: "How often should I schedule a deep clean?",
				a: [
					"Most homes benefit from a deep clean every 3–6 months, especially before seasonal changes or after a health event. Many clients then maintain results with recurring housekeeping in between.",
				],
			},
		],
	},

	// placeholder copy — replace with SEO copy
	"commercial-cleaning": {
		slug: "commercial-cleaning",
		metaTitle: "Commercial Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Professional office and commercial cleaning for businesses across Seattle, WA — flexible schedules, insured crews, spotless results.",
		badgeIcon: "building-2",
		badgeLabel: "Commercial Cleaning",
		heroTitle: [
			{ text: "Commercial Cleaning Services in " },
			{ text: "Seattle", italic: true },
		],
		heroSubtitle:
			"Professional office and commercial cleaning for businesses across Seattle, WA — flexible schedules, insured crews, spotless results.",
		introEyebrow: "Professional commercial cleaning",
		introImage: "/img/svc-commercial.jpg",
		introImageAlt: "Commercial cleaning service Seattle",
		introLead:
			"Cleaning Paradise keeps offices, retail spaces, clinics and small commercial buildings across Seattle spotless and presentable. Our insured, background-checked crews handle floors, restrooms, break rooms, high-touch surfaces and trash removal — so your team and your customers always walk into a clean space.",
		introParas: [
			"We work around your business hours — early mornings, evenings or weekends — and follow a checklist built for your facility, not a generic template.",
			"Most commercial clients choose recurring service (weekly, biweekly or monthly visits) to keep their space consistently presentable. No long-term contracts, no surprise fees — just dependable commercial cleaning built around your operation.",
		],
		frequencyChips: defaultFrequencyChips,
		callout: {
			title: "New tenant or handover coming up?",
			before: "Pair commercial cleaning with our ",
			link: { label: "Move In / Out Cleaning", href: "/services/move-in-out" },
			after:
				" for a full top-to-bottom reset of the space before keys change hands.",
		},
		customEyebrow: "Tailored to your facility",
		customTitle: "Every space is a new project for us",
		customParas: [
			"A dental office and a warehouse break room need very different cleaning plans, so we never use a one-size-fits-all checklist. We walk your facility, note your traffic patterns, surfaces and priorities, and build a custom scope of work before the first visit.",
			"From there, we assign a consistent crew to your space — so every visit feels tailored, not templated.",
		],
		features: [
			{
				icon: "calendar-check",
				title: "Same crew, every visit",
				text: "Recurring clients get a consistent, trained crew that knows your space.",
			},
			{
				icon: "clock",
				title: "After-hours scheduling",
				text: "Early mornings, evenings and weekends — we clean when your business is closed.",
			},
			{
				icon: "file-x",
				title: "No contracts, no surprise fees",
				text: "Adjust frequency or cancel anytime with 24-hour notice.",
			},
		],
		formDefaultService: "commercial",
		coverageText:
			"Cleaning Paradise provides commercial cleaning across Seattle and the greater Puget Sound area. Our local, professional team can reach you — usually within 24–48 hours of your request.",
		faqHeading: "Common questions about our commercial cleaning in Seattle",
		faqs: [
			{
				q: "How much does commercial cleaning cost in Seattle?",
				a: [
					"Pricing depends on your facility's size, layout and how often you'd like service. Recurring plans typically cost less per visit than one-time cleans. Fill out the form above for a free, no-obligation quote based on your space.",
				],
			},
			{
				q: "Can you clean outside of business hours?",
				a: [
					"Yes. Most of our commercial clients schedule early-morning, evening or weekend visits so cleaning never interrupts their operation. We build the schedule around your hours.",
				],
			},
			{
				q: "Do you bring your own supplies and equipment?",
				a: [
					"Yes. Our crews arrive with professional equipment and commercial-grade, eco-friendly products. If your facility requires specific products or protocols, we're happy to follow them.",
				],
			},
			{
				q: "Are you licensed and insured for commercial work?",
				a: [
					"Yes. Cleaning Paradise is fully licensed and insured, and every crew member is interviewed, background-checked and trained before entering a client's facility.",
				],
			},
			{
				q: "What types of businesses do you serve?",
				a: [
					"Offices, retail storefronts, clinics, studios and small commercial buildings across the Seattle area. If you're not sure your space fits, reach out — we'll tell you honestly.",
				],
			},
		],
	},

	// placeholder copy — replace with SEO copy
	"move-in-out": {
		slug: "move-in-out",
		metaTitle: "Move In / Out Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Top-to-bottom move in / move out cleaning for homes and apartments across Seattle, WA — get your deposit back or move into a truly clean space.",
		badgeIcon: "truck",
		badgeLabel: "Move In / Out Cleaning",
		heroTitle: [
			{ text: "Move In / Out Cleaning Services in " },
			{ text: "Seattle", italic: true },
		],
		heroSubtitle:
			"Deep, top-to-bottom cleaning for empty homes and apartments across Seattle, WA — so you get your deposit back or move into a truly clean space.",
		introEyebrow: "Professional move-out cleaning",
		introImage: "/img/move-in.jpg",
		introImageAlt: "Move in / out cleaning service Seattle",
		introLead:
			"Moving is stressful enough — the cleaning shouldn't be. Cleaning Paradise's Move In / Out service covers everything landlords and new owners look for: inside cabinets and appliances, baseboards, bathrooms, floors and windowsills, leaving the home genuinely move-in ready.",
		introParas: [
			"Because the home is empty, we can reach every corner — the areas a regular clean never touches. Our checklist follows what property managers actually inspect.",
			"Whether you're a renter chasing a full deposit, a landlord preparing a listing, or a buyer who wants a fresh start, we schedule around your closing or lease dates — including short-notice bookings when possible.",
		],
		frequencyChips: [
			{ label: "Move-out", active: true },
			{ label: "Move-in", active: true },
			{ label: "One-time", active: true },
			{ label: "Recurring", active: false },
		],
		callout: {
			title: "Carpets staying behind?",
			before: "Add ",
			link: { label: "Carpet Cleaning", href: "/services/carpet-cleaning" },
			after:
				" to your move-out — freshly cleaned carpets are one of the most common landlord requirements for a full deposit return.",
		},
		customEyebrow: "Tailored to your move",
		customTitle: "Every move-out is a new project for us",
		customParas: [
			"A studio hand-back and a five-bedroom family home are very different jobs, so we scope each move clean individually — size, condition, appliance interiors, and anything your landlord or agent has flagged.",
			"Tell us your deadline and we'll build the visit around it, so the home is inspection-ready exactly when it needs to be.",
		],
		features: [
			{
				icon: "calendar-check",
				title: "Scheduled around your move",
				text: "We coordinate with closing, lease-end and key-handover dates.",
			},
			{
				icon: "circle-check",
				title: "Deposit-focused checklist",
				text: "We clean to what property managers actually inspect.",
			},
			{
				icon: "file-x",
				title: "No contracts, no surprise fees",
				text: "Flat, upfront quotes based on the home's size and condition.",
			},
		],
		formDefaultService: "movein",
		coverageText:
			"Cleaning Paradise provides move in / out cleaning across Seattle and the greater Puget Sound area. Our local, professional team can reach you — usually within 24–48 hours of your request.",
		faqHeading: "Common questions about our move in / out cleaning in Seattle",
		faqs: [
			{
				q: "What's included in a move out cleaning?",
				a: [
					"Everything a deep clean covers, plus the move-specific items landlords check: inside cabinets, drawers and closets, inside the oven and refrigerator, baseboards, windowsills, and full bathroom and kitchen detailing.",
				],
			},
			{
				q: "Does the home need to be empty?",
				a: [
					"Empty is ideal — it lets us reach every surface and finish faster. If some furniture or boxes will still be there, just let us know when you request your quote so we can plan around it.",
				],
			},
			{
				q: "Will this help me get my deposit back?",
				a: [
					"Our checklist is built around what property managers actually inspect, and most clients pass their walkthrough on the first try. If your landlord flags something we missed, tell us within 24 hours and we'll come back to fix it.",
				],
			},
			{
				q: "How far in advance should I book?",
				a: [
					"A week's notice is ideal during busy end-of-month periods, but we accommodate short-notice moves whenever the schedule allows. The sooner you reach out, the more time slots we can offer.",
				],
			},
			{
				q: "Can you clean right before my move-in?",
				a: [
					"Yes. Many clients book a move-in clean between closing (or lease signing) and moving day, so the home is fresh and sanitized before a single box arrives.",
				],
			},
		],
	},

	// placeholder copy — replace with SEO copy
	"carpet-cleaning": {
		slug: "carpet-cleaning",
		metaTitle: "Carpet Cleaning Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Professional carpet and rug cleaning across Seattle, WA — lifting stains, odors and allergens that vacuuming leaves behind.",
		badgeIcon: "brush",
		badgeLabel: "Carpet Cleaning",
		heroTitle: [
			{ text: "Carpet Cleaning Services in " },
			{ text: "Seattle", italic: true },
		],
		heroSubtitle:
			"Professional carpet and rug cleaning across Seattle, WA — lifting stains, odors and allergens that vacuuming leaves behind.",
		introEyebrow: "Professional carpet care",
		introImage: "/img/carpet-cleaning.png",
		introImageAlt: "Carpet cleaning service Seattle",
		introLead:
			"Carpets trap dust, pet dander, odors and stains deep in the fibers where a vacuum can't reach. Cleaning Paradise's carpet cleaning service uses professional hot-water extraction to lift out embedded dirt, refresh high-traffic areas and leave your carpets looking — and smelling — like new.",
		introParas: [
			"We pre-treat stains and high-traffic lanes first, then deep-clean with equipment and solutions that are tough on grime but safe for kids and pets.",
			"Carpet cleaning pairs perfectly with a deep clean or a move-out — many clients bundle them into a single visit.",
		],
		frequencyChips: [
			{ label: "Whole home", active: true },
			{ label: "Select rooms", active: true },
			{ label: "Area rugs", active: true },
			{ label: "Add-on service", active: false },
		],
		callout: {
			title: "Moving out?",
			before: "Bundle carpet cleaning with our ",
			link: { label: "Move In / Out Cleaning", href: "/services/move-in-out" },
			after:
				" — professionally cleaned carpets are one of the most common requirements for a full deposit return.",
		},
		customEyebrow: "Tailored to your carpets",
		customTitle: "Every carpet is a new project for us",
		customParas: [
			"Wool, synthetic, high-pile or well-loved hallway runners — each fiber and stain type needs its own approach. We assess material, age and problem spots (pet accidents, spills, traffic lanes) before choosing the right treatment.",
			"Tell us what matters most to you, and we'll prioritize it — whether that's a stubborn stain, lingering pet odor, or simply a whole-home refresh.",
		],
		features: [
			{
				icon: "sparkles",
				title: "Stain & odor pre-treatment",
				text: "Targeted treatment for pet stains, spills and traffic lanes before extraction.",
			},
			{
				icon: "heart",
				title: "Safe for kids & pets",
				text: "Solutions that clean deep while staying safe for the whole household.",
			},
			{
				icon: "file-x",
				title: "No contracts, no surprise fees",
				text: "Clear per-room or whole-home pricing before we start.",
			},
		],
		formDefaultService: "carpet",
		coverageText:
			"Cleaning Paradise provides carpet cleaning across Seattle and the greater Puget Sound area. Our local, professional team can reach you — usually within 24–48 hours of your request.",
		faqHeading: "Common questions about our carpet cleaning in Seattle",
		faqs: [
			{
				q: "How long do carpets take to dry?",
				a: [
					"Most carpets are dry within 4–8 hours depending on fiber, humidity and airflow. We extract as much moisture as possible and recommend keeping windows cracked or fans running to speed things up.",
				],
			},
			{
				q: "Can you remove pet stains and odors?",
				a: [
					"Yes. We pre-treat pet accidents with enzyme-based cleaners that break down the source of the odor instead of masking it. Older, set-in stains may lighten rather than disappear completely — we'll always tell you honestly what to expect.",
				],
			},
			{
				q: "Is your carpet cleaning safe for kids and pets?",
				a: [
					"Yes. We use professional solutions that are tough on embedded dirt but safe for children and pets once the carpet is dry.",
				],
			},
			{
				q: "How often should carpets be professionally cleaned?",
				a: [
					"Every 6–12 months for most homes, and more often with pets, kids or heavy foot traffic. Regular professional cleaning also extends the life of your carpet.",
				],
			},
			{
				q: "Can I add carpet cleaning to another service?",
				a: [
					"Absolutely. Carpet cleaning is a popular add-on to deep cleans and move in / out cleans — bundling them into one visit is usually the most cost-effective option.",
				],
			},
		],
	},
	// content from design: Service - Packing Unpacking.dc.html
	"packing-unpacking": {
		slug: "packing-unpacking",
		metaTitle: "Packing & Unpacking Services in Seattle, WA | Cleaning Paradise",
		metaDescription:
			"Trained local movers pack, label and unpack your home across Seattle, WA — settle in faster with a lot less stress.",
		badgeIcon: "truck",
		badgeLabel: "Packing & Unpacking",
		heroTitle: [
			{ text: "Packing & Unpacking " },
			{ text: "Services", italic: true },
		],
		heroSubtitle:
			"Skip the late-night boxing marathon. Our trained home care team packs, organizes and unpacks so you can settle in faster and with a lot less stress.",
		introEyebrow: "Professional packing & unpacking",
		introImage: "/img/svc-packing.jpg",
		introImageAlt: "Packing and unpacking service Seattle",
		introLead:
			"Moving day should not mean weeks of boxes piling up in every room. Our Packing and Unpacking service pairs you with a professional local team that carefully wraps, labels and packs your belongings — from kitchenware to closets — so nothing gets lost, damaged or left behind. It's the same trusted home care approach our clients already know from our housekeeping and maid services, applied to your move.",
		introParas: [
			"On the other end, our team unpacks and organizes your new home room by room, so you're not living out of boxes or eating off paper plates for weeks.",
			"Combine Packing and Unpacking with our Move In / Out Cleaning for a fully hands-off moving experience — we'll have your old place spotless and your new place set up, all in one coordinated visit.",
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
			link: { label: "Move In / Out Cleaning", href: "/services/move-in-out" },
			after:
				" so the home is packed, emptied, and left spotless for inspection — one team, one schedule, one invoice.",
		},
		customEyebrow: "Tailored to your home",
		customTitle: "Every move is a new project for us",
		customParas: [
			"Some clients need a full pack and unpack from start to finish. Others just want help with the kitchen, a few closets or the tricky fragile stuff. We start by understanding what you're moving, your timeline and how you like things organized.",
			"Then we put together a plan and crew size that makes sense for your move, not a generic package. Your move feels handled, not handed off.",
		],
		features: [
			{
				icon: "sparkles",
				title: "Quality packing materials",
				text: "Sturdy boxes, wrapping, and padding included — your belongings arrive safe.",
			},
			{
				icon: "circle-check",
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
			"Cleaning Paradise offers packing and unpacking across Seattle and the greater Puget Sound area. Our local team can usually reach you within 24–48 hours of your request.",
		faqHeading: "Common questions about our packing & unpacking in Seattle",
		faqs: [
			{
				q: "Do you provide boxes and packing materials?",
				a: [
					"Yes. We can supply boxes, bubble wrap, tape and packing paper, or work with materials you already have — whatever fits your budget.",
				],
			},
			{
				q: "Can you unpack and organize my kitchen and closets?",
				a: [
					"Yes. Unpacking includes organizing kitchens, closets, bathrooms and any other rooms you want set up properly — not just emptying boxes onto shelves.",
				],
			},
			{
				q: "Can I combine packing and unpacking with move in / out cleaning?",
				a: [
					"Absolutely. Many clients combine both services for a fully coordinated, hands-off moving day. It's one of the most popular bundles we offer.",
				],
			},
			{
				q: "How many team members will be at my home?",
				a: [
					"Crew size depends on your home's size and your timeline. We'll recommend the right number when you request your free quote.",
				],
			},
			{
				q: "Is packing and unpacking available on short notice?",
				a: [
					"We accommodate quick-turnaround moves when our schedule allows. Reach out as early as you can to lock in your preferred date.",
				],
			},
		],
	},
};

export const serviceSlugs = Object.keys(services);
