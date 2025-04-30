import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './UserSchema';

export const typeDefs = mergeTypeDefs([userTypeDefs]);