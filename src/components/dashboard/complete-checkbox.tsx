"use client";

import { useTransition, type ChangeEvent } from "react";

import { toggleTaskCompletion } from "@/lib/actions/tasks";

export function CompleteCheckbox({
  taskId,
  completed,
}: {
  taskId: string;
  completed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextCompleted = event.target.checked;

    startTransition(async () => {
      const result = await toggleTaskCompletion(taskId, nextCompleted);
      if (result.error) {
        window.alert(result.error);
      }
    });
  }

  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={handleChange}
      disabled={isPending}
      aria-label={completed ? "Mark task incomplete" : "Mark task complete"}
      className="mt-1 size-4 shrink-0 rounded border-input accent-primary"
    />
  );
}
