import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../lib/auth";

export default async function Page() {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;

  if (session?.user) {
    redirect("/dashboard");
  }

  redirect("/home");
}
