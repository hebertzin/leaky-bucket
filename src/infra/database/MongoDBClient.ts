import { MongoClient, Db } from "mongodb";

export class MongoDBClient {
  private static instance: MongoDBClient;
  private client: MongoClient;
  private db: Db | null = null;

  private constructor(private config: DatabaseConfig) {
    this.client = new MongoClient(config.uri);
  }

  public static getInstance(config: DatabaseConfig): MongoDBClient {
    if (!MongoDBClient.instance) {
      MongoDBClient.instance = new MongoDBClient(config);
    }

    return MongoDBClient.instance;
  }

  public async connect(): Promise<void> {
    if (!this.db) {
      try {
        await this.client.connect();
        this.db = this.client.db(this.config.dbName);
        console.log(`MongoDB connected to database: ${this.config.dbName}`);
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
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
    console.log("MongoDB disconnected");
  }
}
