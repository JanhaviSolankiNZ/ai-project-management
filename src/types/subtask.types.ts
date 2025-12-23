export type SubTaskStatus = "todo" | "done";

export interface ISubTask {
  _id: string;
  title: string;
  parentTaskId: string;
  status: SubTaskStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
