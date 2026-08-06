"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import type { Post } from "@/lib/blog";
import ConfirmDelete from "../ConfirmDelete";

export default function BlogList({ posts }: { posts: Post[] }) {
	const router = useRouter();
	const [target, setTarget] = useState<Post | null>(null);

	async function deletePost() {
		if (!target) return;
		await fetch(`/api/admin/posts?id=${encodeURIComponent(target.id)}`, { method: "DELETE" });
		setTarget(null);
		router.refresh();
	}

	return (
		<div className="px-4 py-8 md:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold text-ink-900">Blog</h1>
						<p className="text-sm text-ink-600">{posts.length} posts</p>
					</div>
					<Link
						href="/admin/blog/new"
						className="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-[#2A2A3C]"
					>
						<Plus size={15} /> New post
					</Link>
				</div>

				<section className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
					{posts.length === 0 ? (
						<p className="px-5 py-10 text-center text-sm text-ink-500">
							No posts yet — corre `npm run db:migrate` o crea el primero.
						</p>
					) : (
						<div className="divide-y divide-ink-100">
							{posts.map((p) => (
								<div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
									<div className="min-w-0">
										<Link
											href={`/admin/blog/${p.id}`}
											className="font-semibold text-ink-900 no-underline hover:text-pink-600"
										>
											{p.title}
										</Link>
										<div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-ink-500">
											<span
												className={`rounded-full px-2 py-0.5 font-semibold ${
													p.published ? "bg-green-50 text-green-700" : "bg-ink-100 text-ink-500"
												}`}
											>
												{p.published ? "published" : "draft"}
											</span>
											<span>{p.category}</span>
											{p.published_at && <span>{new Date(p.published_at).toLocaleDateString()}</span>}
										</div>
									</div>
									<div className="flex items-center gap-2">
										{p.published && (
											<a
												href={`/blog/${p.slug}`}
												target="_blank"
												rel="noopener"
												aria-label="View post"
												className="rounded-lg border border-ink-200 p-2 text-ink-500 hover:bg-ink-100"
											>
												<ExternalLink size={15} />
											</a>
										)}
										<button
											onClick={() => setTarget(p)}
											aria-label="Delete post"
											className="rounded-lg border border-ink-200 p-2 text-ink-400 hover:bg-pink-50 hover:text-pink-600"
										>
											<Trash2 size={15} />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</section>
			</div>

			<ConfirmDelete
				open={target !== null}
				label="post"
				description={
					target ? `Se va a eliminar "${target.title}". Esta acción no se puede deshacer.` : ""
				}
				onCancel={() => setTarget(null)}
				onConfirm={deletePost}
			/>
		</div>
	);
}
