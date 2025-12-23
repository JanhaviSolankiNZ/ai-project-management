import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional if using Google OAuth
  authProvider: { type: String, enum: ["email", "google"], default: "email" },
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);
