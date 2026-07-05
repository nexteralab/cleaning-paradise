import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { postList } from "./posts";

export const metadata: Metadata = {
	title: "Cleaning Tips & Local Stories | Cleaning Paradise",
	description:
		"Expert advice on maintaining your home, seasonal cleaning guides, and stories from the neighborhoods we serve across Greater Seattle.",
};

const categories = [
	{ label: "All", href: "#all", active: true },
	{ label: "Cleaning Tips", href: "#tips", active: false },
	{ label: "Seasonal", href: "#seasonal", active: false },
	{ label: "Local Stories", href: "#local", active: false },
	{ label: "Eco-Friendly", href: "#eco", active: false },
];

export default function BlogPage() {
	return (
		<div className="relative w-full overflow-x-clip">
			{/* HERO: Giant Display Text */}
			<section className="bg-white px-6 pb-20 pt-[120px] md:px-10">
				<div className="mx-auto max-w-[1240px]">
					<div className="mb-[60px]">
						<h1 className="mb-6 font-serif text-[clamp(44px,7vw,88px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-900">
							<span className="relative inline">
								Cleaning Tips
								<svg
									viewBox="0 0 320 18"
									className="absolute bottom-[-6px] left-[-4px] h-[18px] w-[calc(100%+8px)] overflow-visible"
									preserveAspectRatio="none"
									aria-hidden="true"
								>
									<path
										d="M4 13 C 40 7, 100 5, 160 9 C 220 13, 280 8, 316 11"
										stroke="#FF50B5"
										strokeWidth="7"
										fill="none"
										strokeLinecap="round"
										opacity="0.55"
									/>
									<path
										d="M6 16 C 50 11, 110 9, 165 13 C 215 17, 275 12, 314 14"
										stroke="#FF50B5"
										strokeWidth="4.5"
										fill="none"
										strokeLinecap="round"
										opacity="0.35"
									/>
								</svg>
							</span>
							<br />
							&amp; Local Stories
						</h1>
						<p className="max-w-[680px] text-lg leading-[1.75] text-ink-600">
							Expert advice on maintaining your home, seasonal cleaning guides,
							and stories from the neighborhoods we serve across Greater
							Seattle.
						</p>
					</div>

					{/* Category Filter (simple links) */}
					<div className="flex flex-wrap items-center gap-5 border-b border-ink-200 pb-10">
						<span className="text-xs font-semibold uppercase tracking-[.08em] text-[#A0A0AE]">
							Categories:
						</span>
						{categories.map((cat) => (
							<a
								key={cat.label}
								href={cat.href}
								className={`text-sm font-medium transition-opacity duration-200 hover:opacity-70 ${
									cat.active ? "text-pink-500" : "text-[#808098]"
								}`}
							>
								{cat.label}
							</a>
						))}
					</div>
				</div>
			</section>

			{/* BLOG GRID: 3 columns */}
			<section className="px-6 py-20 md:px-10">
				<div className="mx-auto max-w-[1240px]">
					<div className="mb-[60px] grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
						{postList.map((post) => {
							const Icon = post.categoryIcon;
							const accentText =
								post.accent === "pink" ? "text-pink-500" : "text-blue-600";
							return (
								<Link
									key={post.slug}
									href={`/blog/${post.slug}`}
									className="block cursor-pointer text-inherit no-underline transition-all duration-300 ease-(--ease-out) hover:-translate-y-1.5"
								>
									<div className="relative mb-6 h-[360px] w-full overflow-hidden rounded-[20px] bg-[#f0f0f5]">
										<img
											src={post.image}
											alt={post.title}
											className="block h-full w-full object-cover"
										/>
										<div
											className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.06em] ${accentText}`}
										>
											<Icon size={12} />
											{post.category}
										</div>
									</div>
									<div className="flex flex-col">
										<div className="mb-2 text-xs font-semibold uppercase tracking-[.06em] text-[#A0A0AE]">
											{post.kicker}
										</div>
										<h3 className="mb-3 font-serif text-[28px] font-normal leading-[1.3] tracking-[-0.01em] text-ink-900">
											{post.title}
										</h3>
										<p className="mb-[18px] text-[15px] leading-[1.65] text-ink-600">
											{post.excerpt}
										</p>
										<div className="flex items-center gap-2 text-[13px] text-[#808098]">
											<Calendar size={14} className={accentText} />
											{post.date}
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</section>

			{/* Newsletter CTA */}
			<section className="bg-pink-50 px-6 py-20 md:px-10">
				<div className="mx-auto max-w-[800px] text-center">
					<h2 className="mb-4 font-serif text-[40px] leading-[1.2] tracking-[-0.01em] text-ink-900">
						Stay Updated
					</h2>
					<p className="mb-7 text-base leading-[1.7] text-ink-600">
						Get cleaning tips, seasonal guides, and local stories delivered to
						your inbox every month.
					</p>
					<div className="flex flex-wrap justify-center gap-2.5">
						<input
							type="email"
							placeholder="Enter your email"
							className="min-w-[200px] max-w-[320px] flex-1 rounded-xl border-[1.5px] border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors duration-200 focus:border-pink-500"
						/>
						<button className="cursor-pointer rounded-xl border-none bg-pink-500 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 ease-(--ease-out) hover:bg-pink-600 hover:shadow-pink">
							Subscribe
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
