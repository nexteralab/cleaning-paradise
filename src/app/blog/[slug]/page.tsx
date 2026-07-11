import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { posts, type PostBlock } from "../posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const post = posts[slug];
	if (!post) return { title: "Post Not Found | Cleaning Paradise Blog" };
	return {
		title: `${post.title} | Cleaning Paradise Blog`,
		description: post.lead,
	};
}

function Block({ block, index }: { block: PostBlock; index: number }) {
	switch (block.type) {
		case "heading":
			return (
				<h2
					className={`mb-4 font-serif text-[clamp(24px,2.6vw,34px)] font-normal leading-[1.25] tracking-[-0.015em] text-ink-900 ${
						index > 0 ? "mt-3" : ""
					}`}
				>
					{block.text}
				</h2>
			);
		case "paragraph":
			return (
				<p className="mb-6 text-base leading-[1.85] text-ink-600">
					{block.text}
				</p>
			);
		case "quote":
			return (
				<blockquote className="mb-9 mt-3 rounded-r-2xl border-l-4 border-pink-500 bg-pink-50 px-7 py-5">
					<p className="font-serif text-[22px] italic leading-[1.5] text-ink-800">
						{block.text}
					</p>
					<cite className="mt-2.5 block text-[13px] not-italic text-[#A0A0AE]">
						{block.cite}
					</cite>
				</blockquote>
			);
		case "image":
			return (
				<div className="mb-9 h-[clamp(240px,36vw,440px)] overflow-hidden rounded-[20px]">
					<img
						src={block.src}
						alt={block.alt}
						className="block h-full w-full object-cover"
					/>
				</div>
			);
		case "numberedList":
			return (
				<ul className="mb-8 flex flex-col gap-3 pl-1">
					{block.items.map((item, i) => (
						<li
							key={i}
							className="flex items-start gap-3 text-[15.5px] leading-[1.7] text-ink-600"
						>
							<span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
								{i + 1}
							</span>
							{item}
						</li>
					))}
				</ul>
			);
	}
}

export default async function BlogPostPage({ params }: Params) {
	const { slug } = await params;
	const post = posts[slug];
	if (!post) notFound();

	const CategoryIcon = post.categoryIcon;
	const relatedSlugs =
		post.related ?? Object.keys(posts).filter((s) => s !== slug).slice(0, 3);
	const related = relatedSlugs
		.map((s) => posts[s])
		.filter((p) => p !== undefined);

	return (
		<div className="relative w-full overflow-x-clip">
			{/* HERO IMAGE */}
			<section className="px-6 pt-6">
				<div className="relative mx-auto aspect-[16/9] max-h-[520px] w-full max-w-[1080px] overflow-hidden rounded-3xl bg-[#0d1020]">
					<img
						src={post.image}
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
							<h1 className="mb-4 text-pretty font-serif text-[clamp(28px,4vw,58px)] font-normal leading-[1.15] tracking-[-0.02em] text-white">
								{post.title}
							</h1>
							<div className="flex flex-wrap items-center gap-5">
								<div className="flex items-center gap-2 text-[13px] text-white/[.78]">
									<Calendar size={14} />
									{post.date}
								</div>
								{post.readTime && (
									<div className="flex items-center gap-2 text-[13px] text-white/[.78]">
										<Clock size={14} />
										{post.readTime}
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

					{/* Article blocks */}
					{post.body.map((block, i) => (
						<Block key={i} block={block} index={i} />
					))}

					{/* CTA card */}
					<div className="mb-[60px] mt-4 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-[linear-gradient(135deg,#FF50B5_0%,#E0389C_100%)] p-[clamp(28px,4vw,44px)]">
						<div>
							<p className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-white/75">
								Ready for a fresh start?
							</p>
							<h3 className="font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.25] text-white">
								Book a Spring Deep Clean
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
										src={rel.image}
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
									<p className="font-serif text-lg leading-[1.35] text-ink-900">
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
