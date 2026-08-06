import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSessionUserId } from "@/lib/session";
import { getAllPosts } from "@/lib/blog";
import BlogList from "./BlogList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog — Admin", robots: { index: false } };

export default async function AdminBlogPage() {
	if (!(await getSessionUserId())) redirect("/admin/login");
	const { env } = await getCloudflareContext({ async: true });
	return <BlogList posts={await getAllPosts(env)} />;
}
