// Sube una imagen del blog a R2 vía /api/admin/upload y devuelve su URL pública.
export async function uploadBlogImage(file: File): Promise<string> {
	const form = new FormData();
	form.append("file", await shrink(file));
	const res = await fetch("/api/admin/upload", { method: "POST", body: form });
	const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
	if (!res.ok || !data.url) throw new Error(data.error ?? "upload failed");
	return data.url;
}

const MAX_WIDTH = 1600;

// Reduce la foto en el navegador (canvas nativo) antes de subirla: las fotos de
// cámara llegaban a 3-11 MB. GIF/SVG van tal cual (animación/vector). Si el
// resultado no es más chico, se sube el original.
async function shrink(file: File): Promise<File> {
	if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
	try {
		const bmp = await createImageBitmap(file);
		const scale = Math.min(1, MAX_WIDTH / bmp.width);
		const canvas = document.createElement("canvas");
		canvas.width = Math.round(bmp.width * scale);
		canvas.height = Math.round(bmp.height * scale);
		canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
		bmp.close();
		const toBlob = (type: string) =>
			new Promise<Blob | null>((r) => canvas.toBlob(r, type, 0.82));
		// Safari viejo no codifica webp y devuelve PNG: en ese caso, JPEG.
		let blob = await toBlob("image/webp");
		if (blob?.type !== "image/webp") blob = await toBlob("image/jpeg");
		if (!blob || blob.size >= file.size) return file;
		const ext = blob.type === "image/webp" ? "webp" : "jpg";
		return new File([blob], file.name.replace(/\.[^.]+$/, "") + "." + ext, { type: blob.type });
	} catch {
		return file;
	}
}
