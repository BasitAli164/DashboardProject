import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";
import { promises } from "dns";

export const authOption:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            credentials:{
                email:{label:"Email", type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any):promises<any>{

                await dbConnect()
                try {
                    const user=await userModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account befor login")
                    }
                    const isPasswordCorrect= await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("Incorrect Password!")
                    }
                } catch (err:any) {
                    throw new Error(err)
                    
                }
            }
        })
    ],
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:{
        
    }
}