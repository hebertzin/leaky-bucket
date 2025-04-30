import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  type PixKeyInfo {
    key: String!
    type: String!
    owner: String!
    createdAt: String!
    status: String!
  }

  type Query {
    users: [User!]!
    user(email: String!): User
    simulatePixKeyQuery(key: String!): PixKeyInfo!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;
