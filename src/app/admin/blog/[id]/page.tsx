import { notFound, redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";
import { getPost } from "@/lib/blog";
import PostForm from "../PostForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit post — Admin", robots: { index: false } };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
	if (!(await getSessionUserId())) redirect("/admin/login");
	const { id } = await params;
	const { env } = await getCloudflareContext({ async: true });
	const post = await getPost(env, id);
	if (!post) notFound();
	return <PostForm post={post} />;
}
