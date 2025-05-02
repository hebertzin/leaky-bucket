import { describe, it, expect, vi, beforeEach } from "vitest";
import type { PixKeyRepository } from "../../../domain/repository/PixRepository";
import type { Logging } from "../../../domain/Logging";
import { AppError } from "../../errors/Errors";
import { FindAllPixKeyByUserIdUseCase } from "./FindAllPixKeyByUserId.UseCase";
import { PixKey } from "../../../domain/PixKey";

describe("FindAllPixKeyByUserIdUseCase", () => {
    let pixKeyRepository: PixKeyRepository;
    let logging: Logging;
    let useCase: FindAllPixKeyByUserIdUseCase;

    const mockPixKeys: PixKey[] = [
        {
            key: "09969604570",
            type: "CPF",
            userId: "4949585849394",
            owner: "Hebert santos",
            bank: "Banco Itau"
        }
    ];

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

    it("Should return null if no key is found", async () => {
        vi.mocked(pixKeyRepository.findAllByUserId).mockResolvedValue(null);

        const result = await useCase.execute("user-1");

        expect(result).toBeNull();
    });

    it("Should throw AppError and log error on failure", async () => {
        vi.mocked(pixKeyRepository.findAllByUserId).mockRejectedValue(new Error("DB error"));

        await expect(useCase.execute("user-1")).rejects.toThrow(AppError);
        expect(logging.error).toHaveBeenCalledWith(
            expect.stringContaining("[FindPixKeyByUserIdUseCase] Failed to found all Pix key")
        );
    });
});
