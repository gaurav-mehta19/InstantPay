"use client";

import { usePathname, useRouter } from "next/navigation";

interface SideBarProps {
  href: string;
  title: string;
  icon: JSX.Element;
}

export const SideBar = ({ href, title, icon }: SideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleNavigation = () => {
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={handleNavigation}
      className={`sidebar-link w-full text-left ${isActive ? "sidebar-link-active" : ""}`}
    >
      <span className="sidebar-icon">{icon}</span>
      {title}
    </button>
  );
};
