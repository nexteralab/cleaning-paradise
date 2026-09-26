import type { Metadata } from "next";
import Link from "next/link";
import { currentMonth } from "@/lib/date";

export const metadata: Metadata = {
	title: "Terms of Service | Cleaning Paradise",
	description:
		"The terms that govern quotes, bookings and use of the Cleaning Paradise LLC website.",
	alternates: { canonical: "/terms" },
};

// ponytail: baseline terms covering the site's actual flow (quote requests are
// not binding contracts; scheduling/cancellation mirrors the FAQ copy). Have
// counsel review and confirm the cancellation/guarantee wording before launch.
// ponytail: la página es estática, así que el mes se fija en el build = mes del último deploy.
const UPDATED = currentMonth();

export default function TermsPage() {
	return (
		<article className="mx-auto max-w-[760px] px-6 pt-[clamp(120px,12vw,160px)] pb-24">
			<h1 className="mb-3 font-heading text-[clamp(34px,5vw,52px)] leading-[1.1] font-normal tracking-[-0.02em] text-ink-900">
				Terms of Service
			</h1>
			<p className="mb-10 text-sm text-ink-500">Last updated: {UPDATED}</p>

			<div className="flex flex-col gap-6 text-[15.5px] leading-[1.75] text-ink-600 [&_h2]:mt-4 [&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:text-ink-900 [&_a]:font-medium [&_a]:text-pink-500 [&_a]:underline">
				<p>
					These terms apply to your use of the Cleaning Paradise LLC website and to quote requests
					submitted through it. By using the site, you agree to them.
				</p>

				<h2>Quotes &amp; bookings</h2>
				<p>
					Submitting a form is a request for a quote, not a confirmed booking or binding contract. We
					confirm pricing, scope and scheduling with you directly before any work begins.
				</p>

				<h2>Scheduling &amp; cancellations</h2>
				<p>
					Please give at least 24 hours&apos; notice to reschedule or cancel at no charge. Late
					cancellations (within 24 hours) may incur a fee to cover reserved time.
				</p>

				<h2>Satisfaction</h2>
				<p>
					If you&apos;re not satisfied, contact us within 24 hours and describe the issue and
					we&apos;ll return to address it at no extra cost.
				</p>

				<h2>Accuracy of information</h2>
				<p>
					We aim to keep the site accurate and up to date, but content is provided &ldquo;as is&rdquo;
					and may change without notice.
				</p>

				<h2 id="sms" className="scroll-mt-32">
					Text message terms: Cleaning Paradise Notifications
				</h2>
				<ul className="flex flex-col gap-3 [&_strong]:font-semibold [&_strong]:text-ink-900">
					<li>
						<strong>Program.</strong> Cleaning Paradise LLC sends automated text messages about your
						service: booking confirmations, visit reminders, invoices, invoice reminders and payment
						receipts.
					</li>
					<li>
						<strong>How you join.</strong> You tick the text-message box on our request form, or you
						ask our office to text you. Joining is optional and is not a condition of any purchase.
					</li>
					<li>
						<strong>How often.</strong> Message frequency varies with your cleanings and bills.
					</li>
					<li>
						<strong>Cost.</strong> Msg &amp; data rates may apply.
					</li>
					<li>
						<strong>Help.</strong> Reply <strong>HELP</strong> for help, or call or text us at{" "}
						<a href="tel:+14256100241">(425) 610-0241</a>.
					</li>
					<li>
						<strong>Stop.</strong> Reply <strong>STOP</strong> at any time to stop receiving texts. We
						will send one message confirming it. Reply <strong>START</strong> to join again.
					</li>
					<li>
						<strong>Replies.</strong> Our notification number does not read replies. To reach a person,
						call or text <a href="tel:+14256100241">(425) 610-0241</a>.
					</li>
					<li>
						<strong>Carriers.</strong> Carriers are not liable for delayed or undelivered messages.
					</li>
					<li>
						<strong>Privacy.</strong> See our <Link href="/privacy">Privacy policy</Link>.
					</li>
				</ul>

				<h2>Contact</h2>
				<p>
					Questions about these terms? Email{" "}
					<a href="mailto:cleaning.paradise.llc@gmail.com">cleaning.paradise.llc@gmail.com</a> or call{" "}
					<a href="tel:+14256100241">(425) 610-0241</a>.
				</p>
			</div>
		</article>
	);
}
