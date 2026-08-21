import mongoose, { Schema, type Model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String },
    emailVerified: { type: Date, default: null },

    // Rate limiting — max 2 resume checks per rolling hour.
    lastCheckedAt: { type: Date, default: null },
    checkCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
    lastLoginAt: { type: Date, default: null },
  },
  { collection: "users" },
);

export interface UserDoc extends InferSchemaType<typeof userSchema> {
  _id: mongoose.Types.ObjectId;
}

export const User: Model<UserDoc> =
  (mongoose.models.User as Model<UserDoc>) ??
  mongoose.model<UserDoc>("User", userSchema);

export default User;
