import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getPublishedPosts } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";

// Igual que sitemap.ts: los posts viven en D1 y en CI no hay binding.
export const dynamic = "force-dynamic";

// ponytail: el árbol de páginas se escribe a mano. Cambia unas pocas veces al año;
// generarlo desde services-data/locations-data costaría más código que mantenerlo.
// Solo el blog se genera, que es lo único que crece solo desde el admin.
const STATIC = `# Cleaning Paradise

> Licensed, insured and bonded residential and commercial cleaning company based in Shoreline, WA, serving Seattle and the greater King & Snohomish County area. Services range from recurring maintenance cleans to deep cleaning, move-in/move-out, carpet cleaning, commercial spaces and packing/unpacking.

## Key Facts

- **Legal name**: Cleaning Paradise LLC
- **Based in**: Shoreline, WA (United States)
- **Service area**: Seattle, Bellevue, Kirkland, Mercer Island, Shoreline, Edmonds, Bothell, Lynnwood and Mukilteo — King & Snohomish County, WA
- **Phone**: +1 (425) 610-0241
- **Email**: cleaning.paradise.llc@gmail.com
- **Hours**: Monday–Saturday, 7:00–19:00 (Pacific Time)
- **Credentials**: Licensed, insured and bonded in the state of Washington; every cleaner is background-checked and trained before their first visit
- **Typical pricing**: most standard cleans start at $55/hr per person; every job is quoted before work begins
- **Frequencies**: one-time, weekly, biweekly (most popular) and monthly, with discounts for recurring bookings
- **Products**: EPA-approved, pet-safe and eco-friendly products suited to the Pacific Northwest climate

## Main Pages

- [House Cleaning Services in Seattle, WA](${base}/): Spotless homes and reliable maids offering a superior housekeeping experience in Seattle, Lynnwood, Bellevue and surrounding communities, with comprehensive services and a clear process.
- [Cleaning Services in WA](${base}/cleaning-services-in-wa): Overview of every cleaning service offered in Washington, from weekly home maintenance to deep cleans and commercial spaces.
- [Service Areas in King & Snohomish County](${base}/locations): Local Cleaning Paradise teams across nine cities in King & Snohomish County.
- [About Us](${base}/about-us): Cleaning Paradise's mission and its growth from a single mop to a trusted Seattle cleaning crew.
- [Contact](${base}/contact): Request a free cleaning quote for Seattle, Lynnwood, Bellevue, Kirkland and the greater Seattle area.

## Services

- [Standard Cleaning](${base}/cleaning-services-in-wa/standard-cleaning): Recurring home maintenance cleaning — vacuuming, mopping, surfaces, kitchens and bathrooms — for weekly, biweekly or monthly homes in the Seattle area.
- [Deep Cleaning & Sanitization](${base}/cleaning-services-in-wa/deep-cleaning): Thorough deep cleaning that reaches what everyday cleaning misses: inside appliances, behind furniture, grout lines, baseboards and full bathroom disinfection.
- [Move In / Out Cleaning](${base}/cleaning-services-in-wa/move-in-out): End-of-lease and move-in cleaning for homes and apartments across Seattle, aimed at recovering the full deposit or starting in a genuinely clean space.
- [Commercial Cleaning](${base}/cleaning-services-in-wa/commercial-cleaning): Office and commercial cleaning with flexible schedules, insured crews and after-hours availability for Seattle businesses.
- [Carpet Cleaning](${base}/cleaning-services-in-wa/carpet-cleaning): Carpet and rug cleaning that lifts stains, odors and allergens.
- [Packing & Unpacking](${base}/cleaning-services-in-wa/packing-unpacking): Trained local crews for packing, labeling and unpacking so you settle in faster.

## Cleaning Checklists

- [All Cleaning Checklists](${base}/cleaning-services-in-wa/checklists): Compare standard, deep, move-in and move-out checklists, plus add-on pricing and limits, before requesting a quote.
- [Standard Cleaning Checklist](${base}/cleaning-services-in-wa/standard-cleaning/standard-checklist): Room-by-room scope of a routine maintenance clean — kitchens, common areas and bathrooms.
- [Deep Cleaning Checklist](${base}/cleaning-services-in-wa/deep-cleaning/deep-checklist): Full room-by-room deep cleaning scope for kitchens, living rooms, bathrooms and bedrooms.
- [Move-In Cleaning Checklist](${base}/cleaning-services-in-wa/move-in-out/move-in-checklist): What gets cleaned in an empty home before the furniture arrives.
- [Move-Out Cleaning Checklist](${base}/cleaning-services-in-wa/move-in-out/move-out-checklist): Full end-of-lease scope, including what is included and what costs extra before a landlord inspection.

## Service Areas

- [Seattle](${base}/locations/seattle): House cleaning across Greater Seattle with local maids who know the neighborhoods.
- [Bellevue](${base}/locations/bellevue): Maid service and house cleaning in Bellevue, WA, with transparent pricing.
- [Kirkland](${base}/locations/kirkland): Maid service and deep cleaning in Kirkland, WA — Moss Bay, Juanita and Houghton.
- [Mercer Island](${base}/locations/mercer-island): Home and deep cleaning for spacious island homes, using EPA-approved products and vetted housekeepers.
- [Shoreline](${base}/locations/shoreline): Same-week cleaning in Shoreline, WA — Richmond Beach, Echo Lake and Ridgecrest.
- [Edmonds](${base}/locations/edmonds): Maid service for coastal homes in Edmonds, WA, weekly, biweekly or one-time.
- [Bothell](${base}/locations/bothell): House cleaning in Bothell, WA, with weekday and weekend slots across Canyon Park, North Creek and Downtown.
- [Lynnwood](${base}/locations/lynnwood): Local team serving Alderwood, Martha Lake and Mill Creek with fast scheduling.
- [Mukilteo](${base}/locations/mukilteo): Cleaning and maid service for waterfront and bluff homes, scheduled around the ferry.

## Blog`;

const LEGAL = `
## Legal

- [Terms of Service](${base}/terms): Terms governing quotes, bookings, scheduling, cancellations and the satisfaction guarantee.
- [Privacy Policy](${base}/privacy): How Cleaning Paradise LLC collects, uses, retains and protects personal information submitted through the site.

## Optional

- [Sitemap](${base}/sitemap.xml): XML sitemap listing every indexable page.
`;

export async function GET() {
	const { env } = await getCloudflareContext({ async: true });
	const posts = await getPublishedPosts(env);

	const blog =
		`\n\n- [Cleaning Tips & Local Stories](${base}/blog): Expert advice on home maintenance, seasonal cleaning guides and local stories from Greater Seattle.\n` +
		posts
			.map(
				(p) =>
					`- [${p.title}](${base}/blog/${p.slug}): ${(p.meta_description ?? p.excerpt).replace(/\s+/g, " ").trim()}`,
			)
			.join("\n");

	return new Response(STATIC + blog + "\n" + LEGAL, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
