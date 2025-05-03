import { PixKey } from "../entities/PixKey";

export interface FindAllByUserId {
    execute(userId: string): Promise<PixKey[] | null>;
}
