import { dbConfig } from "../../config/DbConfig";
import { MongoDBClient } from "./MongoDBClient";


export const mongo = MongoDBClient.getInstance(dbConfig);

export async function startDatabase() {
  await mongo.connect();
  mongo.getDatabase()
}

startDatabase().catch(console.error);
