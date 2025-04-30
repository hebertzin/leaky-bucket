import { Context, Next } from "koa";
import { ZodError, z } from "zod";
import { HttpStatusCode } from "../domain/HttpStatus";
import { Validator } from "../domain/Validator";

export class ZodValidator<T> implements Validator<T> {
    private schema: z.ZodSchema<T>;

    constructor(schema: z.ZodSchema<T>) {
        this.schema = schema;
    }

    validate(data: T): void {
        this.schema.parse(data);
    }
}

export class DataValidator<T> {
    private validator: Validator<T>;

    constructor(validator: Validator<T>) {
        this.validator = validator;
    }

    validate() {
        return async (ctx: Context, next: Next) => {
            try {
                this.validator.validate(ctx.request.body as any);
                await next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const errorMessages = error.errors.map((issue) => ({
                        message: issue.message,
                    }));

                    ctx.status = HttpStatusCode.BadRequest;
                    ctx.body = {
                        error: "Invalid data",
                        details: errorMessages,
                    };
                } else {
                    ctx.status = HttpStatusCode.InternalServerError;
                    ctx.body = {
                        error: "Internal Server Error",
                    };
                }
            }
        };
    }
}
