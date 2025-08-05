import { SideBarClient } from "../../components/sideBarClient"

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <SideBarClient />
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
}

