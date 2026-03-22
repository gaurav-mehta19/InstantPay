import { SideBarClient } from "../../components/sideBarClient";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-bg flex min-h-screen">
      <SideBarClient />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
