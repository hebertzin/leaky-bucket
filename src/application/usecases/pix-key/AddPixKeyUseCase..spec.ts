import { describe, it, expect, vi, beforeEach } from "vitest";
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { PixKeyAlreadyExist, AppError } from "../../errors/Errors";
import { RegisterPixKeyUseCase } from "./AddPixKeyUseCase";
import { PixKey } from "../../../domain/PixKey";

describe("RegisterPixKeyUseCase", () => {
    const mockPixKey: PixKey = {
        bank: "Banco itau",
        owner: "Hebert santos",
        key: "hebert santos developer@gmail.com",
        type: "EMAIL",
        userId: "2939484485743"
    };

    let pixKeyRepository: PixKeyRepository;
    let logging: Logging;
    let useCase: RegisterPixKeyUseCase;

    beforeEach(() => {
        pixKeyRepository = {
            findByKey: vi.fn(),
            registerKey: vi.fn()
        } as any;

        logging = {
            error: vi.fn()
        } as any;

        useCase = new RegisterPixKeyUseCase(pixKeyRepository, logging);
    });

    it("Should register a pix key sucessfully", async () => {
        vi.mocked(pixKeyRepository.findByKey).mockResolvedValue(null);
        vi.mocked(pixKeyRepository.registerKey).mockResolvedValue(undefined);

        await expect(useCase.execute(mockPixKey)).resolves.toBeUndefined();
        expect(pixKeyRepository.registerKey).toHaveBeenCalledWith(mockPixKey);
    });

    it("Should return PixKeyAlreadyExist if the key already exists", async () => {
        vi.mocked(pixKeyRepository.findByKey).mockResolvedValue(mockPixKey);

        await expect(useCase.execute(mockPixKey)).rejects.toThrow(PixKeyAlreadyExist);
        expect(pixKeyRepository.registerKey).not.toHaveBeenCalled();
    });

    it("Should return AppError and logger error if it fails", async () => {
        vi.mocked(pixKeyRepository.findByKey).mockResolvedValue(null);
        vi.mocked(pixKeyRepository.registerKey).mockRejectedValue(new Error("DB error"));

        await expect(useCase.execute(mockPixKey)).rejects.toThrow(AppError);
        expect(logging.error).toHaveBeenCalled();
    });
});
