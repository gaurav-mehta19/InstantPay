"use server"
import { randomBytes } from 'crypto';
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount:number , provider:string){
    const session = await getServerSession(NEXT_AUTH)
    const token = randomBytes(32).toString('hex');
    const userId = session?.user?.id

    if(!userId){
        return {
            message:"you are not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            amount,
            provider,
            userId,
            status:"Processing",
            token:token,
        }
    })
    
    return {
        token,
        message:"On Ramp Transaction created"
    }
}