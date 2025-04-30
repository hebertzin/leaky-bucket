import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makeAuthenticationController } from "../../infra/factories/controllers/authentication/AuthenticationControllerFactory";

const authenticationRouter = new Router({
    prefix: "/authentication",
});

export async function setupAuthenticationRouter() {
    const authenticationController = await makeAuthenticationController();
    authenticationRouter.post("/", adaptRoute(authenticationController));
    return authenticationRouter;
}
