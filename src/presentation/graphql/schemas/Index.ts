import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './UserSchema';
import { pixKeyTypeDefs } from './PixKeySchema';

export const typeDefs = mergeTypeDefs([userTypeDefs, pixKeyTypeDefs]);