import { describe, it, expect, beforeEach, vi } from "vitest";
import { User } from "../../../domain/entities/Users";
import { UserAlreadyExist, AppError } from "../../errors/Errors";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("CreateUserUseCase (using vi.mock)", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: any;
  let hashService: any;
  let logger: any;

  const fakeUser: User = {
    email: "test@example.com",
    name: "Test User",
    password: "plaintext-password",
  };

  beforeEach(() => {
    usersRepository = {
      findByEmail: vi.fn(),
      save: vi.fn(),
    };

    hashService = {
      hash: vi.fn(),
    };

    logger = {
      warn: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
    };

    createUserUseCase = new CreateUserUseCase(usersRepository, hashService, logger);
  });

  it("should create user if email is not registered", async () => {
    usersRepository.findByEmail.mockResolvedValue(null);
    hashService.hash.mockResolvedValue("hashed-password");
    usersRepository.save.mockImplementation(async (user: User) => user);

    const createdUser = await createUserUseCase.execute(fakeUser);

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(fakeUser.email);
    expect(hashService.hash).toHaveBeenCalledWith(fakeUser.password);
    expect(usersRepository.save).toHaveBeenCalled();
    expect(createdUser.password).toBe("hashed-password");
  });

  it("should throw if email already exists", async () => {
    usersRepository.findByEmail.mockResolvedValue(fakeUser);

    await expect(createUserUseCase.execute(fakeUser)).rejects.toThrow(UserAlreadyExist);
    expect(logger.warn).toHaveBeenCalled();
  });

  it("should throw AppError on save error", async () => {
    usersRepository.findByEmail.mockResolvedValue(null);
    hashService.hash.mockResolvedValue("hashed-password");
    usersRepository.save.mockRejectedValue(new Error("DB Error"));

    await expect(createUserUseCase.execute(fakeUser)).rejects.toThrow(AppError);
    expect(logger.error).toHaveBeenCalled();
  });
});
