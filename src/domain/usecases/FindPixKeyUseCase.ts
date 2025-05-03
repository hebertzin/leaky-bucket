import { PixKey } from "../entities/PixKey";

export interface FindPixKey {
    execute(key: string): Promise<PixKey | null>;
}
