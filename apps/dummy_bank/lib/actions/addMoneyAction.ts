"use server";

import prisma from "@repo/db/client";

export async function addMoney(token: string) {
  if (typeof token !== "string" || token.length < 16) {
    return {
      message: "Invalid token",
    };
  }

  const transaction = await prisma.onRampTransaction.findFirst({
    where: {
      token,
      status: "Processing",
    },
    select: {
      userId: true,
      amount: true,
      token: true,
      createdAt: true,
    },
  });

  if (!transaction) {
    return {
      message: "Invalid token",
    };
  }

  const configuredMaxAge = Number(process.env.WEBHOOK_MAX_PROCESSING_AGE_MINUTES);
  const maxAgeMinutes =
    Number.isFinite(configuredMaxAge) && configuredMaxAge > 0
      ? configuredMaxAge
      : 30;
  const ageMinutes =
    (Date.now() - transaction.createdAt.getTime()) / (1000 * 60);

  if (ageMinutes > maxAgeMinutes) {
    await prisma.onRampTransaction.update({
      where: { token },
      data: { status: "Failed" },
    });
    return {
      message: "Transaction expired",
    };
  }

  return {
    transaction,
  };
}
