"use client"

import { useRouter } from "next/navigation"


interface SideBarprops {
    href:string,
    title:string,
    icon:React.ReactNode

}

export const SideBar = ({href,title,icon}:SideBarprops) => {
    const router = useRouter()

    return (
        <div onClick={()=> {router.push(href)}} className="flex mt-4 gap-3 ml-8 mb-6">
            <div>{icon}</div>
            <div className="text-base font-medium">{title}</div>
        </div>
    )
}