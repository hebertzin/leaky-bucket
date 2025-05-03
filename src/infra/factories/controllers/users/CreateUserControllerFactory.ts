import { Controller } from "../../../../domain/Controller";
import { CreateUserController } from "../../../presentation/http/controllers/user/CreateUserController";
import { makeDbSaveUser } from "../../usecases/users/CreateUserUseCaseFactory";

export const makeAddUserController = async (): Promise<Controller> => {
    const addUserFactory = await makeDbSaveUser()
    return new CreateUserController(addUserFactory);
};