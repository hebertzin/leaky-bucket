export interface UsersRepository {
    save(user: User): Promise<User>
}