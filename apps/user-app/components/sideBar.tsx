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
      className="group flex items-center gap-4 p-4 mx-4 my-2 text-neutral-600 rounded-2xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md"
    >
      <div className="p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300">
        <div className="text-xl">{icon}</div>
      </div>
      <div className="text-lg font-medium group-hover:font-semibold transition-all duration-300">{title}</div>
    </div>
  );
};