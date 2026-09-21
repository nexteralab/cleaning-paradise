import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { Auth } from "./auth";

// `import type` — solo tipos, no arrastra el servidor al bundle del cliente.
export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<Auth>(), adminClient()],
});
