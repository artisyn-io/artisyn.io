"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type AuthRouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AuthRouteError({
  error,
  reset,
}: AuthRouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Auth Error
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          We hit a snag loading this page.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Please try again. If the problem continues, you can go back and retry
          the last step.
        </p>
        <Button className="mt-6 w-full" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
