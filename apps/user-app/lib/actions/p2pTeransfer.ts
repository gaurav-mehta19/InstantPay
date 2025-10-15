"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(NEXT_AUTH);
    const from = session?.user?.id;

    if (!from) {
        return { message: "You are not logged in" };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            phone: to,
        },
    });

    if (!toUser) {
        return { message: "User not found" };
    }

    const result = await prisma.$transaction(async (tx) => {
        await tx.$queryRaw `SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: from,
            },
        });
   

        if (!fromBalance || fromBalance.amount < amount) {
            return { message : "Insufficient Balance"};
        }

        // console.log("before sleep");
        // await new Promise((resolve) => setTimeout(resolve, 2000)); 
        // console.log("after sleep");


        // Decrement the sender's balance
        await tx.balance.update({
            where: {
                userId: from,
            },
            data: {
                amount: {
                    decrement: amount,
                },
            },
        });

        // Increment the recipient's balance
        await tx.balance.update({
            where: {
                userId: toUser.id,
            },
            data: {
                amount: {
                    increment: amount,
                },
            },
        });

        // Create a single transaction record for the transfer
        await tx.p2PTransaction.create({
            data: {
                amount: amount, // Store absolute amount
                status: "Success",
                fromUserId: from,
                toUserId: toUser.id,
                direction: "transfer" // Use a single direction to avoid confusion
            },
        });

        return { message: "Transaction successful" };
    });

    return result;
}
