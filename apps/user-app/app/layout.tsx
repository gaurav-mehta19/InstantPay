import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";
import dynamic from "next/dynamic";

const AppBarClient = dynamic(() => import("../components/appBClient"), {
  ssr: false,
  loading: () => <div className="h-16 border-b border-neutral-200 bg-white" />,
});

const jakarta = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-jakarta",
  display: "swap",
});

const sora = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InstantPay",
  description: "Fast and secure digital payments",
  verification: {
    google: "N4W6NRQ0UlAyRp9qUzIIACzm4eijyuD32DfXlLVHXpM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${sora.variable}`}>
      <body>
        <Providers>
          <AppBarClient />
          {children}
          <Toaster
            position="bottom-left"
            toastOptions={{
              classNames: {
                toast: "app-toast",
                title: "app-toast-title",
                description: "app-toast-description",
                actionButton: "app-toast-action",
                cancelButton: "app-toast-cancel",
                closeButton: "app-toast-close",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
