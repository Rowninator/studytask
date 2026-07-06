import type { Task } from "@/lib/tasks";

// Fallback/dev reference data only — the dashboard now reads real tasks
// from Supabase. Not used in the live render path.
export const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    title: "Finish calculus problem set",
    description: "Complete problems 1-20 on derivatives and chain rule practice.",
    subject: "Math",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-07-07",
  },
  {
    id: "2",
    title: "Read chapter 6 on cell biology",
    description: "Read and take notes on mitosis and meiosis for the upcoming quiz.",
    subject: "Biology",
    priority: "Medium",
    status: "Not Started",
    dueDate: "2026-07-09",
  },
  {
    id: "3",
    title: "Essay draft on the French Revolution",
    description: "Write a first draft covering causes and key events before class discussion.",
    subject: "History",
    priority: "High",
    status: "Not Started",
    dueDate: "2026-07-08",
  },
  {
    id: "4",
    title: "Practice React component exercises",
    description: "Work through the assigned exercises on props and state.",
    subject: "Computer Science",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-07-04",
  },
  {
    id: "5",
    title: "Vocabulary review for English",
    description: "Review this week's vocabulary list and write example sentences.",
    subject: "English",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-07-03",
  },
  {
    id: "6",
    title: "Study for chemistry lab quiz",
    description: "Review lab safety procedures and titration steps before Friday's quiz.",
    subject: "Chemistry",
    priority: "High",
    status: "Not Started",
    dueDate: "2026-07-10",
  },
];
