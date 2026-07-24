import type { Metadata } from "next";
import { CalendarCheck, Clock, Gift, Mail, MapPin, Music, Phone, Star } from "lucide-react";
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
				<div className="mx-auto max-w-[1360px]">
					<div className="mb-5 inline-flex items-center gap-[7px] rounded-full bg-white px-[15px] py-[7px] text-[11px] font-bold tracking-[0.08em] text-pink-500 uppercase shadow-[0_4px_16px_rgba(255,80,181,0.14)]">
						<CalendarCheck size={13} />
						Free quote · No obligation
					</div>
					<h1 className="mb-[18px] max-w-[820px] font-heading text-[clamp(38px,5.4vw,72px)] leading-[1.04] font-normal tracking-[-0.025em] text-ink-900">
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
				<div className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-[clamp(32px,4vw,56px)] lg:grid-cols-[1.55fr_1fr]">
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
							<div className="mb-2 font-heading text-[44px] leading-none">10% off</div>
							<p className="text-[13.5px] leading-[1.6] text-white/[0.92]">
								Your first cleaning service. Just mention this offer when you request your quote.
							</p>
						</div>

						{/* Contact details */}
						<div className="rounded-[22px] border border-[#EAEAF2] bg-white px-7 py-[26px]">
							<h3 className="mb-[18px] text-[15px] font-semibold text-ink-900">Reach us directly</h3>
							<div className="flex flex-col gap-4">
								<div className="flex items-start gap-[13px]">
									<div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-pink-50">
										<Phone size={17} className="text-pink-500" />
									</div>
									<div>
										<div className="mb-0.5 text-[11px] font-semibold tracking-[0.05em] text-[#A0A0AE] uppercase">
											Phone
										</div>
										<a href="tel:+14256100241" className="block text-sm font-semibold text-ink-900 no-underline hover:text-pink-500">
											(425) 610-0241
										</a>
									</div>
								</div>
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
									<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
										<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
									</svg>
								</a>
								<a href="https://www.instagram.com/cleaningparadisellc" target="_blank" rel="noopener" aria-label="Instagram" className={socialClass}>
									<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
										<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
										<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
									</svg>
								</a>
								<a href="https://www.youtube.com/@cleaningparadisellc" target="_blank" rel="noopener" aria-label="YouTube" className={socialClass}>
									<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
										<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
									</svg>
								</a>
								<a href="https://www.tiktok.com/@cleaningparadisellc" target="_blank" rel="noopener" aria-label="TikTok" className={socialClass}>
									<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 1024 1024" fill="currentColor" fillRule="evenodd"><path d="M365.014.667C408.68 0 452.011.333 495.342 0c2.667 51 21 102.999 58.33 138.998 37.332 37 89.997 54 141.328 59.666v134.332c-47.998-1.667-96.33-11.667-139.994-32.333-19-8.667-36.665-19.667-53.998-31-.333 97.332.334 194.665-.666 291.663-2.667 46.666-18 93-44.998 131.332-43.665 64-119.328 105.665-196.992 106.999-47.664 2.666-95.329-10.334-135.994-34.333C55.028 725.658 7.696 652.992.697 574.993c-.667-16.667-1-33.333-.334-49.666 6-63.333 37.332-123.999 85.997-165.332 55.33-47.999 132.66-70.999 204.99-57.332.667 49.333-1.332 98.665-1.332 147.998-33-10.667-71.664-7.667-100.663 12.333-20.999 13.667-36.998 34.666-45.331 58.333-7 17-5 35.666-4.667 53.666 8 54.666 60.664 100.665 116.662 95.665 37.332-.333 72.997-22 92.33-53.666 6.332-11 13.332-22.333 13.665-35.333 3.334-59.666 2-118.998 2.334-178.664.333-134.332-.334-268.33.666-402.328" transform="translate(165 112)" /></svg>
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
								Rated by 100+ homeowners across King &amp; Snohomish County.{" "}
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
