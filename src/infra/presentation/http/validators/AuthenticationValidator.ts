import { DataValidator, ZodValidator } from "../../../adapters/KoaValidatorMiddlewareAdapter";
import { authenticationValidationSchema } from "./schemas/AuthenticationSchema";

export const authenticationValidatorMiddleware = new DataValidator(
  new ZodValidator(authenticationValidationSchema),
);