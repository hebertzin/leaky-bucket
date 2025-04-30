import { MongoDBClient } from "../../../database/MongoDBClient";
import { logging } from "../../../logging/Logging";
import { dbConfig } from "../../../config/DbConfig";
import { MongoPixKeyRepository } from "../../../database/repository/PixRepository";
import { FindPixKeyUseCase } from "../../../../application/usecases/pix-key/FindPixKeyUseCase";

export const makeDbFindPixKeyFactory = async () => {
    const mongoClient = new MongoDBClient(dbConfig);
    await mongoClient.connect();
    const db = mongoClient.getDatabase();
    const repository = new MongoPixKeyRepository(db);
    return new FindPixKeyUseCase(repository, logging)
}
