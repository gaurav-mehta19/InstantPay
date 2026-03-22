"use client";

import React from "react";
import { FixedSizeList } from "react-window";

const sampleItems = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Transaction Item #${index + 1}`,
  subtitle: `Reference: TXN-${String(index + 1).padStart(4, "0")}`,
  amount: (index + 1) * 25,
}));

export default function VirtualizedListExample() {
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = sampleItems[index];
    if (!item) return null;

    return (
      <div style={{ ...style, padding: "6px 10px" }}>
        <div className="simple-list-item">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {item.title}
            </p>
            <p className="text-xs text-muted">{item.subtitle}</p>
          </div>
          <p className="text-sm font-semibold text-neutral-900">
            ₹{item.amount}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="panel">
      <h3 className="panel-title">Virtualized 50-Item Demo</h3>
      <p className="panel-subtitle">
        Only visible rows are rendered by react-window.
      </p>

      <div className="mt-4">
        <FixedSizeList
          height={360}
          width="100%"
          itemCount={sampleItems.length}
          itemSize={72}
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
}
