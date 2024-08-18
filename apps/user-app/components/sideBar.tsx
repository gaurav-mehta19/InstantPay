"use client"

import { useRouter } from "next/navigation"


interface SideBarprops {
    href: string,
    title: string,
    icon: React.ReactNode

}

export const SideBar = ({ href, title, icon }: SideBarprops) => {
    const router = useRouter()

    return (
        <div onClick={() => { router.push(href) }} className="flex justify-center items-center mt-10 gap-3 py-2 text-neutral-200  h-10 rounded-lg">
            <div className=" w-40 flex gap-2 h-10 justify-center items-center rounded-lg">
                <div>{icon}</div>
                <div className="text-base font-medium hover:text-xl">{title}</div>
            </div>
        </div>
    )
}