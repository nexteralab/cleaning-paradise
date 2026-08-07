// Blog data layer — posts viven en D1 (tabla `posts`, ver migrations/0001_posts.sql).
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

// --- D1 -------------------------------------------------------------------
// SQLite no tiene arrays ni boolean: tags es JSON en TEXT, published es 0/1.

type Row = Omit<Post, "tags" | "published"> & { tags: string; published: number };

function toPost(row: Row): Post {
	return {
		...row,
		tags: JSON.parse(row.tags || "[]") as string[],
		published: row.published === 1,
	};
}

export async function getPublishedPosts(env: CloudflareEnv, limit?: number): Promise<Post[]> {
	const { results } = await env.DB.prepare(
		`SELECT * FROM posts WHERE published = 1 ORDER BY published_at DESC${limit ? " LIMIT ?" : ""}`,
	)
		.bind(...(limit ? [limit] : []))
		.all<Row>();
	return results.map(toPost);
}

export async function getPublishedPost(env: CloudflareEnv, slug: string): Promise<Post | null> {
	const row = await env.DB.prepare("SELECT * FROM posts WHERE published = 1 AND slug = ?")
		.bind(slug)
		.first<Row>();
	return row ? toPost(row) : null;
}

export async function getAllPosts(env: CloudflareEnv): Promise<Post[]> {
	const { results } = await env.DB.prepare(
		"SELECT * FROM posts ORDER BY created_at DESC",
	).all<Row>();
	return results.map(toPost);
}

export async function getPost(env: CloudflareEnv, id: string): Promise<Post | null> {
	const row = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first<Row>();
	return row ? toPost(row) : null;
}
