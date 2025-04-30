
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { AppError } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { PixKey } from "../../../domain/PixKey";
import { AddPixKeyUseCase } from "../../../domain/usecases/PixUseCase";

export class RegisterPixKeyUseCase implements AddPixKeyUseCase{
    constructor(
        private readonly pixKeyRepository: PixKeyRepository,
        private readonly logging: Logging
    ) { }

    public async execute(pixKey: PixKey): Promise<void> {
        const existing = await this.pixKeyRepository.findByKey(pixKey.key);
        if (existing) {
            throw Error("Pix key already exists")
        }

        try {
            await this.pixKeyRepository.registerKey(pixKey);
        } catch (err) {
            this.logging.error(`[RegisterPixKeyUseCase] Failed to register Pix key: ${err}`);
            throw new AppError("Failed to register Pix key", HttpStatusCode.InternalServerError);
        }
    }
}
