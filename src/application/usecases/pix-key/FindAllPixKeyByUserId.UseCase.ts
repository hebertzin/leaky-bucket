
import { PixKeyRepository } from "../../../domain/repository/PixRepository";
import { Logging } from "../../../domain/Logging";
import { AppError, NotFound } from "../../errors/Errors";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { PixKey } from "../../../domain/entities/PixKey";
import { FindAllByUserId } from "../../../domain/usecases/FindAllByUserIdUseCase";


export class FindAllPixKeyByUserIdUseCase implements FindAllByUserId {
    constructor(
        private readonly pixKeyRepository: PixKeyRepository,
        private readonly logging: Logging
    ) { }

    public async execute(userId: string): Promise<PixKey[] | null> {
        try {
            const allPixKeys = await this.pixKeyRepository.findAllByUserId(userId);
            if (allPixKeys?.length == 0) {
                throw new NotFound("Pix keys not found", HttpStatusCode.NotFound)

            }
            return allPixKeys;
        } catch (err) {
            this.logging.error(`[FindPixKeyByUserIdUseCase] Failed to found all Pix key: ${err}`);
            throw new AppError("Failed to found Pix all keys", HttpStatusCode.InternalServerError);
        }
    }
}
