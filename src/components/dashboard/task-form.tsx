"use client";

import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTask, updateTask, type TaskFormState } from "@/lib/actions/tasks";
import type { Task } from "@/lib/tasks";

const initialState: TaskFormState = {};

export function TaskForm({
  task,
  onSuccess,
  onCancel,
}: {
  task?: Task;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const action = task ? updateTask.bind(null, task.id) : createTask;
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.success) return;

    if (task) {
      onSuccess?.();
    } else {
      formRef.current?.reset();
    }
    // Only re-run when a new submission actually succeeds.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-4 sm:grid-cols-2"
    >
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={task?.title}
          placeholder="e.g. Finish reading assignment"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={task?.description}
          placeholder="Add any helpful details about this task"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          defaultValue={task?.subject}
          placeholder="e.g. Math"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="priority">Priority</Label>
        <Select name="priority" defaultValue={task?.priority ?? "Medium"}>
          <SelectTrigger className="w-full" id="priority">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={task?.status ?? "Not Started"}>
          <SelectTrigger className="w-full" id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="dueDate">Due date</Label>
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          defaultValue={task?.dueDate}
        />
      </div>

      {state.error && (
        <p className="text-sm text-destructive sm:col-span-2">
          {state.error}
        </p>
      )}

      <div className="flex items-end justify-end gap-2 sm:col-span-2">
        <Button
          type={onCancel ? "button" : "reset"}
          variant="outline"
          disabled={isPending}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : task ? "Save changes" : "Save task"}
        </Button>
      </div>
    </form>
  );
}
