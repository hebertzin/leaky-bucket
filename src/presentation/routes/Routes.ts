import Router from "@koa/router";
import { setupPixKeyRouter } from "./PixKeyRoutes";
import { setupAuthenticationRouter } from "./AuthenticationRoutes";
import { setupUserRouter } from "./UsersRoutes";
import { setupProtectedRouter } from "./ProtectedRoutes";
import { authenticationMiddlewareFactory } from "../../infra/factories/middlewares/AuthenticationMiddlewareFactory";
import { leakyBucketMiddlewareFactory } from "../../infra/factories/middlewares/LeakyBucketMiddlewareFactory";

const routes = new Router({
    prefix: "/api/v1",
});

export async function setupRouter() {
    const authenticationRouter = await setupAuthenticationRouter()
    const userRouter = await setupUserRouter()
    const pixKeyRouter = await setupPixKeyRouter()
    const protectedRouter = await setupProtectedRouter()

    const leakyBucketMiddleware = await leakyBucketMiddlewareFactory();
    const autenticationMiddleware = authenticationMiddlewareFactory();


    routes.use("/authentication", authenticationRouter.routes())
    routes.use("/users", userRouter.routes())
    routes.use("/protected", autenticationMiddleware, protectedRouter.routes())
    routes.use("/pix/query", autenticationMiddleware, leakyBucketMiddleware, pixKeyRouter.routes())

    return routes
}
