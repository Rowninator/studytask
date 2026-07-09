import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CompleteCheckbox } from "@/components/dashboard/complete-checkbox";
import { DeleteTaskButton } from "@/components/dashboard/delete-task-button";
import { EditTaskDialog } from "@/components/dashboard/edit-task-dialog";
import type { Task } from "@/lib/tasks";

const PRIORITY_VARIANT: Record<Task["priority"], "destructive" | "secondary" | "outline"> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
};

export function TaskCard({ task }: { task: Task }) {
  const isCompleted = task.status === "Completed";

  return (
    <Card>
      <CardContent className="flex items-start gap-3">
        <CompleteCheckbox taskId={task.id} completed={isCompleted} />

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={
                isCompleted
                  ? "font-medium text-muted-foreground line-through"
                  : "font-medium"
              }
            >
              {task.title}
            </h3>
            <Badge variant={PRIORITY_VARIANT[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="outline">{task.status}</Badge>
          </div>

          {task.description && (
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {task.subject && <span>{task.subject}</span>}
            <span>{task.dueDate ? `Due ${task.dueDate}` : "No due date"}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <EditTaskDialog task={task} />
          <DeleteTaskButton taskId={task.id} />
        </div>
      </CardContent>
    </Card>
  );
}
