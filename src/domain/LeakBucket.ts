export type LeakyBucket = {
    userId: string;
    tokens: number;
    lastLeak: Date;
}
