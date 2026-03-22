"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { p2pTransfer } from "../lib/actions/p2pTransfer";
import { TransferForm } from "./shared/TransferForm";
import { TransferBenefits } from "./shared/TransferBenefits";

export const P2pCard = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(phone: string, amountInRupees: number) {
    if (phone.trim().length < 1) {
      toast.warning("Please enter recipient phone number");
      return;
    }

    if (amountInRupees < 1) {
      toast.warning("Amount must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Transferring...");

    try {
      const response = await p2pTransfer(phone, amountInRupees * 100);
      toast.dismiss(loadingToastId);

      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.error("Something went wrong");
      }

      if (response?.message === "Transaction successful") {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("An error occurred during the transfer");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="section-grid lg:grid-cols-2 animate-fade-in">
      <TransferForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <TransferBenefits />
    </div>
  );
};
