import type { MetadataRoute } from "next";
import { serviceSlugs } from "./cleaning-services-in-wa/[slug]/services-data";
import { locationSlugs } from "./locations/locations-data";
import { posts } from "./blog/posts";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticPaths = [
		"",
		"/about-us",
		"/blog",
		"/cleaning-services-in-wa",
		"/contact",
		"/locations",
		"/service-areas",
	];

	return [
		...staticPaths.map((p) => ({
			url: `${base}${p}`,
			lastModified: now,
			changeFrequency: "weekly" as const,
			priority: p === "" ? 1 : 0.8,
		})),
		...serviceSlugs.map((s) => ({
			url: `${base}/cleaning-services-in-wa/${s}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		...locationSlugs.map((s) => ({
			url: `${base}/locations/${s}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		...Object.keys(posts).map((s) => ({
			url: `${base}/blog/${s}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})),
	];
}
