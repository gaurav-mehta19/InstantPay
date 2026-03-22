"use server";

import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NEXT_AUTH } from "../auth";
import { TransferService } from "../server/services/transfer-service";
import { balanceTag, transactionsTag } from "../server/core/cache-tags";

const transferService = new TransferService();

export async function p2pTransfer(
  to: string,
  amount: number,
  idempotencyKey?: string,
) {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;
  const userId = session?.user?.id;

  const result = await transferService.transfer(userId, {
    toPhone: to,
    amountInPaise: amount,
    idempotencyKey,
  });

  if (!result.ok) {
    switch (result.error) {
      case "UNAUTHENTICATED":
        return { message: "You are not logged in" };
      case "INVALID_INPUT":
        return { message: "Invalid transfer input" };
      case "SELF_TRANSFER_NOT_ALLOWED":
        return { message: "You cannot transfer money to yourself" };
      case "USER_NOT_FOUND":
        return { message: "User not found" };
      case "INSUFFICIENT_BALANCE":
        return { message: "Insufficient Balance" };
      default:
        return { message: "Transfer failed" };
    }
  }

  if (userId) {
    revalidateTag(balanceTag(userId));
    revalidateTag(transactionsTag(userId));
  }

  return result.value;
}
