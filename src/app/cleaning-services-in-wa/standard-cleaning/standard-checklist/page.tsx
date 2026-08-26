import { getChecklist } from "@/features/checklists/checklists-data";
import ChecklistPageView, { checklistMetadata } from "@/features/checklists/ChecklistPageView";

const page = getChecklist("standard-cleaning", "standard-checklist");

export const metadata = checklistMetadata(page);

export default function StandardChecklistPage() {
	return <ChecklistPageView page={page} />;
}
