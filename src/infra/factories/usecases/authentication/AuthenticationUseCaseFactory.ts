import { MongoDBClient } from "../../../database/MongoDBClient";
import { MongoUsersRepository } from "../../../database/repository/UsersRepository";
import { CreateUserUseCase } from "../../../../application/usecases/user/CreateUserUseCase";
import { BcryptHashService } from "../../../security/Hash";
import { logging } from "../../../logging/Logging";
import { dbConfig } from "../../../config/DbConfig";
import { AuthenticationUseCase } from "../../../../application/usecases/authentication/AuthenticationUseCase";
import { JwtManager } from "../../../security/Jwt";

export const makeAuthenticationUseCase = async () => {
    const mongoClient = new MongoDBClient(dbConfig);
    await mongoClient.connect();
    const db = mongoClient.getDatabase();
    const repository = new MongoUsersRepository(db);
    const bcrypt = new BcryptHashService();
    const jwt = new JwtManager()
    return new AuthenticationUseCase(repository, jwt, bcrypt, logging);
}
