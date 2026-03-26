"use server";

import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export async function checkCredentials(
  username: string,
  password: string,
  amountInPaise: number,
) {
  if (!username || !password) {
    return {
      message: "Invalid credentials",

      
    };
  }

  if (!Number.isInteger(amountInPaise) || amountInPaise <= 0) {
    return {
      message: "Invalid amount",
    };
  }

  const user = await prisma.bank.findFirst({
    where: {
      userId: username,
    },
    select: {
      password: true,
      balance: true,
      accountNumber: true,
    },
  });

  if (!user) {
    return {
      message: "Invalid username",
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      message: "Invalid password",
    };
  }

  if (amountInPaise > user.balance) {
    return {
      message: "Insufficient balance",
    };
  }

  await prisma.bank.update({
    where: {
      accountNumber: user.accountNumber,
    },
    data: {
      balance: {
        decrement: amountInPaise,
      },
    },
  });

  return {
    message: "Success",
  };
}
