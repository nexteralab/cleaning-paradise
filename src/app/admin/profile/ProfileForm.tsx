"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
	"w-full rounded-xl border-[1.5px] border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-pink-500";
const labelClass = "mb-1.5 block text-xs font-semibold text-ink-600";

type User = {
	email: string;
	name: string | null;
	role: string;
	created_at: string;
	last_login_at: string | null;
};

function formatDate(iso: string | null): string {
	if (!iso) return "—";
	return new Date(iso).toLocaleString("es", { dateStyle: "medium", timeStyle: "short" });
}

export default function ProfileForm({ user }: { user: User }) {
	const router = useRouter();
	const [name, setName] = useState(user.name ?? "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState("");
	const [done, setDone] = useState("");
	const [saving, setSaving] = useState(false);

	async function save(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setDone("");
		const changingPassword = newPassword !== "" || currentPassword !== "";
		if (changingPassword && newPassword !== confirm) {
			setError("La contraseña nueva y su confirmación no coinciden");
			return;
		}
		setSaving(true);
		const res = await fetch("/api/admin/profile", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				...(changingPassword ? { currentPassword, newPassword } : {}),
			}),
		});
		setSaving(false);
		const data = (await res.json().catch(() => ({}))) as { error?: string };
		if (!res.ok) {
			setError(data.error ?? "No se pudo guardar");
			return;
		}
		setCurrentPassword("");
		setNewPassword("");
		setConfirm("");
		setDone(changingPassword ? "Contraseña actualizada" : "Perfil actualizado");
		router.refresh();
	}

	return (
		<div className="px-4 py-8 md:px-8">
			<form onSubmit={save} className="mx-auto max-w-xl">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-ink-900">Perfil</h1>
					<p className="text-sm text-ink-600">{user.email}</p>
				</div>

				<section className="mb-4 rounded-2xl border border-ink-200 bg-white p-5">
					<dl className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<dt className="text-xs font-semibold text-ink-600">Rol</dt>
							<dd className="text-ink-900">{user.role}</dd>
						</div>
						<div>
							<dt className="text-xs font-semibold text-ink-600">Último ingreso</dt>
							<dd className="text-ink-900">{formatDate(user.last_login_at)}</dd>
						</div>
					</dl>
				</section>

				<section className="mb-4 rounded-2xl border border-ink-200 bg-white p-5">
					<label className={labelClass} htmlFor="name">
						Nombre
					</label>
					<input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={inputClass}
					/>
				</section>

				<section className="mb-4 rounded-2xl border border-ink-200 bg-white p-5">
					<h2 className="mb-4 text-sm font-semibold text-ink-900">Cambiar contraseña</h2>
					<p className="mb-4 text-xs text-ink-500">
						Dejalo vacío si no la querés cambiar. Mínimo 8 caracteres.
					</p>
					<label className={labelClass} htmlFor="current">
						Contraseña actual
					</label>
					<input
						id="current"
						type="password"
						autoComplete="current-password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						className={`${inputClass} mb-3`}
					/>
					<label className={labelClass} htmlFor="next">
						Contraseña nueva
					</label>
					<input
						id="next"
						type="password"
						autoComplete="new-password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className={`${inputClass} mb-3`}
					/>
					<label className={labelClass} htmlFor="confirm">
						Repetir la nueva
					</label>
					<input
						id="confirm"
						type="password"
						autoComplete="new-password"
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
						className={inputClass}
					/>
				</section>

				{error && <p className="mb-3 text-sm text-pink-600">{error}</p>}
				{done && <p className="mb-3 text-sm text-green-700">{done}</p>}

				<button
					type="submit"
					disabled={saving}
					className="rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2A3C] disabled:opacity-60"
				>
					{saving ? "Guardando…" : "Guardar"}
				</button>
			</form>
		</div>
	);
}
