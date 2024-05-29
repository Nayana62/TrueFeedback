import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: "Invalid Param query",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    const existingUserVerified = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerified) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Erroe checking username ", error);
    return Response.json(
      { success: false, message: "error checking username" },
      { status: 500 }
    );
  }
}
