import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { NEXT_AUTH } from "../auth";

export async function getP2Ptransaction() {
    const session = await getServerSession(NEXT_AUTH);
    const p2pTransaction = await prisma.p2PTransaction.findMany({
        where: {
            fromUserId: session?.user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 8,
        select: {
            id: true,
            createdAt: true,
            amount: true,
            status: true,
            fromUserId: true,
            toUserId: true,
            toUser: {
                select: {
                    name: true,
                    phone: true,
                },
            },
            direction: true,
        },
    });

    return p2pTransaction.map((t) => ({
        time: t.createdAt,
        amount: t.amount,
        status: t.status,
        id: t.id,
        toUserId: t.toUserId,
        fromUserId: t.fromUserId,
        direction: t.direction,
        toUserName: t.toUser?.name,
        toUserPhone: t.toUser?.phone,
    }));
}

export async function getTransaction() {
    const session = await getServerSession(NEXT_AUTH);
    const transaction = await prisma.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 8,
    });

    return transaction.map((t) => ({
        time: t.createdAt,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        id: t.id,
    }));
}
