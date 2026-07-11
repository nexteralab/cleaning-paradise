"use client";

import { useSyncExternalStore } from "react";

// Minimal zustand-style store (no dependency) that persists the lead the
// chatbot collects to localStorage, so a half-finished conversation survives
// reloads and the data is readable app-wide.
export type Lead = {
	name?: string;
	email?: string;
	phone?: string;
	service?: string;
	city?: string;
	sqft?: string;
	pets?: "Yes" | "No";
	date?: string;
	frequency?: string;
	notes?: string;
	completedAt?: string;
};

const KEY = "cp_lead";
type Listener = () => void;
const listeners = new Set<Listener>();

function load(): Lead {
	if (typeof window === "undefined") return {};
	try {
		return JSON.parse(localStorage.getItem(KEY) || "{}") as Lead;
	} catch {
		return {};
	}
}

let state: Lead = load();
const serverSnapshot: Lead = {};

function persist() {
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {
		/* storage full / disabled — keep in-memory only */
	}
	listeners.forEach((l) => l());
}

export function getLead(): Lead {
	return state;
}

export function setLead(patch: Partial<Lead>) {
	state = { ...state, ...patch };
	persist();
}

export function resetLead() {
	state = {};
	persist();
}

function subscribe(l: Listener) {
	listeners.add(l);
	return () => listeners.delete(l);
}

export function useLead(): Lead {
	return useSyncExternalStore(subscribe, getLead, () => serverSnapshot);
}
