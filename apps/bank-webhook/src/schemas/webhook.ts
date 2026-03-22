export interface HdfcWebhookPayload {
  token: string;
  user_identifier: string;
  amount: number;
}

export interface ParsedWebhookPayload {
  token: string;
  userId: string;
  amountInPaise: number;
}

export function parseWebhookPayload(
  body: unknown,
): ParsedWebhookPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as Record<string, unknown>;
  const token = payload.token;
  const userIdentifier = payload.user_identifier;
  const amount = payload.amount;

  if (typeof token !== "string" || token.length < 16) {
    return null;
  }

  if (typeof userIdentifier !== "string" || userIdentifier.length < 3) {
    return null;
  }

  if (typeof amount !== "number" || !Number.isInteger(amount) || amount <= 0) {
    return null;
  }

  return {
    token,
    userId: userIdentifier,
    amountInPaise: amount,
  };
}
