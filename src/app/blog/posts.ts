import {
	Briefcase,
	Heart,
	Leaf,
	MapPin,
	Tag,
	Truck,
	type LucideIcon,
} from "lucide-react";

export type PostBlock =
	| { type: "heading"; text: string }
	| { type: "paragraph"; text: string }
	| { type: "quote"; text: string; cite: string }
	| { type: "image"; src: string; alt: string }
	| { type: "numberedList"; items: string[] };

export type Post = {
	slug: string;
	title: string;
	kicker: string;
	category: string;
	categoryIcon: LucideIcon;
	accent: "pink" | "blue";
	date: string;
	readTime?: string;
	author: string;
	image: string;
	excerpt: string;
	lead: string;
	tags: string[];
	related?: string[];
	body: PostBlock[];
};

export const posts: Record<string, Post> = {
	"how-to-deep-clean-your-home-this-spring": {
		slug: "how-to-deep-clean-your-home-this-spring",
		title: "How to Deep Clean Your Home This Spring",
		kicker: "Spring Cleaning Guide",
		category: "Cleaning Tips",
		categoryIcon: Tag,
		accent: "pink",
		date: "March 15, 2026",
		readTime: "6 min read",
		author: "Cleaning Paradise Team",
		image: "/img/aw1a0547.jpg",
		excerpt:
			"A complete checklist for refreshing every room of your home as the season changes. From windows to baseboards, we break it down into manageable steps.",
		lead: "Spring is the perfect moment to press reset on your home. After months of closed windows and indoor living, a thorough deep clean removes built-up grime, freshens the air, and gives every room a new lease on life.",
		tags: ["Spring Cleaning", "Deep Clean", "Home Tips", "Greater Seattle"],
		related: [
			"green-cleaning-products-that-actually-work",
			"allergen-free-home-a-complete-guide",
			"why-your-office-needs-professional-cleaning",
		],
		body: [
			{ type: "heading", text: "Start with a plan — room by room" },
			{
				type: "paragraph",
				text: "Jumping in without a structure is the fastest way to feel overwhelmed and leave things half-done. Break your home into zones: kitchen, bathrooms, bedrooms, living areas, and overlooked spaces (garage, laundry room, entryway). Tackle one zone per day and you'll finish the whole house in a week without exhausting yourself.",
			},
			{
				type: "paragraph",
				text: "Write the list down. Checking off tasks gives you real momentum and keeps you from skipping the zones that feel less urgent (baseboards, we're looking at you).",
			},
			{
				type: "quote",
				text: '"A clean home isn\'t just about appearances — it\'s about the feeling you get walking in through the door."',
				cite: "— Cleaning Paradise Team",
			},
			{ type: "image", src: "/img/aw1a0591.jpg", alt: "Team cleaning bathroom" },
			{ type: "heading", text: "The kitchen: where grease hides" },
			{
				type: "paragraph",
				text: "The kitchen accumulates grease in places you rarely notice until you're doing a proper deep clean. Here's what most people miss:",
			},
			{
				type: "numberedList",
				items: [
					"The range hood filter — remove it, soak in hot soapy water for 15 minutes, scrub, rinse.",
					"Behind and under appliances — pull out the fridge and stove to wipe down walls, coils, and floors.",
					"Cabinet doors and handles — use a degreaser, not just an all-purpose cleaner.",
					"Dishwasher interior — run an empty cycle with a cup of white vinegar on the top rack.",
				],
			},
			{ type: "heading", text: "Bathrooms: beyond the obvious" },
			{
				type: "paragraph",
				text: "Most people regularly clean the toilet bowl, sink, and mirror — but spring cleaning means going further. Scrub grout with a stiff brush and a paste of baking soda and water. Clean showerhead buildup by tying a bag of white vinegar around it overnight. Replace the shower liner if it has visible mold.",
			},
			{
				type: "image",
				src: "/img/aw1a0562.jpg",
				alt: "Professional shower cleaning",
			},
			{
				type: "paragraph",
				text: "Don't forget exhaust fans — they accumulate dust that gets recirculated into the air you breathe. Use a vacuum brush attachment to clean the grill, then wipe it down.",
			},
			{ type: "heading", text: "When to call in the professionals" },
			{
				type: "paragraph",
				text: "A DIY spring clean handles a lot — but some tasks are better left to trained teams with the right equipment. Carpet deep cleaning, upholstery extraction, high-reach window cleaning, and post-renovation cleanup all benefit from professional-grade tools and solutions that aren't available over the counter.",
			},
			{
				type: "paragraph",
				text: "At Cleaning Paradise, we offer a dedicated Spring Deep Clean package that covers your entire home in a single visit — including all the zones most homeowners skip. We bring everything needed; you just enjoy the result.",
			},
		],
	},
	// placeholder — index card only; no full article content exists in the designs
	"green-cleaning-products-that-actually-work": {
		slug: "green-cleaning-products-that-actually-work",
		title: "Green Cleaning Products That Actually Work",
		kicker: "Sustainable Living",
		category: "Eco-Friendly",
		categoryIcon: Leaf,
		accent: "blue",
		date: "March 8, 2026",
		author: "Cleaning Paradise Team",
		image: "/img/aw1a0550.jpg",
		excerpt:
			"Discover non-toxic, biodegradable alternatives to harsh chemicals. Learn what works, what doesn't, and why your home and family deserve better.",
		lead: "Discover non-toxic, biodegradable alternatives to harsh chemicals. Learn what works, what doesn't, and why your home and family deserve better.",
		tags: [],
		body: [],
	},
	// placeholder — index card only; no full article content exists in the designs
	"cleaning-seattles-historic-homes": {
		slug: "cleaning-seattles-historic-homes",
		title: "Cleaning Seattle's Historic Homes",
		kicker: "Community Spotlight",
		category: "Local Stories",
		categoryIcon: MapPin,
		accent: "pink",
		date: "February 28, 2026",
		author: "Cleaning Paradise Team",
		image: "/img/aw1a0562.jpg",
		excerpt:
			"Special challenges and care tips for older homes in Ballard, Capitol Hill, and Queen Anne. How to preserve charm while keeping spaces spotless.",
		lead: "Special challenges and care tips for older homes in Ballard, Capitol Hill, and Queen Anne. How to preserve charm while keeping spaces spotless.",
		tags: [],
		body: [],
	},
	// placeholder — index card only; no full article content exists in the designs
	"move-in-cleaning-checklist-for-new-homes": {
		slug: "move-in-cleaning-checklist-for-new-homes",
		title: "Move-In Cleaning Checklist for New Homes",
		kicker: "Moving Guide",
		category: "Moving Tips",
		categoryIcon: Truck,
		accent: "blue",
		date: "February 20, 2026",
		author: "Cleaning Paradise Team",
		image: "/img/aw1a0591.jpg",
		excerpt:
			"Before you unpack boxes, make sure your new place is spotless. Our complete move-in checklist ensures you start fresh in a clean space.",
		lead: "Before you unpack boxes, make sure your new place is spotless. Our complete move-in checklist ensures you start fresh in a clean space.",
		tags: [],
		body: [],
	},
	// placeholder — index card only; no full article content exists in the designs
	"allergen-free-home-a-complete-guide": {
		slug: "allergen-free-home-a-complete-guide",
		title: "Allergen-Free Home: A Complete Guide",
		kicker: "Health & Wellness",
		category: "Health & Home",
		categoryIcon: Heart,
		accent: "pink",
		date: "February 12, 2026",
		author: "Cleaning Paradise Team",
		image: "/img/aw1a0619.jpg",
		excerpt:
			"Learn how deep cleaning reduces allergens, dust mites, and pet dander. Create a healthier environment for your family with proven techniques.",
		lead: "Learn how deep cleaning reduces allergens, dust mites, and pet dander. Create a healthier environment for your family with proven techniques.",
		tags: [],
		body: [],
	},
	// placeholder — index card only; no full article content exists in the designs
	"why-your-office-needs-professional-cleaning": {
		slug: "why-your-office-needs-professional-cleaning",
		title: "Why Your Office Needs Professional Cleaning",
		kicker: "Workplace",
		category: "Commercial",
		categoryIcon: Briefcase,
		accent: "blue",
		date: "February 5, 2026",
		author: "Cleaning Paradise Team",
		image: "/img/aw1a0659.jpg",
		excerpt:
			"A clean workspace improves productivity and morale. Discover how commercial cleaning transforms your office environment and impresses clients.",
		lead: "A clean workspace improves productivity and morale. Discover how commercial cleaning transforms your office environment and impresses clients.",
		tags: [],
		body: [],
	},
};

export const postList = Object.values(posts);
