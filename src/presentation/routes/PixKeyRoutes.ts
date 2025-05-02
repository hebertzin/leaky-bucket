import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makePixKeyController } from "../../infra/factories/controllers/pix-key/PixKeyControllerFactory";
import { makeRemovePixKeyController } from "../../infra/factories/controllers/pix-key/RemovePixKeyControllerFactory";
import { makeFindPixKeyController } from "../../infra/factories/controllers/pix-key/FindPixKeyControllerFactory";
import { makeFindAllPixKeyController } from "../../infra/factories/controllers/pix-key/FindAllPixKeyByUserIdControllerFactory";
import { pixKeyValidatorMiddleware } from "../validators/PixKeyValidator";

const pixKeyRouter = new Router();

export async function setupPixKeyRouter() {
    const addPixKeyController = await makePixKeyController();
    const removePixKeyController = await makeRemovePixKeyController();
    const findPixKeyController = await makeFindPixKeyController();
    const findAllPixKeyByUserIdController = await makeFindAllPixKeyController();

    pixKeyRouter.post("/", pixKeyValidatorMiddleware.validate(), adaptRoute(addPixKeyController));
    pixKeyRouter.delete("/", adaptRoute(removePixKeyController))
    pixKeyRouter.get("/", adaptRoute(findPixKeyController))
    pixKeyRouter.get("/all", adaptRoute(findAllPixKeyByUserIdController))


    return pixKeyRouter;
}
