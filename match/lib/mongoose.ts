import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

declare global {
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

/** Cached Mongoose connection (separate from the raw adapter client in lib/db.ts). */
const mongoosePromise: Promise<typeof mongoose> =
  (global._mongoosePromise ??= mongoose.connect(uri));

export default mongoosePromise;
