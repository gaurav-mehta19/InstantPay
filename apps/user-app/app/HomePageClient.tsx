"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading session

    if (session?.user) {
      // Redirect to dashboard for authenticated users
      router.push("/dashboard");
    } else {
      // Redirect to landing for unauthenticated users
      router.push("/landing");
    }
  }, [session, status, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg font-medium text-neutral-600">Loading...</p>
      </div>
    </div>
  );
}