import { describe, it, expect, vi, beforeEach } from "vitest";
import type { PixKeyRepository } from "../../../domain/repository/PixRepository";
import type { Logging } from "../../../domain/Logging";
import { AppError, NotFound } from "../../errors/Errors";
import { FindAllPixKeyByUserIdUseCase } from "./FindAllPixKeyByUserId.UseCase";
import { mockPixKeys } from "./__mocks__/MockPixKey";
;

describe("FindAllPixKeyByUserIdUseCase", () => {
    let pixKeyRepository: PixKeyRepository;
    let logging: Logging;
    let useCase: FindAllPixKeyByUserIdUseCase;


    beforeEach(() => {
        pixKeyRepository = {
            findAllByUserId: vi.fn()
        } as any;

        logging = {
            error: vi.fn()
        } as any;

        useCase = new FindAllPixKeyByUserIdUseCase(pixKeyRepository, logging);
    });

    it("Should return all Pix keys associated with the userId", async () => {
        vi.mocked(pixKeyRepository.findAllByUserId).mockResolvedValue(mockPixKeys);
        const result = await useCase.execute("user-1");

        expect(result).toEqual(mockPixKeys);
        expect(pixKeyRepository.findAllByUserId).toHaveBeenCalledWith("user-1");
    });


    it("Should throw AppError and log error on failure", async () => {
        vi.mocked(pixKeyRepository.findAllByUserId).mockRejectedValue(new Error("DB error"));

        await expect(useCase.execute("3949449393")).rejects.toThrow(AppError);
        expect(logging.error).toHaveBeenCalledWith(
            expect.stringContaining("[FindPixKeyByUserIdUseCase] Failed to found all Pix key: Error: DB error")
        );
    });
});
