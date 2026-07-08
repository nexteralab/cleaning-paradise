"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");
		const res = await fetch("/api/admin/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password }),
		});
		setLoading(false);
		if (res.ok) {
			router.push("/admin");
			router.refresh();
		} else {
			setError("Incorrect password");
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-ink-50 px-6">
			<form
				onSubmit={onSubmit}
				className="w-full max-w-sm rounded-3xl border border-ink-200 bg-white p-8 shadow-lg"
			>
				<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
					<Lock size={20} />
				</div>
				<h1 className="mb-1 text-xl font-semibold text-ink-900">Admin access</h1>
				<p className="mb-6 text-sm text-ink-600">Enter the admin password to continue.</p>
				<div className="relative mb-3">
					<input
						type={showPassword ? "text" : "password"}
						autoFocus
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="w-full rounded-xl border-[1.5px] border-ink-200 bg-ink-50 px-3.5 py-3 pr-11 text-sm text-ink-900 outline-none focus:border-pink-500 focus:bg-white"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((v) => !v)}
						aria-label={showPassword ? "Hide password" : "Show password"}
						className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-400 hover:text-ink-700"
					>
						{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
					</button>
				</div>
				{error && <p className="mb-3 text-sm text-pink-600">{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A2A3C] disabled:opacity-60"
				>
					{loading ? "Checking…" : "Log in"}
				</button>
				<Link
					href="/"
					className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-900"
				>
					<ArrowLeft size={15} /> Back to home
				</Link>
			</form>
		</div>
	);
}
