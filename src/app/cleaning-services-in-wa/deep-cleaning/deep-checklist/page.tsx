import { getChecklist } from "@/features/checklists/checklists-data";
import ChecklistPageView, { checklistMetadata } from "@/features/checklists/ChecklistPageView";

const page = getChecklist("deep-cleaning", "deep-checklist");

export const metadata = checklistMetadata(page);

export default function DeepChecklistPage() {
	return <ChecklistPageView page={page} />;
}
