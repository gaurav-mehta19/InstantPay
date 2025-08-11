import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ComponentSkeleton } from "../../components/skeletons";

// Lazy load sidebar component
const SideBarClient = dynamic(() => import("../../components/sideBarClient").then(mod => ({ default: mod.SideBarClient })), {
  loading: () => <ComponentSkeleton />
});

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <Suspense fallback={<ComponentSkeleton />}>
                <SideBarClient />
            </Suspense>
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
}

