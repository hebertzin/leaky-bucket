import { User } from "../entities/Users"

export interface UsersRepository {
    save(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
}