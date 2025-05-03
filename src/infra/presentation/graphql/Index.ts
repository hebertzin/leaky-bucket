import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './schemas/UserSchema';
import { userResolvers } from './resolvers/UsersResolvers';

const typeDefs = mergeTypeDefs([userTypeDefs]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: userResolvers
});