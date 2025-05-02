import { Context, Next } from "koa";
import { AuthenticationMiddleware } from "../../../presentation/middlewares/AuthenticationMiddleware";
import { logging } from "../../logging/Logging";
import { JwtManager } from "../../security/Jwt";

export const authenticationMiddlewareFactory = async () => {
    const jwt = new JwtManager()
    const isAuthorizedMiddleware = new AuthenticationMiddleware(jwt, logging)

    return (ctx: Context, next: Next) => isAuthorizedMiddleware.isAuthorized(ctx, next);
};
