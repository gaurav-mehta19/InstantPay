import { memo } from "react";
import { formatInrFromPaise } from "../lib/utils/currency";

interface BalanceCardProps {
  amount: number;
  locked: number;
}

export const BalanceCard = memo<BalanceCardProps>(({ amount, locked }) => {
  const total = amount + locked;

  return (
    <div className="panel card-interactive surface-neutral h-full">
      <div className="mb-4">
        <h2 className="panel-title">Balance Overview</h2>
        <p className="panel-subtitle">Current wallet status at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="simple-list-item !px-3 !py-2.5">
          <span className="text-sm text-muted">Available</span>
          <span className="text-base font-semibold text-neutral-900">
            {formatInrFromPaise(amount)}
          </span>
        </div>

        <div className="simple-list-item !px-3 !py-2.5">
          <span className="text-sm text-muted">Locked</span>
          <span className="text-base font-semibold text-neutral-900">
            {formatInrFromPaise(locked)}
          </span>
        </div>

        <div className="simple-list-item border-primary-200 bg-primary-50 !px-3 !py-2.5">
          <span className="text-sm font-medium text-primary-800">Total</span>
          <span className="text-lg font-semibold text-primary-900">
            {formatInrFromPaise(total)}
          </span>
        </div>

        <div className="simple-list-item !px-3 !py-2.5">
          <span className="text-sm text-muted">Uptime</span>
          <span className="text-base font-semibold text-neutral-900">24/7</span>
        </div>
      </div>

      <div className="simple-list-item mt-2 !px-3 !py-2.5">
        <span className="text-sm text-muted">Security</span>
        <span className="text-base font-semibold text-neutral-900">
          Protected
        </span>
      </div>
    </div>
  );
});

BalanceCard.displayName = "BalanceCard";
