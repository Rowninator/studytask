import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { FilterableTaskList } from "@/components/dashboard/filterable-task-list";
import { TaskForm } from "@/components/dashboard/task-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTaskSummary, getUserTasks, type Task } from "@/lib/tasks";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  let tasks: Task[] = [];
  let loadError = false;

  try {
    tasks = await getUserTasks(supabase, data.user.id);
  } catch {
    loadError = true;
  }

  const summary = getTaskSummary(tasks);

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

        {loadError ? (
          <div className="rounded-xl border border-dashed border-destructive/40 p-10 text-center">
            <p className="text-sm text-destructive">
              Something went wrong while loading your tasks. Please try
              again.
            </p>
          </div>
        ) : (
          <FilterableTaskList tasks={tasks} />
        )}

        <Card>
          <CardHeader>
            <CardTitle>Add a task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
