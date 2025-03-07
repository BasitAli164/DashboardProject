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
    const verifyCode=Math.floor(100000 + Math.random() * 900000).toString()
    if(existingUserVerifiedByEmail){
       if(existingUserVerifiedByEmail.isVerified){
        return Response.json({
            success:false,
            message:"User already exist with this email"
        },{
            status:400,
            statusText:"Client site Error"
        })
       }else{
        const hashPassword=await bcrypt.hash(password,10);
        existingUserVerifiedByEmail.password=hashPassword,
        existingUserVerifiedByEmail.verifyCode=verifyCode,
        existingUserVerifiedByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
        await existingUserVerifiedByEmail.save()
    
       }
    }else{
        const hashPassword=await bcrypt.hash(password,10);
        const expiryDate=new Date()
        expiryDate.setHours(expiryDate.getHours()+1  )

        const newUser=await new userModel({
            username,
              email,
              password:hashPassword,
              verifyCode,
              verifyCodeExpiry: expiryDate,
              isVerified:false,
              isAcceptingMessage: true,
              message: [],
    
        })
        await newUser.save();
    }

    // Send verification email
    const emailResponse=await sendVarificationEmail(email,username,verifyCode)
    
    if(!emailResponse.success){
        return Response.json({
            success:false,
            message:emailResponse.message
        },{
            status:500,
            statusText:"Server site Error"
        })

    }
    return Response.json({
        success:true,
        message:"User registered Successfully. Please verify your email"
    },{
        status:201,
        statusText:"User Created Successfully..."
    })
   
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
