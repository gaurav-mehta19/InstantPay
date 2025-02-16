"use client";

import { useRouter } from "next/navigation";

interface SideBarProps {
  href: string;
  title: string; 
  icon: React.ReactElement; 
}

export const SideBar = ({ href, title, icon }: SideBarProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(href);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNavigation}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleNavigation();
      }}
      className="sidebar-button flex items-center gap-3 p-2 mx-6 mt-6 text-gray-600 h-10 rounded-xl hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex items-center gap-2 w-full">
        <div className="text-xl">{icon}</div>
        <div className="text-lg">{title}</div>
      </div>
    </div>
  );
};