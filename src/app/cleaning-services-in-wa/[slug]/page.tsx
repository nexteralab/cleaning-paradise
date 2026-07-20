import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Box,
	Brush,
	Building2,
	CalendarCheck,
	CircleCheck,
	Clock,
	FileX,
	Heart,
	House,
	Leaf,
	Phone,
	Tag,
	ShieldCheck,
	Sparkles,
	Star,
	Truck,
	UserCheck,
	type LucideIcon,
} from "lucide-react";
import { FaqAccordion, QuoteForm } from "./client-sections";
import { services, serviceSlugs, type IconName, type ServiceContent } from "./services-data";
import { TestimonialsSection } from "@/app/page";

const icons: Record<IconName, LucideIcon> = {
	house: House,
	sparkles: Sparkles,
	"building-2": Building2,
	truck: Truck,
	brush: Brush,
	"calendar-check": CalendarCheck,
	heart: Heart,
	"file-x": FileX,
	clock: Clock,
	"circle-check": CircleCheck,
	box: Box,
	tag: Tag,
};

export function generateStaticParams() {
	return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const service = services[slug];
	if (!service) return {};
	return { title: service.metaTitle, description: service.metaDescription };
}

const galleryImages: { src: string; alt: string; wide: boolean }[] = [
	{ src: "/img/aw1a0562-mr2ei5id.jpg", alt: "Cleaning result", wide: true },
	{ src: "/img/deep-cleaning-mr2ehsjj.jpg", alt: "Deep cleaning", wide: false },
	{ src: "/img/aw1a0630-mr2eiji3.jpg", alt: "Cleaning team", wide: true },
	{ src: "/img/svc-move.jpg", alt: "Move cleaning", wide: false },
	{ src: "/img/svc-deep.jpg", alt: "Service", wide: true },
	{ src: "/img/svc-carpet.jpg", alt: "Carpet cleaning", wide: false },
];

const coverageCities = [
	"Seattle",
	"Bellevue",
	"Redmond",
	"Kirkland",
	"Renton",
	"Tacoma",
	"Everett",
	"Shoreline",
	"Bothell",
	"Lynnwood",
	"Mercer Island",
	"Issaquah",
];

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			className={`text-[13px] font-bold tracking-[.1em] text-pink-500 uppercase ${className}`}
		>
			{children}
		</div>
	);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const service: ServiceContent | undefined = services[slug];
	if (!service) notFound();

	return (
		<div className="relative w-full overflow-x-clip">
			{/* ═══ HERO ═══ */}
			<section className="bg-white px-6 pt-[clamp(120px,11vw,160px)] pb-[clamp(60px,7vw,88px)]">
				<div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-2">
					{/* LEFT: text */}
					<div>
						<Link
							href="/cleaning-services-in-wa#services"
							className="mb-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#808098] no-underline transition-colors hover:text-pink-500"
						>
							<ArrowLeft size={13} />
							All Services
						</Link>
						<h1 className="mb-4 font-heading text-[clamp(34px,3.8vw,58px)] leading-[1.1] font-normal tracking-[-0.02em] text-ink-900 text-pretty">
							{service.heroTitle.map((part, i) => (
								<span key={i}>
									{part.brBefore && <br />}
									{part.italic ? <i>{part.text}</i> : part.text}
								</span>
							))}
						</h1>
						<p className="mb-7 max-w-[500px] text-[clamp(15px,1.3vw,18px)] leading-[1.75] text-ink-600">
							{service.heroSubtitle}
						</p>
						<div className="flex flex-wrap gap-3">
							<a
								href="#quote"
								className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3.5 text-[15px] font-bold text-white no-underline transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,80,181,0.42)]"
							>
								Get a free quote <ArrowRight size={15} />
							</a>
							<a
								href="tel:+14256100241"
								aria-label="Call (425) 610-0241"
								className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink-200 px-7 py-3.5 text-[15px] font-semibold text-ink-900 no-underline transition-all hover:border-pink-500 hover:text-pink-500 max-md:px-4"
							>
								<Phone size={16} className="md:hidden" />
								<span className="max-md:hidden">(425) 610-0241</span>
							</a>
						</div>
					</div>

					{/* RIGHT: static hero image + stats overlay */}
					<div className="relative h-[clamp(400px,52vh,580px)] overflow-hidden rounded-3xl select-none">
						<img
							src={service.heroImage}
							alt={service.heroImageAlt}
							className="absolute inset-0 block h-full w-full object-cover"
						/>
						<div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)] backdrop-blur-md">
							<div className="flex items-center justify-around gap-2">
								<div className="text-center">
									<div className="font-sans text-[22px] leading-none font-bold text-pink-500">100+</div>
									<div className="mt-[3px] text-[11px] font-semibold text-[#808098]">Homes Cleaned</div>
								</div>
								<div className="h-8 w-px bg-ink-200" />
								<div className="text-center">
									<div className="font-sans text-[22px] leading-none font-bold text-pink-500">4+</div>
									<div className="mt-[3px] text-[11px] font-semibold text-[#808098]">Years Experience</div>
								</div>
								<div className="h-8 w-px bg-ink-200" />
								<div className="flex flex-col items-center gap-[3px]">
									<div className="flex items-center gap-[5px]">
										<Star size={14} className="fill-[#FBBC05] text-[#FBBC05]" />
										<span className="font-sans text-[22px] leading-none font-bold text-ink-900">4.9</span>
									</div>
									<span className="text-[11px] tracking-[-1px] text-[#FBBC05]">★★★★★</span>
									<div className="text-[10px] font-semibold text-[#808098]">(51) Google Reviews</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ═══ INTRO TEXT + IMAGE ═══ */}
			<section className="bg-white px-6 py-[clamp(64px,7vw,96px)]">
				<div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-[clamp(40px,6vw,80px)] md:grid-cols-2">
					{/* LEFT: image */}
					<div className="h-[clamp(380px,48vw,560px)] overflow-hidden rounded-[26px] shadow-[0_32px_80px_rgba(30,62,162,0.12)]">
						<img
							src={service.introImage}
							alt={service.introImageAlt}
							className="block h-full w-full object-cover"
						/>
					</div>

					{/* RIGHT: text */}
					<div>
						<Eyebrow className="mb-[18px]">{service.introEyebrow}</Eyebrow>
						{service.introTitle && (
							<h2 className="mb-[22px] font-heading text-[clamp(28px,3.2vw,44px)] leading-[1.15] font-normal tracking-[-0.02em] text-ink-900">
								{service.introTitle}
							</h2>
						)}
						<p className="mb-6 text-[clamp(16px,1.5vw,19px)] leading-[1.82] text-[#3A3A52]">
							{service.introLead}
						</p>
						{service.introParas.map((para, i) => (
							<p
								key={i}
								className={`text-[clamp(15px,1.3vw,17px)] leading-[1.85] text-ink-600 ${i === service.introParas.length - 1 ? "mb-8" : "mb-6"
									}`}
							>
								{para}
							</p>
						))}
						<div className="flex flex-wrap gap-2">
							{service.frequencyChips.map((chip) => (
								<span
									key={chip.label}
									className={`rounded-full border-[1.5px] px-[18px] py-1.5 text-[12.5px] font-semibold ${chip.active
											? "border-[#FFB8E2] bg-pink-50 text-pink-500"
											: "border-ink-200 bg-[#F4F4F8] text-[#808098]"
										}`}
								>
									{chip.label}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ═══ HORIZONTAL SCROLLING GALLERY (full-bleed) ═══ */}
			<section className="bg-ink-50 pb-[clamp(40px,5vw,64px)]">
				<div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_5%,#000_95%,transparent_100%)]">
					<div className="flex w-max animate-[galleryScrollH_35s_linear_infinite] gap-4 px-10">
						{[...galleryImages, ...galleryImages].map((img, i) => (
							<img
								key={i}
								src={img.src}
								alt={img.alt}
								className={`block h-[400px] shrink-0 rounded-[20px] object-cover ${img.wide ? "w-[560px]" : "w-[480px]"
									}`}
							/>
						))}
					</div>
				</div>
			</section>

			{/* ═══ CALLOUT ═══ */}
			<section className="px-6 pt-[clamp(36px,4vw,52px)]">
				<div className="mx-auto max-w-[1360px]">
					<div className="mb-2 flex items-start gap-4 rounded-[18px] border-[1.5px] border-ink-200 bg-[#FAFAFA] px-[26px] py-[22px]">
						<div className="mt-0.5 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-blue-50">
							<Sparkles size={18} className="text-blue-600" />
						</div>
						<div>
							<p className="mb-1 text-sm font-semibold text-ink-900">{service.callout.title}</p>
							<p className="text-sm leading-[1.65] text-ink-600">
								{service.callout.before}
								<Link
									href={service.callout.link.href}
									className="font-semibold text-blue-600 no-underline hover:underline"
								>
									{service.callout.link.label}
								</Link>
								{service.callout.after}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ═══ CUSTOMIZATION + QUOTE FORM ═══ */}
			<section id="quote" className="px-6 py-[clamp(52px,6vw,88px)]">
				<div className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-[clamp(40px,6vw,88px)] lg:grid-cols-[1fr_minmax(300px,440px)]">
					{/* LEFT */}
					<div>
						<Eyebrow className="mb-3.5">{service.customEyebrow}</Eyebrow>
						<h2 className="mb-[22px] font-heading text-[clamp(28px,3.2vw,48px)] leading-[1.15] font-normal tracking-[-0.02em] text-ink-900">
							{service.customTitle}
						</h2>
						{service.customParas.map((para, i) => (
							<p
								key={i}
								className={`text-base leading-[1.85] text-ink-600 ${i === service.customParas.length - 1 ? "mb-9" : "mb-5"
									}`}
							>
								{para}
							</p>
						))}
						<div className="flex flex-col gap-[18px]">
							{service.features.map((feature) => {
								const FeatureIcon = icons[feature.icon];
								return (
									<div key={feature.title} className="flex items-start gap-3.5">
										<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50">
											<FeatureIcon size={16} className="text-pink-500" />
										</div>
										<div>
											<p className="mb-[3px] text-sm font-semibold text-ink-800">
												{feature.title}
											</p>
											<p className="text-[13.5px] leading-[1.6] text-[#808098]">{feature.text}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* RIGHT: Form */}
					<QuoteForm defaultService={service.formDefaultService} />
				</div>
			</section>

			<TestimonialsSection></TestimonialsSection>

			{/* ═══ COVERAGE AREA ═══ */}
			<section className="bg-blue-600 px-6 py-[clamp(52px,6vw,88px)]">
				<div className="mx-auto max-w-[1360px]">
					<div className="mb-3.5 text-[13px] font-bold tracking-[.1em] text-white/52 uppercase">
						Service area
					</div>
					<h2 className="mb-3 font-heading text-[clamp(26px,3vw,42px)] leading-[1.2] font-normal text-white">
						Proudly serving Seattle, WA and nearby communities
					</h2>
					<p className="mb-8 text-[15px] leading-[1.75] text-white/65">{service.coverageText}</p>
					<div className="flex flex-wrap gap-2.5">
						{coverageCities.map((city) => (
							<span
								key={city}
								className="rounded-full border border-white/20 bg-white/12 px-[18px] py-2 text-[13px] font-semibold text-white"
							>
								{city}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ═══ FAQ ═══ */}
			<section className="bg-pink-50 px-6 py-[clamp(52px,6vw,88px)]">
				<div className="mx-auto max-w-[1360px]">
					<div className="mb-11">
						<Eyebrow className="mb-3.5">Frequently asked</Eyebrow>
						<h2 className="font-heading text-[clamp(26px,3vw,42px)] leading-[1.2] font-normal tracking-[-0.015em] text-ink-900">
							{service.faqHeading}
						</h2>
					</div>
					<FaqAccordion items={service.faqs} />
				</div>
			</section>
		</div>
	);
}
