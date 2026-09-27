// Shared branded HTML shell + small helpers, so each per-form template only
// writes its own content (heading, intro, detail rows) — not boilerplate.
import type { Lead } from "../types";

const PINK = "#FF50B5";
const INK = "#131320";
const PHONE = "(425) 610-0241";

export function escape(v: unknown): string {
	return String(v ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export function fullName(lead: Lead): string {
	return [lead.firstName, lead.lastName].filter(Boolean).join(" ").trim() || "there";
}

export type Field = { label: string; value?: string | null };

/** Keep only fields with a real value. */
export function present(fields: Field[]): Field[] {
	return fields.filter((f) => f.value != null && String(f.value).trim() !== "");
}

/** HTML detail table from a list of fields. */
export function detailsHtml(fields: Field[]): string {
	const rows = present(fields)
		.map(
			(f) => `
			<tr>
				<td style="padding:7px 0;color:#8A8AA0;font-size:13px;width:140px;vertical-align:top;">${escape(f.label)}</td>
				<td style="padding:7px 0;color:${INK};font-size:14px;font-weight:500;">${escape(f.value)}</td>
			</tr>`,
		)
		.join("");
	return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows}</table>`;
}

/** Plain-text detail block. */
export function detailsText(fields: Field[]): string {
	return present(fields)
		.map((f) => `${f.label}: ${f.value}`)
		.join("\n");
}

/** Full branded HTML document wrapping the given content. */
export function shell(opts: { heading: string; intro: string; bodyHtml: string; footerHtml?: string }): string {
	return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#F4F4F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
	<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#F4F4F8;padding:32px 16px;">
		<tr><td align="center">
			<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(19,19,32,0.06);">
				<tr><td style="background:${INK};padding:22px 32px;">
					<span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.01em;">Cleaning Paradise</span>
				</td></tr>
				<tr><td style="padding:32px;">
					<h1 style="margin:0 0 10px;color:${INK};font-size:22px;font-weight:700;letter-spacing:-0.01em;">${escape(opts.heading)}</h1>
					<p style="margin:0 0 22px;color:#55556A;font-size:15px;line-height:1.6;">${opts.intro}</p>
					${opts.bodyHtml}
					${opts.footerHtml ?? ""}
				</td></tr>
				<tr><td style="padding:20px 32px;border-top:1px solid #EEEEF4;">
					<p style="margin:0;color:#9A9AB0;font-size:12px;line-height:1.6;">
						Cleaning Paradise LLC · Lynnwood, WA · <a href="tel:+14256100241" style="color:${PINK};text-decoration:none;">${PHONE}</a><br>
						Mon–Sat, 7 AM – 7 PM
					</p>
				</td></tr>
			</table>
		</td></tr>
	</table>
</body>
</html>`;
}

/** Pink call-to-action / highlight box (e.g. the promo line). */
export function highlightHtml(text: string): string {
	return `<div style="margin:22px 0 0;padding:14px 18px;background:#FFF0F8;border-radius:12px;color:${INK};font-size:14px;font-weight:500;">${escape(text)}</div>`;
}
