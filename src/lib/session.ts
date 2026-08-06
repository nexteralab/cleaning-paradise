import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SESSION_COOKIE, verifySession } from "./auth";

// Chequeo real de sesión, para páginas y rutas de /admin.
//
// El middleware NO puede hacer esto: corre en el runtime edge, donde en
// `next dev` el contexto de Cloudflare llega por un monkey-patch asíncrono de
// initOpenNextCloudflareForDev() y hay una carrera. Acá estamos en runtime
// node, donde getCloudflareContext resuelve solo. Además Next recomienda que
// el middleware no sea el único control de acceso.
//
// Devuelve el id del usuario, o null.
export async function getSessionUserId(): Promise<string | null> {
	const { env } = await getCloudflareContext({ async: true });
	const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
	return verifySession(env.AUTH_SECRET, cookie);
}
