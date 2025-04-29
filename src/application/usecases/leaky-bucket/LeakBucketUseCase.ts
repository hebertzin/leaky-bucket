import { leakyBucketConfig } from "../../../config/LeakBucketConfig";
import { LeakyBucketRepository } from "../../../domain/repository/LeakBucketRepository";

export class LeakyBucketUseCase {
  constructor(private readonly repository: LeakyBucketRepository) { }

  async execute(userId: string, success: boolean): Promise<boolean> {
    const now = new Date();
    let bucket = await this.repository.getByUserId(userId);

    if (!bucket) {
      bucket = {
        userId,
        tokens: leakyBucketConfig.maxTokens,
        lastLeak: now
      };
      await this.repository.upsertBucket(userId, bucket.tokens, bucket.lastLeak);
    }

    const elapsedHours = (now.getTime() - bucket.lastLeak.getTime()) / (1000 * 60 * 60);


    const tokensToAdd = Math.floor(elapsedHours);

    let updatedTokens = Math.min(
      bucket.tokens + tokensToAdd,
      leakyBucketConfig.maxTokens
    );


    const lastLeakUpdated = tokensToAdd > 0
      ? new Date(bucket.lastLeak.getTime() + tokensToAdd * 60 * 60 * 1000)
      : bucket.lastLeak;

    if (!success) {
      if (updatedTokens <= 0) {
        return false;
      }
      updatedTokens--;
    }


    await this.repository.upsertBucket(userId, updatedTokens, lastLeakUpdated);

    return true;
  }
}