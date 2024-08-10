"use client";

import { Testing } from "@repo/ui/testing";
import Balance from "../components/balance";
import { signOut, useSession } from "next-auth/react";
import { AppbarClient } from "../components/appbarClient";

export default function Home() {
  const session = useSession();
  return (
    <div className="bg-[#0f0f10] h-screen">
      <div>
      <AppbarClient/>
      </div>
          <div className="text-3xl bg-slate-300">Hi there</div>
          <div>
            <Testing />
          </div>
          <Balance/>
          <div>
          </div>
          <div className="bg-slate-400"> {JSON.stringify(session)}</div>
          <div>
          <button className="bg-zinc-400 w-full mb-10" onClick={()=>{
            signOut()
          }}>SignOut</button>
          </div>
          <div className="text-white w-80 border h-80 rounded-xl ml-10 text-center bg-[#18181a] border-neutral-500">
            hi
          </div>
    </div>

  );
}
