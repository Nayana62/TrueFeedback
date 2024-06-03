import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, "Username must be atleast 4 characters")
  .max(20, "Username must be atmost 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 charaters" })
    .max(20, { message: "password must be atmost 20 charaters" }),
});
