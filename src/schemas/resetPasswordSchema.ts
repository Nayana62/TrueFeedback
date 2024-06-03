import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "password must be atleast 6 charaters" })
      .max(20, { message: "password must be atmost 20 charaters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
