import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './UsersResolvers';
import { pixKeyResolvers } from './PixKeyResolvers';

export const resolvers = mergeResolvers([userResolvers, pixKeyResolvers]);