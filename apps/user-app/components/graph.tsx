"use client";

import React, { memo, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "../lib/utils";
import { formatInr } from "../lib/utils/currency";

interface BalanceChartProps {
  data: Array<{
    date: Date;
    amount: number;
  }>;
  height?: number;
}

export const BalanceChart = memo<BalanceChartProps>(
  ({ data, height = 268 }) => {
    const chartData = useMemo(() => {
      return [...data]
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(-10)
        .map((item) => ({
          date: item.date.toISOString(),
          amount: Number(item.amount.toFixed(2)),
        }));
    }, [data]);

    if (!chartData.length) {
      return (
        <div className="flex h-[268px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              No balance trend yet
            </p>
            <p className="mt-1 text-xs text-muted">
              Add money to see your first chart data point.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 10, left: 4, bottom: 6 }}
          >
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(value: string) => formatDate(new Date(value))}
              stroke="#475569"
              fontSize={12}
              axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
              tickLine={{ stroke: "#cbd5e1" }}
              tickMargin={8}
              minTickGap={28}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#475569"
              fontSize={12}
              tickFormatter={(value: number) => `₹${value}`}
              domain={[0, "auto"]}
              axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
              tickLine={{ stroke: "#cbd5e1" }}
              width={56}
              tickMargin={8}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-md">
                      <p className="text-xs text-muted">
                        {formatDate(new Date(payload[0]?.payload.date))}
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">
                        {formatInr(payload[0]?.value as number)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              strokeWidth={2.5}
              stroke="#0ea5e9"
              connectNulls={false}
              dot={{ fill: "#0ea5e9", strokeWidth: 0, r: 3 }}
              activeDot={{
                r: 5,
                stroke: "#0ea5e9",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

BalanceChart.displayName = "BalanceChart";
