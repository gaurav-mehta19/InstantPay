"use client"
import { useSideBar } from "@repo/store/useSideBar";
import { SideBar } from "./sideBar";

export const SideBarClient: React.FC = () => {
  const isSideBarOpen = useSideBar();

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isSideBarOpen ? "w-80" : "w-0"
      } overflow-hidden border-r border-neutral-200 shadow-elegant min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-secondary-50/30 backdrop-blur-sm flex flex-col`}
    >
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">InstantPay</h2>
            <p className="text-xs text-neutral-600">Digital Wallet</p>
          </div>
        </div>
      </div>
      
      <div className="py-4 flex-1">
        <SideBar href="/dashboard" icon={<HomeIcon />} title="Dashboard" />
        <SideBar href="/transaction" icon={<TransactionsIcon />} title="Transactions" />
        <SideBar href="/transfer" icon={<TransferIcon />} title="P2P Transfer" />
        <SideBar href="/profile" icon={<ProfileIcon />} title="Profile" />
      </div>
      
      <div className="p-4 mt-auto">
        <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-700">Secure & Protected</p>
              <p className="text-xs text-neutral-600">Bank-grade security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0052FF" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
}

function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0052FF" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0052FF" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
}

function ProfileIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0052FF" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
}

