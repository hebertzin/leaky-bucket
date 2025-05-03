import Router from "@koa/router";
import { makeAuthenticationController } from "../../../factories/controllers/authentication/AuthenticationControllerFactory";
import { authenticationValidatorMiddleware } from "../validators/AuthenticationValidator";
import { adaptRoute } from "../../../adapters/KoaRouterAdapter";

const authenticationRouter = new Router();

export async function setupAuthenticationRouter() {
    const authenticationController = await makeAuthenticationController();
    authenticationRouter.post("/", authenticationValidatorMiddleware.validate(), adaptRoute(authenticationController));
    return authenticationRouter;
}
