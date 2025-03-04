import { z } from "zod";

export const signUpValidation = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more  than 20 characters ")
    .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special character"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
