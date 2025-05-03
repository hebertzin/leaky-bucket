import { describe, it, expect, vi, beforeEach } from "vitest";
import { FindPixKeyUseCase } from "./FindPixKeyUseCase";
import type { PixKeyRepository } from "../../../domain/repository/PixRepository";
import type { Logging } from "../../../domain/Logging";
import { AppError, NotFound } from "../../errors/Errors";
import { PixKey } from "../../../domain/entities/PixKey";
import { mockPixKey } from "./__mocks__/MockPixKey";

describe("FindPixKeyUseCase", () => {
    let pixKeyRepository: PixKeyRepository;
    let logging: Logging;
    let useCase: FindPixKeyUseCase;

    const key = "30039494495";

    beforeEach(() => {
        pixKeyRepository = {
            findByKey: vi.fn()
        } as any;

        logging = {
            info: vi.fn(),
            debug: vi.fn(),
            error: vi.fn()
        } as any;

        useCase = new FindPixKeyUseCase(pixKeyRepository, logging);
    });

    it("Should return the Pix key when found", async () => {
        vi.mocked(pixKeyRepository.findByKey).mockResolvedValue(mockPixKey);

        const result = await useCase.execute(key);

        expect(result).toEqual(mockPixKey);
        expect(pixKeyRepository.findByKey).toHaveBeenCalledWith(key);
    });

    it("Should throw AppError in case of internal error and log", async () => {
        const fakeError = new Error("DB error");
        vi.mocked(pixKeyRepository.findByKey).mockRejectedValue(fakeError);

        await expect(useCase.execute(key)).rejects.toThrow(AppError);
        expect(logging.error).toHaveBeenCalledWith(expect.stringContaining("Failed to found Pix key"));
    });
});
