"use client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatDate } from "../lib/utils";
import { Card } from "@repo/ui/card";

interface BalanceChartProps {
  data: Array<{
    date: Date;
    amount: number;
  }>;
}

export function BalanceChart({ data }: BalanceChartProps) {

    const last9Data = data.slice(-9);

  return (
    <Card title="Balance History">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last9Data}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => formatDate(new Date(value))}
                stroke="#888888"
                fontSize={10}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `${value} Rs`}
              />
             <Tooltip
  content={({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Date
              </span>
              <span className="font-bold text-muted-foreground">
                {formatDate(new Date(payload[0]?.payload.date))}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Balance
              </span>
              <span className="font-bold">
                ₹{(payload[0]?.value as number)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }}
/>
              <Line
                type="monotone"
                dataKey="amount"
                strokeWidth={2}
                stroke="blue"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
    </Card>
  );
}