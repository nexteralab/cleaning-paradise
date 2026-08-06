"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

// ponytail: <dialog> nativo — el focus trap, la tecla Esc, el backdrop y el
// aria-modal salen gratis. No hace falta portal, librería de modales ni
// bloquear el scroll a mano.

const CONFIRM_WORD = "DELETE";

export default function ConfirmDelete({
	open,
	label,
	description,
	onCancel,
	onConfirm,
}: {
	open: boolean;
	/** Qué se va a borrar, para que se vea en el diálogo. */
	label: string;
	description?: string;
	onCancel: () => void;
	onConfirm: () => Promise<void> | void;
}) {
	const ref = useRef<HTMLDialogElement>(null);
	const [typed, setTyped] = useState("");
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (open && !el.open) {
			setTyped("");
			el.showModal();
		} else if (!open && el.open) {
			el.close();
		}
	}, [open]);

	const ready = typed.trim().toUpperCase() === CONFIRM_WORD;

	function close() {
		if (!busy) onCancel();
	}

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		if (!ready || busy) return;
		setBusy(true);
		try {
			await onConfirm();
		} finally {
			setBusy(false);
		}
	}

	return (
		<dialog
			ref={ref}
			aria-labelledby="confirm-delete-title"
			onCancel={(e) => {
				e.preventDefault();
				close();
			}}
			// Cerrar al hacer clic en el backdrop: el click cae en el <dialog>
			// y no en su contenido.
			onClick={(e) => {
				if (e.target === ref.current) close();
			}}
			className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-ink-200 bg-white p-0 text-ink-900 shadow-xl backdrop:bg-ink-900/40"
		>
			<form onSubmit={submit} className="p-6">
				<div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
					<AlertTriangle size={20} />
				</div>

				<h2 id="confirm-delete-title" className="text-lg font-semibold text-ink-900">
					Eliminar {label}
				</h2>
				<p className="mt-1.5 text-sm text-ink-600">
					{description ?? "Esta acción no se puede deshacer."}
				</p>

				<label htmlFor="confirm-delete-input" className="mt-5 mb-1.5 block text-xs text-ink-600">
					Escribí <span className="font-semibold text-ink-900">{CONFIRM_WORD}</span> para
					confirmar
				</label>
				<input
					id="confirm-delete-input"
					autoFocus
					autoComplete="off"
					value={typed}
					onChange={(e) => setTyped(e.target.value)}
					placeholder={CONFIRM_WORD}
					className="w-full rounded-xl border-[1.5px] border-ink-200 bg-white px-3.5 py-2.5 text-sm tracking-wide outline-none transition-colors focus:border-pink-500"
				/>

				<div className="mt-6 flex justify-end gap-2">
					<button
						type="button"
						onClick={close}
						disabled={busy}
						className="rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 disabled:opacity-60"
					>
						Cancelar
					</button>
					<button
						type="submit"
						disabled={!ready || busy}
						className="rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-40"
					>
						{busy ? "Eliminando…" : "Eliminar"}
					</button>
				</div>
			</form>
		</dialog>
	);
}
