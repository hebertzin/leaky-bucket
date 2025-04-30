import { dbConfig } from "../config/DbConfig";
import { MongoDBClient } from "./MongoDBClient";

export async function startDatabase() {
    const mongoClient = new MongoDBClient(dbConfig);  
    await mongoClient.connect(); 
    const db = mongoClient.getDatabase(); 
    return db; 
}
