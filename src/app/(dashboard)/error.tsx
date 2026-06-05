"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type DashboardRouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardRouteError({
  error,
  reset,
}: DashboardRouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-background p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Dashboard Error
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          This section ran into a problem.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Your navigation is still available, and you can retry loading this
          view without leaving the dashboard.
        </p>
        <Button className="mt-6" onClick={reset}>
          Retry
        </Button>
      </div>
    </div>
  );
}
