import { Hash } from "../../../domain/Hash";
import { Logging } from "../../../domain/Logging";
import { AppError, InvalidCredentials, NotFound } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { UsersRepository } from "../../../domain/repository/UsersRepository";
import { Authentication, Login, Token } from "../../../domain/Authentication";
import { Jwt } from "../../../domain/Jwt";

export class AuthenticationUseCase implements Login {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: Jwt,
        private readonly bcrypt: Hash,
        private readonly logging: Logging,
    ) { }

    public async execute(user: Authentication): Promise<Token> {
        const existentUser = await this.usersRepository.findByEmail(user.email);
        if (!existentUser) {
            throw new NotFound("User does not exist", HttpStatusCode.NotFound);
        }

        const isValidPassword = await this.bcrypt.compare(user.password, existentUser.password);
        if (!isValidPassword) {
            throw new InvalidCredentials("Invalid credentials", HttpStatusCode.Unauthorized);
        }
        try {
            const token = this.jwtService.sign({ email: existentUser.email, _id: existentUser._id }, { expiresIn: '1d' });
            return { token };
        } catch (error) {
            this.logging.error(`Some internal server error has been ocurred trying log user : ${error}`);
            throw new AppError("Internal server error", HttpStatusCode.InternalServerError);
        }
    }
}