import { z } from "zod";

export const onRampInputSchema = z.object({
  amountInPaise: z.number().int().positive(),
  provider: z.string().min(2).max(100),
  idempotencyKey: z.string().min(8).max(128).optional(),
});

export const transferInputSchema = z.object({
  toPhone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  amountInPaise: z.number().int().positive(),
  idempotencyKey: z.string().min(8).max(128).optional(),
});

export type OnRampInput = z.infer<typeof onRampInputSchema>;
export type TransferInput = z.infer<typeof transferInputSchema>;
