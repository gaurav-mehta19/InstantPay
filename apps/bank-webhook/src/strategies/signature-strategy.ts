import { createHmac, timingSafeEqual } from "crypto";

export interface SignatureStrategy {
  verify(
    command: { token: string; userId: string; amountInPaise: number },
    signature: string | undefined,
  ): boolean;
}

export class HdfcSignatureStrategy implements SignatureStrategy {
  constructor(private readonly secret: string) {}

  verify(
    command: { token: string; userId: string; amountInPaise: number },
    signature: string | undefined,
  ): boolean {
    if (!signature) {
      return false;
    }

    const message = `${command.token}:${command.userId}:${command.amountInPaise}`;
    const expectedSignature = createHmac("sha256", this.secret)
      .update(message)
      .digest("hex");

    const received = Buffer.from(signature, "hex");
    const expected = Buffer.from(expectedSignature, "hex");

    if (received.length !== expected.length) {
      return false;
    }

    return timingSafeEqual(received, expected);
  }
}
