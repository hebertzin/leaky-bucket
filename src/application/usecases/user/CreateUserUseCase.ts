import { Hash } from "../../../domain/Hash";
import { Logging } from "../../../domain/Logging";
import { UsersRepository } from "../../../domain/repository/UsersRepository";
import { User } from "../../../domain/entities/Users";
import { CreateUser } from "../../../domain/usecases/CreateUserUseCase";
import { UserConfig } from "../../../config/UserConfig";


export class CreateUserUseCase implements CreateUser {
    constructor(
        readonly usersRepository: UsersRepository,
        readonly bcrypt: Hash,
        readonly logging: Logging,
    ) { }

    public async execute(user: User): Promise<User> {
        const existentUser = await this.usersRepository.findByEmail(user.email);

        if (existentUser) {
            this.logging.warn(`[CreateUserUseCase] Attempted to create already existing user: ${existentUser.email}`);
            throw new Error("User already exist");
        }

        try {
            const passwordHashed = await this.bcrypt.hash(user.password)

            return await this.usersRepository.save({
                email: user.email,
                name: user.name,
                password: passwordHashed,
                tokens: UserConfig.INITIAL_TOKENS,
            });
        } catch (error) {
            this.logging.error(`[CreateUserUseCase] Error creating user: ${(error as Error).message}`);
            throw new Error("Some error has been ocurred");
        }
    }
}
