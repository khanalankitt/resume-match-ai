import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";
import type { AnalysisLogDocument } from "@/types/db";

const MAX_ANALYSES_PER_WINDOW = 2;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export class RateLimitExceededError extends Error {
  constructor(public retryAfterMs: number) {
    super("You've reached the limit of 2 resume analyses per hour.");
    this.name = "RateLimitExceededError";
  }
}

async function getCollection() {
  const client = await clientPromise;
  return client.db().collection<AnalysisLogDocument>("analysisLogs");
}

export async function checkAndRecordAnalysis(userId: string): Promise<void> {
  const collection = await getCollection();
  const windowStart = new Date(Date.now() - WINDOW_MS);
  const userObjectId = new ObjectId(userId);

  const recentCount = await collection.countDocuments({
    userId: userObjectId,
    createdAt: { $gte: windowStart },
  });

  if (recentCount >= MAX_ANALYSES_PER_WINDOW) {
    const oldestInWindow = await collection
      .find({ userId: userObjectId, createdAt: { $gte: windowStart } })
      .sort({ createdAt: 1 })
      .limit(1)
      .next();

    const retryAfterMs = oldestInWindow
      ? oldestInWindow.createdAt.getTime() + WINDOW_MS - Date.now()
      : WINDOW_MS;

    throw new RateLimitExceededError(Math.max(retryAfterMs, 0));
  }

  await collection.insertOne({
    _id: new ObjectId(),
    userId: userObjectId,
    createdAt: new Date(),
  });
}
