import type { MetadataRoute } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { serviceSlugs } from "./cleaning-services-in-wa/[slug]/services-data";
import { locationSlugs } from "./locations/locations-data";
import { getPublishedPosts } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();
	const { env } = await getCloudflareContext({ async: true });
	const posts = await getPublishedPosts(env);

	const staticPaths = [
		"",
		"/about-us",
		"/blog",
		"/cleaning-services-in-wa",
		"/contact",
		"/locations",
		"/privacy",
		"/terms",
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
		...posts.map((p) => ({
			url: `${base}/blog/${p.slug}`,
			lastModified: p.updated_at ? new Date(p.updated_at) : now,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})),
	];
}
