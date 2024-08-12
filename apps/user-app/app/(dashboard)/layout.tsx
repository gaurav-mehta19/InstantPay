import { SideBarClient } from "../../components/sideBarClient"

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className="flex">
            <div>
                <SideBarClient />
            </div>
            {children}
        </div>
    )
}

