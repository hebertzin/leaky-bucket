import { leakyBucketConfig } from "../../../infra/config/LeakBucketConfig";
import { Logging } from "../../../domain/Logging";
import { LeakyBucketRepository } from "../../../domain/repository/LeakBucketRepository";

export class LeakyBucketUseCase {
  constructor(
    private readonly leakBucketRepository: LeakyBucketRepository,
    private readonly logging: Logging
  ) { }

  async execute(userId: string, success: boolean): Promise<boolean> {
    const now = new Date();
    this.logging.info(`[LeakyBucketUseCase] Processing request for user ${userId} at ${now.toISOString()}, success: ${success}`);

    let bucket = await this.leakBucketRepository.getByUserId(userId);
    this.logging.info(`[LeakyBucketUseCase] Retrieved bucket for user ${userId}: ${JSON.stringify(bucket)}`);

    if (!bucket) {
      bucket = {
        userId,
        tokens: leakyBucketConfig.maxTokens,
        lastLeak: now
      };
      await this.leakBucketRepository.upsertBucket(userId, bucket.tokens, bucket.lastLeak);
    }

    const elapsedHours = (now.getTime() - bucket.lastLeak.getTime()) / (1000 * 60 * 60);

    const tokensToAdd = Math.floor(elapsedHours);
    let updatedTokens = Math.min(
      bucket.tokens + tokensToAdd,
      leakyBucketConfig.maxTokens
    );
    this.logging.debug(`[LeakyBucketUseCase] Tokens to add: ${tokensToAdd}, updated tokens before operation: ${updatedTokens}`);

    const lastLeakUpdated = tokensToAdd > 0
      ? new Date(bucket.lastLeak.getTime() + tokensToAdd * 60 * 60 * 1000)
      : bucket.lastLeak;

    if (!success) {
      if (updatedTokens <= 0) {
        return false;
      }
      updatedTokens--;
    } else {
      this.logging.debug(`[LeakyBucketUseCase] Processing successful operation for user ${userId}, no token deduction`);
    }

    await this.leakBucketRepository.upsertBucket(userId, updatedTokens, lastLeakUpdated);
    this.logging.info(`[LeakyBucketUseCase] Updated bucket for user ${userId}: tokens=${updatedTokens}, lastLeak=${lastLeakUpdated.toISOString()}`);

    return true;
  }
}