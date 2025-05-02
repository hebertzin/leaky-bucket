import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { leakyBucketConfig } from "../../../infra/config/LeakBucketConfig";
import type { LeakyBucketRepository } from "../../../domain/repository/LeakBucketRepository";
import type { Logging } from "../../../domain/Logging";
import { LeakyBucketUseCase } from "./LeakBucketUseCase";

describe("LeakyBucketUseCase", () => {
    let leakBucketRepository: LeakyBucketRepository;
    let logging: Logging;
    let useCase: LeakyBucketUseCase;

    const userId = "93848498384738284";
    const now = new Date("2024-01-01T12:00:00.000Z");

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(now);

        leakBucketRepository = {
            getByUserId: vi.fn(),
            upsertBucket: vi.fn(),
            reset: vi.fn()

        };

        logging = {
            info: vi.fn(),
            debug: vi.fn(),
            error: vi.fn(),
        } as any;

        useCase = new LeakyBucketUseCase(leakBucketRepository, logging);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("Should create a new bucket if it does not exist", async () => {
        vi.mocked(leakBucketRepository.getByUserId).mockResolvedValue(null);

        const result = await useCase.execute(userId, false);

        expect(result).toBe(true);
        expect(leakBucketRepository.upsertBucket).toHaveBeenCalledWith(
            userId,
            leakyBucketConfig.maxTokens - 1, // decrement 1 because it is a failure
            now
        );
    });

    it("Should deny operation if tokens are 0 and operation is failed", async () => {
        const bucket = {
            userId,
            tokens: 0,
            lastLeak: now
        };
        vi.mocked(leakBucketRepository.getByUserId).mockResolvedValue(bucket);

        const result = await useCase.execute(userId, false);

        expect(result).toBe(false);
        expect(leakBucketRepository.upsertBucket).not.toHaveBeenCalled();
    });

    it("Should allow operation and decrement token if token exists", async () => {
        const bucket = {
            userId,
            tokens: 2,
            lastLeak: now
        };
        vi.mocked(leakBucketRepository.getByUserId).mockResolvedValue(bucket);

        const result = await useCase.execute(userId, false);

        expect(result).toBe(true);
        expect(leakBucketRepository.upsertBucket).toHaveBeenCalledWith(
            userId,
            1,
            now
        );
    });

    it("Should regenerate tokens based on hours since lastLeak", async () => {
        const past = new Date(now.getTime() - 5 * 60 * 60 * 1000); // 5 hours ago
        const bucket = {
            userId,
            tokens: 1,
            lastLeak: past
        };
        vi.mocked(leakBucketRepository.getByUserId).mockResolvedValue(bucket);

        const result = await useCase.execute(userId, false);

        const expectedTokens = Math.min(1 + 5, leakyBucketConfig.maxTokens) - 1;
        const expectedLastLeak = new Date(past.getTime() + 5 * 60 * 60 * 1000);

        expect(result).toBe(true);
        expect(leakBucketRepository.upsertBucket).toHaveBeenCalledWith(
            userId,
            expectedTokens,
            expectedLastLeak
        );
    });

    it("Should not decrement token on successful operation", async () => {
        const bucket = {
            userId,
            tokens: 3,
            lastLeak: now
        };
        vi.mocked(leakBucketRepository.getByUserId).mockResolvedValue(bucket);

        const result = await useCase.execute(userId, true);

        expect(result).toBe(true);
        expect(leakBucketRepository.upsertBucket).toHaveBeenCalledWith(
            userId,
            3,
            now
        );
    });
});
