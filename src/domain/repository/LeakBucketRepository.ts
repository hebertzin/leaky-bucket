import { LeakyBucket } from "../entities/LeakBucket";

export interface LeakyBucketRepository {
    getByUserId(userId: string): Promise<LeakyBucket | null>;
    upsertBucket(userId: string, tokens: number, lastLeak: Date): Promise<void>;
    reset(userId: string): Promise<void>;
}