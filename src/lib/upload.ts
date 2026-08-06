// Sube una imagen del blog a R2 vía /api/admin/upload y devuelve su URL pública.
export async function uploadBlogImage(file: File): Promise<string> {
	const form = new FormData();
	form.append("file", file);
	const res = await fetch("/api/admin/upload", { method: "POST", body: form });
	const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
	if (!res.ok || !data.url) throw new Error(data.error ?? "upload failed");
	return data.url;
}
