import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makeAuthenticationController } from "../../infra/factories/controllers/authentication/AuthebticationControllerFactory";
import { makePixKeyControllerFactory } from "../../infra/factories/controllers/pix/PixKeyControllerFactory";

const pixKeyRouter = new Router({
    prefix: "/pix/key",
});

export async function setupPixKeyRouter() {
    const addPixKeyFactory = await makePixKeyControllerFactory();
    pixKeyRouter.post("/", adaptRoute(addPixKeyFactory));
    return pixKeyRouter;
}
