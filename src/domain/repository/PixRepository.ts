import { PixKey, PixKeyType } from "../PixKey";

export interface PixKeyRepository {
    registerKey(key: PixKey): Promise<void>
    findByKey(key: string): Promise<PixKey | null>;
    findAllByUserId(userId: string): Promise<PixKey[] | null>
    removePixKey(key: string): Promise<void>
}
