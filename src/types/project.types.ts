export type ProjectStatus = "planned" | "active" | "completed";

export interface Project {
  _id: string;
  name: string;
  description?: string;
  ownerId: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}
