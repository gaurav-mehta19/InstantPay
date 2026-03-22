"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { SignupInputTypes } from "../lib/validation/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { createBalance } from "../lib/actions/balance";
import Link from "next/link";
import { Card } from "@repo/ui/card";
import { FormField } from "@repo/ui/formField";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";

export const SignupComponent = () => {
  const router = useRouter();

  const [data, setData] = useState<SignupInputTypes>({
    name: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  async function handleSignup() {
    const formattedName =
      data.name.trim().charAt(0).toUpperCase() + data.name.trim().slice(1);
    const formattedData = { ...data, name: formattedName };

    if (!data.name.trim() || !data.phone.trim() || !data.password.trim()) {
      toast.warning("Please fill all fields");
      return;
    }

    if (data.password.trim().length < 8) {
      toast.warning("Password must be at least 8 characters");
      return;
    }

    if (data.phone.trim().length !== 10) {
      toast.warning("Phone number must be exactly 10 digits");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Creating account...");

    try {
      const res = await axios.post("/api/auth/signup", formattedData);

      if ((res.data as { error?: string }).error) {
        toast.error((res.data as { error?: string }).error || "Signup failed");
        return;
      }

      const response = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      await createBalance();
      setData({ name: "", phone: "", password: "" });
      toast.success("Account created successfully");
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { error?: string } | undefined)?.error ??
          "An error occurred during signup. Please try again";
        toast.error(message);
        return;
      }

      toast.error("An error occurred during signup. Please try again");
    } finally {
      toast.dismiss(loadingToastId);
      setIsLoading(false);
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value.replace(/\D/g, "");
    if (phoneValue.length <= 10) {
      setData({ ...data, phone: phoneValue });
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(data.password));
  }, [data.password]);

  return (
    <div className="page-shell flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-lg panel-strong">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted">
            Start using InstantPay in less than a minute.
          </p>
        </div>

        <div className="space-y-4">
          <FormField label="Full Name">
            <TextInput
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </FormField>

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
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="At least 8 characters"
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {data.password && (
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted">Password Strength</span>
                  <span className="text-neutral-700">{passwordStrength}/5</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded ${level <= passwordStrength ? "bg-primary-500" : "bg-neutral-200"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </FormField>

          <Button
            onClick={handleSignup}
            disabled={
              isLoading ||
              !data.name ||
              !data.phone ||
              !data.password ||
              data.password.length < 8
            }
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/users/signin"
            className="font-semibold text-primary-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};
