import { getCloudflareContext } from "@opennextjs/cloudflare";
import { supabaseSelect } from "@/lib/supabase";
import type { Post } from "@/lib/blog";
import BlogList from "./BlogList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog — Admin", robots: { index: false } };

export default async function AdminBlogPage() {
	const { env } = await getCloudflareContext({ async: true });
	const posts = await supabaseSelect<Post>(
		env,
		"posts",
		"select=id,title,slug,category,published,published_at,updated_at&order=created_at.desc",
	);
	return <BlogList posts={posts} />;
}
