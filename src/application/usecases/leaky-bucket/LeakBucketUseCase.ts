import { leakyBucketConfig } from "../../../config/LeakBucketConfig";
import { LeakyBucketRepository } from "../../../domain/repository/LeakBucketRepository";

export class LeakyBucketUseCase {
    constructor(private readonly repository: LeakyBucketRepository) { }

    async execute(userId: string): Promise<boolean> {
        const now = new Date();
        let bucket = await this.repository.getByUserId(userId);

        if (!bucket) {
            await this.repository.upsertBucket(userId, leakyBucketConfig.maxTokens - 1, now);
            return true;
        }

        const elapsedSeconds = (now.getTime() - bucket.lastLeak.getTime()) / 1000;
        const tokensToAdd = Math.floor(elapsedSeconds / leakyBucketConfig.refillRate);
        let tokens = Math.min(bucket.tokens + tokensToAdd, leakyBucketConfig.maxTokens);

        if (tokens <= 0) {
            return false;
        }

        tokens--;
        await this.repository.upsertBucket(userId, tokens, now);
        return true;
    }
}
