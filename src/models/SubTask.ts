import { Schema, model, models } from "mongoose";

const SubTaskSchema = new Schema({
  title: { type: String, required: true },
  parentTaskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  status: { type: String, enum: ["todo", "done"], default: "todo" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const SubTask = models.SubTask || model("SubTask", SubTaskSchema);
