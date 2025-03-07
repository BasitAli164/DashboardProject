import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVarificationEmail } from "@/helpers/sendVerificationEmail";

export const POST = async (request: Request) => {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await userModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
          statusText: "Client Site Problem",
        }
      );
    }
    const existingUserVerifiedByEmail = await userModel.findOne({
      email,
    });
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 5000,
        statusText: "Server site Error in SignUp Route",
      }
    );
  }
};
