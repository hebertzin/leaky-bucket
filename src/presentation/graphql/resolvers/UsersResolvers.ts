export const userResolvers = {
    Query: {
        user: async (_: unknown, args: { id: string }) => {
            console.log("User")
        }
    },
    Mutation: {
        createUser: async (_: unknown, { name, email, password }: { name: string, email: string, password: string }) => {
            console.log("Create user")
        },
    },
};