
import { CreateUserUseCase } from "../../../../application/usecases/user/CreateUserUseCase"
import { mongo } from "../../../database/Mongo"
import { MongoUsersRepository } from "../../../database/repository/UsersRepository"
import { logging } from "../../../logging/Logging"
import { BcryptHashService } from "../../../security/Hash"


export const makeDbSaveUser = () => {
    const repository = new MongoUsersRepository(mongo.getDatabase())
    const bcrypt = new BcryptHashService()
    return new CreateUserUseCase(repository, bcrypt, logging)
}