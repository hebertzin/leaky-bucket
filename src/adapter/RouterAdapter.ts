import { Context } from "koa";
import { Controller, HttpResponse } from "../domain/Controller";

export const adaptRoute = (controller: Controller) => {
    return async (ctx: Context) => {
        try {
            const response: HttpResponse = await controller.handle(ctx.request);

            if (response.statusCode >= 200 && response.statusCode <= 299) {
                ctx.status = response.statusCode;
                ctx.body = {
                    response,
                };
            } else {
                ctx.status = response.statusCode;
                ctx.body = {
                    message: response.msg,
                    ip: response.ip,
                    statusCode: response.statusCode,
                };
            }
        } catch (error: any) {
            ctx.status = error?.statusCode || 500;
            ctx.body = {
                msg: "An unexpected error occurred.",
                error: error?.message || String(error),
            };
        }
    };
};
