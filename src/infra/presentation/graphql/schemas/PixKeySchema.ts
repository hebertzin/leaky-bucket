import { gql } from 'graphql-tag';

export const pixKeyTypeDefs = gql`
  enum PixKeyType {
    CPF
    CNPJ
    PHONE
    EMAIL
    EVP
  }

  type PixKey {
    key: String!
    type: PixKeyType!
    userId: String!
    owner: String!
    bank: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePixKeyInput {
    key: String!
    type: PixKeyType!
    userId: String!
    owner: String!
    bank: String!
  }

  type Query {
    pixKey(key: String!): PixKey
    pixKeysByUserId(userId: String!): [PixKey!]!
  }

  type Mutation {
    createPixKey(input: CreatePixKeyInput!): PixKey!
  }
`;
