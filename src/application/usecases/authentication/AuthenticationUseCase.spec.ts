import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthenticationUseCase } from "./AuthenticationUseCase";
import { UsersRepository } from "../../../domain/repository/UsersRepository";
import { Jwt } from "../../../domain/Jwt";
import { Hash } from "../../../domain/Hash";
import { Logging } from "../../../domain/Logging";
import { NotFound, InvalidCredentials, AppError } from "../../errors/Errors";

describe("AuthenticationUseCase", () => {
    const mockUser = {
        id: "1",
        name: "Hebert santos",
        email: "hebertsantosdeveloper@gmail.com",
        password: "hashed-password"
    };

    const input = {
        email: "hebertsantosdeveloper@gmail.com",
        password: "20304050"
    };

    let usersRepository: UsersRepository;
    let jwtService: Jwt;
    let hash: Hash;
    let logging: Logging;
    let useCase: AuthenticationUseCase;

    beforeEach(() => {
        usersRepository = {
            findByEmail: vi.fn()
        } as any;

        jwtService = {
            sign: vi.fn()
        } as any;

        hash = {
            compare: vi.fn()
        } as any;

        logging = {
            error: vi.fn()
        } as any;

        useCase = new AuthenticationUseCase(usersRepository, jwtService, hash, logging);
    });

    it("Should authenticate and return a token", async () => {
        vi.mocked(usersRepository.findByEmail).mockResolvedValue(mockUser);
        vi.mocked(hash.compare).mockResolvedValue(true);
        vi.mocked(jwtService.sign).mockReturnValue("jwt-token");

        const result = await useCase.execute(input);

        expect(result).toEqual({ token: "jwt-token" });
    });

    it("Should throw NotFound if the user does not exist", async () => {
        vi.mocked(usersRepository.findByEmail).mockResolvedValue(null);

        await expect(useCase.execute(input)).rejects.toThrow(NotFound);
    });

    it("Should throw InvalidCredentials if password is incorrect", async () => {
        vi.mocked(usersRepository.findByEmail).mockResolvedValue(mockUser);
        vi.mocked(hash.compare).mockResolvedValue(false);

        await expect(useCase.execute(input)).rejects.toThrow(InvalidCredentials);
    });

    it("Should throw AppError if error occurs while generating token", async () => {
        vi.mocked(usersRepository.findByEmail).mockResolvedValue(mockUser);
        vi.mocked(hash.compare).mockResolvedValue(true);
        vi.mocked(jwtService.sign).mockImplementation(() => {
            throw new Error("Token error");
        });

        await expect(useCase.execute(input)).rejects.toThrow(AppError);
        expect(logging.error).toHaveBeenCalled();
    });
});
