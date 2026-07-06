import { ListTodo, CalendarClock, Flame, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { getTaskSummary } from "@/lib/sample-tasks";

const CARD_CONFIG = [
  { key: "total", label: "Total tasks", icon: ListTodo },
  { key: "dueSoon", label: "Due soon", icon: CalendarClock },
  { key: "highPriority", label: "High priority", icon: Flame },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
] as const;

export function SummaryCards({
  summary,
}: {
  summary: ReturnType<typeof getTaskSummary>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CARD_CONFIG.map(({ key, label, icon: Icon }) => (
        <Card key={key}>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{summary[key]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
