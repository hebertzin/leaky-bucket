import { Context } from "koa";
import { Controller, HttpResponse } from "../../domain/Controller";

export const adaptRoute = (controller: Controller) => {
    return async (ctx: Context) => {
        try {
            const { message, data, code }: HttpResponse = await controller.handle(ctx.request);

            if (code >= 200 && code <= 299) {
                ctx.status = code;
                ctx.body = {
                    code,
                    message,
                    data
                };
            } else {
                ctx.status = code;
                ctx.body = {
                    code,
                    message: message,
                };
            }
        } catch (error: any) {
            ctx.status = error?.code || 500;
            ctx.body = {
                message: "An unexpected error occurred.",
                error: error?.message || String(error),
            };
        }
    };
};
