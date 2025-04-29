import Router from "@koa/router";
import { adaptRoute } from "../../adapter/RouterAdapter";
import { makeAddUserController } from "../../infra/factories/controllers/users/CreateUserControllerFactory";


const userRoutes = new Router({
  prefix: "/users", 
});

userRoutes.post(
  "/",
  adaptRoute(makeAddUserController())
);

export default userRoutes;
