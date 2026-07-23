"use client";

// Editor rico que guarda markdown — versión compacta del editor Tiptap de
// app-demo (mismo patrón: @tiptap/markdown + getMarkdown()).
// ponytail: sin slash-commands, tablas ni bubble menu; toolbar fija con lo
// que el blog usa (H2, negrita, cursiva, cita, listas, link, imagen).
import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
	Bold,
	Italic,
	Heading2,
	Quote,
	List,
	ListOrdered,
	Link as LinkIcon,
	ImagePlus,
	Undo,
	Redo,
} from "lucide-react";
import { uploadBlogImage } from "@/lib/supabase/storage";

const btn =
	"flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 disabled:opacity-40";
const btnActive = "bg-ink-900 text-white hover:bg-ink-900 hover:text-white";

export default function MarkdownEditor({
	value,
	onChange,
}: {
	value: string;
	onChange: (markdown: string) => void;
}) {
	const fileInput = useRef<HTMLInputElement>(null);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({ link: { openOnClick: false } }),
			Markdown,
			Image,
			Placeholder.configure({ placeholder: "Write your post…" }),
		],
		content: value,
		contentType: "markdown",
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "prose-blog min-h-[360px] px-5 py-4 outline-none",
			},
		},
		onUpdate: ({ editor }) => onChange(editor.getMarkdown()),
	});

	if (!editor) return null;

	async function insertImage(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file || !editor) return;
		e.target.value = "";
		try {
			const url = await uploadBlogImage(file);
			editor.chain().focus().setImage({ src: url, alt: file.name }).run();
		} catch {
			alert("Image upload failed — ¿corriste la migración 0004 (bucket blog)?");
		}
	}

	function setLink() {
		if (!editor) return;
		const prev = editor.getAttributes("link").href as string | undefined;
		const url = window.prompt("Link URL", prev ?? "https://");
		if (url === null) return;
		if (url === "") {
			editor.chain().focus().unsetLink().run();
			return;
		}
		editor.chain().focus().setLink({ href: url }).run();
	}

	return (
		<div className="overflow-hidden rounded-xl border-[1.5px] border-ink-200 bg-white focus-within:border-pink-500">
			<div className="flex flex-wrap items-center gap-0.5 border-b border-ink-100 px-2 py-1.5">
				<button type="button" onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Bold" className={`${btn} ${editor.isActive("bold") ? btnActive : ""}`}>
					<Bold size={15} />
				</button>
				<button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Italic" className={`${btn} ${editor.isActive("italic") ? btnActive : ""}`}>
					<Italic size={15} />
				</button>
				<button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Heading" className={`${btn} ${editor.isActive("heading", { level: 2 }) ? btnActive : ""}`}>
					<Heading2 size={15} />
				</button>
				<button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} aria-label="Quote" className={`${btn} ${editor.isActive("blockquote") ? btnActive : ""}`}>
					<Quote size={15} />
				</button>
				<button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} aria-label="Numbered list" className={`${btn} ${editor.isActive("orderedList") ? btnActive : ""}`}>
					<ListOrdered size={15} />
				</button>
				<button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label="Bullet list" className={`${btn} ${editor.isActive("bulletList") ? btnActive : ""}`}>
					<List size={15} />
				</button>
				<button type="button" onClick={setLink} aria-label="Link" className={`${btn} ${editor.isActive("link") ? btnActive : ""}`}>
					<LinkIcon size={15} />
				</button>
				<button type="button" onClick={() => fileInput.current?.click()} aria-label="Insert image" className={btn}>
					<ImagePlus size={15} />
				</button>
				<div className="mx-1 h-5 w-px bg-ink-100" />
				<button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} aria-label="Undo" className={btn}>
					<Undo size={15} />
				</button>
				<button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} aria-label="Redo" className={btn}>
					<Redo size={15} />
				</button>
				<input ref={fileInput} type="file" accept="image/*" onChange={insertImage} className="hidden" />
			</div>
			{/* Menú flotante sobre el texto seleccionado — atajo rápido sin subir a la toolbar */}
			<BubbleMenu editor={editor} options={{ placement: "top" }}>
				<div className="flex items-center gap-0.5 rounded-xl border border-ink-200 bg-white p-1 shadow-[0_8px_24px_rgba(19,19,32,0.14)]">
					<button type="button" onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Bold" className={`${btn} ${editor.isActive("bold") ? btnActive : ""}`}>
						<Bold size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Italic" className={`${btn} ${editor.isActive("italic") ? btnActive : ""}`}>
						<Italic size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Heading" className={`${btn} ${editor.isActive("heading", { level: 2 }) ? btnActive : ""}`}>
						<Heading2 size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} aria-label="Quote" className={`${btn} ${editor.isActive("blockquote") ? btnActive : ""}`}>
						<Quote size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} aria-label="Numbered list" className={`${btn} ${editor.isActive("orderedList") ? btnActive : ""}`}>
						<ListOrdered size={14} />
					</button>
					<button type="button" onClick={setLink} aria-label="Link" className={`${btn} ${editor.isActive("link") ? btnActive : ""}`}>
						<LinkIcon size={14} />
					</button>
				</div>
			</BubbleMenu>
			{/* Menú junto al cursor en líneas vacías — todas las opciones de bloque a la mano */}
			<FloatingMenu editor={editor} options={{ placement: "top-start", offset: 8 }}>
				<div className="flex items-center gap-0.5 rounded-xl border border-ink-200 bg-white p-1 shadow-[0_8px_24px_rgba(19,19,32,0.14)]">
					<button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Heading" className={btn}>
						<Heading2 size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Bold" className={btn}>
						<Bold size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Italic" className={btn}>
						<Italic size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} aria-label="Quote" className={btn}>
						<Quote size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} aria-label="Numbered list" className={btn}>
						<ListOrdered size={14} />
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label="Bullet list" className={btn}>
						<List size={14} />
					</button>
					<button type="button" onClick={setLink} aria-label="Link" className={btn}>
						<LinkIcon size={14} />
					</button>
					<button type="button" onClick={() => fileInput.current?.click()} aria-label="Insert image" className={btn}>
						<ImagePlus size={14} />
					</button>
				</div>
			</FloatingMenu>
			<EditorContent editor={editor} />
		</div>
	);
}
