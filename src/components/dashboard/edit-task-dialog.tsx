"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/dashboard/task-form";
import type { Task } from "@/lib/tasks";

export function EditTaskDialog({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  // Freeze the task data for the duration of the dialog session. Without
  // this, a save triggers a dashboard revalidation that can push fresh
  // task props into the still-open form before it closes, which changes
  // an uncontrolled input's default value while it's mounted.
  const [snapshot, setSnapshot] = useState(task);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setSnapshot(task);
    }
    setOpen(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Edit task" />
        }
      >
        <Pencil className="size-3.5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        {open && (
          <TaskForm
            task={snapshot}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
