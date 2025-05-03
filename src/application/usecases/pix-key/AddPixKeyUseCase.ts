
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { AppError, PixKeyAlreadyExist } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { PixKey } from "../../../domain/entities/PixKey";
import { AddPixKeyUseCase } from "../../../domain/usecases/PixUseCase";

export class RegisterPixKeyUseCase implements AddPixKeyUseCase {
    constructor(
        private readonly pixKeyRepository: PixKeyRepository,
        private readonly logging: Logging
    ) { }

    public async execute(pix: PixKey): Promise<void> {
        const pixKey = await this.pixKeyRepository.findByKey(pix.key);
        if (pixKey) {
            throw new PixKeyAlreadyExist("Pix key already exists", HttpStatusCode.Conflict)
        }

        try {
            await this.pixKeyRepository.registerKey(pix);
        } catch (err) {
            this.logging.error(`[RegisterPixKeyUseCase] Failed to register Pix key: ${err}`);
            throw new AppError("Failed to register Pix key", HttpStatusCode.InternalServerError);
        }
    }
}
