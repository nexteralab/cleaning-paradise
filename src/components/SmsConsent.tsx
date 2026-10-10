import { useId } from "react";
import Link from "next/link";
import { SMS_CONSENT_LABEL, SMS_DISCLOSURE } from "@/lib/sms-consent";

// Opt-in de SMS requerido por Twilio (A2P 10DLC). El texto legal vive en lib/sms-consent.ts
// y debe coincidir con /terms#sms. Sin marcar por defecto — el consentimiento no puede venir pre-tildado.
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
				<span>{SMS_CONSENT_LABEL}</span>
			</label>
			<p id={id} className="mt-1 pl-[26px] text-[10.5px] leading-[1.5] text-ink-500 [&_a]:underline [&_a]:hover:text-pink-500">
				{SMS_DISCLOSURE} See our{" "}
				{/* Pestaña nueva: navegar en la misma borraría lo que el cliente ya llenó. */}
				<Link href="/terms#sms" target="_blank" rel="noopener noreferrer">Text message terms</Link> and{" "}
				<Link href="/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</Link>.
			</p>
		</div>
	);
}
