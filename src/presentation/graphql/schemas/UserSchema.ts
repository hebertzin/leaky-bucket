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

  type Query {
    user(email: String!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;
