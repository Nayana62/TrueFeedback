import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import ResetPasswordEmail from "../../emails/resetPasswordEmail";

export async function sendResetPasswordEmail(
  email: string,
  username: string,
  resetToken: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "TrueFeedback <onboarding@resend.dev>",
      to: email,
      subject: "TrueFeedback | Reset Password",
      react: ResetPasswordEmail({ username, resetToken }),
    });
    console.log("email: ", email);
    console.log("username: ", username);

    return { success: true, message: "Reset password email sent successfully" };
  } catch (emailError) {
    console.error("Error sending reset password email", emailError);
    return { success: false, message: "Failed to send reset password email" };
  }
}
