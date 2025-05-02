import Router from "@koa/router";
import { adaptRoute } from "../../adapters/KoaRouterAdapter";
import { makeAddUserController } from "../../infra/factories/controllers/users/CreateUserControllerFactory";
import { usersValidatorMiddleware } from "../validators/UsersValidator";

const userRouter = new Router();

export async function setupUserRouter() {
    const usersController = await makeAddUserController();
    userRouter.post("/", usersValidatorMiddleware.validate(), adaptRoute(usersController));
    return userRouter;
}
