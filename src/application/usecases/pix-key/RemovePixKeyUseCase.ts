
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { AppError } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { RemovePixKey } from "../../../domain/usecases/RemovePixKeyUseCase";


export class RemovePixKeyUseCase implements RemovePixKey {
    constructor(
        private readonly pixKeyRepository: PixKeyRepository,
        private readonly logging: Logging
    ) { }

    public async execute(key: string): Promise<void> {
        try {
            await this.pixKeyRepository.removePixKey(key);
        } catch (err) {
            this.logging.error(`[RemovePixKeyUseCase] Failed to remove Pix key: ${err}`);
            throw new AppError("Failed to remove Pix key", HttpStatusCode.InternalServerError);
        }
    }
}
