import type { SupabaseClient } from "@supabase/supabase-js";

import type { StudyTaskRow } from "@/lib/supabase/types";

export type Priority = "Low" | "Medium" | "High";
export type Status = "Not Started" | "In Progress" | "Completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}

export function mapStudyTaskRow(row: StudyTaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    subject: row.subject ?? "",
    priority: row.priority,
    status: row.status,
    dueDate: row.due_date ?? "",
  };
}

export async function getUserTasks(
  supabase: SupabaseClient,
  userId: string
): Promise<Task[]> {
  const { data, error } = await supabase
    .from("study_tasks")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapStudyTaskRow);
}

export function getTaskSummary(tasks: Task[]) {
  const now = new Date();
  const dueSoonCutoff = new Date(now);
  dueSoonCutoff.setDate(now.getDate() + 5);

  return {
    total: tasks.length,
    dueSoon: tasks.filter((task) => {
      const due = new Date(task.dueDate);
      return (
        task.status !== "Completed" && due >= now && due <= dueSoonCutoff
      );
    }).length,
    highPriority: tasks.filter(
      (task) => task.priority === "High" && task.status !== "Completed"
    ).length,
    completed: tasks.filter((task) => task.status === "Completed").length,
  };
}
