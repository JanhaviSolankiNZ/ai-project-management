import { z } from "zod";

export const createTaskSchema = z.object({
  projectId: z.string().min(1),

  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),

  status: z.enum(["todo", "in-progress", "blocked", "done"]).optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),

  tags: z
    .array(z.enum(["frontend", "backend", "testing", "devops"]))
    .optional(),

  estimatedHours: z.number().optional(),
   deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),

  isAIGenerated: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;