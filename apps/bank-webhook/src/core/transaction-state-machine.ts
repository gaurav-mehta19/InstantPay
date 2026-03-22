export type TransactionStatus = "Processing" | "Success" | "Failed";

export class TransactionStateMachine {
  private static readonly transitions: Record<
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
    return TransactionStateMachine.transitions[from].includes(to);
  }
}
