import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { resetToken, password, confirmPassword } = await request.json();

    const user = await UserModel.findOne({
      resetToken: resetToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid reset token or token expired",
        },
        { status: 400 }
      );
    }

    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      { status: 200 }
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
