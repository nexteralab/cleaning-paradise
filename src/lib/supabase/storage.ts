// Subida de imágenes del blog al bucket público "blog" de Supabase Storage
// (migración 0004). Corre en el navegador con la sesión del admin —
// las policies solo permiten insert/delete a usuarios autenticados.
import { supabaseBrowser } from "./browser";

export async function uploadBlogImage(file: File): Promise<string> {
	const ext = file.name.split(".").pop() ?? "bin";
	const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
	const supabase = supabaseBrowser();
	const { error } = await supabase.storage.from("blog").upload(fileName, file, { upsert: false });
	if (error) throw error;
	const { data } = supabase.storage.from("blog").getPublicUrl(fileName);
	return data.publicUrl;
}
