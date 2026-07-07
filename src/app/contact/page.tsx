import type { Metadata } from "next";
import { CalendarCheck, Clock, Facebook, Gift, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
	title: "Contact | Cleaning Paradise — Get Your Free Cleaning Quote",
	description:
		"Fill out the form and we'll reach out within one business day with a quote and available appointment times. Serving Seattle, Lynnwood, Bellevue, Kirkland and the greater Seattle area.",
};

const socialClass =
	"flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-ink-50 text-ink-600 transition-all duration-150 hover:bg-pink-500 hover:text-white";

export default function ContactPage() {
	return (
		<div className="relative w-full overflow-x-clip">
			{/* HERO / INTRO */}
			<section className="bg-pink-50 px-6 pt-[clamp(120px,11vw,150px)] pb-[clamp(36px,4vw,52px)]">
				<div className="mx-auto max-w-[1180px]">
					<div className="mb-5 inline-flex items-center gap-[7px] rounded-full bg-white px-[15px] py-[7px] text-[11px] font-bold tracking-[0.08em] text-pink-500 uppercase shadow-[0_4px_16px_rgba(255,80,181,0.14)]">
						<CalendarCheck size={13} />
						Free quote · No obligation
					</div>
					<h1 className="mb-[18px] max-w-[820px] font-serif text-[clamp(38px,5.4vw,72px)] leading-[1.04] font-normal tracking-[-0.025em] text-ink-900">
						Let&apos;s get your home on the schedule
					</h1>
					<p className="max-w-[640px] text-[clamp(15px,1.4vw,18px)] leading-[1.75] text-ink-600">
						Fill out the form and we&apos;ll reach out within one business day with a quote and
						available appointment times. Prefer to talk? Call{" "}
						<a href="tel:+14256100241" className="font-semibold text-pink-500 no-underline hover:underline">
							(425) 610-0241
						</a>
						, Mon–Sat, 7 AM – 7 PM. We serve the greater Seattle area — Lynnwood, Bellevue, Kirkland,
						Mercer Island, Shoreline, Edmonds and Bothell.
					</p>
				</div>
			</section>

			{/* FORM + SIDEBAR */}
			<section className="bg-white px-6 pt-[clamp(40px,5vw,72px)] pb-[clamp(56px,7vw,96px)]">
				<div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-[clamp(32px,4vw,56px)] lg:grid-cols-[1.55fr_1fr]">
					{/* LEFT: Request form */}
					<ContactForm />

					{/* RIGHT: Sidebar */}
					<div className="flex flex-col gap-5 lg:sticky lg:top-[100px]">
						{/* Promo */}
						<div className="rounded-[22px] bg-[linear-gradient(145deg,#FF50B5_0%,#D93A9E_100%)] px-7 py-[26px] text-white shadow-[0_16px_40px_rgba(255,80,181,0.28)]">
							<div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-[5px] text-[10.5px] font-bold tracking-[0.07em] uppercase">
								<Gift size={12} />
								First-time client
							</div>
							<div className="mb-2 font-serif text-[44px] leading-none">30% off</div>
							<p className="text-[13.5px] leading-[1.6] text-white/[0.92]">
								Your first cleaning service. Just mention this offer when you request your quote.
							</p>
						</div>

						{/* Contact details */}
						<div className="rounded-[22px] border border-[#EAEAF2] bg-white px-7 py-[26px]">
							<h3 className="mb-[18px] text-[15px] font-semibold text-ink-900">Reach us directly</h3>
							<div className="flex flex-col gap-4">
								<a href="tel:+14256100241" className="flex items-start gap-[13px] no-underline">
									<div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-pink-50">
										<Phone size={17} className="text-pink-500" />
									</div>
									<div>
										<div className="mb-0.5 text-[11px] font-semibold tracking-[0.05em] text-[#A0A0AE] uppercase">
											Phone
										</div>
										<div className="text-sm font-semibold text-ink-900">(425) 610-0241</div>
										<div className="text-[13px] text-[#808098]">(425) 480-8629</div>
									</div>
								</a>
								<a href="mailto:cleaning.paradise.llc@gmail.com" className="flex items-start gap-[13px] no-underline">
									<div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-blue-50">
										<Mail size={17} className="text-blue-600" />
									</div>
									<div>
										<div className="mb-0.5 text-[11px] font-semibold tracking-[0.05em] text-[#A0A0AE] uppercase">
											Email
										</div>
										<div className="text-[13.5px] font-semibold break-all text-ink-900">
											cleaning.paradise.llc@gmail.com
										</div>
									</div>
								</a>
								<div className="flex items-start gap-[13px]">
									<div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-pink-50">
										<Clock size={17} className="text-pink-500" />
									</div>
									<div>
										<div className="mb-0.5 text-[11px] font-semibold tracking-[0.05em] text-[#A0A0AE] uppercase">
											Hours
										</div>
										<div className="text-sm font-semibold text-ink-900">Mon – Sat</div>
										<div className="text-[13px] text-[#808098]">7:00 AM – 7:00 PM</div>
									</div>
								</div>
								<div className="flex items-start gap-[13px]">
									<div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-blue-50">
										<MapPin size={17} className="text-blue-600" />
									</div>
									<div>
										<div className="mb-0.5 text-[11px] font-semibold tracking-[0.05em] text-[#A0A0AE] uppercase">
											Based in
										</div>
										<div className="text-sm font-semibold text-ink-900">Lynnwood, WA</div>
										<div className="text-[13px] text-[#808098]">Serving King &amp; Snohomish County</div>
									</div>
								</div>
							</div>
							<div className="mt-5 flex flex-wrap gap-2.5 border-t border-[#EEEEF4] pt-[18px]">
								<a href="https://www.facebook.com/cleaningparadisellc" target="_blank" rel="noopener" aria-label="Facebook" className={socialClass}>
									<Facebook size={17} />
								</a>
								<a href="https://www.instagram.com/cleaningparadisellc" target="_blank" rel="noopener" aria-label="Instagram" className={socialClass}>
									<Instagram size={17} />
								</a>
								<a href="https://www.youtube.com/@cleaningparadisellc" target="_blank" rel="noopener" aria-label="YouTube" className={socialClass}>
									<Youtube size={17} />
								</a>
								<a href="https://www.tiktok.com/@cleaningparadisellc" target="_blank" rel="noopener" aria-label="TikTok" className={`${socialClass} text-[13px] font-bold`}>
									TT
								</a>
								<a href="https://www.yelp.com/biz/cleaning-paradise-lynnwood-2" target="_blank" rel="noopener" aria-label="Yelp" className={`${socialClass} text-[13px] font-bold`}>
									Y
								</a>
							</div>
						</div>

						{/* Reviews trust */}
						<div className="rounded-[22px] bg-blue-50 px-[26px] py-[22px]">
							<div className="mb-1.5 flex items-center gap-2">
								<span className="text-sm tracking-[1px] text-[#FBBC05]">★★★★★</span>
								<span className="text-sm font-bold text-ink-900">4.9</span>
							</div>
							<p className="text-[13px] leading-[1.55] text-ink-600">
								Rated by 450+ homeowners across King &amp; Snohomish County.{" "}
								<a
									href="https://www.thumbtack.com/wa/lynnwood/house-cleaning/cleaning-paradise-llc/service/454839254774677504"
									target="_blank"
									rel="noopener"
									className="font-semibold text-blue-600 no-underline hover:underline"
								>
									Read reviews →
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
