import { DataValidator, ZodValidator } from "../../adapters/KoaValidatorMiddleware";
import { authenticationValidationSchema } from "./schemas/AuthenticationSchema";

  export const authenticationValidatorMiddleware = new DataValidator(
    new ZodValidator(authenticationValidationSchema),
  );