"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { createOnRampTransaction } from "../lib/actions/createOnRamp";
import { Card } from "@repo/ui/card";
import { FormField } from "@repo/ui/formField";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";

const SUPPORTED_BANKS = [
  {
    name: "Choose Bank",
    redirectUrl: "",
  },
  {
    name: "HDFC Bank",
    redirectUrl:
      process.env.NEXT_PUBLIC_DUMMY_BANK_URL ?? "http://localhost:3001/",
  },
  {
    name: "Axis Bank",
    redirectUrl:
      process.env.NEXT_PUBLIC_DUMMY_BANK_URL ?? "http://localhost:3001/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState("");
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState("Choose Bank");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const idempotencyKeyRef = useRef<string | null>(null);

  const getOrCreateIdempotencyKey = () => {
    if (!idempotencyKeyRef.current) {
      const hasCrypto =
        typeof window !== "undefined" &&
        typeof window.crypto?.randomUUID === "function";
      idempotencyKeyRef.current = hasCrypto
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    }
    return idempotencyKeyRef.current;
  };

  function handleOnSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedBank = SUPPORTED_BANKS.find((x) => x.name === e.target.value);
    if (selectedBank) {
      setProvider(selectedBank.name);
      setRedirectUrl(selectedBank.redirectUrl);
      idempotencyKeyRef.current = null;
    }
  }

  async function handleAddMoney() {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (provider === "Choose Bank") {
      toast.error("Please select a bank");
      return;
    }

    setIsSubmitting(true);
    let redirectStarted = false;

    try {
      const idempotencyKey = getOrCreateIdempotencyKey();
      const { token } = await createOnRampTransaction(
        amount * 100,
        provider,
        idempotencyKey,
      );

      if (typeof token !== "string") {
        throw new Error("Invalid token received");
      }

      const safeRedirectUrl =
        redirectUrl ||
        process.env.NEXT_PUBLIC_DUMMY_BANK_URL ||
        "http://localhost:3001/";
      const redirectWithToken = `${safeRedirectUrl}?token=${encodeURIComponent(token)}`;
      redirectStarted = true;
      setIsRedirecting(true);
      idempotencyKeyRef.current = null;
      window.location.href = redirectWithToken;
    } catch (err) {
      toast.error("An error occurred while adding money");
    } finally {
      if (!redirectStarted) {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <Card className="add-money-card panel-strong panel-elevated card-interactive flex h-full flex-col !p-5 md:!p-6">
      <div className="mb-3">
        <h2 className="panel-title">Add Money</h2>
        <p className="panel-subtitle">
          Fund your wallet from your linked bank account.
        </p>
      </div>

      <div className="space-y-3">
        <FormField label="Amount (INR)" labelClassName="!mb-1.5">
          <TextInput
            type="number"
            placeholder="Enter amount"
            value={amount || ""}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              idempotencyKeyRef.current = null;
            }}
          />
        </FormField>

        <FormField label="Select Bank" labelClassName="!mb-1.5">
          <div className="relative">
            <select
              value={provider}
              onChange={handleOnSelect}
              className="select-field"
            >
              {SUPPORTED_BANKS.map((bank) => (
                <option key={bank.name} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </FormField>

        <div className="grid grid-cols-3 gap-2">
          {[500, 1000, 2000].map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="ghost"
              onClick={() => setAmount(quickAmount)}
              className="btn-ghost h-9 border border-neutral-200 !px-2 !py-1.5 !text-xs"
            >
              ₹{quickAmount}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleAddMoney}
          disabled={isSubmitting || isRedirecting}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRedirecting || isSubmitting
            ? "Redirecting..."
            : "Continue to Bank"}
        </Button>
      </div>
    </Card>
  );
};
