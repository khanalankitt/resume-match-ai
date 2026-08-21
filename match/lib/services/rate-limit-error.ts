export class RateLimitExceededError extends Error {
  constructor(public retryAfterMs: number) {
    super("You've reached the limit of 2 resume analyses per hour.");
    this.name = "RateLimitExceededError";
  }
}
