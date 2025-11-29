"use client";

import { DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children, state }: { children: React.ReactNode; state?: DehydratedState }) {
  // Create client inside component to avoid sharing between requests
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
           <HydrationBoundary state={state}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}