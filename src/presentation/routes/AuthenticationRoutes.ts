import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makeAuthenticationController } from "../../infra/factories/controllers/authentication/AuthebticationControllerFactory";

const authenticationRouter = new Router({
    prefix: "/authentication",
});

export async function setupAuthenticationRouter() {
    const controller = await makeAuthenticationController();
    authenticationRouter.post("/", adaptRoute(controller));
    return authenticationRouter;
}
