import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makeAddUserController } from "../../infra/factories/controllers/users/CreateUserControllerFactory";

const userRouter = new Router({
    prefix: "/users",
});

export async function setupUserRouter() {
    const controller = await makeAddUserController();
    userRouter.post("/", adaptRoute(controller));
    return userRouter;
}
