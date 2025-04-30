import { Controller } from "../../../../domain/Controller";
import { PixKeyContoller } from "../../../../presentation/controllers/pix-key/PixKeyController";
import { makeDbAddPixKeyFactory } from "../../usecases/pix-key/PixKeyUseCaseFactory";

export const makePixKeyController = async (): Promise<Controller> => {
    const pixKeyUseCase = await makeDbAddPixKeyFactory()
    return new PixKeyContoller(pixKeyUseCase);
};