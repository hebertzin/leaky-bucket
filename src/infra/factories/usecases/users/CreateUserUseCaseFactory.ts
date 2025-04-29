import { MongoDBClient } from "../../../database/MongoDBClient"; 
import { MongoUsersRepository } from "../../../database/repository/UsersRepository";
import { CreateUserUseCase } from "../../../../application/usecases/user/CreateUserUseCase"; 
import { BcryptHashService } from "../../../security/Hash"; 
import { logging } from "../../../logging/Logging"; 
import { dbConfig } from "../../../../config/DbConfig";

export const makeDbSaveUser = async () => {
    const mongoClient = new MongoDBClient(dbConfig);
    await mongoClient.connect(); 
    const db = mongoClient.getDatabase();
    const repository = new MongoUsersRepository(db); 
    const bcrypt = new BcryptHashService();
    return new CreateUserUseCase(repository, bcrypt, logging);
}
