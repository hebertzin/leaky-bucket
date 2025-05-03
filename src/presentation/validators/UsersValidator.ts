import { DataValidator, ZodValidator } from "../../infra/adapters/KoaValidatorMiddlewareAdapter";
import { userValidationSchema } from "./schemas/UserSchema";

export const usersValidatorMiddleware = new DataValidator(
    new ZodValidator(userValidationSchema),
);