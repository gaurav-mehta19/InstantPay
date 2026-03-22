"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  SendHorizontal,
  Shield,
} from "lucide-react";
import { useRecoilValue } from "recoil";
import { isDemoLoadingAtom, shouldRedirectAtom } from "@repo/store/demo";
import { BrandLogo } from "./shared/BrandLogo";

export const LandingPage = () => {
  const isDemoLoading = useRecoilValue(isDemoLoadingAtom);
  const shouldRedirect = useRecoilValue(shouldRedirectAtom);

  return (
    <div className="app-bg min-h-screen">
      {(isDemoLoading || shouldRedirect) && (
        <div className="demo-overlay fixed inset-0 z-50 flex items-center justify-center">
          <div className="demo-pulse-orb demo-pulse-orb-left" />
          <div className="demo-pulse-orb demo-pulse-orb-right" />

          <div className="demo-transition-card w-[92%] max-w-lg text-center">
            <div className="mb-5 flex justify-center">
              <BrandLogo className="demo-logo-pop h-16" />
            </div>

            <h3 className="text-xl font-semibold text-neutral-900">
              Preparing Demo Workspace
            </h3>
            <p className="mt-2 text-sm text-muted">
              {shouldRedirect
                ? "Signed in successfully. Taking you to dashboard..."
                : "Creating a safe preview session with sample wallet data."}
            </p>

            <div className="demo-progress-track mt-6">
              <div className="demo-progress-bar" />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
              <div className="demo-step">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Session token validated</span>
              </div>
              <div className="demo-step">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Demo account loaded</span>
              </div>
              <div className="demo-step">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Balance snapshot synced</span>
              </div>
              <div className="demo-step">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Redirecting securely</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="page-shell pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold leading-tight text-neutral-900 md:text-6xl">
            Payments that are <span className="text-primary-700">fast</span>,{" "}
            <span className="text-primary-700">simple</span>, and secure.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted md:text-lg">
            InstantPay helps you add money, send P2P transfers, and track
            transactions from a single clean dashboard.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/users/signup" className="btn-primary w-full sm:w-auto">
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/users/signin"
              className="btn-secondary w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="stat-card">
              <p className="stat-label">Users</p>
              <p className="stat-value">10K+</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Transfers</p>
              <p className="stat-value">₹50M+</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Uptime</p>
              <p className="stat-value">99.9%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Support</p>
              <p className="stat-value">24/7</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="page-shell">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<SendHorizontal className="h-5 w-5 text-primary-700" />}
            title="Instant P2P"
            description="Send funds in seconds using only phone number lookup."
          />
          <FeatureCard
            icon={<Building2 className="h-5 w-5 text-primary-700" />}
            title="Bank Funding"
            description="Top-up wallet from integrated banks with secure token flow."
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5 text-primary-700" />}
            title="Secure by Design"
            description="Modern auth and transaction trails keep every payment auditable."
          />
        </div>
      </section>

      <section id="security" className="page-shell pb-12">
        <div className="panel-strong flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="panel-title">Built for trust</h2>
            <p className="panel-subtitle">
              Every transfer is tracked with clear status and timeline.
            </p>
          </div>
          <Link href="/users/signup" className="btn-primary">
            Start Using InstantPay
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="panel">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </article>
  );
}
