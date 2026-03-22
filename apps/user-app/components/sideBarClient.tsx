"use client";

import { useSideBar } from "@repo/store/useSideBar";
import { SideBar } from "./sideBar";
import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

export const SideBarClient: React.FC = () => {
  const isSideBarOpen = useSideBar();

  return (
    <>
      <div
        className={`hidden shrink-0 transition-all duration-300 md:block ${isSideBarOpen ? "w-64" : "w-0"}`}
      />
      <aside
        className={`app-sidebar fixed bottom-0 left-0 top-16 z-10 hidden overflow-hidden border-r backdrop-blur transition-all duration-300 ease-out md:block ${
          isSideBarOpen ? "w-64" : "w-0"
        }`}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="app-sidebar-head border-b px-5 py-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Workspace
            </h2>
            <p className="mt-1 text-base font-semibold text-neutral-900">
              Wallet Navigation
            </p>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            <SideBar
              href="/dashboard"
              title="Dashboard"
              icon={<LayoutDashboard className="h-4 w-4" />}
            />
            <SideBar
              href="/transaction"
              title="Transactions"
              icon={<ChartNoAxesCombined className="h-4 w-4" />}
            />
            <SideBar
              href="/transfer"
              title="P2P Transfer"
              icon={<ArrowLeftRight className="h-4 w-4" />}
            />
            <SideBar
              href="/profile"
              title="Profile"
              icon={<UserRound className="h-4 w-4" />}
            />
          </div>

          <div className="border-t border-[var(--border)] px-4 py-4">
            <div className="secure-mode-card rounded-xl border px-3 py-2">
              <p className="secure-mode-title text-xs font-medium">
                Secure Mode
              </p>
              <p className="secure-mode-subtitle mt-0.5 text-xs">
                Protected wallet session
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
