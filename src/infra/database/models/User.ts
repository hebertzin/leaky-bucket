export type User = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    tokens: number;
    createdAt?: Date;
    updatedAt?: Date
}
