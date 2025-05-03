import { Context, Next } from "koa";
import { logging } from "../../logging/Logging";
import { JwtManager } from "../../security/Jwt";
import { AuthenticationMiddleware } from "../../presentation/http/middlewares/AuthenticationMiddleware";

export const authenticationMiddlewareFactory = async () => {
    const jwt = new JwtManager()
    const isAuthorizedMiddleware = new AuthenticationMiddleware(jwt, logging)

    return (ctx: Context, next: Next) => isAuthorizedMiddleware.isAuthorized(ctx, next);
};
