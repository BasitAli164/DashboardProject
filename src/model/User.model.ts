import mongoose, {  Schema, Document } from "mongoose";
import { unique } from "next/dist/build/utils";
import { string } from "zod";

// Define the structure for Message Schema

export interface Message extends Document {
  content: string;
  createDate: Date;
}

// Define the structure for User Schema
interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

// Define the Schema for Message

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },

  createDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

// Define the Schema for User

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a  valid  email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code Expiry  is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  message: {
    type: [messageSchema],
  },
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("Users", userSchema);
export default userModel;
