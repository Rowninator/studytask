"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteTask } from "@/lib/actions/tasks";

export function DeleteTaskButton({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("Delete this task? This can't be undone.")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteTask(taskId);
      if (result.error) {
        window.alert(result.error);
      }
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Delete task"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="size-3.5" />
    </Button>
  );
}
