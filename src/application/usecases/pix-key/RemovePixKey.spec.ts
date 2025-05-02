import { describe, it, expect, vi, beforeEach } from "vitest";
import { RemovePixKeyUseCase } from "./RemovePixKeyUseCase";
import type { PixKeyRepository } from "../../../domain/repository/PixRepository";
import type { Logging } from "../../../domain/Logging";
import { AppError } from "../../errors/Errors";

describe("RemovePixKeyUseCase", () => {
    let pixKeyRepository: PixKeyRepository;
    let logging: Logging;
    let useCase: RemovePixKeyUseCase;

    const key = "82737372733874";

    beforeEach(() => {
        pixKeyRepository = {
            removePixKey: vi.fn()
        } as any;

        logging = {
            info: vi.fn(),
            debug: vi.fn(),
            error: vi.fn()
        } as any;

        useCase = new RemovePixKeyUseCase(pixKeyRepository, logging);
    });

    it("Should remove a pix key successfully", async () => {
        vi.mocked(pixKeyRepository.removePixKey).mockResolvedValue(undefined);

        await expect(useCase.execute(key)).resolves.toBeUndefined();
        expect(pixKeyRepository.removePixKey).toHaveBeenCalledWith(key);
    });

    it("Should throw error and log if removal fails", async () => {
        const fakeError = new Error("Db error");
        vi.mocked(pixKeyRepository.removePixKey).mockRejectedValue(fakeError);

        await expect(useCase.execute(key)).rejects.toThrow(AppError);
        expect(logging.error).toHaveBeenCalledWith(expect.stringContaining("Failed to remove Pix key"));
    });
});
