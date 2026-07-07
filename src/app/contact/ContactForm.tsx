"use client";

import { useState } from "react";
import {
	ArrowRight,
	Building2,
	Check,
	Home,
	Layers,
	Package,
	ShieldCheck,
	Sparkles,
	Truck,
	type LucideIcon,
} from "lucide-react";

const inputClass =
	"w-full rounded-xl border-[1.5px] border-ink-200 bg-ink-50 px-3.5 py-3 text-sm text-ink-900 outline-none transition-colors duration-200 focus:border-pink-500 focus:bg-white";
const labelClass = "mb-1.5 block text-xs font-semibold text-ink-600";

const services: { label: string; icon: LucideIcon }[] = [
	{ label: "House Cleaning (Standard)", icon: Home },
	{ label: "Deep Cleaning", icon: Sparkles },
	{ label: "Commercial Cleaning", icon: Building2 },
	{ label: "Move-In / Move-Out", icon: Truck },
	{ label: "Packing & Unpacking", icon: Package },
	{ label: "Carpet Cleaning", icon: Layers },
];

function SectionHeading({ number, children }: { number: number; children: React.ReactNode }) {
	return (
		<div className="mb-4 flex items-center gap-2.5">
			<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
				{number}
			</span>
			<h3 className="text-[15px] font-semibold text-ink-900">{children}</h3>
		</div>
	);
}

export default function ContactForm() {
	const [submitted, setSubmitted] = useState(false);
	const [selectedServices, setSelectedServices] = useState<string[]>([]);

	const toggleService = (label: string) => {
		setSelectedServices((prev) =>
			prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
		);
	};

	if (submitted) {
		return (
			<div className="rounded-3xl border border-[#EAEAF2] bg-white p-[clamp(24px,3vw,40px)] shadow-[0_24px_64px_rgba(30,62,162,0.09)]">
				<div className="px-4 py-12 text-center">
					<div className="mx-auto mb-[22px] flex h-[68px] w-[68px] items-center justify-center rounded-full bg-pink-50">
						<Check size={32} className="text-pink-500" />
					</div>
					<h2 className="mb-2.5 font-serif text-[34px] font-normal text-ink-900">
						Request received — thank you!
					</h2>
					<p className="mx-auto max-w-[400px] text-[15px] leading-[1.7] text-ink-600">
						We&apos;ll reach out within one business day with your quote and available appointment
						times. Need us sooner? Call (425) 610-0241.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-3xl border border-[#EAEAF2] bg-white p-[clamp(24px,3vw,40px)] shadow-[0_24px_64px_rgba(30,62,162,0.09)]">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setSubmitted(true);
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}
				className="flex flex-col gap-[30px]"
			>
				{/* Section 1: Contact info */}
				<div>
					<SectionHeading number={1}>Your contact info</SectionHeading>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<div>
							<label className={labelClass}>First name *</label>
							<input name="firstName" required placeholder="Jane" className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>Last name *</label>
							<input name="lastName" required placeholder="Doe" className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>Email *</label>
							<input name="email" type="email" required placeholder="jane@email.com" className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>Phone *</label>
							<input name="phone" type="tel" required placeholder="(425) 000-0000" className={inputClass} />
						</div>
					</div>
				</div>

				{/* Section 2: Property address */}
				<div>
					<SectionHeading number={2}>Property address</SectionHeading>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr]">
						<div>
							<label className={labelClass}>Street address</label>
							<input name="street" placeholder="123 Main St" className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>Unit / Apt</label>
							<input name="unit" placeholder="Apt 4B" className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>City</label>
							<select name="city" defaultValue="" className={`${inputClass} cursor-pointer appearance-none`}>
								<option value="">Select city</option>
								<option>Seattle</option>
								<option>Bellevue</option>
								<option>Kirkland</option>
								<option>Lynnwood</option>
								<option>Mercer Island</option>
								<option>Shoreline</option>
								<option>Edmonds</option>
								<option>Bothell</option>
								<option>Other</option>
							</select>
						</div>
						<div>
							<label className={labelClass}>ZIP code</label>
							<input name="zip" inputMode="numeric" placeholder="98101" className={inputClass} />
						</div>
					</div>
				</div>

				{/* Section 3: Services */}
				<div>
					<SectionHeading number={3}>Which service(s) are you interested in?</SectionHeading>
					<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
						{services.map(({ label, icon: Icon }) => {
							const active = selectedServices.includes(label);
							return (
								<button
									key={label}
									type="button"
									onClick={() => toggleService(label)}
									className={`flex cursor-pointer items-center gap-2.5 rounded-xl border-[1.5px] px-[15px] py-3 text-left text-[13.5px] font-semibold transition-all duration-150 ${
										active
											? "border-pink-500 bg-pink-50 text-pink-500"
											: "border-ink-200 bg-ink-50 text-ink-600"
									}`}
								>
									<Icon size={17} className="shrink-0" />
									{label}
								</button>
							);
						})}
					</div>
				</div>

				{/* Section 4: Scheduling */}
				<div>
					<SectionHeading number={4}>When works for you?</SectionHeading>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
						<div>
							<label className={labelClass}>Preferred date</label>
							<input name="date" type="date" className={inputClass} />
						</div>
						<div>
							<label className={labelClass}>Time of day</label>
							<select name="time" className={`${inputClass} cursor-pointer appearance-none`}>
								<option>Flexible</option>
								<option>Morning</option>
								<option>Afternoon</option>
								<option>Evening</option>
							</select>
						</div>
						<div>
							<label className={labelClass}>How often</label>
							<select name="frequency" className={`${inputClass} cursor-pointer appearance-none`}>
								<option>One-time</option>
								<option>Weekly</option>
								<option>Biweekly</option>
								<option>Monthly</option>
							</select>
						</div>
					</div>
				</div>

				{/* Section 5: Details */}
				<div>
					<SectionHeading number={5}>Anything else we should know?</SectionHeading>
					<textarea
						name="notes"
						rows={4}
						placeholder="Home size, pets, focus areas, parking, or anything special…"
						className={`${inputClass} resize-y`}
					/>
					<label className="mt-3.5 flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-600">
						<input
							type="checkbox"
							name="promo"
							defaultChecked
							className="h-4 w-4 cursor-pointer accent-pink-500"
						/>
						<span>
							Apply my <strong className="font-semibold text-pink-500">30% off first-time</strong>{" "}
							discount
						</span>
					</label>
				</div>

				<button
					type="submit"
					className="flex cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-pink-500 p-4 text-[15px] font-bold text-white transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:bg-pink-600 hover:shadow-[0_10px_30px_rgba(255,80,181,.36)]"
				>
					Request my free quote <ArrowRight size={16} />
				</button>
				<p className="flex items-center justify-center gap-[5px] text-center text-[11.5px] text-[#A0A0AE]">
					<ShieldCheck size={13} />
					Licensed &amp; insured · We respond within one business day
				</p>
			</form>
		</div>
	);
}
