import { Controller } from "../../../../domain/Controller";
import { RemovePixKeyContoller } from "../../../../presentation/controllers/pix-key/RemovePixKey";
import { makeDbRemovePixKeyFactory } from "../../usecases/pix-key/RemovePixKeyUseCaseFactory";

export const makeRemovePixKeyController = async (): Promise<Controller> => {
    const removePixKeyUseCase = await makeDbRemovePixKeyFactory()
    return new RemovePixKeyContoller(removePixKeyUseCase);
};