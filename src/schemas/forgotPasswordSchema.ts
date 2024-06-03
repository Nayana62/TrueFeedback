import { z } from "zod";
import { usernameValidation } from "./signUpSchema";

export const forgotPasswordSchema = z.object({
  input: z.string().refine(
    (val) => {
      const isEmail = z.string().email().safeParse(val).success;
      const isUsername = usernameValidation.safeParse(val).success;
      return isEmail || isUsername;
    },
    {
      message: "Must be a valid email or username",
    }
  ),
});
