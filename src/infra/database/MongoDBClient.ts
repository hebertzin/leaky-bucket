import { MongoClient, Db } from "mongodb";
import { DatabaseConfig } from "../../domain/DatabaseConfig";
import { env } from "../env/Env";
import { dbConfig } from "../config/DbConfig";

export class MongoDBClient {
    private client: MongoClient;
    private db: Db | null = null;

    constructor(private config: DatabaseConfig) {
        // Initialize the MongoDB client using the provided configuration (uri and dbName)
        this.client = new MongoClient(dbConfig.uri);
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            this.db = this.client.db(this.config.dbName);
        } catch (error) {
            throw new Error("Could not connect to MongoDB.");
        }
    }

    public getDatabase(): Db {
        if (!this.db) {
            throw new Error("Database is not connected. Call connect() first.");
        }
        return this.db;
    }

    public async disconnect(): Promise<void> {
        await this.client.close();
        this.db = null;
    }
}
