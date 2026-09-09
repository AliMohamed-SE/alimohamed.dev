"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { ApiError } from "@/shared/api";

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          // Client errors will fail again the same way; only retry transport blips.
          if (error instanceof ApiError && !error.isNetworkError && error.status < 500) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

export function QueryProvider({ children }: { children: ReactNode }) {
  // One client per browser session, never recreated on re-render.
  const [queryClient] = useState(createQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
