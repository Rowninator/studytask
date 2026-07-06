import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { TaskForm } from "@/components/dashboard/task-form";
import { TaskList } from "@/components/dashboard/task-list";
import { Button } from "@/components/ui/button";
import { SAMPLE_TASKS, getTaskSummary } from "@/lib/sample-tasks";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  const summary = getTaskSummary(SAMPLE_TASKS);

  return (
    <AppShell>
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <DashboardHeader />

        <SummaryCards summary={summary} />

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Your tasks</h2>
          <Button size="sm">
            <Plus className="size-4" />
            Add task
          </Button>
        </div>

        <TaskList tasks={SAMPLE_TASKS} />

        <TaskForm />
      </div>
    </AppShell>
  );
}
