import { Controller } from "../../../../domain/Controller";
import { CreateUserController } from "../../../../presentation/controllers/user/CreateUserController";
import { makeDbSaveUser } from "../../usecases/users/CreateUserUseCaseFactory";

export const makeAddUserController = (): Controller => {
    const addUserController = new CreateUserController(makeDbSaveUser());
    return addUserController;
};