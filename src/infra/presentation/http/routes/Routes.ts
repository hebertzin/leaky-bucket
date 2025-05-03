import Router from "@koa/router";
import { setupPixKeyRouter } from "./PixKeyRoutes";
import { setupAuthenticationRouter } from "./AuthenticationRoutes";
import { setupUserRouter } from "./UsersRoutes";
import { setupProtectedRouter } from "./ProtectedRoutes";
import { leakyBucketMiddlewareFactory } from "../../../factories/middlewares/LeakyBucketMiddlewareFactory";
import { authenticationMiddlewareFactory } from "../../../factories/middlewares/AuthenticationMiddlewareFactory";

const routes = new Router({
    prefix: "/api/v1",
});

export async function setupRouter() {
    const authenticationRouter = await setupAuthenticationRouter()
    const userRouter = await setupUserRouter()
    const pixKeyRouter = await setupPixKeyRouter()
    const protectedRouter = await setupProtectedRouter()

    // Public routes that do not use authentication middleware or request control (Leaky Bucket).
    // These routes are accessible without the need for a JWT token and are not subject to tax limits.
    // Ex: Login, user registration, etc.
    routes.use("/authentication", authenticationRouter.routes())
    routes.use("/users", userRouter.routes())

    // main application middlewares
    const leakyBucketMiddleware = await leakyBucketMiddlewareFactory();
    const authenticationMiddleware = await authenticationMiddlewareFactory()

    routes.use(authenticationMiddleware)
    routes.use(leakyBucketMiddleware)
    routes.use("/protected", protectedRouter.routes())
    routes.use("/pix/query", pixKeyRouter.routes())

    return routes
}
