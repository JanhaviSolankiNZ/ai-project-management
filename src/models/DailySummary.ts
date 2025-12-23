import { Schema, model, models } from "mongoose";

const DailySummarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    date: { type: Date, required: true },

    completedTasks: [String],
    pendingTasks: [String],
    aiSummary: { type: String, required: true },
    nextSteps: [String],
  },
  { timestamps: true }
);

export const DailySummary =
  models.DailySummary || model("DailySummary", DailySummarySchema);
