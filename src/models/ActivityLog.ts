import { Schema, model, models } from "mongoose";

const ActivityLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
}, { timestamps: true });

export const ActivityLog = models.ActivityLog || model("ActivityLog", ActivityLogSchema);
