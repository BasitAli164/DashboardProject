import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";
import z from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";