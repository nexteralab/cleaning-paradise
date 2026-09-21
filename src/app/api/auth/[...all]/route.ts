import { getAuth } from "@/lib/auth";

// Todo /api/auth/* lo atiende Better Auth (sign-in/email, sign-out,
// get-session, change-password, update-user…).
export async function GET(req: Request) {
	return (await getAuth()).handler(req);
}
export const POST = GET;
