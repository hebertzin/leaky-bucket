import Router from "@koa/router";
import { Context } from "koa";
import { HttpStatusCode } from "../../domain/HttpStatus";
import { makeAuthenticationMiddlewareFactory } from "../../infra/factories/middlewares/AuthenticationMiddlewareFactory";

const protectedRouter = new Router({
  prefix: "/protected",
});

const middleware = makeAuthenticationMiddlewareFactory();

export async function setupProtectedRouter() {
  protectedRouter.get('/', middleware.isAuthorized.bind(middleware), async (ctx: Context) => {
    ctx.status = HttpStatusCode.Ok;
    ctx.body = {
      message: `Protected route`,
    };
  });

  return protectedRouter;
}
