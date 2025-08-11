"use client";

import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "./query-client";

export default function HydrateClient({
  state,
  children,
}: {
  state: DehydratedState;
  children: React.ReactNode;
}) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
