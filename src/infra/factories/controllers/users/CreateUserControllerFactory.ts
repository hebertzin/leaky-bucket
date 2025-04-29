import { Controller } from "../../../../domain/Controller";
import { CreateUserController } from "../../../../presentation/controllers/user/CreateUserController";
import { makeDbSaveUser } from "../../usecases/users/CreateUserUseCaseFactory";

export const makeAddUserController = async(): Promise<Controller> => {
    const addUserController = new CreateUserController(await makeDbSaveUser());
    return addUserController;
};