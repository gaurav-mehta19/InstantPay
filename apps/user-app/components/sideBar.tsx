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
        <div onClick={() => { router.push(href) }} className="flex justify-center items-center mt-6 gap-3 py-2 mx-3 text-neutral-200  h-10 rounded-xl hover:bg-slate-600">
            <div className="w-40 flex gap-2 justify-start items-center rounded-lg">
                <div>{icon}</div>
                <div className="text-lg font-normal p-1">{title}</div>
            </div>
        </div>
    )
}