import Router from "@koa/router";
import { Context } from "koa";
import { HttpStatusCode } from "../../../../domain/HttpStatus";

const protectedRouter = new Router();

export async function setupProtectedRouter() {
  protectedRouter.get('/', async (ctx: Context) => {
    ctx.status = HttpStatusCode.Ok;
    ctx.body = {
      message: `Protected route`,
    };
  });

  return protectedRouter;
}
