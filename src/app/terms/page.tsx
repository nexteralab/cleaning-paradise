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
						<strong>Program.</strong> Cleaning Paradise LLC provides recurring automated service texts:
						booking confirmations, visit reminders, invoices, invoice reminders and payment receipts.
						This program does not send marketing messages.
					</li>
					<li>
						<strong>How you join.</strong> Enter your mobile number and select the optional, unchecked
						SMS consent box on our request form before submitting, or expressly agree after our office
						reads the full <a href="#sms-consent">consent script below</a>. Giving us a phone number,
						requesting a quote or signing a service agreement alone does not enroll you. Consent is
						optional and is not a condition of purchase.
					</li>
					<li>
						<strong>Enrollment confirmation.</strong> After enrollment in the active program, you
						receive a confirmation text identifying Cleaning Paradise, message frequency, possible
						charges, and HELP and STOP instructions.
					</li>
					<li>
						<strong>Frequency and cost.</strong> Message frequency varies with your cleaning services
						and billing activity. Message and data rates may apply.
					</li>
					<li>
						<strong>Help.</strong> Reply <strong>HELP</strong> for help. You may also call or text{" "}
						<a href="tel:+14256100241">(425) 610-0241</a> or email{" "}
						<a href="mailto:hello@cleaningparadisellc.com">hello@cleaningparadisellc.com</a>.
					</li>
					<li>
						<strong>Opt out.</strong> Reply <strong>STOP</strong> at any time to stop receiving texts
						from this program. We send one opt-out confirmation, after which no further program
						messages are sent unless you re-enroll. Reply <strong>START</strong> or{" "}
						<strong>UNSTOP</strong> to re-enroll.
					</li>
					<li>
						<strong>Replies.</strong> Ordinary replies to the notification number are not read by
						staff. The service processes HELP, STOP and reenrollment keywords. For a person, call or
						text <a href="tel:+14256100241">(425) 610-0241</a>.
					</li>
					<li>
						<strong>Carriers.</strong> Carriers are not liable for any delayed or undelivered messages.
					</li>
					<li>
						<strong>Privacy.</strong> See our <Link href="/privacy">Privacy Policy</Link>. Mobile
						information and SMS consent are not sold or shared with third parties or affiliates for
						marketing or promotional purposes.
					</li>
				</ul>

				<h2 id="sms-consent" className="scroll-mt-32">
					Phone and in-person SMS consent script
				</h2>
				<p>
					The staff member confirms the customer&apos;s mobile number, reads the entire script and asks
					for an explicit yes or no:
				</p>
				<blockquote className="border-l-4 border-pink-200 pl-4 italic">
					May Cleaning Paradise LLC send you automated text messages at your mobile number for booking
					confirmations, visit reminders, invoices, invoice reminders and payment receipts? Message
					frequency varies. Message and data rates may apply. Reply HELP for help or call (425)
					610-0241. Reply STOP to opt out. Consent is optional and is not a condition of purchase. Our
					SMS terms are at cleaningparadisellc.com/terms#sms and our privacy policy is at
					cleaningparadisellc.com/privacy. After enrollment, you will receive a confirmation text. Do
					you agree?
				</blockquote>
				<p>
					Only an explicit affirmative answer is recorded as consent. Staff retain the response, mobile
					number, date, method and disclosure version. A refusal or lack of an answer does not enroll
					the customer. A general service agreement is not SMS consent.
				</p>

				<h2>Contact</h2>
				<p>
					Questions about these terms? Email{" "}
					<a href="mailto:hello@cleaningparadisellc.com">hello@cleaningparadisellc.com</a> or call{" "}
					<a href="tel:+14256100241">(425) 610-0241</a>.
				</p>
			</div>
		</article>
	);
}
