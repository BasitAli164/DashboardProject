import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOption);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 401,
      }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {

    const user=await userModel.aggregate([
        {$match:{id:userId}},
        {$unwind:'$message'},
        {$sort:{'message.createdAt':-1}},
        {$group:{_id:'$_id', message:{$push:'$message'}}}
    ])
    if(!user || user.length===0){
        return Response.json({
            success:false,
            message:"User not found"
        },{
            status:404
        })
    }

    return Response.json({
        success:true,
        message:user[0].message
    },{
        status:200
    })

    
  } catch (error) {
    console.error("An unexpected error occure",error)
    return Response.json({
      success:false,
      message:" Not Authenticated"
  },{
      status:500
  })
    
  }
}
