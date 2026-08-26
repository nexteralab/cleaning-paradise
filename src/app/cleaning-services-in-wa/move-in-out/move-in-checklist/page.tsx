import { getChecklist } from "@/features/checklists/checklists-data";
import ChecklistPageView, { checklistMetadata } from "@/features/checklists/ChecklistPageView";

const page = getChecklist("move-in-out", "move-in-checklist");

export const metadata = checklistMetadata(page);

export default function MoveInChecklistPage() {
	return <ChecklistPageView page={page} />;
}
