import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";
import z from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect();
    try {
        const {searchParams}=new URL(request.url) // extract the query from url
        const queryParam={
            username:searchParams.get('username')
        }
        const result=UsernameQuerySchema.safeParse(queryParam)
        
        
    } catch (error) {
    console.error("Error Checking username",error)   
    return Response.json(
        {
            success:false,
            message:"Error Checking userName"
        },
        {
            status:500
        }
    )     
    }

}