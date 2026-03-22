export type TransactionStatus = "Processing" | "Success" | "Failed";

export class TransactionStateMachine {
  private static readonly allowedTransitions: Record<
    TransactionStatus,
    TransactionStatus[]
  > = {
    Processing: ["Success", "Failed"],
    Success: [],
    Failed: [],
  };

  static canTransition(
    from: TransactionStatus,
    to: TransactionStatus,
  ): boolean {
    return TransactionStateMachine.allowedTransitions[from].includes(to);
  }

  static assertTransition(
    from: TransactionStatus,
    to: TransactionStatus,
  ): void {
    if (!TransactionStateMachine.canTransition(from, to)) {
      throw new Error(`Invalid status transition from ${from} to ${to}`);
    }
  }
}
