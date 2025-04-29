import { Db } from "mongodb";
import { LeakyBucketRepository } from "../../../domain/repository/LeakBucketRepository";
import { LeakyBucket } from "../../../domain/LeakBucket";


export class MongoLeakyBucketRepository implements LeakyBucketRepository {
    constructor(private readonly db: Db) { }

    private get collection() {
        return this.db.collection<LeakyBucket>("leaky_buckets");
    }

    async getByUserId(userId: string): Promise<LeakyBucket | null> {
        return await this.collection.findOne({ userId });
    }

    async upsertBucket(userId: string, tokens: number, lastLeak: Date): Promise<void> {
        await this.collection.updateOne(
            { userId },
            {
                $set: {
                    tokens,
                    lastLeak,
                },
            },
            { upsert: true }
        );
    }

    async reset(userId: string): Promise<void> {
        await this.collection.deleteOne({ userId });
    }
}
