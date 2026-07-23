import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { marked } from "marked";
import { getPublishedPost, getPublishedPosts, categoryIcon, formatDate } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const { env } = await getCloudflareContext({ async: true });
	const post = await getPublishedPost(env, slug);
	if (!post) return { title: "Post Not Found | Cleaning Paradise Blog" };
	return {
		title: post.meta_title ?? `${post.title} | Cleaning Paradise Blog`,
		description: post.meta_description ?? post.lead,
	};
}

export default async function BlogPostPage({ params }: Params) {
	const { slug } = await params;
	const { env } = await getCloudflareContext({ async: true });
	const post = await getPublishedPost(env, slug);
	if (!post) notFound();

	const CategoryIcon = categoryIcon(post.category);
	const all = await getPublishedPosts(env);
	const related = all.filter((p) => p.slug !== slug).slice(0, 3);

	// ponytail: HTML sin sanitizar — el markdown solo lo escribe el equipo
	// autenticado en /admin. Si algún día hay autores externos, agregar DOMPurify.
	const html = await marked.parse(post.content);

	const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";

	return (
		<div className="relative w-full overflow-x-clip">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{ "@type": "ListItem", position: 1, name: "Home", item: base },
						{ "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
						{ "@type": "ListItem", position: 3, name: post.title },
					],
				}}
			/>
			{/* HERO IMAGE */}
			<section className="px-6 pt-6">
				<div className="relative mx-auto aspect-[16/9] max-h-[520px] w-full max-w-[1080px] overflow-hidden rounded-3xl bg-[#0d1020]">
					<img
						src={post.cover_url ?? "/img/aw1a0547.jpg"}
						alt={post.title}
						className="h-full w-full object-cover opacity-[0.82]"
					/>
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,19,32,0.10)_0%,rgba(19,19,32,0.72)_100%)]" />
					<div className="absolute bottom-0 left-0 right-0 p-[clamp(24px,4vw,52px)]">
						<div className="max-w-[860px]">
							<div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-white backdrop-blur-[6px]">
								<CategoryIcon size={12} />
								{post.category}
							</div>
							<h1 className="mb-4 text-pretty font-heading text-[clamp(28px,4vw,58px)] font-normal leading-[1.15] tracking-[-0.02em] text-white">
								{post.title}
							</h1>
							<div className="flex flex-wrap items-center gap-5">
								<div className="flex items-center gap-2 text-[13px] text-white/[.78]">
									<Calendar size={14} />
									{formatDate(post.published_at)}
								</div>
								{post.read_time_minutes != null && (
									<div className="flex items-center gap-2 text-[13px] text-white/[.78]">
										<Clock size={14} />
										{post.read_time_minutes} min read
									</div>
								)}
								<div className="flex items-center gap-2 text-[13px] text-white/[.78]">
									<User size={14} />
									{post.author}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ARTICLE BODY */}
			<section className="px-6 py-[clamp(48px,6vw,80px)]">
				<div className="mx-auto max-w-[780px]">
					{/* Back link */}
					<Link
						href="/blog"
						className="mb-10 inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-[#808098] no-underline transition-colors duration-150 hover:text-pink-500"
					>
						<ArrowLeft size={15} />
						Back to Blog
					</Link>

					{/* Lead */}
					<p className="mb-9 text-[clamp(17px,1.6vw,20px)] font-normal leading-[1.8] text-[#3A3A52]">
						{post.lead}
					</p>

					{/* Article body (markdown) */}
					<div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />

					{/* CTA card */}
					<div className="mb-[60px] mt-4 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-[linear-gradient(135deg,#FF50B5_0%,#E0389C_100%)] p-[clamp(28px,4vw,44px)]">
						<div>
							<p className="mb-2 text-[13px] font-bold uppercase tracking-[.1em] text-white/75">
								Ready for a fresh start?
							</p>
							<h3 className="font-heading text-[clamp(22px,2.4vw,30px)] leading-[1.25] text-white">
								Book a Deep Clean
							</h3>
							<p className="mt-2 text-sm leading-[1.6] text-white/[.82]">
								Same-week availability across Greater Seattle.
							</p>
						</div>
						<Link
							href="/contact"
							className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-[26px] py-3.5 text-sm font-bold text-pink-500 no-underline transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
						>
							Get a free quote <ArrowRight size={15} />
						</Link>
					</div>

					{/* Tags */}
					{post.tags.length > 0 && (
						<div className="mb-[52px] flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-[#F4F4F8] px-3.5 py-1.5 text-xs font-semibold text-[#808098]"
								>
									{tag}
								</span>
							))}
						</div>
					)}

					{/* Divider */}
					<div className="mb-[52px] border-t border-ink-200" />

					{/* More articles */}
					<h3 className="mb-6 text-lg font-semibold tracking-[-0.01em] text-ink-900">
						More from the blog
					</h3>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
						{related.map((rel) => (
							<Link
								key={rel.slug}
								href={`/blog/${rel.slug}`}
								className="flex flex-col gap-3 no-underline transition-transform duration-[250ms] ease-(--ease-out) hover:-translate-y-1"
							>
								<div className="h-[180px] w-full overflow-hidden rounded-2xl bg-[#f0f0f5]">
									<img
										src={rel.cover_url ?? "/img/aw1a0547.jpg"}
										alt={rel.title}
										className="block h-full w-full object-cover"
									/>
								</div>
								<div>
									<div
										className={`mb-1.5 text-[11px] font-bold uppercase tracking-[.06em] ${
											rel.accent === "pink" ? "text-pink-500" : "text-blue-600"
										}`}
									>
										{rel.category}
									</div>
									<p className="font-heading text-lg leading-[1.35] text-ink-900">
										{rel.title}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
