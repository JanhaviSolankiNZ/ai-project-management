import { Schema, model, models } from "mongoose";

const AIActivitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },

    type: {
      type: String,
      enum: [
        "task-breakdown",
        "smart-suggestion",
        "daily-summary",
        "chat",
      ],
      required: true,
    },

    prompt: { type: String, required: true },
    response: { type: String, required: true },

    tokensUsed: Number, // cost tracking
  },
  { timestamps: true }
);

export const AIActivity =
  models.AIActivity || model("AIActivity", AIActivitySchema);
