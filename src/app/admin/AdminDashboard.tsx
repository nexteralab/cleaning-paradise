"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	CalendarDays,
	Home,
	Inbox,
	Mail,
	MapPin,
	MessageSquare,
	PawPrint,
	Phone,
	Search,
	Sparkles,
	StickyNote,
	Tag,
	Trash2,
} from "lucide-react";
import { SERVICE_LABELS } from "@/lib/email/templates/serviceQuote";
import ConfirmDelete from "./ConfirmDelete";

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
	services: string[] | null;
	service: string | null;
	date: string | null;
	time: string | null;
	frequency: string | null;
	sqft: string | null;
	pets: string | null;
	notes: string | null;
	promo: boolean;
	sms_consent: boolean;
	source: string;
	status: string;
	created_at: string;
};

const STATUSES = ["new", "contacted", "won", "lost"] as const;
const STATUS_STYLE: Record<string, { pill: string; dot: string; avatar: string }> = {
	new: { pill: "bg-pink-50 text-pink-600", dot: "bg-pink-500", avatar: "bg-pink-100 text-pink-700" },
	contacted: { pill: "bg-blue-50 text-blue-600", dot: "bg-blue-500", avatar: "bg-blue-100 text-blue-700" },
	won: { pill: "bg-green-50 text-green-700", dot: "bg-green-500", avatar: "bg-green-100 text-green-700" },
	lost: { pill: "bg-ink-100 text-ink-500", dot: "bg-ink-400", avatar: "bg-ink-100 text-ink-500" },
};
const SOURCES: Record<string, string> = {
	"home-hero": "Homepage",
	contact: "Contact page",
	"service-quote": "Service page",
	chatbot: "Chatbot",
};

const fullName = (l: Lead) => [l.first_name, l.last_name].filter(Boolean).join(" ");
const initials = (l: Lead) => (l.first_name[0] + (l.last_name?.[0] ?? "")).toUpperCase();
const servicesOf = (l: Lead) => {
	const list = l.services?.length ? l.services : l.service ? [l.service] : [];
	return list.map((s) => SERVICE_LABELS[s] ?? s).join(", ");
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
	["year", 31536000],
	["month", 2592000],
	["week", 604800],
	["day", 86400],
	["hour", 3600],
	["minute", 60],
];
function ago(iso: string) {
	const s = (new Date(iso).getTime() - Date.now()) / 1000;
	for (const [unit, n] of UNITS) if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), unit);
	return "just now";
}

export default function AdminDashboard({ leads: initial }: { leads: Lead[] }) {
	const router = useRouter();
	// Cambios de status optimistas: se ven al instante y router.refresh() trae la verdad.
	const [overrides, setOverrides] = useState<Record<number, string>>({});
	const [status, setStatus] = useState<string>("all");
	const [source, setSource] = useState<string>("all");
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [target, setTarget] = useState<Lead | null>(null);

	const leads = useMemo(
		() => initial.map((l) => (overrides[l.id] ? { ...l, status: overrides[l.id] } : l)),
		[initial, overrides],
	);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return leads.filter(
			(l) =>
				(status === "all" || l.status === status) &&
				(source === "all" || l.source === source) &&
				(!q ||
					[fullName(l), l.email, l.phone, l.city, servicesOf(l)]
						.filter(Boolean)
						.some((v) => v!.toLowerCase().includes(q))),
		);
	}, [leads, status, source, query]);

	// Desktop siempre muestra un lead; en mobile el detalle solo abre al tocar uno.
	const active = filtered.find((l) => l.id === selectedId) ?? filtered[0] ?? null;

	const counts = Object.fromEntries(STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length]));
	const weekAgo = Date.now() - 7 * 86400_000;
	const thisWeek = leads.filter((l) => new Date(l.created_at).getTime() >= weekAgo).length;
	const closed = counts.won + counts.lost;
	const winRate = closed ? Math.round((counts.won / closed) * 100) : null;
	const sourcesPresent = [...new Set(leads.map((l) => l.source))];

	async function updateStatus(id: number, next: string) {
		const prev = leads.find((l) => l.id === id)?.status;
		setOverrides((o) => ({ ...o, [id]: next }));
		const res = await fetch("/api/admin/leads", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id, status: next }),
		});
		if (!res.ok && prev) setOverrides((o) => ({ ...o, [id]: prev }));
		router.refresh();
	}

	async function deleteLead() {
		if (!target) return;
		await fetch(`/api/admin/leads?id=${target.id}`, { method: "DELETE" });
		setTarget(null);
		setSelectedId(null);
		router.refresh();
	}

	return (
		<div className="px-4 py-8 md:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-6 flex flex-wrap items-end justify-between gap-4">
					<div>
						<h1 className="text-2xl font-semibold text-ink-900">Leads</h1>
						<p className="text-sm text-ink-500">
							{thisWeek} new this week
							{winRate !== null && <> · {winRate}% win rate</>}
						</p>
					</div>
					<label className="relative w-full sm:w-72">
						<Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-400" />
						<input
							type="search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search name, email, phone, city…"
							aria-label="Search leads"
							className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pr-3 pl-9 text-sm text-ink-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
						/>
					</label>
				</div>

				{/* Pipeline: cada tile es también el filtro */}
				<div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
					{(["all", ...STATUSES] as const).map((s) => {
						const on = status === s;
						return (
							<button
								key={s}
								onClick={() => setStatus(s)}
								aria-pressed={on}
								className={`rounded-2xl border p-4 text-left transition-all ${
									on ? "border-ink-900 bg-ink-900 text-white shadow-lg" : "border-ink-200 bg-white hover:border-ink-300"
								} ${s === "all" ? "col-span-2 sm:col-span-1" : ""}`}
							>
								<div className="text-2xl font-bold">{s === "all" ? leads.length : counts[s]}</div>
								<div
									className={`mt-0.5 flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase ${on ? "text-white/70" : "text-ink-500"}`}
								>
									{s !== "all" && <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLE[s].dot}`} />}
									{s === "all" ? "All leads" : s}
								</div>
							</button>
						);
					})}
				</div>

				{/* Source chips */}
				{sourcesPresent.length > 1 && (
					<div className="mb-4 flex flex-wrap gap-2">
						{["all", ...sourcesPresent].map((s) => (
							<button
								key={s}
								onClick={() => setSource(s)}
								aria-pressed={source === s}
								className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
									source === s
										? "border-pink-500 bg-pink-500 text-white"
										: "border-ink-200 bg-white text-ink-600 hover:border-ink-300"
								}`}
							>
								{s === "all" ? "All sources" : (SOURCES[s] ?? s)}
							</button>
						))}
					</div>
				)}

				{initial.length === 0 ? (
					<Empty title="No leads yet" text="New quote requests from the website will show up here." />
				) : (
					<div className="grid gap-4 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
						{/* List */}
						<section className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
							<div className="border-b border-ink-100 px-4 py-3 text-xs font-semibold text-ink-500">
								{filtered.length} {filtered.length === 1 ? "lead" : "leads"}
							</div>
							{filtered.length === 0 ? (
								<p className="px-4 py-12 text-center text-sm text-ink-500">No leads match these filters.</p>
							) : (
								<ul className="divide-y divide-ink-100 md:max-h-[calc(100vh-300px)] md:overflow-y-auto">
									{filtered.map((l) => {
										const on = active?.id === l.id;
										return (
											<li key={l.id}>
												<button
													onClick={() => setSelectedId(l.id)}
													className={`flex w-full items-start gap-3 border-l-[3px] px-4 py-3 text-left transition-colors ${
														on ? "border-pink-500 bg-pink-50/50" : "border-transparent hover:bg-ink-50"
													}`}
												>
													<Avatar lead={l} />
													<div className="min-w-0 flex-1">
														<div className="flex items-baseline justify-between gap-2">
															<span className="truncate font-semibold text-ink-900">{fullName(l)}</span>
															<span suppressHydrationWarning className="shrink-0 text-[11px] text-ink-400">
																{ago(l.created_at)}
															</span>
														</div>
														<div className="truncate text-[12.5px] text-ink-500">{servicesOf(l) || l.email}</div>
														<div className="mt-1.5 flex flex-wrap items-center gap-1.5">
															<StatusPill status={l.status} />
															<span className="text-[11px] text-ink-400">{SOURCES[l.source] ?? l.source}</span>
															{l.sms_consent && <Badge>SMS ok</Badge>}
														</div>
													</div>
												</button>
											</li>
										);
									})}
								</ul>
							)}
						</section>

						{/* Detail — panel en desktop, pantalla completa en mobile */}
						{active && (
							<aside
								className={`${selectedId !== null ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"} bg-white md:static md:z-auto md:block md:self-start md:overflow-visible md:rounded-2xl md:border md:border-ink-200`}
							>
								<LeadDetail
									lead={active}
									onBack={() => setSelectedId(null)}
									onStatus={(s) => updateStatus(active.id, s)}
									onDelete={() => setTarget(active)}
								/>
							</aside>
						)}
					</div>
				)}
			</div>

			<ConfirmDelete
				open={target !== null}
				label="lead"
				description={
					target
						? `Se va a eliminar el lead de ${fullName(target)} (${target.email}). Esta acción no se puede deshacer.`
						: ""
				}
				onCancel={() => setTarget(null)}
				onConfirm={deleteLead}
			/>
		</div>
	);
}

function LeadDetail({
	lead,
	onBack,
	onStatus,
	onDelete,
}: {
	lead: Lead;
	onBack: () => void;
	onStatus: (s: string) => void;
	onDelete: () => void;
}) {
	const address = [lead.street, lead.unit, lead.city, lead.zip].filter(Boolean).join(", ");
	const schedule = [lead.frequency, lead.date, lead.time].filter(Boolean).join(" · ");
	const tel = lead.phone?.replace(/[^\d+]/g, "");

	return (
		<div className="p-5 md:p-6">
			<button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 md:hidden">
				<ArrowLeft size={16} /> All leads
			</button>

			{/* Identity */}
			<div className="flex items-start gap-4">
				<Avatar lead={lead} large />
				<div className="min-w-0">
					<h2 className="truncate text-xl font-semibold text-ink-900">{fullName(lead)}</h2>
					<p suppressHydrationWarning className="text-[13px] text-ink-500">
						{ago(lead.created_at)} via {SOURCES[lead.source] ?? lead.source} ·{" "}
						{new Date(lead.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
					</p>
				</div>
			</div>

			{/* Stage */}
			<div className="mt-5 grid grid-cols-4 gap-1 rounded-xl bg-ink-100 p-1" role="radiogroup" aria-label="Lead status">
				{STATUSES.map((s) => {
					const on = lead.status === s;
					return (
						<button
							key={s}
							role="radio"
							aria-checked={on}
							onClick={() => !on && onStatus(s)}
							className={`rounded-lg py-2 text-xs font-semibold capitalize transition-all ${
								on ? "bg-white text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-800"
							}`}
						>
							<span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${STATUS_STYLE[s].dot}`} />
							{s}
						</button>
					);
				})}
			</div>

			{/* Quick actions */}
			<div className="mt-4 grid grid-cols-3 gap-2">
				<Action href={tel ? `tel:${tel}` : undefined} icon={<Phone size={16} />} label="Call" />
				<Action href={tel ? `sms:${tel}` : undefined} icon={<MessageSquare size={16} />} label="Text" />
				<Action href={`mailto:${lead.email}`} icon={<Mail size={16} />} label="Email" />
			</div>

			{/* Contact */}
			<Section title="Contact">
				<Row icon={<Mail size={15} />} label="Email">
					<a href={`mailto:${lead.email}`} className="break-all hover:text-pink-600">
						{lead.email}
					</a>
				</Row>
				<Row icon={<Phone size={15} />} label="Phone">
					{lead.phone ?? <span className="text-ink-400">Not provided</span>}
				</Row>
				<Row icon={<MessageSquare size={15} />} label="Text messages">
					{lead.sms_consent ? (
						<span className="font-medium text-green-700">Opted in</span>
					) : (
						<span className="text-ink-400">Not opted in — no automated texts</span>
					)}
				</Row>
			</Section>

			{/* Job */}
			<Section title="Request">
				<Row icon={<Sparkles size={15} />} label="Services">
					{servicesOf(lead) || <span className="text-ink-400">Not specified</span>}
				</Row>
				{lead.sqft && (
					<Row icon={<Home size={15} />} label="Home size">
						{lead.sqft} sq ft
					</Row>
				)}
				{schedule && (
					<Row icon={<CalendarDays size={15} />} label="When">
						{schedule}
					</Row>
				)}
				{address && (
					<Row icon={<MapPin size={15} />} label="Address">
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
							target="_blank"
							rel="noreferrer"
							className="hover:text-pink-600"
						>
							{address}
						</a>
					</Row>
				)}
				{lead.pets && (
					<Row icon={<PawPrint size={15} />} label="Pets">
						<span className="capitalize">{lead.pets}</span>
					</Row>
				)}
				{lead.promo && (
					<Row icon={<Tag size={15} />} label="Promo">
						<span className="font-medium text-pink-600">10% off first clean</span>
					</Row>
				)}
			</Section>

			{lead.notes && (
				<Section title="Notes">
					<div className="flex gap-3 rounded-xl bg-amber-50 p-3.5 text-sm leading-relaxed whitespace-pre-wrap text-ink-700">
						<StickyNote size={15} className="mt-0.5 shrink-0 text-amber-500" />
						{lead.notes}
					</div>
				</Section>
			)}

			<div className="mt-6 border-t border-ink-100 pt-4">
				<button
					onClick={onDelete}
					className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 transition-colors hover:bg-pink-50 hover:text-pink-600"
				>
					<Trash2 size={14} /> Delete lead
				</button>
			</div>
		</div>
	);
}

function Avatar({ lead, large }: { lead: Lead; large?: boolean }) {
	return (
		<span
			className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${STATUS_STYLE[lead.status]?.avatar ?? "bg-ink-100 text-ink-500"} ${
				large ? "h-14 w-14 text-lg" : "h-9 w-9 text-xs"
			}`}
		>
			{initials(lead)}
		</span>
	);
}

function StatusPill({ status }: { status: string }) {
	return (
		<span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${STATUS_STYLE[status]?.pill ?? "bg-ink-100 text-ink-500"}`}>
			{status}
		</span>
	);
}

function Badge({ children }: { children: React.ReactNode }) {
	return <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">{children}</span>;
}

function Action({ href, icon, label }: { href?: string; icon: React.ReactNode; label: string }) {
	const cls = "flex flex-col items-center gap-1 rounded-xl border py-2.5 text-xs font-semibold transition-colors";
	return href ? (
		<a href={href} className={`${cls} border-ink-200 text-ink-700 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600`}>
			{icon}
			{label}
		</a>
	) : (
		<span aria-disabled className={`${cls} cursor-not-allowed border-ink-100 text-ink-300`}>
			{icon}
			{label}
		</span>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="mt-6">
			<h3 className="mb-2 text-[11px] font-semibold tracking-wider text-ink-400 uppercase">{title}</h3>
			<div className="space-y-2.5">{children}</div>
		</section>
	);
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
	return (
		<div className="flex gap-3 text-sm">
			<span className="mt-0.5 shrink-0 text-ink-400">{icon}</span>
			<div className="min-w-0">
				<div className="text-[11px] text-ink-400">{label}</div>
				<div className="text-ink-800">{children}</div>
			</div>
		</div>
	);
}

function Empty({ title, text }: { title: string; text: string }) {
	return (
		<div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
			<Inbox size={28} className="mx-auto mb-3 text-ink-300" />
			<div className="font-semibold text-ink-900">{title}</div>
			<p className="mt-1 text-sm text-ink-500">{text}</p>
		</div>
	);
}
