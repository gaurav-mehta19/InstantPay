"use server";

import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NEXT_AUTH } from "../auth";
import { OnRampService } from "../server/services/onramp-service";
import { transactionsTag } from "../server/core/cache-tags";

const onRampService = new OnRampService();

export async function createOnRampTransaction(
  amount: number,
  provider: string,
  idempotencyKey?: string,
) {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;
  const userId = session?.user?.id;

  const result = await onRampService.createTransaction(userId, {
    amountInPaise: amount,
    provider,
    idempotencyKey,
  });

  if (!result.ok) {
    switch (result.error) {
      case "UNAUTHENTICATED":
        return { message: "you are not logged in" };
      case "INVALID_INPUT":
        return { message: "Invalid on-ramp input" };
      case "UNSUPPORTED_PROVIDER":
        return { message: "Unsupported bank provider" };
      default:
        return { message: "Unable to create on-ramp transaction" };
    }
  }

  if (userId) {
    revalidateTag(transactionsTag(userId));
  }

  return {
    token: result.value.token,
    message: result.value.message,
  };
}
