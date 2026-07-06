export interface StudyTaskRow {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  subject: string | null;
  priority: "Low" | "Medium" | "High";
  status: "Not Started" | "In Progress" | "Completed";
  due_date: string | null;
  created_at: string;
  updated_at: string;
}
