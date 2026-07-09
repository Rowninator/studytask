"use client";

import { useMemo, useState } from "react";

import { TaskList } from "@/components/dashboard/task-list";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task } from "@/lib/tasks";

const ALL = "All";

export function FilterableTaskList({ tasks }: { tasks: Task[] }) {
  const [status, setStatus] = useState(ALL);
  const [priority, setPriority] = useState(ALL);
  const [subject, setSubject] = useState(ALL);

  const subjects = useMemo(() => {
    const unique = new Set(
      tasks.map((task) => task.subject).filter((value) => value.trim())
    );
    return Array.from(unique).sort();
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (status !== ALL && task.status !== status) return false;
      if (priority !== ALL && task.priority !== priority) return false;
      if (subject !== ALL && task.subject !== subject) return false;
      return true;
    });
  }, [tasks, status, priority, subject]);

  const hasActiveFilters =
    status !== ALL || priority !== ALL || subject !== ALL;

  function clearFilters() {
    setStatus(ALL);
    setPriority(ALL);
    setSubject(ALL);
  }

  if (tasks.length === 0) {
    return <TaskList tasks={tasks} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={status}
          onValueChange={(value) => setStatus(value ?? ALL)}
        >
          <SelectTrigger className="w-[150px]" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priority}
          onValueChange={(value) => setPriority(value ?? ALL)}
        >
          <SelectTrigger className="w-[150px]" aria-label="Filter by priority">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={subject}
          onValueChange={(value) => setSubject(value ?? ALL)}
        >
          <SelectTrigger className="w-[150px]" aria-label="Filter by subject">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All subjects</SelectItem>
            {subjects.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No tasks match your filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}
    </div>
  );
}
