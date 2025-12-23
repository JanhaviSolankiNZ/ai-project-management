export interface DailySummary {
  _id: string;
  userId: string;
  projectId: string;
  date: string;
  completedTasks: string[];
  pendingTasks: string[];
  aiSummary: string;
  nextSteps: string[];
}
