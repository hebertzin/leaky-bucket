import { Db } from "mongodb";
import { User } from "../models/User";
import { UsersRepository } from "../../../domain/repository/UsersRepository";

export class MongoUsersRepository implements UsersRepository {
    constructor(private readonly db: Db) { }

    private get collection() {
        return this.db.collection<User>("users");
    }

    async save(user: User): Promise<User> {
        const result = await this.collection.insertOne({
            ...user,
            createdAt: new Date()
        });
        return { ...user, _id: result.insertedId.toString() };
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.collection.findOne({ email });
        return user;
    }

}
