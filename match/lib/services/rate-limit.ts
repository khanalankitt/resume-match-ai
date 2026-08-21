import { RateLimitExceededError } from "./rate-limit-error";
import mongoosePromise from "@/lib/mongoose";
import User from "@/models/user";

export { RateLimitExceededError };

const MAX_CHECKS_PER_HOUR = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Atomically records one resume check against the user's hourly quota.
 *
 * The quota lives on the user document itself (`lastCheckedAt` + `checkCount`):
 * - If the last check is older than 1 hour, the counter resets.
 * - Otherwise the counter must be below MAX_CHECKS_PER_HOUR to proceed.
 *
 * Uses a single conditional findOneAndUpdate so concurrent requests cannot
 * exceed the limit. Throws RateLimitExceededError when the quota is spent.
 */
export async function checkAndRecordAnalysis(userId: string): Promise<void> {
  await mongoosePromise;
  const windowStart = new Date(Date.now() - WINDOW_MS);

  const updated = await User.findOneAndUpdate(
    {
      _id: userId,
      $or: [
        // Never checked before (null also matches a missing field).
        { lastCheckedAt: null },
        // Window expired — counter will reset.
        { lastCheckedAt: { $lte: windowStart } },
        // Inside the window but quota remains.
        { checkCount: { $lt: MAX_CHECKS_PER_HOUR } },
      ],
    },
    [
      {
        $set: {
          lastCheckedAt: "$$NOW",
          checkCount: {
            $cond: [
              // Inside the current window? Increment. Otherwise reset to 1.
              { $gt: ["$lastCheckedAt", windowStart] },
              { $add: [{ $ifNull: ["$checkCount", 0] }, 1] },
              1,
            ],
          },
        },
      },
    ],
    { returnDocument: "after", upsert: false, updatePipeline: true },
  );

  if (updated) return;

  // Quota exhausted — compute when the user can check again.
  const user = await User.findById(userId).select("lastCheckedAt").lean();
  const last = user?.lastCheckedAt ?? null;
  const retryAfterMs = last ? last.getTime() + WINDOW_MS - Date.now() : WINDOW_MS;
  throw new RateLimitExceededError(Math.max(retryAfterMs, 0));
}

/** Read-only view of the user's remaining checks for UI display. */
export async function getCheckStatus(
  userId: string,
): Promise<{ remaining: number; resetsAt: Date | null }> {
  await mongoosePromise;
  const user = await User.findById(userId)
    .select("lastCheckedAt checkCount")
    .lean();

  if (!user) return { remaining: MAX_CHECKS_PER_HOUR, resetsAt: null };

  const last = user.lastCheckedAt ?? null;
  if (!last || last.getTime() <= Date.now() - WINDOW_MS) {
    return { remaining: MAX_CHECKS_PER_HOUR, resetsAt: null };
  }

  return {
    remaining: Math.max(0, MAX_CHECKS_PER_HOUR - (user.checkCount ?? 0)),
    resetsAt: new Date(last.getTime() + WINDOW_MS),
  };
}
