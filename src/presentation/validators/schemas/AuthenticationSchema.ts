import { z } from "zod";

export const authenticationValidationSchema = z.object({
  email: z
    .string({ message: "Email must be a string" })
    .email({ message: "Must be a valid email" })
    .min(1, { message: "Email is required" }),
  password: z
    .string({ message: "Password must be a string" })
    .min(8, { message: "Password muist have at least 8 digits" }),
});