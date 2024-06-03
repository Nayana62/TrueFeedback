import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import { z } from "zod";
import crypto from "crypto";
import { sendResetPasswordEmail } from "@/helpers/sendResetPasswordEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { input } = await request.json();
    const isEmail = z.string().email().safeParse(input).success;

    const user = await UserModel.findOne(
      isEmail ? { email: input } : { username: input }
    );

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const email = user.email;
    const username = user.username;

    const emailResponse = await sendResetPasswordEmail(
      email,
      username,
      resetToken
    );

    console.log(emailResponse);
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Reset password email send successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error checking user", error);
    return Response.json(
      {
        success: false,
        message: "Error checking user",
      },
      {
        status: 500,
      }
    );
  }
}
