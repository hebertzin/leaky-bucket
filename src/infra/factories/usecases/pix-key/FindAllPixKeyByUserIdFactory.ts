import { MongoDBClient } from "../../../database/MongoDBClient";
import { logging } from "../../../logging/Logging";
import { dbConfig } from "../../../config/DbConfig";
import { MongoPixKeyRepository } from "../../../database/repository/PixRepository";
import { FindAllPixKeyByUserIdUseCase } from "../../../../application/usecases/pix-key/FindAllPixKeyByUserId.UseCase";

export const makeDbFindAllPixKeyByUserIdFactory = async () => {
    const mongoClient = new MongoDBClient(dbConfig);
    await mongoClient.connect();
    const db = mongoClient.getDatabase();
    const repository = new MongoPixKeyRepository(db);
    return new FindAllPixKeyByUserIdUseCase(repository, logging)
}
