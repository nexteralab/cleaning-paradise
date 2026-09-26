import { useId } from "react";
import Link from "next/link";

// Opt-in de SMS requerido por Twilio (A2P 10DLC). Un solo lugar para el texto legal:
// debe coincidir con /terms#sms. Sin marcar por defecto — el consentimiento no puede venir pre-tildado.
export default function SmsConsent() {
	const id = useId();
	return (
		<div className="text-left">
			<label className="flex cursor-pointer items-start gap-2.5 text-[13px] font-medium text-ink-600">
				<input
					type="checkbox"
					name="smsConsent"
					aria-describedby={id}
					className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-pink-500"
				/>
				<span>Text me about my cleanings, quotes, invoices and receipts.</span>
			</label>
			<p id={id} className="mt-1 pl-[26px] text-[10.5px] leading-[1.5] text-ink-500 [&_a]:underline [&_a]:hover:text-pink-500">
				Optional. By ticking this box you agree to receive automated text messages from Cleaning
				Paradise LLC at the number above: booking confirmations, visit reminders, invoices, invoice
				reminders and payment receipts. Msg frequency varies. Msg &amp; data rates may apply. Reply
				HELP for help, STOP to opt out. Consent is not a condition of purchase. See our{" "}
				<Link href="/terms#sms">Text message terms</Link> and <Link href="/privacy">Privacy policy</Link>.
			</p>
		</div>
	);
}
