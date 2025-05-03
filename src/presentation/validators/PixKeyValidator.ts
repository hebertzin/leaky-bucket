import { DataValidator, ZodValidator } from "../../infra/adapters/KoaValidatorMiddlewareAdapter";
import { pixKeySchema } from "./schemas/PixKeySchema";

export const pixKeyValidatorMiddleware = new DataValidator(
    new ZodValidator(pixKeySchema),
);