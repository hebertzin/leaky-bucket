import { MongoDBClient } from "../../../database/MongoDBClient";
import { logging } from "../../../logging/Logging";
import { dbConfig } from "../../../config/DbConfig";
import { MongoPixKeyRepository } from "../../../database/repository/PixRepository";
import { RemovePixKeyUseCase } from "../../../../application/usecases/pix-key/RemovePixKeyUseCase";

export const makeDbRemovePixKeyFactory = async () => {
    const mongoClient = new MongoDBClient(dbConfig);
    await mongoClient.connect();
    const db = mongoClient.getDatabase();
    const repository = new MongoPixKeyRepository(db);
    return new RemovePixKeyUseCase(repository, logging)
}
