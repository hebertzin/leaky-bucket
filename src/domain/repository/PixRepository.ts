import { PixKey, PixKeyType } from "../PixKey";

export interface PixKeyRepository {
    registerKey(key: PixKey): Promise<void>
    findByKey(key: string): Promise<PixKey | null>;
}
