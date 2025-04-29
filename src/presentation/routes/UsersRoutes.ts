import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makeAddUserController } from "../../infra/factories/controllers/users/CreateUserControllerFactory";

const userRoutes = new Router({
    prefix: "/users",
});

export async function setupUserRoutes() {
    const controller = await makeAddUserController();
    userRoutes.post("/", adaptRoute(controller));
    return userRoutes;
}
