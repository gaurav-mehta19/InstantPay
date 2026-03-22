"use client";

import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { isDemoLoadingAtom, shouldRedirectAtom } from "@repo/store/demo";
import { AppBar } from "./appB";

export default function AppBarClient() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardRoute = Boolean(pathname?.startsWith("/dashboard"));
  const [isDemoLoading, setIsDemoLoading] = useRecoilState(isDemoLoadingAtom);
  const [shouldRedirect, setShouldRedirect] =
    useRecoilState(shouldRedirectAtom);

  useEffect(() => {
    if (
      session.data?.user &&
      isDashboardRoute &&
      (isDemoLoading || shouldRedirect)
    ) {
      const timer = setTimeout(() => {
        setIsDemoLoading(false);
        setShouldRedirect(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [
    isDemoLoading,
    isDashboardRoute,
    session.data?.user,
    setIsDemoLoading,
    setShouldRedirect,
    shouldRedirect,
  ]);

  useEffect(() => {
    if (isDemoLoading || shouldRedirect) {
      const fallbackTimer = setTimeout(() => {
        setIsDemoLoading(false);
        setShouldRedirect(false);
      }, 10000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [isDemoLoading, setIsDemoLoading, setShouldRedirect, shouldRedirect]);

  const shouldMaskUser = Boolean(
    !session.data?.user &&
      (isDemoLoading || shouldRedirect) &&
      isDashboardRoute,
  );

  const handleDemo = async () => {
    setIsDemoLoading(true);
    setShouldRedirect(true);
    try {
      const res = await signIn("credentials", {
        phone: process.env.NEXT_PUBLIC_PHONE,
        password: process.env.NEXT_PUBLIC_PASSWORD,
        redirect: false,
      });
      if (res?.error) {
        setIsDemoLoading(false);
        setShouldRedirect(false);
      } else {
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      }
    } catch {
      setIsDemoLoading(false);
      setShouldRedirect(false);
    }
  };

  return (
    <AppBar
      onsignIn={() => {
        void signIn();
      }}
      onsignOut={async () => {
        try {
          setIsDemoLoading(false);
          await signOut({ redirect: false });
          toast.success("Logged out successfully");
          if (typeof window !== "undefined") {
            window.location.href = "/home";
          }
        } catch {
          toast.error("Error during logout");
          if (typeof window !== "undefined") {
            window.location.href = "/home";
          }
        }
      }}
      user={shouldMaskUser ? null : session.data?.user}
      onDemo={handleDemo}
      isDemoLoading={isDemoLoading}
    />
  );
}
