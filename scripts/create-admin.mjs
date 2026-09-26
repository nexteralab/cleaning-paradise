// Crea un usuario admin de Better Auth directo en D1 (no hay signup público).
// Uso: node scripts/create-admin.mjs <email> <password> "<Nombre>" [--remote]
// Sin --remote va a la base local (.wrangler/state).
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";

const args = process.argv.slice(2);
const remote = args.includes("--remote");
const [email, password, name] = args.filter((a) => a !== "--remote");
if (!email || !password || !name) {
	console.error('Uso: node scripts/create-admin.mjs <email> <password> "<Nombre>" [--remote]');
	process.exit(1);
}

const q = (v) => `'${String(v).replaceAll("'", "''")}'`;
const userId = randomUUID();
const now = Math.floor(Date.now() / 1000);
const hash = await hashPassword(password);

// Mismo formato que escribe Better Auth: account_id = user_id para provider 'credential'.
const sql = `
INSERT INTO user (id, name, email, email_verified, role, created_at, updated_at)
VALUES (${q(userId)}, ${q(name)}, ${q(email.toLowerCase())}, 1, 'admin', ${now}, ${now});
INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
VALUES (${q(randomUUID())}, ${q(userId)}, 'credential', ${q(userId)}, ${q(hash)}, ${now}, ${now});
`;

execFileSync(
	"npx",
	["wrangler", "d1", "execute", "cleaning-db", remote ? "--remote" : "--local", "--command", sql],
	{ stdio: "inherit" },
);
console.log(`Admin creado: ${email} (${remote ? "remoto" : "local"})`);
