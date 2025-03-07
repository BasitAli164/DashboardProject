import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVarificationEmail } from "@/helpers/sendVerificationEmail";

export const POST=async(request:Request)=>{
    await dbConnect();
    try {
      const {username,email,password} = await request.json();
        
    } catch (error) {
        console.error("Error registering user",error)
        return Response.json({
            success:false,
            message:"Error registering user"
        },
    {
        status:5000,
        statusText:"Server site Error in SignUp Route"
    }
    )
        
    }

}