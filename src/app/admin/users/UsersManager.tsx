"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, Pencil, Plus, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ConfirmDelete from "../ConfirmDelete";

export type UserRole = "admin" | "user";
export type AdminUser = {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	createdAt: string;
	lastLoginAt: string | null;
};

const inputClass =
	"w-full rounded-xl border-[1.5px] border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-pink-500 disabled:bg-ink-50 disabled:text-ink-500";
const labelClass = "mb-1.5 block text-xs font-semibold text-ink-600";
const iconBtn =
	"inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-30";

// Una invitación es un alta con clave aleatoria + link de reset por email.
// Nadie ve esa clave: el usuario elige la suya desde el link (24h).
const randomPassword = () => crypto.randomUUID() + crypto.randomUUID();
const RESET_REDIRECT = "/admin/reset-password";

/** "hace 3 h", "hace 5 d"… Un timestamp exacto no dice nada de un vistazo. */
function fmtLastLogin(iso: string | null): { text: string; stale: boolean } {
	if (!iso) return { text: "Nunca", stale: true };
	const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
	if (mins < 1) return { text: "Ahora", stale: false };
	if (mins < 60) return { text: `hace ${mins} min`, stale: false };
	const hours = Math.floor(mins / 60);
	if (hours < 24) return { text: `hace ${hours} h`, stale: false };
	const days = Math.floor(hours / 24);
	if (days < 30) return { text: `hace ${days} d`, stale: days > 14 };
	return { text: iso.slice(0, 10), stale: true };
}

export default function UsersManager({ users, meId }: { users: AdminUser[]; meId: string }) {
	const router = useRouter();
	const [editing, setEditing] = useState<AdminUser | null | "new">(null);
	const [deleting, setDeleting] = useState<AdminUser | null>(null);
	const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

	function flash(ok: boolean, text: string) {
		setNotice({ ok, text });
		setTimeout(() => setNotice(null), 4000);
	}

	async function sendReset(u: AdminUser) {
		const { error } = await authClient.requestPasswordReset({
			email: u.email,
			redirectTo: RESET_REDIRECT,
		});
		flash(!error, error ? (error.message ?? "No se pudo enviar") : `Link de reset enviado a ${u.email}`);
	}

	async function remove() {
		if (!deleting) return;
		const { error } = await authClient.admin.removeUser({ userId: deleting.id });
		setDeleting(null);
		flash(!error, error ? (error.message ?? "No se pudo eliminar") : "Usuario eliminado");
		router.refresh();
	}

	return (
		<div className="px-4 py-8 md:px-8">
			<div className="mx-auto max-w-5xl">
				<div className="mb-8 flex flex-wrap items-end justify-between gap-3">
					<div>
						<h1 className="text-2xl font-semibold text-ink-900">Usuarios</h1>
						<p className="text-sm text-ink-600">Cuentas del panel y su nivel de acceso</p>
					</div>
					<button
						onClick={() => setEditing("new")}
						className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2A3C]"
					>
						<Plus size={16} /> Nuevo usuario
					</button>
				</div>

				{notice && (
					<p
						role="status"
						className={`mb-4 rounded-xl px-4 py-2.5 text-sm ${notice.ok ? "bg-green-50 text-green-700" : "bg-pink-50 text-pink-600"}`}
					>
						{notice.text}
					</p>
				)}

				<section className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
					<div className="divide-y divide-ink-100">
						{users.map((u) => {
							const last = fmtLastLogin(u.lastLoginAt);
							const isMe = u.id === meId;
							return (
								<div key={u.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<span className="truncate font-semibold text-ink-900">{u.name}</span>
											<span
												className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
													u.role === "admin" ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-600"
												}`}
											>
												{u.role}
											</span>
											{isMe && <span className="text-[11px] text-ink-400">(vos)</span>}
										</div>
										<div className="mt-0.5 truncate text-sm text-ink-600">{u.email}</div>
									</div>
									<div className="text-right text-xs">
										<div className={last.stale ? "text-ink-400" : "text-ink-700"} title={u.lastLoginAt ?? "Nunca ingresó"}>
											Último ingreso: {last.text}
										</div>
										<div className="text-ink-400">Alta: {u.createdAt.slice(0, 10)}</div>
									</div>
									<div className="flex items-center gap-1">
										<button onClick={() => sendReset(u)} className={iconBtn} title="Enviar link para restablecer la clave" aria-label={`Enviar reset a ${u.email}`}>
											<Mail size={16} />
										</button>
										<button onClick={() => setEditing(u)} className={iconBtn} title="Editar" aria-label={`Editar ${u.email}`}>
											<Pencil size={16} />
										</button>
										<button
											onClick={() => setDeleting(u)}
											// El propio usuario no se borra a sí mismo; el resto lo valida el servidor.
											disabled={isMe}
											className={`${iconBtn} hover:text-pink-600`}
											title="Eliminar"
											aria-label={`Eliminar ${u.email}`}
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			</div>

			<UserDialog
				key={editing === "new" ? "new" : (editing?.id ?? "closed")}
				open={editing !== null}
				editing={editing === "new" ? null : editing}
				isMe={editing !== "new" && editing?.id === meId}
				onClose={() => setEditing(null)}
				onDone={(text) => {
					setEditing(null);
					flash(true, text);
					router.refresh();
				}}
			/>

			<ConfirmDelete
				open={deleting !== null}
				label={deleting ? `a ${deleting.email}` : ""}
				description="Pierde el acceso al panel de inmediato. Esta acción no se puede deshacer."
				onCancel={() => setDeleting(null)}
				onConfirm={remove}
			/>
		</div>
	);
}

// Alta y edición en el mismo <dialog> nativo (ver ConfirmDelete para el porqué).
function UserDialog({
	open,
	editing,
	isMe,
	onClose,
	onDone,
}: {
	open: boolean;
	editing: AdminUser | null;
	isMe: boolean;
	onClose: () => void;
	onDone: (text: string) => void;
}) {
	const ref = useRef<HTMLDialogElement>(null);
	const [name, setName] = useState(editing?.name ?? "");
	const [email, setEmail] = useState(editing?.email ?? "");
	const [role, setRole] = useState<UserRole>(editing?.role ?? "user");
	const [password, setPassword] = useState("");
	const [invite, setInvite] = useState(true);
	const [error, setError] = useState("");
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (open && !el.open) el.showModal();
		else if (!open && el.open) el.close();
	}, [open]);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			if (editing) {
				if (name.trim() !== editing.name) {
					const r = await authClient.admin.updateUser({ userId: editing.id, data: { name: name.trim() } });
					if (r.error) throw r.error;
				}
				if (role !== editing.role) {
					const r = await authClient.admin.setRole({ userId: editing.id, role });
					if (r.error) throw r.error;
				}
				if (password) {
					const r = await authClient.admin.setUserPassword({ userId: editing.id, newPassword: password });
					if (r.error) throw r.error;
				}
				onDone("Usuario actualizado");
			} else {
				const r = await authClient.admin.createUser({
					email: email.trim().toLowerCase(),
					name: name.trim() || email.trim(),
					role,
					password: invite ? randomPassword() : password,
				});
				if (r.error) throw r.error;
				if (invite) {
					const s = await authClient.requestPasswordReset({ email: r.data.user.email, redirectTo: RESET_REDIRECT });
					if (s.error) throw s.error;
					onDone(`Invitación enviada a ${r.data.user.email}`);
				} else {
					onDone("Usuario creado");
				}
			}
		} catch (err) {
			setError((err as { message?: string }).message ?? "No se pudo guardar");
		} finally {
			setBusy(false);
		}
	}

	return (
		<dialog
			ref={ref}
			onCancel={(e) => {
				e.preventDefault();
				if (!busy) onClose();
			}}
			onClick={(e) => {
				if (e.target === ref.current && !busy) onClose();
			}}
			className="m-auto w-[min(28rem,calc(100vw-2rem))] rounded-2xl border border-ink-200 bg-white p-0 text-ink-900 shadow-xl backdrop:bg-ink-900/40"
		>
			<form onSubmit={submit} className="p-6">
				<h2 className="text-lg font-semibold text-ink-900">{editing ? "Editar usuario" : "Nuevo usuario"}</h2>
				<p className="mt-1 mb-5 text-sm text-ink-600">
					{editing
						? "Dejá la contraseña vacía para no cambiarla."
						: "Con invitación, la persona elige su contraseña desde un link por email."}
				</p>

				<label className={labelClass} htmlFor="u-name">Nombre</label>
				<input id="u-name" required value={name} onChange={(e) => setName(e.target.value)} className={`${inputClass} mb-3`} />

				<label className={labelClass} htmlFor="u-email">Email</label>
				<input
					id="u-email"
					type="email"
					required
					// El email es la identidad de la cuenta: no se edita.
					disabled={!!editing}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={`${inputClass} mb-3`}
				/>

				<label className={labelClass} htmlFor="u-role">Rol</label>
				<select
					id="u-role"
					value={role}
					// No te quitás tu propio admin: te dejaría fuera de esta pantalla.
					disabled={isMe}
					onChange={(e) => setRole(e.target.value as UserRole)}
					className={`${inputClass} mb-3`}
				>
					<option value="admin">Admin — acceso total, gestiona usuarios</option>
					<option value="user">User — leads, blog y perfil</option>
				</select>

				{!editing && (
					<label className="mb-3 flex items-center gap-2 text-sm text-ink-700">
						<input type="checkbox" checked={invite} onChange={(e) => setInvite(e.target.checked)} className="accent-pink-600" />
						Enviar invitación por email (sin definir contraseña)
					</label>
				)}

				{(editing || !invite) && (
					<>
						<label className={labelClass} htmlFor="u-pass">
							{editing ? "Nueva contraseña (opcional)" : "Contraseña"}
						</label>
						<input
							id="u-pass"
							type="password"
							autoComplete="new-password"
							required={!editing}
							minLength={8}
							placeholder="Mínimo 8 caracteres"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`${inputClass} mb-3`}
						/>
					</>
				)}

				{error && <p className="mb-3 text-sm text-pink-600">{error}</p>}

				<div className="mt-4 flex justify-end gap-2">
					<button type="button" onClick={onClose} disabled={busy} className="rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 disabled:opacity-60">
						Cancelar
					</button>
					<button type="submit" disabled={busy} className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2A3C] disabled:opacity-60">
						{!editing && invite && <Mail size={15} />}
						{editing && password && <KeyRound size={15} />}
						{busy ? "Guardando…" : editing ? "Guardar" : invite ? "Invitar" : "Crear"}
					</button>
				</div>
			</form>
		</dialog>
	);
}
