import { resend } from "@/lib/resend";
import {VerificationEmail} from '../../emails/VerificationEmail'
import { ApiResponse } from "@/types/ApiResponse";

export const sendVarificationEmail=async(
    email:string,
    userName:string,
    verifyCode:string,
):Promise<ApiResponse>=>{
    try {
        await resend.emails.send({
            from:"NetBots Company",
            to:email,
            subject:"NetBots Company |Verification Code!",
            react:VerificationEmail({userName,otp:verifyCode})
            
        })
        return {success:true,message:"Verification email send successfully "}
        
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success:false,message:"Fail to send verification email."}
        
    }


}