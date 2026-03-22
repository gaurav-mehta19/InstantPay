"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { Menu, X } from "lucide-react";
import { sideBarAtom } from "@repo/store/sideBar";
import { BrandLogo } from "./shared/BrandLogo";

type UserShape = { name?: string | null } | null | undefined;

interface AppBarProps {
  onsignIn: () => void;
  onsignOut: () => void;
  user: UserShape;
  variant?: "landing" | "dashboard";
  onDemo?: () => void;
  isDemoLoading?: boolean;
}

export const AppBar = ({
  onsignIn,
  onsignOut,
  user,
  variant = "dashboard",
  onDemo,
  isDemoLoading,
}: AppBarProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const isLandingPage =
    pathName === "/" || pathName === "/home" || pathName === "/landing";
  const currentVariant = isLandingPage ? "landing" : variant;

  if (pathName && ["/users/signup", "/users/signin"].includes(pathName)) {
    return null;
  }

  return (
    <nav className="app-navbar sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {currentVariant === "dashboard" && <SideBarToggleButton />}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <BrandLogo className="h-16" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {currentVariant === "landing" && (
            <div className="hidden items-center gap-6 md:flex">
              <a
                href="#features"
                className="text-sm text-muted hover:text-primary-700"
              >
                Features
              </a>
              <a
                href="#security"
                className="text-sm text-muted hover:text-primary-700"
              >
                Security
              </a>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted md:block">
                {user.name || "User"}
              </span>
              <button onClick={onsignOut} className="btn-secondary !py-2">
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {currentVariant === "landing" && onDemo && (
                <button
                  onClick={onDemo}
                  disabled={isDemoLoading}
                  className="btn-secondary !py-2"
                >
                  {isDemoLoading ? "Loading..." : "Try Demo"}
                </button>
              )}
              {currentVariant === "dashboard" && (
                <button
                  onClick={() => router.push("/users/signup")}
                  className="btn-secondary !py-2"
                >
                  Sign up
                </button>
              )}
              <button onClick={onsignIn} className="btn-primary !py-2">
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

function SideBarToggleButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useRecoilState(sideBarAtom);

  if (
    pathname &&
    ["/", "/home", "/landing", "/users/signup", "/users/signin"].includes(
      pathname,
    )
  ) {
    return null;
  }

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="app-icon-btn inline-flex h-9 w-9 items-center justify-center rounded-lg border transition"
      aria-label="Toggle sidebar"
    >
      {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </button>
  );
}
