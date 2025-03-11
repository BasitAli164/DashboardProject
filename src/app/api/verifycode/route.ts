import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,code}=await request.json()
        const decodedUsername=decodeURIComponent(username) // this method is use to encode extra data in url means if there comes space then it convert into %20

        const user= await userModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{
                status:404
            })
        }
        const isCodeValide=user.verifyCode===code
        const isCodeNotExperied=new Date(user.verifyCodeExpiry)>new Date()

        if(isCodeValide && isCodeNotExperied){
            user.isVerified=true
            await user.save()

            return Response.json({
                success:true,
                message:"Account verified Successfully",
            },{
                status:200
            })

        }else if(!isCodeNotExperied){
            return Response.json({
                success:false,
                message:"Verification code has experied,please signup again to get a new code"
            },{
                status:400
            })
        }else {
            return Response.json({
                success:false,
                message:"Incorrect Verification code"
            },{
                status:400
            })
        }

        
    } catch (error) {
        console.error("Error verifying user",error)
        return Response.json({
            success:false,
            message:"Error verifying user"
        },{
            status:500
        })
        
    }
}