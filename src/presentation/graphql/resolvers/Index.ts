import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './UsersResolvers';

export const resolvers = mergeResolvers([userResolvers]);