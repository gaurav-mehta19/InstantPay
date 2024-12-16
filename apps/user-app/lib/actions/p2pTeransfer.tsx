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
        const fromBalance = await prisma.balance.findUnique({
            where: {
                userId: from,
            },
        });

        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error("Insufficient Balance");
        }

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

        // Create a transaction for the sender
        await tx.p2PTransaction.create({
            data: {
                amount: -amount, // Negative for the sender
                status: "Success",
                fromUserId: from,
                toUserId: toUser.id,
                direction:"send"
            },
        });

        // Create a transaction for the receiver
        await tx.p2PTransaction.create({
            data: {
                amount: amount, // Positive for the receiver
                status: "Success",
                fromUserId: toUser.id, // Sender becomes the receiver
                toUserId: from, // Receiver becomes the sender
                direction:"receive"
            },
        });

        return { message: "Transaction successful" };
    });

    return result;
}
