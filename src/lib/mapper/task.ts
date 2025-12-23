import { Task as TaskType } from "@/types/task.types"

export const mapTask = (doc: any): TaskType => ({
  _id: doc._id.toString(),
  projectId: doc.projectId.toString(),
  title: doc.title,
  description: doc.description,
  status: doc.status,
  priority: doc.priority,
  tags: doc.tags,
  estimatedHours: doc.estimatedHours,
  actualHours: doc.actualHours,
  isAIGenerated: doc.isAIGenerated,
  createdAt: doc.createdAt.toISOString(),
  updatedAt: doc.updatedAt.toISOString(),
});
