import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import PostForm from "../PostForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "New post — Admin", robots: { index: false } };

export default async function NewPostPage() {
	if (!(await getSessionUserId())) redirect("/admin/login");
	return <PostForm />;
}
