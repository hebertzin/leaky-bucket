import { Controller } from "../../../../domain/Controller";
import { FindPixKeyContoller } from "../../../../presentation/controllers/pix-key/FindPixKeyController";
import { makeDbFindPixKeyFactory } from "../../usecases/pix-key/FindPixKeyUseCaseFactory";

export const makeFindPixKeyController = async (): Promise<Controller> => {
    const findPixKeyUseCase = await makeDbFindPixKeyFactory()
    return new FindPixKeyContoller(findPixKeyUseCase);
};