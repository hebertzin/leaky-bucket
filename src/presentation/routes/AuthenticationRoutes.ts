import Router from "@koa/router";
import { adaptRoute } from "../../infra/adapters/KoaRouterAdapter";
import { makeAuthenticationController } from "../../infra/factories/controllers/authentication/AuthenticationControllerFactory";
import { authenticationValidatorMiddleware } from "../validators/AuthenticationValidator";

const authenticationRouter = new Router();

export async function setupAuthenticationRouter() {
    const authenticationController = await makeAuthenticationController();
    authenticationRouter.post("/", authenticationValidatorMiddleware.validate(), adaptRoute(authenticationController));
    return authenticationRouter;
}
