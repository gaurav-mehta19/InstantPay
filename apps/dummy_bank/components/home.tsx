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
            <p className="text-xs text-blue-100">SecureBank Internet Banking</p>
            <h1 className="text-xl font-semibold tracking-wide">
              Retail Login Portal
            </h1>
          </div>
          <div className="text-right text-xs text-blue-100">
            <p>256-bit SSL Secured Session</p>
            <p>System Time: {systemTime}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-300 bg-white">
        <div className="mx-auto flex max-w-6xl gap-6 px-4 py-2 text-sm font-medium text-slate-700">
          <span className="text-[#003b8e]">Personal Banking</span>
          <span>Corporate Banking</span>
          <span>Loans</span>
          <span>Cards</span>
          <span>Support</span>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4" />
          Demo credentials: Customer ID{" "}
          <strong className="mx-1">Dummy_user</strong> | Password{" "}
          <strong className="ml-1">Dummy@1234</strong>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border border-slate-300 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Login to NetBanking
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Please authorize this payment request to continue.
            </p>
          </div>

          <div className="space-y-4 px-6 py-6">
            <FormField
              label="Customer ID / User ID"
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
                placeholder="Enter Customer ID"
                autoComplete="username"
              />
            </FormField>

            <FormField
              label="Login Password"
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
                placeholder="Enter Password"
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
              By continuing, you authorize SecureBank to process this wallet
              funding request.
            </p>
          </div>
        </Card>

        <aside className="space-y-4">
          <Card className="border border-slate-300 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-slate-900">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold">Security Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Never share OTP or password with anyone.</li>
              <li>Always verify URL before login.</li>
              <li>Use virtual keyboard for high-risk networks.</li>
            </ul>
          </Card>

          <Card className="border border-slate-300 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-slate-900">
              <Lock className="h-5 w-5 text-[#003b8e]" />
              <h3 className="font-semibold">Need Help?</h3>
            </div>
            <p className="text-sm text-slate-600">
              Call 1800-000-000 or email support@securebank.demo
            </p>
          </Card>
        </aside>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <p>© SecureBank Ltd. All rights reserved.</p>
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
