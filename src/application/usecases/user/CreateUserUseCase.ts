import { Hash } from "../../../domain/Hash";
import { Logging } from "../../../domain/Logging";
import { UsersRepository } from "../../../domain/repository/UsersRepository";
import { User } from "../../../domain/entities/Users";
import { CreateUser } from "../../../domain/usecases/CreateUserUseCase";
import { AppError, UserAlreadyExist } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";

export class CreateUserUseCase implements CreateUser {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly hashService: Hash,
        private readonly logging: Logging,
    ) { }

    public async execute(user: User): Promise<User> {
        const existingUser = await this.usersRepository.findByEmail(user.email);
        if (existingUser) {
            this.logging.warn(`[CreateUserUseCase] User already exists: ${existingUser.email}`);
            throw new UserAlreadyExist("User already exists", HttpStatusCode.Conflict);
        }

        try {
            const hashedPassword = await this.hashService.hash(user.password);
            const newUser = {
                ...user,
                password: hashedPassword,
            };

            return await this.usersRepository.save(newUser);
        } catch (err) {
            this.logging.error(`[CreateUserUseCase] Failed to create user ${err}`);
            throw new AppError("Some error has been ocurred", HttpStatusCode.InternalServerError);
        }
    }
}
