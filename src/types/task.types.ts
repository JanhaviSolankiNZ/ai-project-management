export type TaskStatus = "todo" | "in-progress" | "blocked" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type TaskTag = "frontend" | "backend" | "testing" | "devops";

export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: TaskTag[];
  estimatedHours?: number;
  actualHours?: number;
  isAIGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}
