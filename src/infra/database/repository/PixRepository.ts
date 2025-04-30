import { Db } from "mongodb";
import { PixKey } from "../../../domain/PixKey";
import { PixKeyRepository } from "../../../domain/repository/PixRepository";

export class MongoPixKeyRepository implements PixKeyRepository {
  constructor(private readonly db: Db) {}

  private get collection() {
    return this.db.collection<PixKey>("pix_keys");
  }

  async findByKey(key: string): Promise<PixKey | null> {
    return await this.collection.findOne({ key });
  }

  async registerKey(pixKey: PixKey): Promise<void> {
    await this.collection.insertOne(pixKey);
  }

  async removePixKey(key: string): Promise<void> {
    await this.collection.deleteOne({ key });
  }

  async findAllByUserId(userId: string): Promise<PixKey[]> {
    return await this.collection.find({ userId }).toArray();
  }
}
