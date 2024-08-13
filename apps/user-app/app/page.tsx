import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getServerSession(NEXT_AUTH)
  if(session?.user){
    redirect('/dashboard')
  }else{
    redirect('/users/signin')
  }
}
