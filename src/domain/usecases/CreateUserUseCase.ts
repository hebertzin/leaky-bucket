import { User } from "../entities/Users";

export interface CreateUser {
  execute(user: User): Promise<User>;
}