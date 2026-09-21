"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

// Destino del link que manda Better Auth (invitación o reset). Pública: el
// middleware la deja pasar sin cookie. Llega con ?token=… o ?error=INVALID_TOKEN.
export default function ResetPasswordPage() {
	return (
		<Suspense>
			<ResetForm />
		</Suspense>
	);
}

function ResetForm() {
	const router = useRouter();
	const params = useSearchParams();
	const token = params.get("token");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState(params.get("error") ? "El link no es válido o ya venció. Pedí uno nuevo." : "");
	const [busy, setBusy] = useState(false);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		if (password !== confirm) return setError("Las contraseñas no coinciden");
		if (!token) return setError("Falta el token del link");
		setBusy(true);
		const { error } = await authClient.resetPassword({ newPassword: password, token });
		setBusy(false);
		if (error) return setError(error.message ?? "No se pudo guardar");
		router.push("/admin/login");
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-ink-50 px-6">
			<form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-ink-200 bg-white p-8 shadow-lg">
				<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
					<KeyRound size={20} />
				</div>
				<h1 className="mb-1 text-xl font-semibold text-ink-900">Elegí tu contraseña</h1>
				<p className="mb-6 text-sm text-ink-600">Mínimo 8 caracteres. Después ingresás con tu email.</p>
				<input
					type="password"
					required
					minLength={8}
					autoFocus
					autoComplete="new-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Contraseña nueva"
					className="mb-3 w-full rounded-xl border-[1.5px] border-ink-200 bg-ink-50 px-3.5 py-3 text-sm text-ink-900 outline-none focus:border-pink-500 focus:bg-white"
				/>
				<input
					type="password"
					required
					autoComplete="new-password"
					value={confirm}
					onChange={(e) => setConfirm(e.target.value)}
					placeholder="Repetir contraseña"
					className="mb-3 w-full rounded-xl border-[1.5px] border-ink-200 bg-ink-50 px-3.5 py-3 text-sm text-ink-900 outline-none focus:border-pink-500 focus:bg-white"
				/>
				{error && <p className="mb-3 text-sm text-pink-600">{error}</p>}
				<button
					type="submit"
					disabled={busy || !token}
					className="w-full rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A2A3C] disabled:opacity-60"
				>
					{busy ? "Guardando…" : "Guardar contraseña"}
				</button>
				<Link href="/admin/login" className="mt-4 inline-block text-sm text-ink-500 transition-colors hover:text-ink-900">
					Ir al login
				</Link>
			</form>
		</div>
	);
}
