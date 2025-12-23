export type AIActivityType =
  | "task-breakdown"
  | "smart-suggestion"
  | "daily-summary"
  | "chat";

export interface AIActivity {
  _id: string;
  userId: string;
  projectId?: string;
  type: AIActivityType;
  prompt: string;
  response: string;
  tokensUsed?: number;
  createdAt: string;
}
