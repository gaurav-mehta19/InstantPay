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
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={last9Data}>
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => formatDate(new Date(value))}
            stroke="#6b7280"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `₹${value}`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-neutral-200 p-4 shadow-elegant">
                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium uppercase text-neutral-500">
                          Date
                        </span>
                        <span className="text-sm font-bold text-neutral-800">
                          {formatDate(new Date(payload[0]?.payload.date))}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium uppercase text-neutral-500">
                          Balance
                        </span>
                        <span className="text-lg font-bold text-primary">
                          ₹{(payload[0]?.value as number).toLocaleString('en-IN')}
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
            strokeWidth={3}
            stroke="url(#colorGradient)"
            dot={{
              fill: 'url(#colorGradient)',
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{
              r: 6,
              stroke: 'url(#colorGradient)',
              strokeWidth: 2,
              fill: '#fff'
            }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}