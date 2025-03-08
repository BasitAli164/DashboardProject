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
                    i
                    
                } catch (err:any) {
                    throw new Error(err)
                    
                }
            }
        })
    ]
}