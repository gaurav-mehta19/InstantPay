import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import prisma from "@repo/db/client";

export async function getProfile() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user?.id) {
        throw new Error("User not authenticated.");
    }

    const profile = await prisma.user.findFirst({
        where: {
            id: session.user.id
        },
        select: {
            phone: true,
            name: true,
        }
    });

    if (!profile) {
        throw new Error("Profile not found");
    }

    return {
        phone: profile.phone,
        name: profile.name,
    };
}
