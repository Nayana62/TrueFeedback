import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/verificationEmail";
import { resend } from "@/lib/resend";

export async function sendVerficationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "TrueFeedback <onboarding@resend.dev>",
      to: email,
      subject: "TrueFeedback | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    console.log("email: ", email);

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
