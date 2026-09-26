// "September 2026" — en hora del Pacífico para que no cambie de mes antes que en Seattle.
export function currentMonth(): string {
	return new Date().toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
		timeZone: "America/Los_Angeles",
	});
}
