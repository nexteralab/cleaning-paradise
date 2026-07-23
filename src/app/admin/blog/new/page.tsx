import PostForm from "../PostForm";

export const metadata = { title: "New post — Admin", robots: { index: false } };

export default function NewPostPage() {
	return <PostForm />;
}
