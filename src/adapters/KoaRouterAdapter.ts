import { Context } from "koa";
import { Controller, HttpResponse } from "../domain/Controller";

export const adaptRoute = (controller: Controller) => {
    return async (ctx: Context) => {
        try {
            const { message, data, statusCode }: HttpResponse = await controller.handle(ctx.request);

            if (statusCode >= 200 && statusCode <= 299) {
                ctx.status = statusCode;
                ctx.body = {
                    message,
                    data
                };
            } else {
                ctx.status = statusCode;
                ctx.body = {
                    message: message,
                };
            }
        } catch (error: any) {
            ctx.status = error?.statusCode || 500;
            ctx.body = {
                message: "An unexpected error occurred.",
                error: error?.message || String(error),
            };
        }
    };
};
