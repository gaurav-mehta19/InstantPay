"use client";
import { useBalance } from "@repo/store/useBalance";

export default function Balance() {
  const balance = useBalance();
  return <div className="bg-lime-400">Balance: {balance}</div>;
}