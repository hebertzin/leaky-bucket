import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makePixKeyController } from "../../infra/factories/controllers/pix-key/PixKeyControllerFactory";
import { makeRemovePixKeyController } from "../../infra/factories/controllers/pix-key/RemovePixKeyControllerFactory";
import { makeFindPixKeyController } from "../../infra/factories/controllers/pix-key/FindPixKeyControllerFactory";
import { makeFindAllPixKeyController } from "../../infra/factories/controllers/pix-key/FindAllPixKeyByUserIdControllerFactory";

const pixKeyRouter = new Router({
    prefix: "/pix/key",
});

export async function setupPixKeyRouter() {
    const addPixKeyController = await makePixKeyController();
    const removePixKeyController = await makeRemovePixKeyController();
    const findPixKeyController = await makeFindPixKeyController();
    const findAllPixKeyByUserIdController = await makeFindAllPixKeyController();

    pixKeyRouter.post("/", adaptRoute(addPixKeyController));
    pixKeyRouter.delete("/", adaptRoute(removePixKeyController))
    pixKeyRouter.get("/", adaptRoute(findPixKeyController))
    pixKeyRouter.get("/all", adaptRoute(findAllPixKeyByUserIdController))


    return pixKeyRouter;
}
