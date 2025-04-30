import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schemas/Index';
import { resolvers } from './resolvers/Index';

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});