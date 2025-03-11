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
        console.log(result)// remove befor execute build command
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:usernameErrors?.length>0 ? usernameErrors.join(','):'Invalid query parameters'
            })
        }

        
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