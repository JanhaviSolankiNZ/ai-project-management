import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: String,

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
