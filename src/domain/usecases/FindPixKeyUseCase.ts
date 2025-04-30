import { PixKey } from "../PixKey";

export interface FindPixKey {
    execute(key: string): Promise<PixKey | null>;
}
