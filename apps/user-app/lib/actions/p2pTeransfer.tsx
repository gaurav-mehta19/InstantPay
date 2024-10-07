
"use server"

import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../auth";
import prisma from "@repo/db/client";
import { toast } from "sonner";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(NEXT_AUTH)
    const from = session?.user?.id

    if (!from) {
        return { message: "You are not logged in" };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            phone: to
        }
    })

    if (!toUser) {
        return { message: "User not found" };
    }

    await prisma.$transaction(async (tx) => {

        const fromBalance = await prisma.balance.findUnique({
            where: {
                userId: from
            }
        })

        if (!fromBalance || fromBalance.amount < amount) {
            toast.warning("Insufficient balance")
            return;
        }

        await tx.balance.update({
            where: {
                userId: from
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })

        await tx.balance.update({
            where: {
                userId: toUser.id
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        })
    })
}