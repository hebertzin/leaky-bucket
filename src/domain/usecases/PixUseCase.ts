import { PixKey } from "../PixKey";

export interface AddPixKeyUseCase {
    execute(key: PixKey): Promise<void>;
}
