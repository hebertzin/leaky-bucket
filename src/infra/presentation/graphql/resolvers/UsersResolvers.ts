import { dbConfig } from "../../../config/DbConfig";
import { MongoDBClient } from "../../../database/MongoDBClient";
import { MongoUsersRepository } from "../../../database/repository/UsersRepository";
import { makeDbSaveUser } from "../../../factories/usecases/users/CreateUserUseCaseFactory";

export const userResolvers = {
    Query: {
        user: async (_: unknown, { email }: { email: string }) => {
            try {
                const mongoClient = new MongoDBClient(dbConfig);
                await mongoClient.connect();
                const db = mongoClient.getDatabase();
                const findUserById = new MongoUsersRepository(db);
                const user = await findUserById.findByEmail(email);

                if (!user) {
                    throw new Error("User not found");
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
            } catch (error) {
                throw new Error("Some error has been occurred");
            }
        },
    },
    Mutation: {
        createUser: async (
            _: unknown,
            { input }: { input: { name: string; email: string; password: string } }
        ) => {
            try {
                const usersFactory = await makeDbSaveUser();
                const result = await usersFactory.execute({
                    name: input.name,
                    email: input.email,
                    password: input.password,
                });

                return {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                };
            } catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Some error has been ocurred");
            }
        },
    },
};
