"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import { FormField } from "@repo/ui/formField";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";

interface TransferFormProps {
  onSubmit: (phone: string, amountInRupees: number) => Promise<void>;
  isSubmitting?: boolean;
}

export function TransferForm({
  onSubmit,
  isSubmitting = false,
}: TransferFormProps) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const phoneValue = e.target.value.replace(/\D/g, "");
    if (phoneValue.length <= 10) {
      setPhone(phoneValue);
    }
  }

  async function handleSubmit() {
    await onSubmit(phone, amount);
  }

  return (
    <Card className="panel-strong">
      <div className="mb-6">
        <h2 className="panel-title">Send Money</h2>
        <p className="panel-subtitle">
          Instant transfer using recipient phone number.
        </p>
      </div>

      <div className="space-y-5">
        <FormField label="Recipient Phone Number">
          <TextInput
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={10}
            placeholder="10-digit phone number"
          />
        </FormField>

        <FormField label="Amount (INR)">
          <TextInput
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </FormField>

        <div className="grid grid-cols-4 gap-2">
          {[100, 500, 1000, 2000].map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="secondary"
              onClick={() => setAmount(quickAmount)}
              className="btn-secondary !px-2 !py-2 !text-xs"
            >
              ₹{quickAmount}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Processing..." : "Send Money"}
        </Button>
      </div>
    </Card>
  );
}
