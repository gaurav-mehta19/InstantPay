"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Lock, ShieldCheck } from "lucide-react";
import { addMoney } from "@/lib/actions/addMoneyAction";
import { useSearchParams } from "next/navigation";
import { checkCredentials } from "@/lib/actions/checkCredentialsAction";
import { submitWebhook } from "@/lib/actions/submitWebhook";
import { toast } from "sonner";
import { Card } from "@repo/ui/card";
import { FormField } from "@repo/ui/formField";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";

const userAppBaseUrl =
  process.env.NEXT_PUBLIC_USER_APP_BASE_URL ?? "http://localhost:3000";

export default function Home() {
  const [data, setData] = useState({
    customerId: "Dummy_user",
    password: "Dummy@1234",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [systemTime, setSystemTime] = useState<string>("--:--:--");

  const isFormValid =
    data.customerId.trim().length > 0 && data.password.trim().length > 0;

  useEffect(() => {
    const update = () => setSystemTime(new Date().toLocaleString("en-IN"));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleAddMoney() {
    if (!token) {
      toast.error("Missing transaction token. Please restart payment.");
      return;
    }

    if (!isFormValid) {
      toast.warning("Please enter Customer ID and Password.");
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Verifying credentials...");

    try {
      const user = await addMoney(token);
      if (!user.transaction) {
        toast.dismiss(loadingToastId);
        toast.error(user.message || "Invalid transaction");
        return;
      }

      const credentialsCheck = await checkCredentials(
        data.customerId.trim(),
        data.password,
        user.transaction.amount,
      );

      if (credentialsCheck.message !== "Success") {
        toast.dismiss(loadingToastId);
        toast.warning(credentialsCheck.message);
        return;
      }

      const webhookResult = await submitWebhook({
        token,
        userId: user.transaction.userId,
        amountInPaise: user.transaction.amount,
      });

      if (!webhookResult.ok) {
        toast.dismiss(loadingToastId);
        toast.error(webhookResult.message);
        return;
      }

      toast.dismiss(loadingToastId);
      toast.success("Payment authorized. Redirecting...");
      window.location.href = `${userAppBaseUrl}/dashboard?funded=1`;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="bg-[#003b8e] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs text-blue-100">InstantPay Sandbox</p>
            <h1 className="text-xl font-semibold tracking-wide">
              Demo Authorization Portal
            </h1>
          </div>
          <div className="text-right text-xs text-blue-100">
            <p>Non-production demo environment</p>
            <p>System Time: {systemTime}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-300 bg-white">
        <div className="mx-auto flex max-w-6xl gap-6 px-4 py-2 text-sm font-medium text-slate-700">
          <span className="text-[#003b8e]">Demo Flow</span>
          <span>Wallet Top-up Simulation</span>
          <span>Webhook Testing</span>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="mb-3 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertTriangle className="h-4 w-4" />
          Sandbox only: This page is for local/testing flows. Do not enter real
          bank credentials.
        </div>

        <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4" />
          Demo credentials: User ID{" "}
          <strong className="mx-1">Dummy_user</strong> | Password{" "}
          <strong className="ml-1">Dummy@1234</strong>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border border-slate-300 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Authorize Demo Top-up
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Verify demo credentials to simulate a bank authorization callback.
            </p>
          </div>

          <div className="space-y-4 px-6 py-6">
            <FormField
              label="Demo User ID"
              htmlFor="customerId"
              labelClassName="mb-1 block text-sm font-medium text-slate-700"
            >
              <TextInput
                type="text"
                id="customerId"
                value={data.customerId}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, customerId: e.target.value }))
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-[#003b8e] focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter demo user ID"
                autoComplete="username"
              />
            </FormField>

            <FormField
              label="Demo Password"
              htmlFor="password"
              labelClassName="mb-1 block text-sm font-medium text-slate-700"
            >
              <TextInput
                type="password"
                id="password"
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-[#003b8e] focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter demo password"
                autoComplete="current-password"
              />
            </FormField>

            <Button
              onClick={handleAddMoney}
              disabled={!isFormValid || isSubmitting}
              className="w-full rounded-md bg-[#003b8e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#002f72] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Processing..." : "Authorize Payment"}
            </Button>

            <p className="text-xs text-slate-500">
              Continuing triggers a demo webhook to your configured
              `bank-webhook` service.
            </p>
          </div>
        </Card>

        <aside className="space-y-4">
          <Card className="border border-slate-300 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-slate-900">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold">Testing Notes</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Use only demo credentials on this portal.</li>
              <li>Keep webhook URL and signing secret in sync.</li>
              <li>Rotate dummy credentials for shared demos.</li>
            </ul>
          </Card>

          <Card className="border border-slate-300 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-slate-900">
              <Lock className="h-5 w-5 text-[#003b8e]" />
              <h3 className="font-semibold">Need Help?</h3>
            </div>
            <p className="text-sm text-slate-600">
              Contact project maintainer or check README setup steps.
            </p>
          </Card>
        </aside>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <p>© InstantPay Sandbox. Demo use only.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-slate-700">
              Terms
            </a>
            <a href="#" className="hover:text-slate-700">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
