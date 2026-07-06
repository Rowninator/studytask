import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function TaskForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a task</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="task-title">Title</Label>
          <Input id="task-title" placeholder="e.g. Finish reading assignment" />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="task-description">Description</Label>
          <Textarea
            id="task-description"
            placeholder="Add any helpful details about this task"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="task-subject">Subject</Label>
          <Input id="task-subject" placeholder="e.g. Math" />
        </div>

        <div className="space-y-1.5">
          <Label>Priority</Label>
          <Select defaultValue="Medium">
            <SelectTrigger className="w-full">
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
          <Label>Status</Label>
          <Select defaultValue="Not Started">
            <SelectTrigger className="w-full">
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
          <Label htmlFor="task-due-date">Due date</Label>
          <Input id="task-due-date" type="date" />
        </div>

        <div className="flex items-end justify-end gap-2 sm:col-span-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save task</Button>
        </div>
      </CardContent>
    </Card>
  );
}
