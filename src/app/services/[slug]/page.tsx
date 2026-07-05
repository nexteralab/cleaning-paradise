import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Brush,
	Building2,
	CalendarCheck,
	CircleCheck,
	Clock,
	FileX,
	Heart,
	House,
	Leaf,
	ShieldCheck,
	Sparkles,
	Star,
	Truck,
	UserCheck,
	type LucideIcon,
} from "lucide-react";
import { BeforeAfterSlider, FaqAccordion, QuoteForm } from "./client-sections";
import { services, serviceSlugs, type IconName, type ServiceContent } from "./services-data";

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

const trustChips: { icon: LucideIcon; label: string }[] = [
	{ icon: ShieldCheck, label: "Licensed & Insured" },
	{ icon: UserCheck, label: "Background-checked" },
	{ icon: CircleCheck, label: "100% Guarantee" },
	{ icon: Leaf, label: "Eco-friendly" },
];

const galleryImages: { src: string; alt: string; wide: boolean }[] = [
	{ src: "/img/aw1a0562-mr2ei5id.jpg", alt: "Cleaning result", wide: true },
	{ src: "/img/deep-cleaning-mr2ehsjj.jpg", alt: "Deep cleaning", wide: false },
	{ src: "/img/aw1a0630-mr2eiji3.jpg", alt: "Cleaning team", wide: true },
	{ src: "/img/svc-move.jpg", alt: "Move cleaning", wide: false },
	{ src: "/img/svc-deep.jpg", alt: "Service", wide: true },
	{ src: "/img/svc-carpet.jpg", alt: "Carpet cleaning", wide: false },
];

const testimonials = [
	{
		paragraphs: [
			"Cleaning Paradise has been amazing to work with. Their communication is always prompt, professional, and friendly. The quality of their cleaning service is outstanding, and they consistently pay attention to the details. Their pricing is also very reasonable for the level of service they provide. It's hard to find a company that combines reliability, quality, and affordability so well. I highly recommend Cleaning Paradise to anyone in the Seattle area looking for a trustworthy cleaning service.",
		],
		initials: "MG",
		name: "Camilo P.",
		location: "Bellevue, WA",
	},
	{
		paragraphs: [
			"Allizon was a true lifesaver during a family crisis. We all live out of state. She moved her schedule around to assist with a cleaning for a terminally ill family member and a disabled child.",
			"She came in with no judgement, we talked priorities and the team went to town. The house looked so nice and smelled so fresh, I would never have been able to pull that off without her help.",
			"This wasn't a normal clean as I needed help moving furniture around to accommodate a large group of people in the middle of trying to get the house ready for sale.",
			"We will be working with her again in the future and highly recommend Cleaning Paradise LLC for all your cleaning needs.",
			"They are amazing and the house shined when the whole family showed up for the funeral.",
		],
		initials: "JC",
		name: "Brenda G.",
		location: "Kirkland, WA",
	},
	{
		paragraphs: [
			"We've been using Cleaning Paradise's services for about 6 months, almost monthly. Allizon and her team are excellent, always communicating well, working with our schedules and very kind. We always love how spotless they make our home, especially with us having a pet dog that sheds a lot! Happy to keep their services for many more months to come!",
		],
		initials: "AL",
		name: "Roynerah B",
		location: "Seattle, WA",
	},
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
			className={`text-xs font-bold tracking-[.1em] text-pink-500 uppercase ${className}`}
		>
			{children}
		</div>
	);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const service: ServiceContent | undefined = services[slug];
	if (!service) notFound();

	const BadgeIcon = icons[service.badgeIcon];

	return (
		<div className="relative w-full overflow-x-clip">
			{/* ═══ HERO ═══ */}
			<section className="bg-white px-6 pt-[clamp(120px,11vw,160px)] pb-[clamp(60px,7vw,88px)]">
				<div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-2">
					{/* LEFT: text */}
					<div>
						<Link
							href="/services"
							className="mb-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#808098] no-underline transition-colors hover:text-pink-500"
						>
							<ArrowLeft size={13} />
							All Services
						</Link>
						<div className="mb-[22px] ml-3 inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3.5 py-1.5 text-[11px] font-bold tracking-[.08em] text-pink-500 uppercase">
							<BadgeIcon size={12} />
							{service.badgeLabel}
						</div>
						<h1 className="mb-4 font-serif text-[clamp(34px,3.8vw,58px)] leading-[1.1] font-normal tracking-[-0.02em] text-ink-900 text-pretty">
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
						<div className="mb-8 flex flex-wrap gap-2">
							{trustChips.map(({ icon: Icon, label }) => (
								<span
									key={label}
									className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F8] px-3.5 py-[7px] text-xs font-semibold text-ink-600"
								>
									<Icon size={13} className="text-pink-500" />
									{label}
								</span>
							))}
						</div>
						<div className="flex flex-wrap gap-3">
							<a
								href="#quote"
								className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3.5 text-[15px] font-bold text-white no-underline transition-all duration-200 ease-(--ease-out) hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,80,181,0.42)]"
							>
								Get a free quote <ArrowRight size={15} />
							</a>
							<a
								href="tel:+14256100241"
								className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink-200 px-7 py-3.5 text-[15px] font-semibold text-ink-900 no-underline transition-all hover:border-pink-500 hover:text-pink-500"
							>
								(425) 610-0241
							</a>
						</div>
					</div>

					{/* RIGHT: before/after slider */}
					<BeforeAfterSlider />
				</div>
			</section>

			{/* ═══ INTRO TEXT + IMAGE ═══ */}
			<section className="bg-white px-6 py-[clamp(64px,7vw,96px)]">
				<div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-[clamp(40px,6vw,80px)] md:grid-cols-2">
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
						<p className="mb-6 text-[clamp(16px,1.5vw,19px)] leading-[1.82] text-[#3A3A52]">
							{service.introLead}
						</p>
						{service.introParas.map((para, i) => (
							<p
								key={i}
								className={`text-[clamp(15px,1.3vw,17px)] leading-[1.85] text-ink-600 ${
									i === service.introParas.length - 1 ? "mb-8" : "mb-6"
								}`}
							>
								{para}
							</p>
						))}
						<div className="flex flex-wrap gap-2">
							{service.frequencyChips.map((chip) => (
								<span
									key={chip.label}
									className={`rounded-full border-[1.5px] px-[18px] py-1.5 text-[12.5px] font-semibold ${
										chip.active
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
								className={`block h-[400px] shrink-0 rounded-[20px] object-cover ${
									img.wide ? "w-[560px]" : "w-[480px]"
								}`}
							/>
						))}
					</div>
				</div>
			</section>

			{/* ═══ CALLOUT ═══ */}
			<section className="px-6 pt-[clamp(36px,4vw,52px)]">
				<div className="mx-auto max-w-[1240px]">
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
				<div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-[clamp(40px,6vw,88px)] lg:grid-cols-[1fr_minmax(300px,440px)]">
					{/* LEFT */}
					<div>
						<Eyebrow className="mb-3.5">{service.customEyebrow}</Eyebrow>
						<h2 className="mb-[22px] font-serif text-[clamp(28px,3.2vw,48px)] leading-[1.15] font-normal tracking-[-0.02em] text-ink-900">
							{service.customTitle}
						</h2>
						{service.customParas.map((para, i) => (
							<p
								key={i}
								className={`text-base leading-[1.85] text-ink-600 ${
									i === service.customParas.length - 1 ? "mb-9" : "mb-5"
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

			{/* ═══ TESTIMONIALS ═══ */}
			<section className="border-t border-ink-200 bg-white py-24">
				<div className="mx-auto max-w-[1240px] px-10">
					<div className="mb-12 text-center">
						<Eyebrow className="mb-[13px]">Testimonials</Eyebrow>
						<h2 className="mb-4 font-serif text-[clamp(40px,4.5vw,60px)] font-normal tracking-[-0.02em] text-ink-900">
							Rated by real Seattle-area clients
						</h2>
						<div className="inline-flex items-center gap-[9px] rounded-full border border-[#FFD6EF] bg-white px-[18px] py-2">
							<Star size={16} className="fill-pink-500 text-pink-500" />
							<span className="text-sm font-semibold text-ink-800">
								39 verified reviews on Thumbtack
							</span>
						</div>
					</div>
					<div className="mb-[34px] grid grid-cols-1 gap-[22px] md:grid-cols-3">
						{testimonials.map((t) => (
							<div
								key={t.name}
								className="rounded-[22px] bg-white px-7 py-[30px] shadow-[0_8px_24px_rgba(30,62,162,0.06)]"
							>
								<div className="mb-3.5 text-[15px] tracking-[2px] text-pink-500">★★★★★</div>
								<div className="mb-[22px] text-[15px] leading-[1.65] text-ink-800 italic">
									{t.paragraphs.map((p, i) => (
										<p key={i} className={i < t.paragraphs.length - 1 ? "mb-3" : ""}>
											{p}
										</p>
									))}
								</div>
								<div className="flex items-center gap-3">
									<div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FFD6EF] text-[13px] font-bold text-[#BC2180]">
										{t.initials}
									</div>
									<div>
										<div className="text-sm font-semibold text-ink-800">{t.name}</div>
										<div className="text-xs text-[#808098]">{t.location}</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="text-center">
						<a
							href="#quote"
							className="mb-[18px] inline-flex items-center gap-2 rounded-full bg-pink-500 px-[34px] py-4 text-base font-semibold text-white no-underline shadow-[0_10px_28px_rgba(255,80,181,0.32)] transition-all duration-200 ease-(--ease-out) hover:bg-pink-600 hover:shadow-[0_14px_36px_rgba(255,80,181,0.42)]"
						>
							Get my free quote <ArrowRight size={17} />
						</a>
						<br />
						<a
							href="https://www.thumbtack.com/wa/lynnwood/house-cleaning/cleaning-paradise-llc/service/454839254774677504"
							target="_blank"
							rel="noopener"
							className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 no-underline hover:underline"
						>
							Read all 113 reviews on Thumbtack <ArrowUpRight size={15} />
						</a>
					</div>
				</div>
			</section>

			{/* ═══ COVERAGE AREA ═══ */}
			<section className="bg-blue-600 px-6 py-[clamp(52px,6vw,88px)]">
				<div className="mx-auto max-w-[1240px]">
					<div className="mb-3.5 text-xs font-bold tracking-[.1em] text-white/52 uppercase">
						Service area
					</div>
					<h2 className="mb-3 font-serif text-[clamp(26px,3vw,42px)] leading-[1.2] font-normal text-white">
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
				<div className="mx-auto max-w-[1240px]">
					<div className="mb-11">
						<Eyebrow className="mb-3.5">Frequently asked</Eyebrow>
						<h2 className="font-serif text-[clamp(26px,3vw,42px)] leading-[1.2] font-normal tracking-[-0.015em] text-ink-900">
							{service.faqHeading}
						</h2>
					</div>
					<FaqAccordion items={service.faqs} />
				</div>
			</section>
		</div>
	);
}
