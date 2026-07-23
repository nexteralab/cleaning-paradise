"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import { CATEGORIES, type Post } from "@/lib/blog";
import { uploadBlogImage } from "@/lib/supabase/storage";
import MarkdownEditor from "./MarkdownEditor";

const inputClass =
	"w-full rounded-xl border-[1.5px] border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-pink-500";
const labelClass = "mb-1.5 block text-xs font-semibold text-ink-600";

function slugify(s: string): string {
	return s
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export default function PostForm({ post }: { post?: Post }) {
	const router = useRouter();
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState("");

	const [title, setTitle] = useState(post?.title ?? "");
	const [slug, setSlug] = useState(post?.slug ?? "");
	const [slugTouched, setSlugTouched] = useState(!!post);
	const [kicker, setKicker] = useState(post?.kicker ?? "");
	const [category, setCategory] = useState(post?.category ?? CATEGORIES[0]);
	const [accent, setAccent] = useState<"pink" | "blue">(post?.accent ?? "pink");
	const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
	const [lead, setLead] = useState(post?.lead ?? "");
	const [content, setContent] = useState(post?.content ?? "");
	const [coverUrl, setCoverUrl] = useState(post?.cover_url ?? "");
	const [author, setAuthor] = useState(post?.author ?? "Cleaning Paradise Team");
	const [tags, setTags] = useState((post?.tags ?? []).join(", "));
	const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
	const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
	const [published, setPublished] = useState(post?.published ?? false);

	async function uploadCover(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		e.target.value = "";
		try {
			setCoverUrl(await uploadBlogImage(file));
		} catch {
			setError("Image upload failed — ¿corriste la migración 0004 (bucket blog)?");
		} finally {
			setUploading(false);
		}
	}

	async function save() {
		setError("");
		if (!title.trim() || !slug.trim()) {
			setError("Title and slug are required");
			return;
		}
		setSaving(true);
		const payload = {
			...(post ? { id: post.id } : {}),
			title: title.trim(),
			slug: slug.trim(),
			kicker,
			category,
			accent,
			excerpt,
			lead,
			content,
			cover_url: coverUrl || null,
			author,
			tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
			meta_title: metaTitle || null,
			meta_description: metaDescription || null,
			published,
			// primera publicación fija la fecha; despublicar no la borra
			published_at: post?.published_at ?? (published ? new Date().toISOString() : null),
		};
		const res = await fetch("/api/admin/posts", {
			method: post ? "PATCH" : "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		setSaving(false);
		if (!res.ok) {
			const { error } = (await res.json().catch(() => ({ error: "save failed" }))) as { error: string };
			setError(error);
			return;
		}
		router.push("/admin/blog");
		router.refresh();
	}

	return (
		<div className="px-4 py-8 md:px-8">
			<div className="mx-auto max-w-3xl">
				<Link
					href="/admin/blog"
					className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 no-underline hover:text-ink-900"
				>
					<ArrowLeft size={15} /> Back to posts
				</Link>
				<h1 className="mb-8 text-2xl font-semibold text-ink-900">
					{post ? "Edit post" : "New post"}
				</h1>

				<div className="flex flex-col gap-5 rounded-2xl border border-ink-200 bg-white p-6">
					<div>
						<label className={labelClass}>Title *</label>
						<input
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
								if (!slugTouched) setSlug(slugify(e.target.value));
							}}
							className={inputClass}
						/>
					</div>
					<div>
						<label className={labelClass}>Slug * (URL: /blog/…)</label>
						<input
							value={slug}
							onChange={(e) => {
								setSlugTouched(true);
								setSlug(slugify(e.target.value));
							}}
							className={inputClass}
						/>
					</div>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
						<div>
							<label className={labelClass}>Kicker</label>
							<input value={kicker} onChange={(e) => setKicker(e.target.value)} className={inputClass} placeholder="Spring Cleaning Guide" />
						</div>
						<div>
							<label className={labelClass}>Category</label>
							<select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} cursor-pointer`}>
								{CATEGORIES.map((c) => (
									<option key={c}>{c}</option>
								))}
							</select>
						</div>
						<div>
							<label className={labelClass}>Accent</label>
							<select value={accent} onChange={(e) => setAccent(e.target.value as "pink" | "blue")} className={`${inputClass} cursor-pointer`}>
								<option value="pink">pink</option>
								<option value="blue">blue</option>
							</select>
						</div>
					</div>
					<div>
						<label className={labelClass}>Excerpt (card del índice)</label>
						<textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className={`${inputClass} resize-y`} />
					</div>
					<div>
						<label className={labelClass}>Lead (párrafo introductorio)</label>
						<textarea value={lead} onChange={(e) => setLead(e.target.value)} rows={3} className={`${inputClass} resize-y`} />
					</div>
					<div>
						<label className={labelClass}>Cover image</label>
						<div className="flex items-center gap-3">
							{coverUrl && (
								<img src={coverUrl} alt="cover" className="h-16 w-24 rounded-lg object-cover" />
							)}
							<label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50">
								<Upload size={15} /> {uploading ? "Uploading…" : "Upload image"}
								<input type="file" accept="image/*" onChange={uploadCover} disabled={uploading} className="hidden" />
							</label>
							<input
								value={coverUrl}
								onChange={(e) => setCoverUrl(e.target.value)}
								placeholder="/img/aw1a0547.jpg o URL"
								className={`${inputClass} flex-1`}
							/>
						</div>
					</div>
					<div>
						<label className={labelClass}>Content</label>
						<MarkdownEditor value={content} onChange={setContent} />
					</div>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						<div>
							<label className={labelClass}>Author</label>
							<input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>Tags (separados por coma)</label>
							<input value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} placeholder="Deep Clean, Home Tips" />
						</div>
					</div>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						<div>
							<label className={labelClass}>Meta title (SEO, opcional)</label>
							<input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>Meta description (SEO, opcional)</label>
							<input value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className={inputClass} />
						</div>
					</div>

					<label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink-800">
						<input
							type="checkbox"
							checked={published}
							onChange={(e) => setPublished(e.target.checked)}
							className="h-4 w-4 accent-pink-500"
						/>
						Published (visible en /blog)
					</label>

					{error && <p className="text-sm text-pink-600">{error}</p>}

					<div className="flex items-center gap-3 border-t border-ink-100 pt-5">
						<button
							onClick={save}
							disabled={saving}
							className="rounded-xl bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2A2A3C] disabled:opacity-60"
						>
							{saving ? "Saving…" : post ? "Save changes" : "Create post"}
						</button>
						<Link href="/admin/blog" className="text-sm font-medium text-ink-500 no-underline hover:text-ink-900">
							Cancel
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
