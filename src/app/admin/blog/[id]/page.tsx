import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { supabaseSelect } from "@/lib/supabase";
import type { Post } from "@/lib/blog";
import PostForm from "../PostForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit post — Admin", robots: { index: false } };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const { env } = await getCloudflareContext({ async: true });
	const rows = await supabaseSelect<Post>(
		env,
		"posts",
		`select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
	);
	const post = rows[0];
	if (!post) notFound();
	return <PostForm post={post} />;
}
