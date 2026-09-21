// Email con el link para definir/restablecer la contraseña del panel.
// Lo dispara Better Auth (sendResetPassword) tanto para invitaciones nuevas
// como para "resetear clave" desde /admin/users.
import type { Email } from "../types";
import { escape, shell } from "./layout";

export function resetPassword(name: string, url: string): Email {
	const subject = "Set your Cleaning Paradise admin password";
	const intro = `Hi ${escape(name)}, use the button below to choose a password for the Cleaning Paradise admin panel. The link works for 24 hours.`;
	const button = `<a href="${escape(url)}" style="display:inline-block;padding:12px 22px;background:#131320;color:#fff;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;">Set password</a>
	<p style="margin:18px 0 0;color:#9A9AB0;font-size:12px;line-height:1.6;">If you didn't expect this email, you can ignore it.</p>`;
	return {
		subject,
		html: shell({ heading: "Your admin access", intro, bodyHtml: button }),
		text: `Hi ${name},\n\nChoose a password for the Cleaning Paradise admin panel here (valid 24 hours):\n${url}\n\nIf you didn't expect this email, ignore it.`,
	};
}
