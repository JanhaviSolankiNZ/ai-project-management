import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      // Only required for credentials-based signup
      required: function () {
        return this.authProvider === "credentials";
      },
    },

    image: {
      type: String,
      default: "",
    },

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

// Prevent model overwrite error in dev
export const User = models.User || model("User", UserSchema);
