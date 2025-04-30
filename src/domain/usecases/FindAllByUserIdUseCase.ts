import { PixKey } from "../PixKey";

export interface FindAllByUserId {
    execute(userId: string): Promise<PixKey[] | null>;
}
