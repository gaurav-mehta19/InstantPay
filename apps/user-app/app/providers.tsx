"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          gcTime: 5 * 60 * 1000, // 5 minutes
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SessionProvider>
          {children}
        </SessionProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}