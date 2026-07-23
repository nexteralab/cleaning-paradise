// Supabase client para componentes cliente (login, logout).
// La publishable key es pública por diseño — el acceso real lo controla RLS.
import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowser = () =>
	createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
	);
