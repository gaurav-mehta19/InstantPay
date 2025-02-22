"use server"

import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export async function checkCredentials(username:string,password:string,amount:number){

    const user = await prisma.bank.findFirst({
        where:{
            userID:username,
        },
        select:{
            password:true,
            balance:true,
            accountNumber:true
            
        }
    })

    if(!user){
        return {
            message:"Invalid username"
        }
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(!passwordMatch){
        return {
            message:"Invalid password"
        }
    }   

    if(amount>user.balance){
        return {
            message:"Insufficient balance"
        }
    }

    await prisma.bank.update({
        where:{
            accountNumber:user.accountNumber
        },
        data:{
            balance:{
                decrement:amount
            }
        }
    })

    return {
        message:"Success"
}
}
