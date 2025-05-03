import { PixKey } from "../entities/PixKey";

export interface AddPixKeyUseCase {
    execute(key: PixKey): Promise<void>;
}
