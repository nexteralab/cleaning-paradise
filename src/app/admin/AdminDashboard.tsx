"use client";

import { useRouter } from "next/navigation";
import { Trash2, Mail, Phone } from "lucide-react";

export type Lead = {
	id: number;
	first_name: string;
	last_name: string | null;
	email: string;
	phone: string | null;
	street: string | null;
	unit: string | null;
	city: string | null;
	zip: string | null;
	services: string | null;
	service: string | null;
	date: string | null;
	time: string | null;
	frequency: string | null;
	notes: string | null;
	promo: number;
	source: string;
	status: string;
	created_at: string;
};

const STATUSES = ["new", "contacted", "won", "lost"];
const statusColor: Record<string, string> = {
	new: "bg-pink-50 text-pink-600",
	contacted: "bg-blue-50 text-blue-600",
	won: "bg-green-50 text-green-700",
	lost: "bg-ink-100 text-ink-500",
};

export default function AdminDashboard({ leads }: { leads: Lead[] }) {
	const router = useRouter();

	async function updateStatus(id: number, status: string) {
		await fetch("/api/admin/leads", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id, status }),
		});
		router.refresh();
	}

	async function deleteLead(id: number) {
		if (!confirm("Delete this lead?")) return;
		await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
		router.refresh();
	}

	const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
		acc[s] = leads.filter((l) => l.status === s).length;
		return acc;
	}, {});

	return (
		<div className="px-4 py-8 md:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-ink-900">Leads</h1>
					<p className="text-sm text-ink-600">Cleaning Paradise CMS</p>
				</div>

				{/* Stat tiles */}
				<div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
					{STATUSES.map((s) => (
						<div key={s} className="rounded-2xl border border-ink-200 bg-white p-4">
							<div className="text-2xl font-bold text-ink-900">{counts[s]}</div>
							<div className="text-xs font-medium tracking-wide text-ink-500 uppercase">{s}</div>
						</div>
					))}
				</div>

				{/* Leads */}
				<section className="mb-10 overflow-hidden rounded-2xl border border-ink-200 bg-white">
					<div className="border-b border-ink-200 px-5 py-4">
						<h2 className="font-semibold text-ink-900">Contact leads ({leads.length})</h2>
					</div>
					{leads.length === 0 ? (
						<p className="px-5 py-10 text-center text-sm text-ink-500">No leads yet.</p>
					) : (
						<div className="divide-y divide-ink-100">
							{leads.map((l) => (
								<div key={l.id} className="px-5 py-4">
									<div className="flex flex-wrap items-start justify-between gap-3">
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												<span className="font-semibold text-ink-900">
													{l.first_name} {l.last_name ?? ""}
												</span>
												<span
													className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusColor[l.status] ?? "bg-ink-100 text-ink-500"}`}
												>
													{l.status}
												</span>
												<span className="text-[11px] text-ink-400">{l.source}</span>
											</div>
											<div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-600">
												<a href={`mailto:${l.email}`} className="inline-flex items-center gap-1 hover:text-pink-600">
													<Mail size={13} /> {l.email}
												</a>
												{l.phone && (
													<a href={`tel:${l.phone}`} className="inline-flex items-center gap-1 hover:text-pink-600">
														<Phone size={13} /> {l.phone}
													</a>
												)}
											</div>
											<LeadDetails lead={l} />
										</div>
										<div className="flex items-center gap-2">
											<select
												value={l.status}
												onChange={(e) => updateStatus(l.id, e.target.value)}
												className="rounded-lg border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-700"
											>
												{STATUSES.map((s) => (
													<option key={s} value={s}>
														{s}
													</option>
												))}
											</select>
											<button
												onClick={() => deleteLead(l.id)}
												aria-label="Delete lead"
												className="rounded-lg border border-ink-200 p-2 text-ink-400 hover:bg-pink-50 hover:text-pink-600"
											>
												<Trash2 size={15} />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</section>
			</div>
		</div>
	);
}

function LeadDetails({ lead }: { lead: Lead }) {
	const services = (() => {
		try {
			return lead.services ? (JSON.parse(lead.services) as string[]) : [];
		} catch {
			return [];
		}
	})();
	const addr = [lead.street, lead.unit, lead.city, lead.zip].filter(Boolean).join(", ");
	const sched = [lead.frequency, lead.date, lead.time].filter(Boolean).join(" · ");

	return (
		<div className="mt-2 space-y-1 text-[13px] text-ink-600">
			{services.length > 0 && (
				<div>
					<span className="text-ink-400">Services:</span> {services.join(", ")}
				</div>
			)}
			{lead.service && (
				<div>
					<span className="text-ink-400">Service:</span> {lead.service}
				</div>
			)}
			{addr && (
				<div>
					<span className="text-ink-400">Address:</span> {addr}
				</div>
			)}
			{sched && (
				<div>
					<span className="text-ink-400">When:</span> {sched}
				</div>
			)}
			{lead.notes && (
				<div>
					<span className="text-ink-400">Notes:</span> {lead.notes}
				</div>
			)}
			<div className="text-[11px] text-ink-400">
				{new Date(lead.created_at).toLocaleString()}
				{lead.promo ? " · wants 30% promo" : ""}
			</div>
		</div>
	);
}
