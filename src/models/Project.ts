import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["planned", "in-progress", "completed"], default: "planned" },
}, { timestamps: true });

export const Project = models.Project || model("Project", ProjectSchema);
