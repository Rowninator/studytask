"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { Priority, Status } from "@/lib/tasks";

export type TaskFormState = {
  error?: string;
  success?: boolean;
};

const PRIORITIES: Priority[] = ["Low", "Medium", "High"];
const STATUSES: Status[] = ["Not Started", "In Progress", "Completed"];

function parseTaskForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const priorityInput = String(formData.get("priority") ?? "");
  const statusInput = String(formData.get("status") ?? "");
  const dueDate = String(formData.get("dueDate") ?? "").trim();

  if (!title) {
    return { error: "Title is required." } as const;
  }

  const priority = PRIORITIES.includes(priorityInput as Priority)
    ? (priorityInput as Priority)
    : "Medium";
  const status = STATUSES.includes(statusInput as Status)
    ? (statusInput as Status)
    : "Not Started";

  return {
    values: {
      title,
      description: description || null,
      subject: subject || null,
      priority,
      status,
      due_date: dueDate || null,
    },
  } as const;
}

export async function createTask(
  _prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const parsed = parseTaskForm(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { error: "You must be logged in to add a task." };
  }

  const { error } = await supabase.from("study_tasks").insert({
    ...parsed.values,
    user_id: data.user.id,
  });

  if (error) {
    console.error("Failed to create study task:", error);
    return { error: "Could not save this task. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateTask(
  taskId: string,
  _prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const parsed = parseTaskForm(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { error: "You must be logged in to edit a task." };
  }

  const { error } = await supabase
    .from("study_tasks")
    .update(parsed.values)
    .eq("id", taskId)
    .eq("user_id", data.user.id);

  if (error) {
    console.error("Failed to update study task:", error);
    return { error: "Could not update this task. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteTask(taskId: string): Promise<TaskFormState> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { error: "You must be logged in to delete a task." };
  }

  const { error } = await supabase
    .from("study_tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", data.user.id);

  if (error) {
    console.error("Failed to delete study task:", error);
    return { error: "Could not delete this task. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function toggleTaskCompletion(
  taskId: string,
  completed: boolean
): Promise<TaskFormState> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { error: "You must be logged in to update a task." };
  }

  const { error } = await supabase
    .from("study_tasks")
    .update({ status: completed ? "Completed" : "Not Started" })
    .eq("id", taskId)
    .eq("user_id", data.user.id);

  if (error) {
    console.error("Failed to update study task status:", error);
    return { error: "Could not update this task. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
