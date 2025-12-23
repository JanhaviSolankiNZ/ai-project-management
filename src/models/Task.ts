import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    title: { type: String, required: true },
    description: String,

    status: {
      type: String,
      enum: ["todo", "in-progress", "blocked", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    tags: [
      {
        type: String,
        enum: ["frontend", "backend", "testing", "devops"],
      },
    ],

    estimatedHours: Number, // AI-generated
    actualHours: Number,

    isAIGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Task = models.Task || model("Task", TaskSchema);
