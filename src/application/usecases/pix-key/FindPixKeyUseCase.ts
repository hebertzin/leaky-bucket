
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { AppError, NotFound } from "../../errors/Errors";
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
            const pixKey = await this.pixKeyRepository.findByKey(key);
            if (!pixKey) {
                throw new NotFound("Pix key not found", HttpStatusCode.NotFound)
            }
            return pixKey
        } catch (err) {
            this.logging.error(`[FindPixKeyUseCase] Failed to found Pix key: ${err}`);
            throw new AppError("Failed to found Pix key", HttpStatusCode.InternalServerError);
        }
    }
}
