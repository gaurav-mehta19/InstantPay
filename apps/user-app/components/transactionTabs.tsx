"use client";

import { useMemo } from "react";
import { FixedSizeList } from "react-window";
import { ArrowLeftRight, Building2 } from "lucide-react";
import { useRecoilState } from "recoil";
import {
  transactionStatusFilterAtom,
  transactionTabAtom,
} from "@repo/store/transactions";
import { formatInrFromPaise } from "../lib/utils/currency";

type P2PRow = {
  time: Date;
  amount: number;
  status: string;
  toUserId: string;
  fromUserId: string;
  direction: string;
  id: string;
  toUserName: string;
  toUserPhone: string;
};

type OnRampRow = {
  time: Date;
  amount: number;
  status: string;
  provider: string;
  id: string;
};

type UnifiedRow = {
  id: string;
  type: "p2p" | "onramp";
  time: Date;
  amount: number;
  status: string;
  direction?: "send" | "receive";
  toUserName?: string;
  toUserPhone?: string;
  provider?: string;
};

interface TransactionTabsProps {
  p2p: P2PRow[];
  onRamp: OnRampRow[];
}

function statusClass(status: string) {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-50 text-green-700 border-green-200";
    case "failed":
    case "fail":
      return "bg-red-50 text-red-700 border-red-200";
    case "processing":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-neutral-50 text-neutral-700 border-neutral-200";
  }
}

export function TransactionTabs({ p2p, onRamp }: TransactionTabsProps) {
  const [tab, setTab] = useRecoilState(transactionTabAtom);
  const [statusFilter, setStatusFilter] = useRecoilState(
    transactionStatusFilterAtom,
  );

  const unifiedFeed = useMemo<UnifiedRow[]>(() => {
    const p2pRows: UnifiedRow[] = p2p.map((item) => ({
      id: item.id,
      type: "p2p",
      time: new Date(item.time),
      amount: item.amount,
      status: item.status,
      direction: item.direction === "send" ? "send" : "receive",
      toUserName: item.toUserName,
      toUserPhone: item.toUserPhone,
    }));

    const onRampRows: UnifiedRow[] = onRamp.map((item) => ({
      id: item.id,
      type: "onramp",
      time: new Date(item.time),
      amount: item.amount,
      status: item.status,
      provider: item.provider,
    }));

    return [...p2pRows, ...onRampRows].sort(
      (a, b) => b.time.getTime() - a.time.getTime(),
    );
  }, [onRamp, p2p]);

  const filteredRows = useMemo(() => {
    return unifiedFeed.filter((row) => {
      const tabMatch = tab === "all" || row.type === tab;
      const statusMatch =
        statusFilter === "all" || row.status.toLowerCase() === statusFilter;
      return tabMatch && statusMatch;
    });
  }, [statusFilter, tab, unifiedFeed]);

  if (!unifiedFeed.length) {
    return (
      <div className="panel">
        <h2 className="panel-title">Unified Transaction Feed</h2>
        <p className="panel-subtitle">
          No transactions yet. Start with your first deposit.
        </p>
      </div>
    );
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const row = filteredRows[index];
    if (!row) return null;

    const isP2P = row.type === "p2p";
    const isSend = row.direction === "send";
    const amountClass = isP2P
      ? isSend
        ? "text-red-700"
        : "text-green-700"
      : "text-emerald-700";
    const amountPrefix = isP2P && isSend ? "-" : "+";

    const rowTitle = isP2P
      ? `${isSend ? "Sent to" : "Received from"} ${row.toUserName ?? "Unknown"}`
      : `Added from ${row.provider ?? "Bank"}`;

    const rowSubtitle = isP2P
      ? `${row.toUserPhone ?? "Unknown"} • ${row.time.toLocaleDateString("en-IN")}`
      : `${row.time.toLocaleDateString("en-IN")} • ${row.time.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )}`;

    return (
      <div style={{ ...style, paddingBottom: 8 }}>
        <article className="simple-list-item card-interactive !items-start">
          <div className="flex items-start gap-3">
            <span className="sidebar-icon mt-0.5 h-8 w-8">
              {isP2P ? (
                <ArrowLeftRight className="h-4 w-4 text-sky-700" />
              ) : (
                <Building2 className="h-4 w-4 text-indigo-700" />
              )}
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                {rowTitle}
              </p>
              <p className="text-xs text-muted">{rowSubtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusClass(row.status)}`}
            >
              {row.status}
            </span>
            <p className={`mt-1 text-sm font-semibold ${amountClass}`}>
              {amountPrefix} {formatInrFromPaise(Math.abs(row.amount))}
            </p>
          </div>
        </article>
      </div>
    );
  };

  const rowHeight = 92;
  const visibleRows = Math.min(filteredRows.length, 5);
  const listHeight = Math.max(rowHeight, visibleRows * rowHeight);

  return (
    <div className="space-y-4">
      <div className="panel surface-neutral">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="transaction-filter-group">
            <button
              onClick={() => setTab("all")}
              className={`transaction-filter-pill ${tab === "all" ? "transaction-filter-pill-active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setTab("p2p")}
              className={`transaction-filter-pill ${tab === "p2p" ? "transaction-filter-pill-active" : ""}`}
            >
              P2P
            </button>
            <button
              onClick={() => setTab("onramp")}
              className={`transaction-filter-pill ${tab === "onramp" ? "transaction-filter-pill-active" : ""}`}
            >
              Add Money
            </button>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-field !h-9 !w-[140px] !py-1.5"
            >
              <option value="all">All status</option>
              <option value="success">Success</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <p className="text-xs text-muted">{filteredRows.length} entries</p>
        </div>
      </div>

      <div className="panel card-interactive">
        <h2 className="panel-title">Unified Transaction Feed</h2>
        <p className="panel-subtitle">
          Single chronological timeline for P2P and bank funding events.
        </p>

        {filteredRows.length ? (
          <div className="mt-4 pb-4">
            <FixedSizeList
              height={listHeight}
              itemCount={filteredRows.length}
              itemSize={rowHeight}
              width="100%"
            >
              {Row}
            </FixedSizeList>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-medium text-slate-700">
              No transactions for the current filter
            </p>
            <p className="mt-1 text-xs text-muted">
              Try another tab or status to see activity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
