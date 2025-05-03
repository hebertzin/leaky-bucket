import { Context } from "koa";
import { Controller, HttpResponse } from "../../domain/Controller";

export const adaptRoute = (controller: Controller) => {
    return async (ctx: Context) => {
        try {
            const { message, data, code }: HttpResponse = await controller.handle(ctx.request);
            if (code >= 200 && code <= 299) {
                ctx.status = code;
                ctx.body = {
                    code, message, data
                };
            } else {
                // Problem Details response following RFC 9457 format
                // This standardized structure provides a machine-readable and human-readable error format.
                // More info: https://www.rfc-editor.org/rfc/rfc9457.html
                ctx.status = code;
                ctx.body = {
                    title: message, status: code, instance: ctx.url.toString()
                };
            }
        } catch (error: any) {
            ctx.status = error?.code || 500;
            ctx.body = {
                title: "An unexpected error occurred.",
                intance: ctx.url.toString(),
                code: ctx.status,
                error: error?.message || String(error),
            };
        }
    };
};
