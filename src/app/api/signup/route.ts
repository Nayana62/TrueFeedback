import { sendVerficationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserByEmailVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserByEmailVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(verifyCode);
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User is already registered with this email",
          },
          { status: 400 }
        );
      } else {
        const hashPass = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashPass;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashPass,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    const emailResponse = await sendVerficationEmail(
      email,
      username,
      verifyCode
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
        message: "User registered successfully please verify",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error registering user", err);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
