"use client";

import { Button } from "@/components/ui/button";

export default function GlobalErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-sm text-muted-foreground">
        Something went wrong. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
