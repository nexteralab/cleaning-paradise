import { getChecklist } from "@/features/checklists/checklists-data";
import ChecklistPageView, { checklistMetadata } from "@/features/checklists/ChecklistPageView";

const page = getChecklist("move-in-out", "move-out-checklist");

export const metadata = checklistMetadata(page);

export default function MoveOutChecklistPage() {
	return <ChecklistPageView page={page} />;
}
