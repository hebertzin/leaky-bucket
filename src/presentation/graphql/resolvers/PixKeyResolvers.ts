import { dbConfig } from "../../../infra/config/DbConfig";
import { MongoDBClient } from "../../../infra/database/MongoDBClient";
import { MongoPixKeyRepository } from "../../../infra/database/repository/PixRepository";
import { makeDbAddPixKeyFactory } from "../../../infra/factories/usecases/pix-key/PixKeyUseCaseFactory";

export const pixKeyResolvers = {
    Query: {
        pixKey: async (_: unknown, { key }: { key: string }) => {
            try {
                const mongoClient = new MongoDBClient(dbConfig);
                await mongoClient.connect();
                const db = mongoClient.getDatabase();
                const repository = new MongoPixKeyRepository(db);
                const pixKey = await repository.findByKey(key);

                if (!pixKey) {
                    throw new Error("Pix key not found");
                }

                return {
                    key: pixKey.key,
                    type: pixKey.type,
                    userId: pixKey.userId,
                    owner: pixKey.owner,
                    bank: pixKey.bank,
                };
            } catch (error) {
                throw new Error("Some error has occurred");
            }
        },
        pixKeysByUserId: async (_: unknown, { userId }: { userId: string }) => {
            try {
                const mongoClient = new MongoDBClient(dbConfig);
                await mongoClient.connect();
                const db = mongoClient.getDatabase();
                const repository = new MongoPixKeyRepository(db);
                const pixKeys = await repository.findAllByUserId(userId);

                if (pixKeys.length === 0) {
                    throw new Error("No Pix keys found for this user");
                }

                return pixKeys.map(pixKey => ({
                    key: pixKey.key,
                    type: pixKey.type,
                    userId: pixKey.userId,
                    owner: pixKey.owner,
                    bank: pixKey.bank,
                }));
            } catch (error) {
                throw new Error("Some error has occurred");
            }
        },
    },
    Mutation: {
        createPixKey: async (_: unknown, { input }: { input: any }) => {
            try {
                const useCase = await makeDbAddPixKeyFactory();
                await useCase.execute(input);
            } catch (error) {
                throw new Error("Some error has occurred");
            }
        },
    },
};
