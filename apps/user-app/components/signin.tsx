"use client";

import React, { memo, useCallback, useState } from "react";
import { SigninInputTypes } from "../lib/validation/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@repo/ui/card";
import { FormField } from "@repo/ui/formField";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";

export const SigninComponent = memo(() => {
  const router = useRouter();

  const [data, setData] = useState<SigninInputTypes>({
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = useCallback(async () => {
    if (!data.phone.trim() || !data.password.trim()) {
      toast.warning("Please fill all fields");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Signing in...");

    try {
      const res = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });

      toast.dismiss(loadingToastId);

      if (res?.error) {
        toast.error(res.error);
      } else {
        setData({ phone: "", password: "" });
        toast.success("Signed in successfully");
        router.push("/dashboard");
      }
    } catch {
      toast.dismiss(loadingToastId);
      toast.error("An error occurred during signin");
    } finally {
      setIsLoading(false);
    }
  }, [data, router]);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const phoneValue = e.target.value.replace(/\D/g, "");
      if (phoneValue.length <= 10) {
        setData((prev) => ({ ...prev, phone: phoneValue }));
      }
    },
    [],
  );

  return (
    <div className="page-shell flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-md panel-strong">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to continue to your wallet.
          </p>
        </div>

        <div className="space-y-4">
          <FormField label="Phone Number">
            <TextInput
              type="tel"
              value={data.phone}
              onChange={handlePhoneChange}
              maxLength={10}
              placeholder="10-digit phone number"
            />
          </FormField>

          <FormField label="Password">
            <div className="relative">
              <TextInput
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter your password"
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </FormField>

          <Button
            onClick={handleSignin}
            disabled={isLoading || !data.phone || !data.password}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/users/signup"
            className="font-semibold text-primary-700 hover:underline"
          >
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
});

SigninComponent.displayName = "SigninComponent";
