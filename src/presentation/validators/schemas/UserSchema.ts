import { z } from "zod";

export const userValidationSchema = z.object({
  email: z
    .string()
    .email({ message: "Must be a valid email address" })
    .min(1, { message: "Email is required" }),
  name: z.string({
    message: "Name must be a string",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});