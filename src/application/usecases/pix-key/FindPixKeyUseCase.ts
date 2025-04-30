
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { AppError } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { PixKey } from "../../../domain/PixKey";
import { FindPixKey } from "../../../domain/usecases/FindPixKeyUseCase";


export class FindPixKeyUseCase implements FindPixKey {
    constructor(
        private readonly pixKeyRepository: PixKeyRepository,
        private readonly logging: Logging
    ) { }

    public async execute(key: string): Promise<PixKey | null> {
        try {
            const existing = await this.pixKeyRepository.findByKey(key);
            if (!existing) {
                throw new Error("Pix key not found")
            }
            return existing
        } catch (err) {
            this.logging.error(`[FindPixKeyUseCase] Failed to found Pix key: ${err}`);
            throw new AppError("Failed to found Pix key", HttpStatusCode.InternalServerError);
        }
    }
}
