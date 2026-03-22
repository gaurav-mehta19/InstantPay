import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "../../lib/auth";
import LandingClientWrapper from "../landing/LandingClientWrapper";

export default async function Home() {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;

  if (session?.user) {
    redirect("/dashboard");
  }

  return <LandingClientWrapper />;
}
