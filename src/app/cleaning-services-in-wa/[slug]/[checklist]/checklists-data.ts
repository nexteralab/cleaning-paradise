// Content for the four checklist pages, keyed by `<service slug>/<checklist slug>`.
// A checklist without `rooms` renders the "coming soon" placeholder instead.

export type RoomIcon =
	| "utensils"
	| "sofa"
	| "bath"
	| "bed-double"
	| "washing-machine"
	| "footprints"
	| "sparkles";

export type AddonIcon =
	| "refrigerator"
	| "microwave"
	| "grid-2x2"
	| "app-window"
	| "sparkles"
	| "home";

export interface ChecklistRoom {
	icon: RoomIcon;
	title: string;
	/** Flat list. Use `groups` instead when the room splits into labelled sections. */
	items?: string[];
	groups?: { title: string; items: string[] }[];
}

export interface ChecklistAddon {
	icon: AddonIcon;
	label: string;
	/** Single flat price. Omit when the add-on prices per unit — use `lines` instead. */
	price?: string;
	lines?: { label: string; value: string }[];
	/** Small caption under the price, e.g. "(must be empty)". */
	note?: string;
}

/** Footnote text, with internal links inline. Same shape as FaqAnswerPart in services-data. */
export type NotePart = string | { label: string; href: string };

export interface ChecklistSpecialty {
	label: string;
	value: string;
	/** Quoted instead of a fixed price — rendered smaller and italic. */
	quote?: boolean;
}

export interface ChecklistNoteGroup {
	title: string;
	items: string[];
}

export interface ChecklistPage {
	service: string;
	checklist: string;
	name: string;
	/** SEO <title>, used verbatim — no brand suffix, the length is deliberate. */
	metaTitle: string;
	badge: string;
	heading: string;
	lead: string;
	description: string;
	serviceLinkLabel: string;
	rooms?: ChecklistRoom[];
	addons?: ChecklistAddon[];
	addonsNote?: NotePart[];
	specialty?: ChecklistSpecialty[];
	specialtyNote?: NotePart[];
	notes?: ChecklistNoteGroup[];
	bookLine?: string;
}

const flatRateAddons: ChecklistAddon[] = [
	{ icon: "refrigerator", label: "Inside Fridge", price: "+$50" },
	{ icon: "microwave", label: "Inside Oven", price: "+$40" },
	{ icon: "grid-2x2", label: "Inside Cabinets", price: "+$50" },
	{
		icon: "app-window",
		label: "Interior Windows",
		lines: [
			{ label: "Small (inside)", value: "+$5 each" },
			{ label: "Large (inside)", value: "+$8 each" },
		],
	},
];

export const checklistPages: ChecklistPage[] = [
	{
		service: "standard-cleaning",
		checklist: "standard-checklist",
		name: "Standard Cleaning Checklist",
		metaTitle: "Standard Cleaning Checklist for Weekly Home Upkeep",
		badge: "Routine Maintenance Clean",
		heading: "Standard Cleaning Checklist",
		lead:
			"Room by room, this is the full scope of our standard cleaning, plus the flat-rate add-ons you can request. Serving King & Snohomish Counties.",
		description:
			"Every task in our routine maintenance clean, kitchen to bedrooms, plus flat-rate add-ons. Built for weekly, biweekly or monthly homes in Greater Seattle.",
		serviceLinkLabel: "Learn more about Standard Cleaning service",
		rooms: [
			{
				icon: "sparkles",
				title: "General",
				items: [
					"Spot clean interior windows (reachable areas)",
					"Sanitize high-touch surfaces",
				],
			},
			{
				icon: "sofa",
				title: "Common Areas",
				items: [
					"Dust tables, shelves & visible surfaces",
					"Vacuum or mop floors",
					"Empty trash bins",
					"Light organization (pillows, shoes, magazines)",
					"Remove cobwebs",
					"Light dusting of baseboards",
					"Wipe light switches & door handles",
					"Light dusting of reachable vents",
				],
			},
			{
				icon: "utensils",
				title: "Kitchen",
				items: [
					"Clean countertops",
					"Clean and polish sink & faucet",
					"Wipe backsplash",
					"Spot clean stovetop",
					"Clean inside microwave",
					"Wipe exterior of appliances (microwave, fridge, stove)",
					"Wipe exterior of cabinets",
					"Sweep & mop floors",
					"Take out trash",
					"Remove cobwebs",
					"Light dusting of baseboards",
					"Wipe light switches & door handles",
				],
			},
			{
				icon: "bath",
				title: "Bathrooms",
				items: [
					"Disinfect toilets, sinks, showers & tubs",
					"Polish faucets",
					"Wipe mirrors",
					"Clean cabinet exteriors",
					"Sweep & mop floors",
					"Take out trash",
					"Remove cobwebs",
					"Light dusting of baseboards",
					"Wipe light fixtures",
					"Wipe light switches & door handles",
				],
			},
			{
				icon: "bed-double",
				title: "Bedrooms",
				items: [
					"Dust and wipe surfaces (nightstands, dressers)",
					"Clean mirrors",
					"Light decluttering",
					"Vacuum or mop floors",
					"Remove cobwebs",
					"Light dusting of baseboards",
					"Wipe light switches & door handles",
					"Make beds (if requested)",
				],
			},
		],
		addons: [
			{ icon: "refrigerator", label: "Inside Fridge", price: "+$50" },
			{ icon: "microwave", label: "Inside Oven", price: "+$40" },
			{ icon: "grid-2x2", label: "Inside Cabinets", price: "+$50", note: "(must be empty)" },
			{
				icon: "app-window",
				label: "Interior Windows",
				lines: [
					{ label: "Small (inside)", value: "+$5 each" },
					{ label: "Large (inside)", value: "+$8 each" },
				],
			},
			{
				icon: "sparkles",
				label: "Deep Scrubbing",
				price: "Custom Quote",
				note: "grout, blinds, fans & under furniture",
			},
		],
		addonsNote: [
			"Want a more thorough reset? Ask about our ",
			{ label: "Deep Cleaning", href: "/cleaning-services-in-wa/deep-cleaning" },
			" service — ideal for first-time visits, move-ins, or seasonal deep cleans.",
		],
		notes: [
			{
				title: "About Standard Cleaning",
				items: [
					"A routine maintenance clean to keep your home fresh between deep cleans — perfect for weekly, biweekly, or monthly upkeep",
					"Covers accessible surfaces and high-touch areas",
					"We do not move heavy furniture or appliances",
				],
			},
			{
				title: "What to Expect",
				items: [
					"Light dusting, tidying, and surface cleaning throughout the home",
					"Light decluttering only — we don't organize or move personal belongings unless requested",
					"Beds made on request",
				],
			},
			{
				title: "Guidelines",
				items: [
					"Trash removal includes bagged household trash only",
					"Deep scrubbing (grout, blinds, fans, under furniture) is an add-on, not included",
					"For heavy buildup or first-time cleans, we recommend a Deep Clean",
				],
			},
		],
		bookLine: "Ready to book? Let's keep your home fresh and spotless!",
	},
	{
		service: "deep-cleaning",
		checklist: "deep-checklist",
		name: "Deep Cleaning Checklist",
		metaTitle: "Deep Cleaning Checklist: Full Room-by-Room Scope",
		badge: "Top-to-Bottom Deep Clean",
		heading: "Deep Cleaning Checklist",
		lead:
			"Room by room, this is the full scope of our deep cleaning, plus the flat-rate add-ons you can request. Serving King & Snohomish Counties.",
		description:
			"Grout, blinds, upholstery and behind appliances. See the full scope of a top-to-bottom deep clean and how heavy-condition homes are priced before you book.",
		serviceLinkLabel: "Learn more about Deep Cleaning service",
		rooms: [
			{
				icon: "utensils",
				title: "Kitchen",
				groups: [
					{
						title: "General Cleaning",
						items: [
							"Remove cobwebs",
							"Dust blinds (if accessible)",
							"Wipe baseboards, kick plates, and heat vents",
							"Wipe interior side of windows and glass doors",
							"Clean exterior of cabinets and drawers",
							"Spot clean walls (light marks only)",
						],
					},
					{
						title: "Appliances (Deep Clean)",
						items: [
							"Clean inside microwave",
							"Deep clean stovetop & degrease range hood",
							"Wipe exterior of refrigerator, oven & microwave",
							"Clean dishwasher exterior & filter (if accessible)",
							"Wipe behind and around appliances (if accessible)",
						],
					},
					{
						title: "Surfaces & Details",
						items: [
							"Remove grease buildup from backsplash",
							"Sanitize & disinfect countertops, sink & faucet",
							"Polish sink and faucet, remove light buildup",
							"Wipe switches, outlets, and light fixtures",
							"Clean handles and knobs",
							"Dust/wipe top of cabinets (if accessible)",
							"Clean windowsills and tracks",
						],
					},
					{
						title: "Floors",
						items: [
							"Sweep/vacuum floors (edges & corners)",
							"Mop floors thoroughly",
							"Detail edges along baseboards",
						],
					},
				],
			},
			{
				icon: "sofa",
				title: "Living Room / Common Areas",
				groups: [
					{
						title: "General Cleaning",
						items: [
							"Remove cobwebs",
							"Deep dust blinds, vents, and baseboards",
							"Dust ceiling fans & chandeliers (if reachable)",
							"Wipe door frames, doors, closet doors & handles",
							"Wipe switches and high-touch surfaces",
							"Spot clean walls (light marks only)",
						],
					},
					{
						title: "Surfaces & Details",
						items: [
							"Clean under and behind furniture (if accessible)",
							"Vacuum sofas, cushions, and upholstery",
							"Dust decorative items and picture frames",
							"Clean windowsills and window tracks",
							"Wipe stair railings (if applicable)",
							"Dust/wipe top of doors and trim",
						],
					},
					{
						title: "Windows & Floors",
						items: [
							"Wipe interior side of windows (if accessible)",
							"Vacuum carpets and rugs",
							"Sweep and mop hard floors (edges & corners)",
							"Detail edges along baseboards",
						],
					},
				],
			},
			{
				icon: "bath",
				title: "Bathrooms",
				groups: [
					{
						title: "Deep Cleaning",
						items: [
							"Scrub & disinfect toilets, tubs, showers & sinks",
							"Scrub shower/tub walls thoroughly",
							"Remove soap scum and hard water stains",
							"Scrub tile grout and corners",
							"Clean glass shower doors and mirrors",
							"Spot clean walls (light marks only)",
						],
					},
					{
						title: "Surfaces & Details",
						items: [
							"Wipe exterior of cabinets, drawers & doors",
							"Clean inside medicine cabinet (if applicable)",
							"Sanitize chrome fixtures, handles & faucets",
							"Polish mirrors and fixtures",
							"Wipe towel bars and toilet paper holders",
							"Wipe baseboards, windowsills, and vents",
							"Clean light fixtures and switches",
							"Dust exhaust fan cover (exterior)",
						],
					},
					{
						title: "Toilet Detail & Floors",
						items: [
							"Disinfect toilet — inside, outside & base",
							"Clean under, behind & around the toilet base",
							"Mop floors (including behind toilets)",
							"Detail edges along baseboards",
						],
					},
				],
			},
			{
				icon: "bed-double",
				title: "Bedrooms",
				groups: [
					{
						title: "General Cleaning",
						items: [
							"Remove cobwebs",
							"Dust ceiling fans, light fixtures & blinds",
							"Wipe doors, door frames, and handles",
							"Sanitize switches and outlet plates",
							"Spot clean walls (light marks only)",
						],
					},
					{
						title: "Surfaces & Details",
						items: [
							"Clean baseboards thoroughly",
							"Dust/wipe top of doors and trim",
							"Clean under bed (if accessible)",
							"Clean inside closets and closet floors",
							"Wipe closet shelves and rods",
							"Clean window tracks",
						],
					},
					{
						title: "Windows & Floors",
						items: [
							"Wipe interior side of windows (if accessible)",
							"Vacuum carpets or hard floor (including edges)",
							"Sweep and mop hard floors",
							"Detail edges along baseboards",
						],
					},
				],
			},
			{
				icon: "washing-machine",
				title: "Laundry Room",
				groups: [
					{
						title: "General Cleaning",
						items: [
							"Remove cobwebs",
							"Dust light fixtures (if reachable)",
							"Wipe washer and dryer exterior",
							"Clean handles, knobs & high-touch surfaces",
							"Sanitize switches and outlet plates",
							"Spot clean walls (light marks only)",
						],
					},
					{
						title: "Surfaces, Details & Floors",
						items: [
							"Clean laundry sink and faucet",
							"Wipe cabinet exteriors & accessible surfaces",
							"Wipe baseboards, windowsills, and vents",
							"Clean behind & around appliances (if accessible)",
							"Sweep/vacuum and mop floors",
							"Detail edges along baseboards",
						],
					},
				],
			},
		],
		addons: [
			{ icon: "refrigerator", label: "Inside Fridge", price: "+$50" },
			{ icon: "microwave", label: "Inside Oven", price: "+$40" },
			{ icon: "grid-2x2", label: "Inside Cabinets", price: "+$50" },
			{
				icon: "app-window",
				label: "Interior Windows",
				lines: [
					{ label: "Small (inside)", value: "+$5 each" },
					{ label: "Large (inside)", value: "+$8 each" },
				],
			},
			{
				icon: "home",
				label: "Heavy Condition",
				price: "+$50–$150",
				note: "(depending on condition)",
			},
		],
		addonsNote: [
			"Other services available by custom quote: carpet deep cleaning / shampooing, full wall washing, interior of washer/dryer & dishwasher, mold or mildew treatment, balcony / patio cleaning, and large-item hauling.",
		],
		notes: [
			{
				title: "About Deep Cleaning",
				items: [
					"Targets areas often missed in routine cleanings — ideal for first-time visits, move-ins, or seasonal resets",
					"Service covers accessible surfaces only",
					"We do not move heavy furniture or appliances",
					"Water & electricity must be available at the time of service",
				],
			},
			{
				title: "Condition & Results",
				items: [
					"Heavy buildup (grease, hard water, mold) may require added time, charges, or multiple cleanings",
					"Some stains or buildup may be permanent and not fully removable",
					"Heavy-condition homes are quoted at +$50–$150",
				],
			},
			{
				title: "Guidelines",
				items: [
					"Not responsible for pre-existing damage",
					"Trash removal includes bagged household trash only — no haul-away",
					"Includes a final walkthrough for quality assurance",
					"Wall cleaning performed only on washable paint",
				],
			},
		],
		bookLine: "Ready to book? Let's get your home deep-cleaned and refreshed!",
	},
	{
		service: "move-in-out",
		checklist: "move-in-checklist",
		name: "Move-In Cleaning Checklist",
		metaTitle: "Move-In Cleaning Checklist for Empty Homes in WA",
		badge: "Move-In Ready Deep Clean",
		heading: "Move-In Cleaning Checklist",
		lead:
			"Room by room, this is the full scope of our move-in cleaning, plus the flat-rate add-ons and specialty services you can request. Serving King & Snohomish County.",
		description:
			"What we clean in an empty home before your furniture arrives, from garbage disposal to closet floors. Licensed and insured in King and Snohomish Counties.",
		serviceLinkLabel: "Learn more about Move-In service",
		rooms: [
			{
				icon: "utensils",
				title: "Kitchen",
				items: [
					"Sanitize countertops, sink & faucet",
					"Wipe exterior of all cabinets & drawers",
					"Clean inside microwave",
					"Wipe down stovetop & exterior of oven",
					"Wipe exterior of refrigerator",
					"Wipe exterior of dishwasher",
					"Clean garbage disposal — rim, flaps & around drain",
					"Degrease range hood & filter",
					"Clean backsplash & light fixtures",
					"Wipe down vent covers & fan exteriors",
					"Clean windowsills, tracks & frames",
					"Clean baseboards, outlets & light switches",
					"Sweep, vacuum & mop floors",
				],
			},
			{
				icon: "bath",
				title: "Bathrooms",
				items: [
					"Scrub & disinfect tubs, showers, toilets, sinks & faucets",
					"Remove hard water stains & mineral buildup",
					"Clean shower door tracks & grout lines",
					"Wipe exterior of cabinets & drawers",
					"Wipe mirrors, light fixtures & exhaust fan covers (exterior)",
					"Wipe down vent covers (exterior)",
					"Clean windowsills, tracks & frames",
					"Sanitize switches, doorknobs & handles",
					"Clean baseboards",
					"Sweep, vacuum & mop floors thoroughly",
				],
			},
			{
				icon: "bed-double",
				title: "Bedrooms",
				items: [
					"Dust ceiling fans (exterior) & light fixtures",
					"Wipe vent covers & registers (exterior)",
					"Dust & clean blinds",
					"Clean windowsills, tracks & frames",
					"Wipe baseboards, door frames & light switches",
					"Dust closet shelves & doors — vacuum/mop closet floors",
					"Vacuum & mop floors",
				],
			},
			{
				icon: "sofa",
				title: "Living Room / Common Areas",
				items: [
					"Dust ceiling fans (exterior) & light fixtures",
					"Wipe vent covers & registers (exterior)",
					"Dust & clean blinds",
					"Clean windowsills, tracks & frames",
					"Clean all door frames, handles & outlets",
					"Deep dusting of surfaces & ledges",
					"Wipe baseboards & vacuum/mop floors",
					"Sanitize all high-touch areas",
				],
			},
			{
				icon: "footprints",
				title: "Stairs & Hallways",
				items: [
					"Dust & wipe railings & banisters",
					"Wipe vent covers & light fixtures (exterior)",
					"Wipe baseboards & door frames",
					"Vacuum & mop stairs & hallway floors",
				],
			},
			{
				icon: "washing-machine",
				title: "Laundry Area",
				items: [
					"Wipe exterior of washer & dryer",
					"Clean dryer lint trap & vent area (exterior)",
					"Clean laundry sink (if present)",
					"Clean cabinets & shelves",
					"Sweep & mop floors",
				],
			},
		],
		addons: flatRateAddons,
		addonsNote: [
			"These flat-rate add-ons can be included with any clean — just let us know in advance. Window pricing is per pane.",
		],
		specialty: [
			{ label: "Inside Dishwasher", value: "+$20" },
			{ label: "Inside Washer / Dryer", value: "+$20" },
			{ label: "Carpet Cleaning", value: "Separate Quote", quote: true },
			{ label: "Garage or Patio Cleaning", value: "Custom Quote", quote: true },
			{ label: "Wall Cleaning", value: "By Request", quote: true },
			{ label: "Handyman Jobs", value: "Separate Quote", quote: true },
		],
		specialtyNote: [
			"Specialty services are quoted by size & condition. Carpet cleaning may be included as spot cleaning when the carpet allows, or quoted separately — just ask.",
		],
		notes: [
			{
				title: "General",
				items: [
					"Service covers accessible surfaces only",
					"Best completed before furniture & belongings move in",
					"We do not move heavy furniture or appliances",
					"Water & electricity must be available at the time of service",
				],
			},
			{
				title: "Condition & Results",
				items: [
					"Heavy buildup (grease, hard water, mold) may require added time, charges, or multiple cleanings",
					"Some stains or buildup may be permanent and not fully removable",
				],
			},
			{
				title: "Guidelines",
				items: [
					"Refrigerator & appliances cleaned inside only when empty & accessible",
					"Not responsible for pre-existing damage",
					"Includes a final walkthrough for quality assurance",
					"Wall cleaning performed only on washable paint",
				],
			},
		],
		bookLine: "Ready to book? Let's make your new home fresh & move-in ready!",
	},
	{
		service: "move-in-out",
		checklist: "move-out-checklist",
		name: "Move-Out Cleaning Checklist",
		metaTitle: "Move-Out Cleaning: What's Included and What Costs Extra",
		badge: "Move-Out Ready Deep Clean",
		heading: "Move-Out Cleaning Checklist",
		lead:
			"Room by room, this is the full scope of our move-out cleaning, plus the flat-rate add-ons and specialty services you can request. Serving King & Snohomish Counties.",
		description:
			"The full scope of our end-of-lease clean, from pantry shelves to trash removal, plus what is quoted separately, before your landlord walks through.",
		serviceLinkLabel: "Learn more about Move-Out service",
		rooms: [
			{
				icon: "utensils",
				title: "Kitchen",
				items: [
					"Remove cobwebs",
					"Dust blinds (if accessible)",
					"Wipe baseboards, kick plates & heat vents",
					"Clean windowsills, tracks & frames",
					"Wipe & sanitize exterior of cabinets & drawers",
					"Clean inside pantry shelves",
					"Clean stovetop, degrease hood & filter",
					"Clean microwave (inside & out)",
					"Wipe exterior of oven & refrigerator",
					"Clean dishwasher exterior & filter (if applicable)",
					"Remove grease from backsplash",
					"Sanitize countertops, sink & faucet",
					"Wipe switches, outlets & light fixtures",
					"Sweep, vacuum & mop floors",
				],
			},
			{
				icon: "sofa",
				title: "Living Room / Common Areas",
				items: [
					"Remove cobwebs",
					"Dust blinds (if accessible)",
					"Wipe light fixtures & ceiling fans (if reachable)",
					"Wipe door frames, closet doors & handles",
					"Wipe baseboards, window sills & vents",
					"Clean window tracks",
					"Dust air vents & return vents",
					"Clean inside closets",
					"Wipe stair railings (if applicable)",
					"Sweep porch/deck (if applicable)",
					"Vacuum carpets & mop hard floors",
				],
			},
			{
				icon: "bath",
				title: "Bathrooms",
				items: [
					"Scrub & disinfect toilets, tubs, showers & sinks",
					"Remove soap scum & hard water buildup",
					"Clean glass doors & mirrors",
					"Wipe exterior of cabinets, drawers & doors",
					"Sanitize chrome fixtures & handles",
					"Wipe towel bars & toilet paper holders",
					"Clean light fixtures & switches",
					"Mop floors (including behind toilets)",
				],
			},
			{
				icon: "bed-double",
				title: "Bedrooms",
				items: [
					"Remove cobwebs",
					"Dust light fixtures, blinds & ceiling fans (if reachable)",
					"Wipe doors, handles & closet shelves",
					"Clean inside closets",
					"Sanitize switches & outlet plates",
					"Clean baseboards & vents",
					"Vacuum or mop floors",
				],
			},
			{
				icon: "washing-machine",
				title: "Laundry Room",
				items: [
					"Wipe washer & dryer exterior",
					"Clean laundry sink & cabinet surfaces",
					"Wipe baseboards & switches",
					"Sweep, vacuum & mop floors",
				],
			},
			{
				icon: "sparkles",
				title: "General / Throughout Home",
				items: [
					"Remove cobwebs throughout the home",
					"Dust air vents & returns",
					"Clean interior window frames & sills",
					"Wipe all light switches & outlet plates",
					"Clean baseboards throughout the home",
					"Detailed edge vacuuming",
					"Detailed floor mopping",
					"Trash removal",
				],
			},
		],
		addons: flatRateAddons,
		addonsNote: [
			"These flat-rate add-ons can be included with any clean — just let us know in advance. Window pricing is per pane.",
		],
		specialty: [
			{ label: "Inside Dishwasher", value: "+$20" },
			{ label: "Inside Washer / Dryer", value: "+$20" },
			{ label: "Carpet Cleaning", value: "Separate Quote", quote: true },
			{ label: "Heavy Trash / Haul-Out", value: "Custom Quote", quote: true },
			{ label: "Garage or Patio Cleaning", value: "Custom Quote", quote: true },
			{ label: "Wall Cleaning", value: "By Request", quote: true },
			{ label: "Handyman Jobs", value: "Separate Quote", quote: true },
		],
		specialtyNote: [
			"Specialty services are quoted by size & condition. Please remove all personal items before service, and let us know if you'd like to add any of these.",
		],
		notes: [
			{
				title: "General",
				items: [
					"Service covers accessible surfaces only",
					"Property should be empty & all personal items removed before cleaning",
					"We do not move heavy furniture or appliances",
					"Water & electricity must be available at the time of service",
				],
			},
			{
				title: "Condition & Results",
				items: [
					"Heavy buildup (grease, hard water, mold) may require added time, charges, or multiple cleanings",
					"Some stains or buildup may be permanent and not fully removable",
				],
			},
			{
				title: "Guidelines",
				items: [
					"Not responsible for pre-existing damage",
					"Trash removal includes bagged household trash only, no heavy debris or haul-away",
					"Includes a final walkthrough for quality assurance",
					"Wall cleaning performed only on washable paint",
				],
			},
		],
		bookLine: "Ready to book? We'd love to help make your move stress-free!",
	},
];

export const findChecklist = (service: string, checklist: string) =>
	checklistPages.find((p) => p.service === service && p.checklist === checklist);
