import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          StudyTask
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Track your schoolwork with less stress.
        </h1>

        <p className="max-w-xl text-muted-foreground">
          A student task and study tracker for assignments, priorities, subjects,
          and due dates.
        </p>
      </div>

      <Button nativeButton={false} render={<Link href="/dashboard" />}>
        Get started
      </Button>
    </main>
  );
}