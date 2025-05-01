
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { AppError } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { PixKey } from "../../../domain/PixKey";
import { FindAllByUserId } from "../../../domain/usecases/FindAllByUserIdUseCase";


export class FindAllPixKeyByUserIdUseCase implements FindAllByUserId {
    constructor(
        private readonly pixKeyRepository: PixKeyRepository,
        private readonly logging: Logging
    ) { }

    public async execute(userId: string): Promise<PixKey[] | null> {
        try {
            return await this.pixKeyRepository.findAllByUserId(userId);
        } catch (err) {
            this.logging.error(`[FindPixKeyByUserIdUseCase] Failed to found all Pix key: ${err}`);
            throw new AppError("Failed to found Pix all keys", HttpStatusCode.InternalServerError);
        }
    }
}
