import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makeAuthenticationController } from "../../infra/factories/controllers/authentication/AuthenticationControllerFactory";
import { makePixKeyControllerFactory } from "../../infra/factories/controllers/pix-key/PixKeyControllerFactory";

const pixKeyRouter = new Router({
    prefix: "/pix/key",
});

export async function setupPixKeyRouter() {
    const addPixKeyFactory = await makePixKeyControllerFactory();
    pixKeyRouter.post("/", adaptRoute(addPixKeyFactory));
    return pixKeyRouter;
}
