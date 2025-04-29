import { Controller } from "../../../../domain/Controller";
import { AuthenticationController } from "../../../../presentation/controllers/authentication/AuthenticationController";
import { makeAuthenticationUseCase } from "../../usecases/authentication/AuthenticationUseCaseFactory";

export const makeAuthenticationController = async (): Promise<Controller> => {
    const authenticationController = new AuthenticationController(await makeAuthenticationUseCase());
    return authenticationController;
};