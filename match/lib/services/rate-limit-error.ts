export class RateLimitExceededError extends Error {
  constructor(public retryAfterMs: number) {
    super("You've reached the limit of 5 resume analyses per hour.");
    this.name = "RateLimitExceededError";
  }
}
