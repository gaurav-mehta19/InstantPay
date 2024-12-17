"use server"

import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../auth"
import prisma from "@repo/db/client"

export async function createBalance(){
    const session = await getServerSession(NEXT_AUTH)
    const userId = session?.user?.id

    if(!userId){
        return {
            message:"you are not logged in"
        }
    }

    await prisma.balance.create({
        data:{
            amount:0,
            userId,
            locked:0
        }
    })

    return {
        message:"balance created"
    }
}