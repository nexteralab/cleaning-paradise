// Blog data layer — posts live in Supabase (tabla `posts`, ver docs/supabase-setup.sql).
// Los iconos de categoría no son serializables, así que viven aquí como mapa.
import {
	Briefcase,
	Heart,
	Leaf,
	MapPin,
	Tag,
	Truck,
	type LucideIcon,
} from "lucide-react";
import { supabaseSelect } from "./supabase";

export type Post = {
	id: string;
	title: string;
	slug: string;
	kicker: string;
	category: string;
	accent: "pink" | "blue";
	excerpt: string;
	lead: string;
	content: string; // markdown
	cover_url: string | null;
	author: string;
	tags: string[];
	meta_title: string | null;
	meta_description: string | null;
	read_time_minutes: number | null;
	published: boolean;
	published_at: string | null;
	created_at: string;
	updated_at: string;
};

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
	"Cleaning Tips": Tag,
	"Eco-Friendly": Leaf,
	"Local Stories": MapPin,
	"Moving Tips": Truck,
	"Health & Home": Heart,
	Commercial: Briefcase,
};

export const CATEGORIES = Object.keys(CATEGORY_ICONS);

export function categoryIcon(category: string): LucideIcon {
	return CATEGORY_ICONS[category] ?? Tag;
}

export function formatDate(iso: string | null): string {
	if (!iso) return "";
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function getPublishedPosts(env: CloudflareEnv): Promise<Post[]> {
	return supabaseSelect<Post>(
		env,
		"posts",
		"select=*&published=eq.true&order=published_at.desc",
	);
}

export async function getPublishedPost(env: CloudflareEnv, slug: string): Promise<Post | null> {
	const rows = await supabaseSelect<Post>(
		env,
		"posts",
		`select=*&published=eq.true&slug=eq.${encodeURIComponent(slug)}&limit=1`,
	);
	return rows[0] ?? null;
}
