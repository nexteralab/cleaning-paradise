import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy | Cleaning Paradise",
	description:
		"How Cleaning Paradise LLC collects, uses and protects the personal information you submit through our website.",
};

// ponytail: baseline policy accurate to what the site actually does today
// (form data → leads DB, functional cookies, no ad trackers yet). Have counsel
// review before launch, and revise when GA4/Clarity/Jobber (audit P5) go live.
const UPDATED = "July 2026";

export default function PrivacyPage() {
	return (
		<article className="mx-auto max-w-[760px] px-6 pt-[clamp(120px,12vw,160px)] pb-24">
			<h1 className="mb-3 font-serif text-[clamp(34px,5vw,52px)] leading-[1.1] font-normal tracking-[-0.02em] text-ink-900">
				Privacy Policy
			</h1>
			<p className="mb-10 text-sm text-ink-500">Last updated: {UPDATED}</p>

			<div className="flex flex-col gap-6 text-[15.5px] leading-[1.75] text-ink-600 [&_h2]:mt-4 [&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:text-ink-900 [&_a]:font-medium [&_a]:text-pink-500 [&_a]:underline">
				<p>
					Cleaning Paradise LLC (&ldquo;we,&rdquo; &ldquo;us&rdquo;) provides residential and
					commercial cleaning services in the greater Seattle area. This policy explains what
					information we collect through this website and how we use it.
				</p>

				<h2>Information we collect</h2>
				<p>
					When you submit a quote or contact form, we collect the details you provide: your name,
					email address, phone number, service address, the services you&apos;re interested in,
					scheduling preferences, and any notes you add. We only collect what you choose to send us.
				</p>

				<h2>How we use it</h2>
				<p>
					We use your information to respond to your request, prepare a quote, schedule and deliver
					cleaning services, and follow up about your inquiry. We do not sell your personal
					information.
				</p>

				<h2>Cookies</h2>
				<p>
					We use a small number of functional cookies — for example, to remember whether you&apos;ve
					turned on background music. These are not used for advertising. If we add analytics in the
					future, we will update this policy.
				</p>

				<h2>Data retention &amp; security</h2>
				<p>
					Lead information is stored securely and kept only as long as needed to serve you and for
					reasonable business records. We take commercially reasonable steps to protect it.
				</p>

				<h2>Your choices</h2>
				<p>
					You can ask us to access, correct or delete the personal information you&apos;ve submitted.
					Contact us and we&apos;ll handle your request.
				</p>

				<h2>Contact</h2>
				<p>
					Questions about this policy? Email{" "}
					<a href="mailto:cleaning.paradise.llc@gmail.com">cleaning.paradise.llc@gmail.com</a> or call{" "}
					<a href="tel:+14256100241">(425) 610-0241</a>.
				</p>
			</div>
		</article>
	);
}
