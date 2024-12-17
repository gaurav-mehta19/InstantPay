import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../../../lib/auth"
import prisma from "@repo/db/client"
import { Profile } from "../../../components/profile"

async function getProfile(){
    const session = await getServerSession(NEXT_AUTH)

    const profile = await prisma.user.findFirst({
        where:{
            id:session?.user?.id
        },
        select:{
            phone:true,
            name:true,
        }
    })

    if (!profile) {
        throw new Error("Profile not found");
    }

    return {
        phone:profile?.phone,
        name:profile?.name,
    }
}

export default async function Transfer(){
    const profile = await getProfile()

    return (
        <div className="flex justify-center items-center w-screen">
        <Profile name={profile.name} phone={profile.phone} ></Profile>
        </div>
    )
} 
