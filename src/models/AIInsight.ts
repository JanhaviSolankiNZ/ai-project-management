import { Schema, model, models } from "mongoose";

const AIInsightSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
  insight: { type: String, required: true },
  type: { type: String, enum: ["summary", "priority_suggestion", "deadline_risk"], required: true },
}, { timestamps: true });

export const AIInsight = models.AIInsight || model("AIInsight", AIInsightSchema);
