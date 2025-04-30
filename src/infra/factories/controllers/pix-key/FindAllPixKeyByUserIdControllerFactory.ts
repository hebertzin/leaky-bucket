import { Controller } from "../../../../domain/Controller";
import { FindAllPixKeyByUserIdContoller } from "../../../../presentation/controllers/pix-key/FindAllByUserIdController";
import { makeDbFindAllPixKeyByUserIdFactory } from "../../usecases/pix-key/FindAllPixKeyByUserIdFactory";

export const makeFindAllPixKeyController = async (): Promise<Controller> => {
    const findAllPixKeyByUserIdUseCase = await makeDbFindAllPixKeyByUserIdFactory()
    return new FindAllPixKeyByUserIdContoller(findAllPixKeyByUserIdUseCase);
};