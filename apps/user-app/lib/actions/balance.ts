"use server";

import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NEXT_AUTH } from "../auth";
import prisma from "@repo/db/client";
import { BalanceRepository } from "../server/repositories/balance-repository";
import { balanceTag } from "../server/core/cache-tags";

const balanceRepo = new BalanceRepository();

export async function createBalance() {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "you are not logged in",
    };
  }

  await prisma.$transaction(async (tx) => {
    await balanceRepo.ensureBalanceExists(userId, tx);
  });

  revalidateTag(balanceTag(userId));

  return {
    message: "balance created",
  };
}
