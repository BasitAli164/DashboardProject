import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";

export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,code}=await request.json()

        
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